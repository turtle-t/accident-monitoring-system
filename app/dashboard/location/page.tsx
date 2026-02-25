"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  GoogleMap,
  Marker,
  Circle,
  useLoadScript,
} from "@react-google-maps/api";

type DataType = {
  latitude: number;
  longitude: number;
  accident: boolean;
  geo_violation: boolean;
};

const GEO_CENTER = { lat: 30.5781, lng: 78.1234 };
const GEO_RADIUS = 5000;

export default function LocationPage() {
  const router = useRouter();
  const [data, setData] = useState<DataType | null>(null);
  const [error, setError] = useState(false);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey:
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  async function loadData() {
    try {
      const res = await fetch("/api/latest");
      const json = await res.json();
      if (json.ok) {
        setData(json.data);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    }
  }

  useEffect(() => {
    loadData();
    const id = setInterval(loadData, 5000);
    return () => clearInterval(id);
  }, []);

  if (!isLoaded)
    return <div className="p-6">Loading Google Map...</div>;

  if (error)
    return <div className="p-6 text-red-500">Failed to load data</div>;

  if (!data)
    return <div className="p-6">Loading vehicle location...</div>;

  const vehiclePosition = {
    lat: data.latitude,
    lng: data.longitude,
  };

  const markerColor = data.accident
    ? "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
    : data.geo_violation
    ? "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
    : "http://maps.google.com/mapfiles/ms/icons/green-dot.png";

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          Live Vehicle Location
        </h1>

        <button
          onClick={() => router.push("/dashboard")}
          className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-md text-sm"
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Status Panel */}
      <div className="mb-4 bg-slate-900 p-4 rounded-xl border border-slate-700">
        <p>
          <strong>Latitude:</strong>{" "}
          {data.latitude.toFixed(5)}
        </p>
        <p>
          <strong>Longitude:</strong>{" "}
          {data.longitude.toFixed(5)}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          {data.accident
            ? "ACCIDENT"
            : data.geo_violation
            ? "OUTSIDE ZONE"
            : "NORMAL"}
        </p>
      </div>

      {/* Map */}
      <div className="h-[600px] rounded-xl overflow-hidden border border-slate-700">
        <GoogleMap
          center={vehiclePosition}
          zoom={14}
          mapContainerStyle={{ width: "100%", height: "100%" }}
        >
          {/* Geo-Fence */}
          <Circle
            center={GEO_CENTER}
            radius={GEO_RADIUS}
            options={{
              fillColor: data.geo_violation ? "#ff0000" : "#00ff00",
              fillOpacity: 0.15,
              strokeColor: data.geo_violation ? "#ff0000" : "#00ff00",
              strokeWeight: 2,
            }}
          />

          {/* Vehicle Marker */}
          <Marker
            position={vehiclePosition}
            icon={{ url: markerColor }}
          />
        </GoogleMap>
      </div>
    </div>
  );
}