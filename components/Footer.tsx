// components/Footer.tsx
import React from "react";

export default function Footer(){
  return (
    <footer className="mt-12 text-sm text-slate-400">
      <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>© {new Date().getFullYear()} TAAP Innovators 🐢 — Accident Detection System</div>
        <div className="flex items-center gap-4">
          <a className="text-slate-300 hover:underline" href="https://github.com/your-repo">GitHub</a>
          <a className="text-slate-300 hover:underline" href="#contact">Contact</a>
        </div>
      </div>
    </footer>
  );
}
