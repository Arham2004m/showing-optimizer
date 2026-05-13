export default function Navbar() {
  return (
    <nav className="bg-brand-card border-b border-brand-border sticky top-0 z-10 shadow-[0_2px_4px_rgba(0,0,0,0.02)] mb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center h-full">
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 rounded-lg bg-brand-primary text-white flex items-center justify-center font-bold text-xl">T</div>
              <span className="font-bold text-[20px] text-brand-text tracking-tight">TourOptima</span>
            </div>
            <div className="hidden md:flex items-center h-full ml-10 space-x-8 text-[14px] font-medium text-brand-text-secondary">
              <a href="#" className="text-brand-text border-b-2 border-brand-primary h-full flex items-center mt-[2px]">Dashboard</a>
              <a href="#" className="hover:text-brand-text transition-colors h-full flex items-center mt-[2px] border-b-2 border-transparent">Schedule</a>
              <a href="#" className="hover:text-brand-text transition-colors h-full flex items-center mt-[2px] border-b-2 border-transparent">Clients</a>
              <a href="#" className="hover:text-brand-text transition-colors h-full flex items-center mt-[2px] border-b-2 border-transparent">Maps</a>
            </div>
          </div>
          <div className="w-9 h-9 rounded-full bg-blue-50 text-brand-primary flex items-center justify-center font-semibold border border-blue-100 cursor-pointer">
            A
          </div>
        </div>
      </div>
    </nav>
  );
}
