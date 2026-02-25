import React from "react";

export default function DashboardCard({
  label,
  value,
  danger,
}: {
  label: string;
  value: any;
  danger?: boolean;
}) {
  return (
    <div
      className={`p-5 rounded-xl border shadow-lg ${
        danger
          ? "bg-red-700 border-red-500 text-white"
          : "bg-slate-800 border-slate-700 text-slate-100"
      }`}
    >
      <p className="text-sm text-slate-300">{label}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
