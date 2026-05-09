"use client";

import { useEffect, useRef } from 'react';
import Script from 'next/script';

interface GoogleMapProps {
  config?: any; // Keeping for compatibility, but we'll use position from it
}

export default function GoogleMap({ config }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      // @ts-ignore
      const { Map } = await google.maps.importLibrary("maps");
      // @ts-ignore
      const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

      const position = config?.locations?.[0]?.coords || { lat: 50.2826796, lng: 28.5945396 };
      const title = config?.locations?.[0]?.title || 'Вітрила Життя';

      const map = new Map(mapRef.current as HTMLElement, {
        zoom: config?.mapOptions?.zoom || 16,
        center: position,
        mapId: 'DEMO_MAP_ID', // Використовуємо DEMO_MAP_ID для Advanced Markers
        disableDefaultUI: false,
        clickableIcons: true,
        scrollwheel: true,
      });

      // Додаємо сучасний маркер
      new AdvancedMarkerElement({
        map,
        position: position,
        title: title,
      });
    };

    // Перевіряємо чи завантажився скрипт
    if (typeof window !== 'undefined' && (window as any).google) {
      initMap();
    } else {
      // Якщо скрипт ще не завантажився, чекаємо події від Script компонента
      window.addEventListener('google-maps-loaded', initMap);
    }

    return () => window.removeEventListener('google-maps-loaded', initMap);
  }, [config]);

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=maps,marker&v=beta`}
        strategy="afterInteractive"
        onLoad={() => {
          window.dispatchEvent(new Event('google-maps-loaded'));
        }}
      />
      <div 
        ref={mapRef} 
        className="w-full h-full min-h-[300px] rounded-3xl overflow-hidden shadow-inner bg-slate-100 dark:bg-slate-800"
      />
    </>
  );
}
