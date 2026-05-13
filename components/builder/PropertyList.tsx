export default function PropertyList({ 
  properties, 
  onRemove 
}: { 
  properties: string[], 
  onRemove: (idx: number) => void 
}) {
  if (properties.length === 0) {
    return (
      <div className="text-center py-6 border border-dashed border-brand-border rounded-md text-brand-text-secondary text-[14px]">
        No properties added yet.
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {properties.map((prop, idx) => (
        <li key={idx} className="flex justify-between items-center bg-gray-50 border border-brand-border rounded-md px-3 py-2">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <span className="w-6 h-6 rounded-full bg-brand-primary text-white text-[12px] flex items-center justify-center shrink-0 font-semibold">
              {idx + 1}
            </span>
            <span className="text-[14px] text-brand-text truncate">{prop}</span>
          </div>
          <button 
            onClick={() => onRemove(idx)}
            className="text-gray-400 hover:text-red-500 transition-colors p-1 shrink-0 ml-2 cursor-pointer"
            title="Remove property"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </li>
      ))}
    </ul>
  );
}
