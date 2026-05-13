import DashboardHeader from "../components/dashboard/DashboardHeader";
import TourCard from "../components/dashboard/TourCard";
import Navbar from "../components/dashboard/Navbar";
import { mockTours } from "../lib/mock-data";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pb-20 sm:pb-12">
        <DashboardHeader />
        
        <div className="flex flex-col gap-4 mt-8">
          {mockTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </main>

      {/* Mobile FAB */}
      <div className="fixed bottom-6 right-6 sm:hidden">
        <button className="bg-brand-primary text-white w-14 h-14 rounded-full flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.2)] hover:opacity-90 transition-colors cursor-pointer">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
        </button>
      </div>
    </div>
  );
}
