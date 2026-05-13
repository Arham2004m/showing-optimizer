import { useState } from "react";

export default function PropertyInput({ onAdd }: { onAdd: (props: string[]) => void }) {
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (!text.trim()) return;
    const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    if (lines.length > 0) {
      onAdd(lines);
      setText("");
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <textarea 
        placeholder="Paste property addresses here (one per line)..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full border border-brand-border rounded-md px-3 py-2 text-[14px] h-32 resize-none focus:outline-none focus:border-brand-primary text-brand-text"
      />
      <button 
        onClick={handleAdd}
        className="self-start text-brand-primary text-[14px] font-medium border border-brand-primary px-4 py-2 rounded-md hover:bg-blue-50 transition-colors cursor-pointer"
      >
        Add Properties
      </button>
    </div>
  );
}
