
import React, { useEffect, useRef, useState } from 'react';
import { TrackingOrder } from '@/types/tracking';
import { Card } from '@/components/ui/card';
import { MapPin, Navigation, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

interface TrackingMapProps {
  order: TrackingOrder;
}

// Fallback component when map can't be loaded
const FallbackMap = ({ address, lat, lng }: { address: string; lat?: number; lng?: number }) => (
  <Card className="p-4 h-48 flex items-center justify-center bg-slate-50">
    <div className="text-center">
      <Navigation className="h-8 w-8 mb-2 mx-auto text-autop-red" />
      <p className="font-medium">Localisation actuelle du véhicule</p>
      <p className="text-sm text-muted-foreground">{address}</p>
      {lat && lng && (
        <a 
          href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-600 mt-2 inline-block hover:underline"
        >
          Voir sur Google Maps
        </a>
      )}
    </div>
  </Card>
);

const TrackingMap: React.FC<TrackingMapProps> = ({ order }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [isMapboxLoaded, setIsMapboxLoaded] = useState(false);
  
  // Dynamically import Mapbox GL to prevent build issues
  useEffect(() => {
    let mapboxgl: any;
    
    const loadMapbox = async () => {
      try {
        const mapboxModule = await import('mapbox-gl');
        await import('mapbox-gl/dist/mapbox-gl.css');
        mapboxgl = mapboxModule.default;
        setIsMapboxLoaded(true);
      } catch (error) {
        console.error("Failed to load Mapbox:", error);
        setMapError("Failed to load mapping library");
      }
    };
    
    loadMapbox();
  }, []);
  
  // Initialize the map after Mapbox is loaded
  useEffect(() => {
    if (!isMapboxLoaded || !mapRef.current || !order.currentLocation) return;
    
    let mapboxgl: any;
    
    const initializeMap = async () => {
      try {
        const mapboxModule = await import('mapbox-gl');
        mapboxgl = mapboxModule.default;
        
        // Fallback to static display if no mapbox token is provided
        const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
        if (!mapboxToken) {
          setMapError("No Mapbox token found");
          return;
        }
        
        // Initialize Mapbox
        mapboxgl.accessToken = mapboxToken;
        
        if (!mapInstance.current) {
          mapInstance.current = new mapboxgl.Map({
            container: mapRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [order.currentLocation.lng, order.currentLocation.lat],
            zoom: 13
          });
          
          // Add navigation controls
          mapInstance.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
          
          // Handle errors
          mapInstance.current.on('error', (e: any) => {
            console.error("Mapbox error:", e);
            setMapError("Error while displaying the map");
          });
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
        console.error("Error initializing map:", error);
        setMapError("Failed to initialize the map");
      }
    };
    
    initializeMap();
    
    return () => {
      // Cleanup map instance when component unmounts
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [isMapboxLoaded, order.currentLocation]);
  
  // Display location not available message
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
  
  // Display error message if map failed to load
  if (mapError) {
    return (
      <FallbackMap 
        address={order.currentLocation.address} 
        lat={order.currentLocation.lat}
        lng={order.currentLocation.lng}
      />
    );
  }
  
  // Display map
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <div ref={mapRef} className="h-48 w-full"></div>
        
        {/* Direct link to Google Maps */}
        <div className="absolute bottom-8 right-2 z-10">
          <Button
            variant="secondary"
            size="sm"
            className="bg-white shadow-md border"
            onClick={() => {
              const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${order.currentLocation?.lat},${order.currentLocation?.lng}`;
              window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
            }}
          >
            <Navigation className="h-4 w-4 mr-2 text-autop-red" />
            Ouvrir dans Google Maps
          </Button>
        </div>
        
        {/* Mapbox credit attribution - required by Mapbox ToS */}
        <div className="absolute bottom-0 right-0 z-10 text-xs p-1 bg-white/70 rounded-tl">
          <a 
            href="https://www.mapbox.com/about/maps/" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600"
          >
            © Mapbox
          </a>
        </div>
      </div>
    </Card>
  );
};

export default TrackingMap;
