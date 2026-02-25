"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardCard from "../../components/DashboardCard";
import AlertPopup from "../../components/AlertPopup";
import Navbar from "../../components/Navbar";
import Graphs from "../../components/Graphs";

type DataType = {
  id: number;
  impact: number;
  alcohol: number;
  seatbelt: boolean;
  accident: boolean;

  latitude: number;
  longitude: number;
  geo_violation: boolean;
  sms_sent: boolean;

  created_at: string;
};

export default function DashboardPage() {
  const [data, setData] = useState<DataType | null>(null);
  const router = useRouter();

  async function loadData() {
    try {
      const res = await fetch("/api/latest");
      const json = await res.json();
      if (json.ok) setData(json.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadData();
    const id = setInterval(loadData, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <Navbar />

      <div className="mt-8 px-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-slate-400 mt-1">
          Live vehicle safety & monitoring system
        </p>

        {data?.accident && <AlertPopup />}

        {/* Main Monitoring Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          <DashboardCard label="Impact" value={data?.impact ?? "—"} />
          <DashboardCard label="Alcohol" value={data?.alcohol ?? "—"} />
          <DashboardCard
            label="Seatbelt"
            value={data?.seatbelt ? "ON" : "OFF"}
          />
          <DashboardCard
            label="Accident"
            value={data?.accident ? "YES" : "NO"}
            danger={data?.accident}
          />
        </div>

        {/* GPS + Geo + SMS Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">

          {/* Live GPS */}
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
            <p className="text-sm text-slate-400 mb-2">Live GPS</p>

            <p className="text-lg font-semibold">
              {data?.latitude
                ? `Lat: ${data.latitude.toFixed(4)}`
                : "—"}
            </p>

            <p className="text-lg font-semibold">
              {data?.longitude
                ? `Lon: ${data.longitude.toFixed(4)}`
                : "—"}
            </p>

            <button
              onClick={() => router.push("/dashboard/location")}
              className="mt-3 bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded-md text-sm"
            >
              View Live Location
            </button>
          </div>

          {/* Geo-Fence */}
          <DashboardCard
            label="Geo-Fence"
            value={data?.geo_violation ? "OUTSIDE ZONE" : "SAFE"}
            danger={data?.geo_violation}
          />

          {/* Emergency SMS */}
          <DashboardCard
            label="Emergency SMS"
            value={data?.sms_sent ? "SENT" : "NOT SENT"}
          />
        </div>

        {/* Timestamp Info */}
        <div className="mt-10 bg-slate-900 p-4 rounded-xl border border-slate-700">
          <p className="text-sm text-slate-400">Last updated:</p>
          <p className="text-lg font-semibold mt-1">
            {data?.created_at
              ? new Date(data.created_at).toLocaleString()
              : "—"}
          </p>
          <p className="text-sm mt-2 text-slate-500">
            DB Row ID: {data?.id ?? "—"}
          </p>
        </div>

        <Graphs latest={data} />
      </div>
    </>
  );
}