
import React, { useEffect, useRef } from 'react';
import { TrackingOrder } from '@/types/tracking';
import { Card } from '@/components/ui/card';
import { MapPin, Navigation } from 'lucide-react';

interface TrackingMapProps {
  order: TrackingOrder;
}

const TrackingMap: React.FC<TrackingMapProps> = ({ order }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!mapRef.current || !order.currentLocation) return;
    
    // Ici, nous utilisons une image statique de carte pour l'exemple
    // Dans une implémentation réelle, vous utiliseriez une API comme Google Maps ou Mapbox
    const displayStaticMap = () => {
      const container = mapRef.current;
      if (!container) return;
      
      container.innerHTML = `
        <div class="relative w-full h-full flex items-center justify-center bg-slate-100 rounded-lg">
          <div class="p-4 text-center">
            <Navigation className="h-12 w-12 mb-2 mx-auto text-autop-red" />
            <p class="font-medium">Localisation actuelle du véhicule</p>
            <p class="text-sm text-muted-foreground">${order.currentLocation?.address || "Information non disponible"}</p>
          </div>
        </div>
      `;
    };
    
    displayStaticMap();
  }, [order]);
  
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
