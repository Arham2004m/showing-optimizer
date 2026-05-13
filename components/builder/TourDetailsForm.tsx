export default function TourDetailsForm({ 
  details, 
  onChange 
}: { 
  details: any, 
  onChange: (f: string, v: string) => void 
}) {
  return (
    <div className="bg-brand-card border border-brand-border rounded-lg p-6 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
      <h2 className="text-[18px] font-semibold text-brand-text mb-4">Tour Details</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-[14px] font-medium text-brand-text-secondary mb-1">Starting Address</label>
          <input 
            type="text" 
            placeholder="e.g. 123 Main St, Office" 
            value={details.startAddress}
            onChange={(e) => onChange('startAddress', e.target.value)}
            className="w-full border border-brand-border rounded-md px-3 py-2 text-[14px] focus:outline-none focus:border-brand-primary"
          />
        </div>
        <div>
          <label className="block text-[14px] font-medium text-brand-text-secondary mb-1">Date</label>
          <input 
            type="date" 
            value={details.date}
            onChange={(e) => onChange('date', e.target.value)}
            className="w-full border border-brand-border rounded-md px-3 py-2 text-[14px] focus:outline-none focus:border-brand-primary"
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-[14px] font-medium text-brand-text-secondary mb-1">Start Time</label>
            <input 
              type="time" 
              value={details.startTime}
              onChange={(e) => onChange('startTime', e.target.value)}
              className="w-full border border-brand-border rounded-md px-3 py-2 text-[14px] focus:outline-none focus:border-brand-primary"
            />
          </div>
          <div className="flex-1">
            <label className="block text-[14px] font-medium text-brand-text-secondary mb-1">End Time</label>
            <input 
              type="time" 
              value={details.endTime}
              onChange={(e) => onChange('endTime', e.target.value)}
              className="w-full border border-brand-border rounded-md px-3 py-2 text-[14px] focus:outline-none focus:border-brand-primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
