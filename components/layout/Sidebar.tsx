import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: "📊" },
  { name: "History", href: "/history", icon: "📜" },
  { name: "Settings", href: "/settings", icon: "⚙️" },
  { name: "Home", href: "/", icon: "🏠" },
];

export default function Sidebar() {
  const path = usePathname();

  return (
    <aside className="w-64 h-screen bg-slate-900 border-r border-slate-800 p-6 fixed left-0 top-0">
      <h1 className="text-2xl font-bold mb-8">TAAP Innovators</h1>

      <nav className="flex flex-col gap-4">
        {navItems.map((item) => {
          const active = path.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
                active
                  ? "bg-indigo-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
