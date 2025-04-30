
import React from 'react';
import { TrackingEvent } from '@/types/tracking';
import { Check, Navigation, Package, MapPin } from 'lucide-react';

interface TrackingTimelineProps {
  events: TrackingEvent[];
}

const TrackingTimeline: React.FC<TrackingTimelineProps> = ({ events }) => {
  // Fonction pour obtenir l'icône appropriée
  const getEventIcon = (event: TrackingEvent) => {
    switch (event.status) {
      case 'completed':
        return <Check className="h-4 w-4 text-green-600" />;
      case 'in-progress':
        return <Navigation className="h-4 w-4 text-blue-600" />;
      default:
        return <Package className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div key={event.id} className="flex items-start gap-4">
          <div className={`rounded-full p-2 ${
            event.status === 'completed' ? 'bg-green-100' :
            event.status === 'in-progress' ? 'bg-blue-100' : 'bg-gray-100'
          }`}>
            {getEventIcon(event)}
          </div>
          <div>
            <p className="font-medium">{event.title}</p>
            <p className="text-sm text-muted-foreground">{event.date} - {event.description}</p>
            {event.location && (
              <div className="flex items-center mt-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3 mr-1" />
                {event.location.address}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrackingTimeline;
