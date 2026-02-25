"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import MainLayout from "../../components/layout/MainLayout";


type Status = {
  api: boolean;
  neon: boolean;
  telegram: boolean;
  raspberry: boolean;
};

export default function SettingsPage() {
  const [status, setStatus] = useState<Status>({
    api: false,
    neon: false,
    telegram: false,
    raspberry: false,
  });

  const [loading, setLoading] = useState(false);

  async function loadStatus() {
    setLoading(true);
    try {
      const res = await fetch("/api/status");
      const json = await res.json();
      if (json.ok) setStatus(json.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadStatus();
  }, []);

  const statusBox = (label: string, isOnline: boolean) => (
    <div className="p-5 bg-slate-900 border border-slate-700 rounded-xl flex items-center justify-between">
      <span className="font-medium">{label}</span>
      <span
        className={`px-3 py-1 rounded-md text-sm font-semibold ${
          isOnline ? "bg-emerald-600" : "bg-red-600"
        }`}
      >
        {isOnline ? "ONLINE" : "OFFLINE"}
      </span>
    </div>
  );

  return (
    <>
      <Navbar />

      <div className="mt-8">
        <h1 className="text-3xl font-bold">Settings & System Status</h1>
        <p className="text-slate-400 mt-1">Check backend, database, and Pi health</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

          {statusBox("API Route /api/latest", status.api)}
          {statusBox("Neon Database", status.neon)}
          {statusBox("Telegram Bot", status.telegram)}
          {statusBox("Raspberry Pi Hardware", status.raspberry)}

        </div>

        <button
          onClick={loadStatus}
          className="mt-8 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-semibold shadow-lg"
        >
          {loading ? "Refreshing..." : "Refresh Status"}
        </button>

        <div className="mt-10 bg-slate-900 p-5 border border-slate-700 rounded-xl">
          <h2 className="text-xl font-semibold mb-3">System Info</h2>
          <p className="text-slate-400">Frontend: Next.js 14 + Tailwind</p>
          <p className="text-slate-400">Backend API: App Router</p>
          <p className="text-slate-400">Database: Neon PostgreSQL</p>
          <p className="text-slate-400">Sensors: Raspberry Pi + Python Scripts</p>
        </div>
      </div>
    </>
  );
}
