
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
};

export type TrackingEvent = {
  id: string;
  date: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'pending';
  icon?: string;
};
