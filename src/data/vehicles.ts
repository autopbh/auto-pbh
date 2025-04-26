
import { Vehicle } from "../types";

export const vehicles: Vehicle[] = [
  {
    id: "v1",
    brand: "Mercedes-Benz",
    model: "S-Class S500",
    year: 2020,
    mileage: 45000,
    fuelType: "Gasoline",
    engineCapacity: 3.0,
    power: 429,
    transmission: "automatic",
    exteriorColor: "Obsidian Black",
    interiorColor: "Macchiato Beige/Magma Grey",
    features: [
      "Panoramic Roof",
      "360° Camera",
      "Burmester® Surround Sound",
      "Heated Seats",
      "Adaptive Cruise Control",
      "Lane Keeping Assist",
      "Blind Spot Assist",
      "Head-Up Display",
      "Wireless Charging"
    ],
    previousOwners: 1,
    maintenanceHistory: [
      {
        date: "2022-03-15",
        mileage: 30000,
        service: "Full Service",
        description: "Oil change, filters, brakes inspection",
        servicedBy: "Mercedes-Benz Official"
      }
    ],
    technicalInspection: {
      lastDate: "2023-01-20",
      validUntil: "2025-01-20",
      status: "passed"
    },
    price: 68900,
    condition: "excellent",
    availability: "in-stock",
    currentLocation: "Rotterdam, Netherlands",
    estimatedDelivery: "2-3 weeks",
    images: [
      "/images/mercedes-s-class-1.jpg",
      "/images/mercedes-s-class-2.jpg",
      "/images/mercedes-s-class-3.jpg",
      "/images/mercedes-s-class-4.jpg",
      "/images/mercedes-s-class-5.jpg"
    ],
    thumbnail: "/images/mercedes-s-class-thumb.jpg",
    description: "This elegant Mercedes-Benz S-Class represents the pinnacle of automotive luxury and technology. Well maintained with only one previous owner, this vehicle offers exceptional comfort and driving experience.",
    options: ["Premium Package", "Driver Assistance Package", "Warmth & Comfort Package"]
  },
  {
    id: "v2",
    brand: "BMW",
    model: "7 Series 740i",
    year: 2021,
    mileage: 35000,
    fuelType: "Gasoline",
    engineCapacity: 3.0,
    power: 335,
    transmission: "automatic",
    exteriorColor: "Carbon Black",
    interiorColor: "Cognac Leather",
    features: [
      "Executive Package",
      "Harman Kardon Sound",
      "Gesture Control",
      "Panoramic Sky Lounge LED Roof",
      "Ambient Lighting",
      "Ventilated Seats",
      "Driving Assistance Professional",
      "Parking Assistant Plus"
    ],
    previousOwners: 1,
    technicalInspection: {
      lastDate: "2022-11-10",
      validUntil: "2024-11-10",
      status: "passed"
    },
    price: 72500,
    condition: "excellent",
    availability: "in-stock",
    currentLocation: "Rotterdam, Netherlands",
    estimatedDelivery: "2-4 weeks",
    images: [
      "/images/bmw-7-1.jpg",
      "/images/bmw-7-2.jpg",
      "/images/bmw-7-3.jpg",
      "/images/bmw-7-4.jpg"
    ],
    thumbnail: "/images/bmw-7-thumb.jpg",
    description: "This BMW 7 Series combines luxury and performance in a perfect balance. With its powerful engine and advanced technology features, it provides a first-class driving experience.",
    options: ["M Sport Package", "Premium Package", "Executive Package"]
  },
  {
    id: "v3",
    brand: "Audi",
    model: "A8 L 55 TFSI",
    year: 2022,
    mileage: 25000,
    fuelType: "Gasoline",
    engineCapacity: 3.0,
    power: 340,
    transmission: "automatic",
    exteriorColor: "Vesuvius Gray",
    interiorColor: "Valcona Leather - Black",
    features: [
      "Bang & Olufsen 3D Sound System",
      "Panoramic Sunroof",
      "Matrix LED Headlights",
      "MMI Navigation plus",
      "Head-up Display",
      "Audi Virtual Cockpit",
      "Adaptive Air Suspension",
      "Night Vision Assistant"
    ],
    previousOwners: 1,
    technicalInspection: {
      lastDate: "2023-04-05",
      validUntil: "2025-04-05",
      status: "passed"
    },
    price: 79900,
    condition: "excellent",
    availability: "in-stock",
    currentLocation: "Rotterdam, Netherlands",
    estimatedDelivery: "1-2 weeks",
    images: [
      "/images/audi-a8-1.jpg",
      "/images/audi-a8-2.jpg",
      "/images/audi-a8-3.jpg",
      "/images/audi-a8-4.jpg"
    ],
    thumbnail: "/images/audi-a8-thumb.jpg",
    description: "This Audi A8 represents the epitome of luxury and technological innovation. With its spacious interior and refined driving dynamics, it offers an exceptional riding experience for both driver and passengers.",
    options: ["Executive Package", "Luxury Package", "Technology Package"]
  },
  {
    id: "v4",
    brand: "Porsche",
    model: "911 Carrera S",
    year: 2020,
    mileage: 28500,
    fuelType: "Gasoline",
    engineCapacity: 3.0,
    power: 450,
    transmission: "automatic",
    exteriorColor: "Guards Red",
    interiorColor: "Black Leather",
    features: [
      "Sport Chrono Package",
      "BOSE® Surround Sound System",
      "LED Headlights with Matrix Beam",
      "Heated Sports Seats",
      "Lane Change Assist",
      "Porsche Dynamic Chassis Control",
      "Rear-Axle Steering",
      "Sport Exhaust System"
    ],
    previousOwners: 1,
    maintenanceHistory: [
      {
        date: "2022-05-10",
        mileage: 20000,
        service: "Full Service",
        description: "Complete maintenance with genuine Porsche parts",
        servicedBy: "Porsche Official Service"
      }
    ],
    technicalInspection: {
      lastDate: "2022-10-15",
      validUntil: "2024-10-15",
      status: "passed"
    },
    price: 119500,
    condition: "excellent",
    availability: "in-stock",
    currentLocation: "Rotterdam, Netherlands",
    estimatedDelivery: "1-3 weeks",
    images: [
      "/images/porsche-911-1.jpg",
      "/images/porsche-911-2.jpg",
      "/images/porsche-911-3.jpg",
      "/images/porsche-911-4.jpg"
    ],
    thumbnail: "/images/porsche-911-thumb.jpg",
    description: "This stunning Porsche 911 Carrera S combines iconic design with exhilarating performance. Well maintained and in pristine condition, this sports car offers an unmatched driving experience.",
    options: ["Sport Chrono Package", "Premium Package", "Driver Assistance Package"]
  },
  {
    id: "v5",
    brand: "Range Rover",
    model: "Sport HSE Dynamic",
    year: 2021,
    mileage: 32000,
    fuelType: "Diesel",
    engineCapacity: 3.0,
    power: 350,
    transmission: "automatic",
    exteriorColor: "Santorini Black",
    interiorColor: "Ebony/Ivory",
    features: [
      "Panoramic Roof",
      "Meridian™ Surround Sound System",
      "Head-Up Display",
      "Touch Pro Duo",
      "Heated and Cooled Seats",
      "Adaptive Cruise Control",
      "Terrain Response® 2",
      "LED Pixel Headlights"
    ],
    previousOwners: 1,
    technicalInspection: {
      lastDate: "2023-02-25",
      validUntil: "2025-02-25",
      status: "passed"
    },
    price: 82900,
    condition: "excellent",
    availability: "in-stock",
    currentLocation: "Rotterdam, Netherlands",
    estimatedDelivery: "2-3 weeks",
    images: [
      "/images/range-rover-sport-1.jpg",
      "/images/range-rover-sport-2.jpg",
      "/images/range-rover-sport-3.jpg",
      "/images/range-rover-sport-4.jpg"
    ],
    thumbnail: "/images/range-rover-sport-thumb.jpg",
    description: "This Range Rover Sport HSE Dynamic combines luxury and off-road capability in a sleek package. With its powerful engine and sophisticated interior, it offers versatility without compromising on comfort.",
    options: ["Black Exterior Pack", "Driver Assistance Pack", "Cold Climate Pack"]
  },
  {
    id: "v6",
    brand: "Tesla",
    model: "Model S Plaid",
    year: 2022,
    mileage: 15000,
    fuelType: "Electric",
    engineCapacity: 0,
    power: 1020,
    transmission: "automatic",
    exteriorColor: "Midnight Silver",
    interiorColor: "Black and White",
    features: [
      "21\" Arachnid Wheels",
      "Premium Connectivity",
      "Full Self-Driving Capability",
      "Yoke Steering Wheel",
      "Ultra High-Fidelity Sound",
      "Panoramic Glass Roof",
      "Heated and Ventilated Seats",
      "HEPA Air Filtration"
    ],
    previousOwners: 1,
    technicalInspection: {
      lastDate: "2023-05-20",
      validUntil: "2025-05-20",
      status: "passed"
    },
    price: 109900,
    condition: "excellent",
    availability: "in-stock",
    currentLocation: "Rotterdam, Netherlands",
    estimatedDelivery: "1-2 weeks",
    images: [
      "/images/tesla-models-1.jpg",
      "/images/tesla-models-2.jpg",
      "/images/tesla-models-3.jpg",
      "/images/tesla-models-4.jpg"
    ],
    thumbnail: "/images/tesla-models-thumb.jpg",
    description: "This Tesla Model S Plaid is the pinnacle of electric performance with its tri-motor setup and ludicrous acceleration. Combining cutting-edge technology with luxury, it represents the future of automotive excellence.",
    options: ["Enhanced Autopilot", "Full Self-Driving", "Premium Interior"]
  }
];

export const featuredVehicles = vehicles.slice(0, 3);
