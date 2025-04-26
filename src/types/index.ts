
export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  fuelType: string;
  engineCapacity: number;
  power: number;
  transmission: 'manual' | 'automatic' | 'semi-automatic';
  exteriorColor: string;
  interiorColor: string;
  features: string[];
  previousOwners: number;
  maintenanceHistory?: MaintenanceRecord[];
  technicalInspection?: {
    lastDate: string;
    validUntil: string;
    status: 'passed' | 'pending' | 'failed';
  };
  price: number;
  condition: 'excellent' | 'good' | 'fair';
  availability: 'in-stock' | 'reserved' | 'sold';
  currentLocation: string;
  estimatedDelivery: string;
  images: string[];
  thumbnail: string;
  description: string;
  options: string[];
}

export interface MaintenanceRecord {
  date: string;
  mileage: number;
  service: string;
  description: string;
  servicedBy: string;
}

export interface CartItem {
  vehicle: Vehicle;
  additionalOptions: {
    extendedWarranty: boolean;
    transport: boolean;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  orders: Order[];
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalPrice: number;
  taxAmount: number;
  deliveryFee: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: 'bank-transfer' | 'recharge-coupon';
  paymentStatus: 'pending' | 'paid' | 'failed';
  trackingInfo?: {
    trackingId: string;
    carrier: string;
    estimatedDelivery: string;
    currentLocation: {
      lat: number;
      lng: number;
      address: string;
    };
    status: string;
  };
  createdAt: string;
}

export type Language = 
  | 'pt' 
  | 'en' 
  | 'fr' 
  | 'es' 
  | 'de' 
  | 'it' 
  | 'nl';

export interface LanguageOption {
  code: Language;
  name: string;
  flag: string;
}
