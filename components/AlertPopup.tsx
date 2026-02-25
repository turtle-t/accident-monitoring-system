export default function AlertPopup() {
  return (
    <div className="fixed top-4 right-4 bg-red-700 border border-red-500 text-white px-6 py-4 rounded-xl shadow-xl animate-pulse z-50">
      <p className="font-bold text-xl">🚨 ACCIDENT DETECTED</p>
      <p className="text-sm opacity-90">Immediate attention required</p>
    </div>
  );
}
