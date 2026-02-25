"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import MainLayout from "../../components/layout/MainLayout";


type LogType = {
  id: number;
  impact: number;
  alcohol: number;
  seatbelt: boolean;
  accident: boolean;
  created_at: string;
};

export default function HistoryPage() {
  const [logs, setLogs] = useState<LogType[]>([]);

  async function loadData() {
    try {
      const res = await fetch("/api/history");
      const json = await res.json();
      if (json.ok) setLogs(json.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadData();
    const id = setInterval(loadData, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <Navbar />

      <div className="mt-8">
        <h1 className="text-3xl font-bold">History Logs</h1>
        <p className="text-slate-400 mt-1">Complete list of sensor events</p>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full bg-slate-900 border border-slate-700 rounded-xl">
            <thead>
              <tr className="bg-slate-800 text-left text-slate-300">
                <th className="p-3 border-b border-slate-700">ID</th>
                <th className="p-3 border-b border-slate-700">Impact</th>
                <th className="p-3 border-b border-slate-700">Alcohol</th>
                <th className="p-3 border-b border-slate-700">Seatbelt</th>
                <th className="p-3 border-b border-slate-700">Accident</th>
                <th className="p-3 border-b border-slate-700">Time</th>
              </tr>
            </thead>
            <tbody>
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-slate-400">
                    No data available
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="border-b border-slate-800 hover:bg-slate-800/60">
                    <td className="p-3">{log.id}</td>
                    <td className="p-3">{log.impact}</td>
                    <td className="p-3">{log.alcohol}</td>
                    <td className="p-3">{log.seatbelt ? "ON" : "OFF"}</td>
                    <td
                      className={`p-3 font-semibold ${
                        log.accident ? "text-red-400" : "text-emerald-400"
                      }`}
                    >
                      {log.accident ? "YES" : "NO"}
                    </td>
                    <td className="p-3 text-slate-400">
                      {new Date(log.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
