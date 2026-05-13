import { Tour } from "../../types/tour";

export default function TourCard({ tour }: { tour: Tour }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-[#86f2e4]/30 text-brand-accent border-[#86f2e4]";
      case "completed":
        return "bg-gray-100 text-gray-700 border-gray-200";
      case "draft":
        return "bg-[#ffdad6] text-[#93000a] border-[#ffdad6]";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getDisplayDate = (dateStr: string) => {
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    if (dateStr === today) return "Today";
    if (dateStr === tomorrow) return "Tomorrow";
    return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(new Date(dateStr));
  };

  return (
    <div className="bg-brand-card border border-brand-border rounded-lg p-6 shadow-[0_2px_4px_rgba(0,0,0,0.05)] hover:bg-[#F3F4F6] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6">
      
      <div className="flex-1">
        <h3 className="font-semibold text-[18px] text-brand-text mb-2">
          {getDisplayDate(tour.tour_date)}, {tour.start_time} - {tour.end_time}
        </h3>
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 sm:gap-6 text-[14px] text-brand-text-secondary">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            <span className="font-medium text-brand-text">{tour.client_name}</span>
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            <span>{tour.location_summary}</span>
          </div>
          <div className="flex items-center">
             <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            <span>{tour.stop_count} Stops</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between md:justify-end gap-6 md:w-auto mt-4 md:mt-0">
        <span className={`px-2.5 py-1 rounded-full text-[12px] font-semibold border ${getStatusColor(tour.status)} uppercase tracking-wider`}>
          {tour.status}
        </span>
        
        <div className="flex gap-3">
          <button className="px-4 py-2 text-[14px] font-medium text-brand-text-secondary bg-brand-card border border-brand-border rounded-md hover:bg-gray-50 transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.05)] cursor-pointer">
            Edit
          </button>
          <button className="px-4 py-2 text-[14px] font-medium text-white bg-brand-primary border border-brand-primary rounded-md hover:opacity-90 transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.05)] cursor-pointer">
            View
          </button>
        </div>
      </div>

    </div>
  );
}
