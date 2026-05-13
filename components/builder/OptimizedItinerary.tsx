export default function OptimizedItinerary({ itinerary }: { itinerary: any[] }) {
  if (!itinerary || itinerary.length === 0) {
    return (
      <div className="h-48 bg-gray-50 border border-brand-border rounded-md flex items-center justify-center text-brand-text-secondary">
        <span className="text-[14px] font-medium">Optimized schedule will appear here</span>
      </div>
    );
  }

  return (
    <div className="bg-white border border-brand-border rounded-md p-4 max-h-[400px] overflow-y-auto">
      <div className="relative border-l-2 border-brand-border ml-3 mt-2 mb-2">
        {itinerary.map((stop, idx) => (
          <div key={idx} className="mb-6 ml-6 relative">
            <span className="absolute -left-[35px] top-1 w-4 h-4 rounded-full bg-brand-primary border-4 border-white shadow-sm" />
            <div className="font-semibold text-brand-text text-[15px]">{stop.arrivalTime} {stop.isStart ? '(Start)' : ''}</div>
            <div className="text-[14px] text-brand-text-secondary mt-1">{stop.address}</div>
            {!stop.isStart && (
              <div className="text-[13px] text-gray-500 mt-1">Showing until {stop.departureTime}</div>
            )}
            {stop.travelToNext && (
              <div className="mt-3 inline-flex items-center text-[12px] font-medium text-brand-accent bg-[#86f2e4]/20 px-2 py-1 rounded-md">
                <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {stop.travelToNext}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
