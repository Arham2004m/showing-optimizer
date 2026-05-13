"use client";

export default function ShareButton({ title }: { title?: string }) {
  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: title || 'Tour Itinerary',
          url: url
        });
      } catch (err) {
        // Ignore abort errors
      }
    } else {
      await navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <button 
      onClick={handleShare}
      className="bg-brand-primary text-white text-[14px] font-semibold leading-[1] h-12 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600 hover:shadow-md transition-all mb-4"
    >
      <span className="material-symbols-outlined">share</span>
      Share Itinerary
    </button>
  );
}
