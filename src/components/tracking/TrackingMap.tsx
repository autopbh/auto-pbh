
import React, { useEffect, useRef } from 'react';
import { TrackingOrder } from '@/types/tracking';
import { Card } from '@/components/ui/card';
import { MapPin, Navigation } from 'lucide-react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-css.css';

interface TrackingMapProps {
  order: TrackingOrder;
}

// Composant pour afficher un message quand la carte ne peut pas être chargée
const FallbackMap = ({ address }: { address: string }) => (
  <Card className="p-4 h-48 flex items-center justify-center bg-slate-50">
    <div className="text-center">
      <Navigation className="h-8 w-8 mb-2 mx-auto text-autop-red" />
      <p className="font-medium">Localisation actuelle du véhicule</p>
      <p className="text-sm text-muted-foreground">{address}</p>
    </div>
  </Card>
);

const TrackingMap: React.FC<TrackingMapProps> = ({ order }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<mapboxgl.Map | null>(null);
  
  useEffect(() => {
    if (!mapRef.current || !order.currentLocation) return;

    // Fallback to static display if no mapbox token is provided
    if (!import.meta.env.VITE_MAPBOX_TOKEN) {
      renderStaticMap();
      return;
    }
    
    try {
      // Initialize Mapbox
      mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN as string;
      
      if (!mapInstance.current) {
        mapInstance.current = new mapboxgl.Map({
          container: mapRef.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [order.currentLocation.lng, order.currentLocation.lat],
          zoom: 13
        });
        
        // Add navigation controls
        mapInstance.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      } else {
        // Update map center if it already exists
        mapInstance.current.setCenter([order.currentLocation.lng, order.currentLocation.lat]);
      }
      
      // Clear existing markers
      const existingMarkers = mapRef.current.querySelectorAll('.mapboxgl-marker');
      existingMarkers.forEach(marker => marker.remove());
      
      // Add marker for current location
      const markerElement = document.createElement('div');
      markerElement.className = 'flex items-center justify-center';
      markerElement.innerHTML = `<div class="text-autop-red"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="10" r="3"/><path d="M12 2a8 8 0 0 0-8 8c0 1.892.402 3.13 1.5 4.5L12 22l6.5-7.5c1.098-1.37 1.5-2.608 1.5-4.5a8 8 0 0 0-8-8z"/></svg></div>`;
      
      new mapboxgl.Marker(markerElement)
        .setLngLat([order.currentLocation.lng, order.currentLocation.lat])
        .addTo(mapInstance.current);
      
      // Add popup with location information
      new mapboxgl.Popup()
        .setLngLat([order.currentLocation.lng, order.currentLocation.lat])
        .setHTML(`<p class="font-medium">${order.currentLocation.address}</p>`)
        .addTo(mapInstance.current);
        
    } catch (error) {
      console.error("Erreur lors du chargement de la carte:", error);
      renderStaticMap();
    }
    
    return () => {
      // Cleanup map instance when component unmounts
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [order.currentLocation]);
  
  // Afficher une carte statique en cas d'erreur
  const renderStaticMap = () => {
    if (!mapRef.current) return;
    
    const container = mapRef.current;
    container.innerHTML = `
      <div class="relative w-full h-full flex items-center justify-center bg-slate-100 rounded-lg">
        <div class="p-4 text-center">
          <a href="https://www.google.com/maps/search/?api=1&query=${order.currentLocation?.lat},${order.currentLocation?.lng}" 
             target="_blank" 
             rel="noopener noreferrer"
             class="block p-2 rounded hover:bg-slate-200 transition-colors">
            <Navigation class="h-12 w-12 mb-2 mx-auto text-autop-red" />
            <p class="font-medium">Localisation actuelle du véhicule</p>
            <p class="text-sm text-muted-foreground">${order.currentLocation?.address || "Information non disponible"}</p>
            <p class="text-xs text-blue-600 mt-2 underline">Voir sur Google Maps</p>
          </a>
        </div>
      </div>
    `;
  };
  
  if (!order.currentLocation) {
    return (
      <Card className="p-4 h-48 flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <MapPin className="h-8 w-8 mb-2 mx-auto text-muted-foreground" />
          <p className="text-muted-foreground">Localisation non disponible</p>
        </div>
      </Card>
    );
  }
  
  return (
    <Card className="overflow-hidden">
      <div ref={mapRef} className="h-48 w-full"></div>
    </Card>
  );
};

export default TrackingMap;
