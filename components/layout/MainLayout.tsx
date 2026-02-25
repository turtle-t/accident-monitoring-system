import Sidebar from "./Sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main page content */}
      <main className="ml-64 p-8 w-full">{children}</main>
    </div>
  );
}
