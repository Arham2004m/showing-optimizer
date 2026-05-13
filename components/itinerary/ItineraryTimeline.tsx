import Link from 'next/link';

export default function ItineraryTimeline({ stops }: { stops: any[] }) {
  return (
    <div className="relative mb-8">
      {/* Vertical Line */}
      <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-brand-primary rounded-full z-0"></div>
      
      <div className="flex flex-col gap-6 relative z-10">
        {stops.map((stop, index) => {
          let formattedTime = "";
          if (stop.scheduled_time) {
            const date = new Date(stop.scheduled_time);
            formattedTime = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
          }

          return (
            <div key={stop.id} className="flex gap-4 items-start group">
              <div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center text-[12px] font-medium leading-[1] tracking-[0.05em] flex-shrink-0 border-2 border-brand-bg mt-1 shadow-sm">
                {index + 1}
              </div>
              <div className="bg-brand-card border border-brand-border rounded-lg p-4 flex-grow shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                  <h2 className="text-[20px] font-semibold leading-[1.4] tracking-[-0.01em] text-brand-text">
                    {stop.address}
                  </h2>
                  {formattedTime && (
                    <span className="bg-blue-100 text-brand-primary text-[12px] font-medium leading-[1] tracking-[0.05em] px-2 py-1 rounded-full whitespace-nowrap">
                      {formattedTime}
                    </span>
                  )}
                </div>
                {stop.notes && (
                  <p className="text-[14px] text-brand-text-secondary mt-1 mb-2">
                    {stop.notes}
                  </p>
                )}
                <div className="flex gap-4 mt-4 border-t border-brand-border pt-3">
                  {stop.listing_link ? (
                    <Link href={stop.listing_link} target="_blank" className="text-brand-primary hover:text-blue-800 text-[14px] font-semibold leading-[1] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">visibility</span> View Listing
                    </Link>
                  ) : (
                    <span className="text-brand-text-secondary opacity-50 cursor-not-allowed text-[14px] font-semibold leading-[1] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">visibility</span> View Listing
                    </span>
                  )}
                  <Link href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(stop.address)}`} target="_blank" className="text-brand-primary hover:text-blue-800 text-[14px] font-semibold leading-[1] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">directions</span> Get Directions
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
