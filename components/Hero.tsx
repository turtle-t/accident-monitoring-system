// components/Hero.tsx
import React from "react";

export default function Hero(){
  return (
    <header className="relative rounded-xl overflow-hidden p-8 bg-gradient-to-br from-[#021021] via-[#07122b] to-[#00121a] border border-slate-800 shadow-xl">
      <div className="flex flex-col lg:flex-row items-start gap-6">
        <div className="flex-1">
          <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">
            Accident Detection & Safety Monitoring
          </h1>
          <p className="mt-4 text-slate-300 max-w-xl">
            Raspberry Pi based system for real-time accident detection, alcohol & seatbelt monitoring,
            live alerts and emergency notifications. Built for fast response and reliability.
          </p>

          <div className="mt-6 flex gap-3">
            <a href="dashboard" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 shadow">
              Get started
            </a>
            <a href="#how" className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-slate-700 text-slate-200 hover:bg-slate-800">
              Learn more
            </a>
          </div>

          <div className="mt-6 text-sm text-slate-400">
            <span className="inline-flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              Live demo ready — works with Raspberry Pi and Neon DB
            </span>
          </div>
        </div>

        <div className="w-full lg:w-96 bg-gradient-to-tl from-[#021827]/40 to-[#082038]/30 rounded-lg p-4 border border-slate-800">
          <div className="rounded-md overflow-hidden bg-[#011827] border border-slate-800 p-3">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-xs text-slate-400">LIVE STATUS</div>
                <div className="text-sm font-medium">Vehicle • TAAP Innovators 🐢</div>
              </div>
              <div className="text-sm text-slate-400">ID: #TAAP-01</div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-900 rounded">
                <div className="text-xs text-slate-400">Impact</div>
                <div className="text-xl font-semibold">—</div>
              </div>
              <div className="p-3 bg-slate-900 rounded">
                <div className="text-xs text-slate-400">Alcohol</div>
                <div className="text-xl font-semibold">—</div>
              </div>
              <div className="p-3 bg-slate-900 rounded">
                <div className="text-xs text-slate-400">Seatbelt</div>
                <div className="text-xl font-semibold">—</div>
              </div>
              <div className="p-3 bg-slate-900 rounded">
                <div className="text-xs text-slate-400">Accident</div>
                <div className="text-xl font-semibold text-emerald-400">NO</div>
              </div>
            </div>

            <div className="mt-3 text-xs text-slate-500">Demo preview of live dashboard</div>
          </div>
        </div>
      </div>
    </header>
  );
}
