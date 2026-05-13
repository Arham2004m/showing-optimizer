export default function ItineraryPlaceholder() {
  return (
    <div className="h-48 bg-gray-50 border border-brand-border rounded-md flex items-center justify-center text-brand-text-secondary">
      <div className="flex flex-col items-center gap-2">
        <svg className="w-8 h-8 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
        <span className="text-[14px] font-medium">Optimized schedule will appear here</span>
      </div>
    </div>
  );
}
