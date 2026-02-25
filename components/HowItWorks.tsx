// components/HowItWorks.tsx
import React from "react";

export default function HowItWorks(){
  return (
    <section id="how" className="mt-12">
      <h2 className="text-2xl font-semibold mb-6">How it works</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-700">
          <div className="text-sm text-slate-400">1. Sensors</div>
          <div className="mt-2 font-semibold">Accelerometer, MQ-3, Seatbelt switch</div>
          <div className="mt-2 text-sm text-slate-300">Hardware reads real-time signals and triggers detection logic.</div>
        </div>

        <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-700">
          <div className="text-sm text-slate-400">2. Pi & Database</div>
          <div className="mt-2 font-semibold">Raspberry Pi → Neon (Postgres)</div>
          <div className="mt-2 text-sm text-slate-300">Pi inserts sensor snapshots into the Neon DB for persistence.</div>
        </div>

        <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-700">
          <div className="text-sm text-slate-400">3. Live Dashboard</div>
          <div className="mt-2 font-semibold">Next.js Dashboard</div>
          <div className="mt-2 text-sm text-slate-300">Frontend reads latest DB row and shows alerts & history in real time.</div>
        </div>
      </div>
    </section>
  );
}
