"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveTourAction } from "../../actions/saveTour";
import dynamic from "next/dynamic";
import Navbar from "../../../components/dashboard/Navbar";
import TourDetailsForm from "../../../components/builder/TourDetailsForm";
import PropertyInput from "../../../components/builder/PropertyInput";
import PropertyList from "../../../components/builder/PropertyList";
import RouteMapPlaceholder from "../../../components/builder/RouteMapPlaceholder";
import OptimizedItinerary from "../../../components/builder/OptimizedItinerary";

// Dynamically import RouteMap so it only loads on the client
const RouteMap = dynamic(() => import("../../../components/builder/RouteMap"), { 
  ssr: false, 
  loading: () => <RouteMapPlaceholder /> 
});

export default function TourBuilderPage() {
  const [details, setDetails] = useState({
    startAddress: "",
    date: "",
    startTime: "",
    endTime: ""
  });
  const [properties, setProperties] = useState<string[]>([]);
  const [itinerary, setItinerary] = useState<any[]>([]);
  const [routeGeometry, setRouteGeometry] = useState<[number, number][]>([]);
  const [waypoints, setWaypoints] = useState<[number, number][]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const handleDetailsChange = (field: string, value: string) => {
    setDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleAddProperties = (newProps: string[]) => {
    setProperties(prev => [...prev, ...newProps]);
  };

  const handleRemoveProperty = (index: number) => {
    setProperties(prev => prev.filter((_, i) => i !== index));
  };

  const handleOptimize = async () => {
    if (!details.startAddress || properties.length === 0) {
      alert("Please enter a starting address and at least one property.");
      return;
    }
    
    setLoading(true);
    try {
      const res = await fetch("/api/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startAddress: details.startAddress,
          startTime: details.startTime,
          properties: properties
        })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setItinerary(data.itinerary);
      setRouteGeometry(data.geometry);
      setWaypoints(data.waypoints);
    } catch (err: any) {
      console.error(err);
      alert("Optimization failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFinalize = async () => {
    if (itinerary.length === 0) return;
    setSaving(true);
    try {
      const res = await saveTourAction(details, itinerary, waypoints);
      if (!res.success) throw new Error(res.error);

      // Download ICS file
      if (res.icsData) {
        const blob = new Blob([res.icsData], { type: 'text/calendar;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `tour-${res.tourId}.ics`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      // Small delay to ensure the download starts before navigation
      await new Promise(resolve => setTimeout(resolve, 500));

      // Redirect to itinerary page
      router.push(`/tour/${res.tourId}`);
    } catch (err: any) {
      console.error(err);
      alert("Failed to save tour: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto px-6 w-full pb-12">
        <div className="mb-6">
          <h1 className="text-[32px] font-bold text-brand-text tracking-tight">Plan New Tour</h1>
          <p className="text-[16px] text-brand-text-secondary mt-1">Enter your availability and properties to optimize the route.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Panel: Input Form */}
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            <TourDetailsForm details={details} onChange={handleDetailsChange} />
            
            <div className="bg-brand-card border border-brand-border rounded-lg p-6 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
              <h2 className="text-[18px] font-semibold text-brand-text mb-4">Properties to Show</h2>
              <PropertyInput onAdd={handleAddProperties} />
              <div className="mt-6">
                <PropertyList properties={properties} onRemove={handleRemoveProperty} />
              </div>
            </div>
          </div>

          {/* Right Panel: Map / Results */}
          <div className="w-full lg:w-2/3 flex flex-col gap-6">
            <div className="bg-brand-card border border-brand-border rounded-lg p-6 shadow-[0_2px_4px_rgba(0,0,0,0.02)] flex-1 flex flex-col min-h-[500px]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-[18px] font-semibold text-brand-text">Route Overview</h2>
                <div className="flex gap-2">
                  <button 
                    onClick={handleOptimize}
                    disabled={loading || saving}
                    className="bg-brand-primary text-white px-5 py-2 rounded-md font-medium hover:opacity-90 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {loading ? "Optimizing..." : "Optimize Route"}
                  </button>
                  {itinerary.length > 0 && (
                    <button 
                      onClick={handleFinalize}
                      disabled={saving}
                      className="bg-brand-accent text-white px-5 py-2 rounded-md font-medium hover:opacity-90 transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[18px]">event</span>
                      {saving ? "Saving..." : "Finalize Tour"}
                    </button>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-4 flex-1">
                {routeGeometry.length > 0 ? (
                  <RouteMap geometry={routeGeometry} waypoints={waypoints} />
                ) : (
                  <RouteMapPlaceholder />
                )}
                <OptimizedItinerary itinerary={itinerary} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
