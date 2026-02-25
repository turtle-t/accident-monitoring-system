// components/FeatureCard.tsx
import React from "react";

export default function FeatureCard({ title, desc, icon }: { title: string; desc: string; icon?: string }) {
  return (
    <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 shadow">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center text-xl shadow">{icon ?? "●"}</div>
        <div>
          <div className="font-semibold text-lg">{title}</div>
          <div className="text-sm text-slate-300 mt-1">{desc}</div>
        </div>
      </div>
    </div>
  );
}
