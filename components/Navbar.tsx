import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-slate-900 border border-slate-800 px-6 py-3 rounded-xl">
      <div className="text-xl font-bold">TAAP Innovators</div>

      <div className="flex gap-6">
        <Link className="hover:text-indigo-400" href="/">Home</Link>
        <Link className="hover:text-indigo-400" href="/dashboard">Dashboard</Link>
        <Link className="hover:text-indigo-400" href="/history">History</Link>
        <Link className="hover:text-indigo-400" href="/settings">Settings</Link>
      </div>
    </nav>
  );
}
