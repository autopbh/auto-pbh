
import { Tables } from "@/integrations/supabase/types";
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
    lat: z.number().default(48.8566),
    lng: z.number().default(2.3522),
    address: z.string().default("Paris, France")
  }).default({
    lat: 48.8566,
    lng: 2.3522,
    address: "Paris, France"
  }),
  trackingStatus: z.enum(['preparation', 'transport', 'delivery', 'reception']).optional(),
  trackingProgress: z.number().min(0).max(100).optional()
});

export const newOrderFormSchema = z.object({
  customer_name: z.string().min(1, { message: "Le nom du client est requis" }),
  customer_email: z.string().email({ message: "Email invalide" }),
  customer_phone: z.string().optional(),
  vehicle_id: z.string().optional(),
  price: z.number().optional(),
  // Informations professionnelles
  company_name: z.string().optional(),
  job_title: z.string().optional(),
  professional_address: z.string().optional(),
  // Informations bancaires
  bank_name: z.string().optional(),
  iban: z.string().optional(),
  account_holder: z.string().optional(),
  // Mode de paiement
  payment_method: z.enum(['delivery', 'installments']).optional()
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
export type NewOrderFormValues = z.infer<typeof newOrderFormSchema>;
export type EventFormValues = z.infer<typeof eventFormSchema>;
