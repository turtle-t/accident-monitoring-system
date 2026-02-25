"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useState, useEffect } from "react";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function Graphs({ latest }: { latest: any }) {
  const [impactData, setImpactData] = useState<number[]>([]);
  const [alcoholData, setAlcoholData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    if (!latest) return;

    setImpactData((prev) => [...prev.slice(-19), latest.impact]);
    setAlcoholData((prev) => [...prev.slice(-19), latest.alcohol]);
    setLabels((prev) => [
      ...prev.slice(-19),
      new Date(latest.created_at).toLocaleTimeString(),
    ]);
  }, [latest]);

  return (
    <div className="mt-12">
      <h2 className="text-xl font-bold mb-4">Live Charts</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Impact Graph */}
        <div className="bg-slate-900 rounded-xl p-4 border border-slate-700">
          <h3 className="mb-2 font-semibold text-slate-200">Impact Level</h3>
          <Line
            data={{
              labels,
              datasets: [
                {
                  label: "Impact",
                  data: impactData,
                  borderColor: "rgb(0, 200, 255)",
                  backgroundColor: "rgba(0, 200, 255, 0.3)",
                },
              ],
            }}
          />
        </div>

        {/* Alcohol Graph */}
        <div className="bg-slate-900 rounded-xl p-4 border border-slate-700">
          <h3 className="mb-2 font-semibold text-slate-200">Alcohol Level</h3>
          <Line
            data={{
              labels,
              datasets: [
                {
                  label: "Alcohol",
                  data: alcoholData,
                  borderColor: "rgb(255, 100, 0)",
                  backgroundColor: "rgba(255, 100, 0, 0.3)",
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
}
