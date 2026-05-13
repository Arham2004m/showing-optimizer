import { createServerSupabaseClient } from '@/lib/supabase';
import ItineraryTimeline from '@/components/itinerary/ItineraryTimeline';
import ItineraryMapWrapper from '@/components/itinerary/ItineraryMapWrapper';
import Link from 'next/link';

export default async function TourItineraryPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  const supabase = createServerSupabaseClient();
  
  // Fetch tour
  const { data: tour, error: tourError } = await supabase
    .from('tours')
    .select('*')
    .eq('id', id)
    .single();

  if (tourError || !tour) {
    console.error("Tour fetch error:", tourError);
    return (
      <div className="bg-brand-bg text-brand-text min-h-screen flex items-center justify-center">
        <h1 className="text-[24px] font-bold">Tour not found</h1>
      </div>
    );
  }

  // Fetch stops
  const { data: stops, error: stopsError } = await supabase
    .from('tour_stops')
    .select('*')
    .eq('tour_id', id)
    .order('stop_order', { ascending: true });

  const dateStr = tour.tour_date ? new Date(tour.tour_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Unknown Date';
  const headerTitle = `${dateStr} • Tour Itinerary`;

  return (
    <div className="bg-brand-bg text-brand-text min-h-screen flex flex-col antialiased">
      {/* TopNavBar */}
      <header className="bg-brand-bg sticky top-0 border-b border-brand-border z-50">
        <div className="flex justify-between items-center w-full px-4 md:px-10 h-16 max-w-[1440px] mx-auto">
          <div className="text-[20px] font-semibold leading-[1.4] tracking-[-0.01em] text-brand-text">
            {headerTitle}
          </div>
          <div className="flex items-center gap-2">
            <button
              aria-label="Share"
              className="text-brand-text-secondary hover:text-brand-primary hover:opacity-80 transition-opacity p-2 rounded-full flex items-center justify-center"
            >
              <span className="material-symbols-outlined">share</span>
            </button>
            <button
              aria-label="Print"
              className="text-brand-text-secondary hover:text-brand-primary hover:opacity-80 transition-opacity p-2 rounded-full flex items-center justify-center"
            >
              <span className="material-symbols-outlined">print</span>
            </button>
            <img
              alt="Agent Avatar"
              className="w-8 h-8 rounded-full border border-brand-border object-cover ml-2"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHumJ3UAuAycQPxyGIMKD1m3kd_upJeXbgjfrAS8-ybMauALnOKEbOM0YpDdT6BUqLwrOXPhzkHatq0BVwFU9umnR4Sj_Tm41ZWRG3grGRMlRWELl8hmdGyRKoKTZw7lORpkUTeGoz9uApX9jS4V9gS8Rx3GZZLGoRh5TDUBR6tRlKOX02dNWJT7LL3aEfihrLOISYqTRiGo61EPVWDa443vqitLmMrfpFHssVxi0J-k1QlD0D12mELkeR02itwIAR63-GXVo5j54"
            />
          </div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow w-full max-w-[800px] mx-auto px-4 md:px-10 py-8">
        <div className="mb-8">
          <h1 className="text-[32px] font-bold leading-[1.2] tracking-[-0.02em] text-brand-text mb-2">
            Showing Itinerary
          </h1>
          <p className="text-[16px] leading-[1.5] text-brand-text-secondary">
            Here is the schedule for our property tour today. We will visit {stops?.length || 0} locations.
          </p>
        </div>

        {/* Timeline Section */}
        {stops && stops.length > 0 && <ItineraryTimeline stops={stops} />}

        {/* Map Section */}
        {stops && stops.length > 0 && <ItineraryMapWrapper stops={stops} />}
      </main>

      {/* Footer */}
      <footer className="bg-brand-card border-t border-brand-border mt-auto">
        <div className="w-full py-8 px-4 md:px-10 flex flex-col items-center gap-2 text-center">
          <div className="text-[14px] font-bold leading-[1] text-brand-text mb-2">
            Property tour powered by Showing Optimizer.
          </div>
          <button className="bg-brand-primary text-white text-[14px] font-semibold leading-[1] h-12 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600 hover:shadow-md transition-all mb-4">
            <span className="material-symbols-outlined">share</span>
            Share Itinerary
          </button>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="#" className="text-brand-text-secondary hover:text-brand-accent transition-colors text-[14px] leading-[1.5]">
              View Full Map
            </Link>
            <span className="text-brand-border">•</span>
            <Link href="#" className="text-brand-text-secondary hover:text-brand-accent transition-colors text-[14px] leading-[1.5]">
              Agent Profile
            </Link>
            <span className="text-brand-border">•</span>
            <Link href="#" className="text-brand-text-secondary hover:text-brand-accent transition-colors text-[14px] leading-[1.5]">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
