"use client";

import dynamic from 'next/dynamic';

const ItineraryMap = dynamic(() => import('./ItineraryMap'), { ssr: false });

export default function ItineraryMapWrapper({ stops }: { stops: any[] }) {
  return <ItineraryMap stops={stops} />;
}
