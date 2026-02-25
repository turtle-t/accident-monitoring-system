// components/PreviewGrid.tsx
import React from "react";

export default function PreviewGrid(){
  const boxes = new Array(4).fill(0);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {boxes.map((_, i) => (
        <div key={i} className="rounded-xl overflow-hidden bg-slate-900 border border-slate-800 p-4">
          <div className="h-40 bg-gradient-to-br from-[#021827] to-[#04102a] rounded flex items-center justify-center text-slate-400">
            Dashboard preview {i+1}
          </div>
        </div>
      ))}
    </div>
  );
}
