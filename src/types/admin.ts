
import { Tables } from "@/integrations/supabase/types";
import { TrackingEvent, TrackingOrder } from "@/types/tracking";
import { z } from "zod";

// Form schemas
export const orderFormSchema = z.object({
  customer_name: z.string().min(1, { message: "Le nom du client est requis" }),
  customer_email: z.string().email({ message: "Email invalide" }),
  customer_phone: z.string().optional(),
  status: z.string(),
  vehicle_id: z.string().optional(),
  estimatedDeliveryDate: z.string().optional(),
  currentLocation: z.object({
    lat: z.number(),
    lng: z.number(),
    address: z.string()
  }),
  trackingStatus: z.enum(['preparation', 'transport', 'delivery', 'reception']).optional(),
  trackingProgress: z.number().min(0).max(100).optional()
});

export const eventFormSchema = z.object({
  title: z.string().min(1, { message: "Le titre est requis" }),
  description: z.string().min(1, { message: "La description est requise" }),
  date: z.string(),
  status: z.enum(['completed', 'in-progress', 'pending']),
  location: z.object({
    address: z.string(),
    lat: z.number(),
    lng: z.number()
  })
});

export type OrderFormValues = z.infer<typeof orderFormSchema>;
export type EventFormValues = z.infer<typeof eventFormSchema>;
