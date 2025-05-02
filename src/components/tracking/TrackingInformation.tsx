
import React from 'react';
import { TrackingOrder } from '@/types/tracking';
import TrackingMap from './TrackingMap';
import OrderDetails from './OrderDetails';
import TrackingProgress from './TrackingProgress';
import TrackingTimeline from './TrackingTimeline';

interface TrackingInformationProps {
  order: TrackingOrder;
}

const TrackingInformation: React.FC<TrackingInformationProps> = ({ order }) => {
  return (
    <section className="bg-white/50 backdrop-blur-sm p-8 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-autop-red">Commande #{order.order_number}</h2>
        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
          {order.status === 'pending' ? 'En attente' : 
           order.status === 'processing' ? 'En préparation' :
           order.status === 'shipped' ? 'En transit' :
           order.status === 'delivered' ? 'Livrée' : 'En traitement'}
        </span>
      </div>

      {/* Carte de localisation */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Localisation Actuelle</h3>
        <TrackingMap order={order} />
      </div>
      
      {/* Détails de la commande */}
      <div className="mb-8">
        <OrderDetails order={order} />
      </div>
      
      {/* Barre de progression */}
      <TrackingProgress order={order} />
      
      {/* Timeline des événements */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium mb-4">Historique de Suivi</h3>
        {order.trackingEvents && <TrackingTimeline events={order.trackingEvents} />}
      </div>
    </section>
  );
};

export default TrackingInformation;
