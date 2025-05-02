
import React from 'react';
import { TrackingOrder } from '@/types/tracking';
import { Check, TruckIcon, Package, ClipboardCheck } from 'lucide-react';

interface TrackingProgressProps {
  order: TrackingOrder;
}

const TrackingProgress: React.FC<TrackingProgressProps> = ({ order }) => {
  return (
    <div className="mb-8">
      <div className="relative">
        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div 
            className="bg-autop-red h-2 rounded-full" 
            style={{ width: `${order.trackingProgress || 0}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between mt-4">
          <div className="flex flex-col items-center text-center">
            <div className={`rounded-full p-2 mb-2 ${
              order.trackingStatus === 'preparation' || 
              order.trackingStatus === 'transport' || 
              order.trackingStatus === 'delivery' || 
              order.trackingStatus === 'reception' ? 'bg-autop-red' : 'bg-gray-200'
            }`}>
              <Check className={`h-4 w-4 ${
                order.trackingStatus === 'preparation' || 
                order.trackingStatus === 'transport' || 
                order.trackingStatus === 'delivery' || 
                order.trackingStatus === 'reception' ? 'text-white' : 'text-gray-400'
              }`} />
            </div>
            <span className="text-sm font-medium">Préparation</span>
            <span className="text-xs text-muted-foreground">{
              order.trackingStatus === 'preparation' || 
              order.trackingStatus === 'transport' || 
              order.trackingStatus === 'delivery' || 
              order.trackingStatus === 'reception' ? 'Terminé' : 'À venir'
            }</span>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className={`rounded-full p-2 mb-2 ${
              order.trackingStatus === 'transport' || 
              order.trackingStatus === 'delivery' || 
              order.trackingStatus === 'reception' ? 'bg-autop-red' : 'bg-gray-200'
            }`}>
              <TruckIcon className={`h-4 w-4 ${
                order.trackingStatus === 'transport' || 
                order.trackingStatus === 'delivery' || 
                order.trackingStatus === 'reception' ? 'text-white' : 'text-gray-400'
              }`} />
            </div>
            <span className="text-sm font-medium">Transport</span>
            <span className="text-xs text-muted-foreground">{
              order.trackingStatus === 'transport' ? 'En cours' : 
              order.trackingStatus === 'delivery' || order.trackingStatus === 'reception' ? 'Terminé' : 'À venir'
            }</span>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className={`rounded-full p-2 mb-2 ${
              order.trackingStatus === 'delivery' || 
              order.trackingStatus === 'reception' ? 'bg-autop-red' : 'bg-gray-200'
            }`}>
              <Package className={`h-4 w-4 ${
                order.trackingStatus === 'delivery' || 
                order.trackingStatus === 'reception' ? 'text-white' : 'text-gray-400'
              }`} />
            </div>
            <span className="text-sm font-medium">Livraison</span>
            <span className="text-xs text-muted-foreground">{
              order.trackingStatus === 'delivery' ? 'En cours' :
              order.trackingStatus === 'reception' ? 'Terminé' : 'À venir'
            }</span>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className={`rounded-full p-2 mb-2 ${
              order.trackingStatus === 'reception' ? 'bg-autop-red' : 'bg-gray-200'
            }`}>
              <ClipboardCheck className={`h-4 w-4 ${
                order.trackingStatus === 'reception' ? 'text-white' : 'text-gray-400'
              }`} />
            </div>
            <span className="text-sm font-medium">Réception</span>
            <span className="text-xs text-muted-foreground">{
              order.trackingStatus === 'reception' ? 'Terminé' : 'À venir'
            }</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingProgress;
