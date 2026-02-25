// app/layout.tsx
import "./globals.css";
import React from "react";

export const metadata = {
  title: "Accident Detection • TAAP Innovators 🐢",
  description: "Real-time accident detection, alcohol & seatbelt monitoring — Raspberry Pi + Neon + Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-[#051025] to-slate-900 text-slate-100 antialiased">
          <div className="max-w-7xl mx-auto px-6 py-8">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
