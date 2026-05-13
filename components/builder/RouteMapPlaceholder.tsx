export default function RouteMapPlaceholder() {
  return (
    <div className="flex-1 min-h-[300px] bg-gray-50 border border-brand-border rounded-md flex items-center justify-center text-brand-text-secondary">
      <div className="flex flex-col items-center gap-2">
        <svg className="w-8 h-8 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
        <span className="text-[14px] font-medium">Map will appear here</span>
      </div>
    </div>
  );
}
