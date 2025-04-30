
import { Tables } from "@/integrations/supabase/types";

export type OrderStatus = 
  | 'pending' 
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export type TrackingOrder = Tables<"orders"> & {
  trackingStatus?: 'preparation' | 'transport' | 'delivery' | 'reception';
  trackingProgress?: number;
  trackingEvents?: TrackingEvent[];
  // Nouvelles propriétés pour la localisation et les dates
  currentLocation?: {
    lat: number;
    lng: number;
    address: string;
  };
  estimatedDeliveryDate?: string;
  orderDate?: string;
  lastUpdateDate?: string;
};

export type TrackingEvent = {
  id: string;
  date: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'pending';
  icon?: string;
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
};
