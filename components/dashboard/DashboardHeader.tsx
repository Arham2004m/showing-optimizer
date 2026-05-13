export default function DashboardHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-[32px] font-bold text-brand-text tracking-tight">Upcoming Tours</h1>
        <p className="text-[16px] text-brand-text-secondary mt-1">Manage your scheduled property showings.</p>
      </div>
      <button className="hidden sm:block bg-brand-primary hover:bg-blue-600 text-white font-semibold py-2.5 px-5 rounded-lg shadow-[0_2px_4px_rgba(0,0,0,0.05)] transition-all cursor-pointer">
        Create New Tour
      </button>
    </div>
  );
}
