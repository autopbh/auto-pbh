
import { Vehicle } from "../../types";

export const peugeot208: Vehicle = {
  id: "peugeot-208-automatico",
  brand: "Peugeot",
  model: "208 Automático",
  year: 2021,
  mileage: 60000,
  fuelType: "Essence",
  engineCapacity: 1.2,
  power: 100,
  transmission: "automatic",
  exteriorColor: "Rouge",
  interiorColor: "Noir",
  features: [
    "Modèle 10/2021",
    "Jantes en alliage",
    "Écran tactile multimédia",
    "Connectivité Bluetooth",
    "Climatisation",
    "Volant multifonction",
    "Rétroviseurs électriques",
    "Vitres électriques",
    "Direction assistée",
    "Airbags",
    "Contrôle de stabilité",
    "Capteurs de stationnement"
  ],
  previousOwners: 1,
  technicalInspection: {
    lastDate: "2023-10-15",
    validUntil: "2025-10-15",
    status: "passed"
  },
  price: 10000,
  condition: "excellent",
  availability: "in-stock",
  currentLocation: "Porto, Portugal",
  estimatedDelivery: "Immédiate",
  images: [
    "/lovable-uploads/06b4733e-b67a-46ae-a710-37341b9025fc.png",
    "/lovable-uploads/b35d10e6-7d9c-4d83-ae0c-098a3a513a4e.png",
    "/lovable-uploads/de4c19e6-c314-44de-a2ba-d97ad25d030b.png", 
    "/lovable-uploads/253b7fe8-fbe6-4ce6-92fa-a2034f2e4a18.png",
    "/lovable-uploads/619bc5f4-3835-49b5-8db0-43570eaad565.png"
  ],
  thumbnail: "/lovable-uploads/06b4733e-b67a-46ae-a710-37341b9025fc.png",
  description: "Peugeot 208 Automático de 10/2021 avec seulement 60.000 km. Cette voiture citadine élégante et économique est en excellent état. Équipée d'une boîte automatique pour une conduite souple et confortable, elle dispose d'un écran tactile multimédia, de la connectivité Bluetooth et de nombreux équipements de confort et de sécurité.",
  options: [
    "Écran tactile multimédia",
    "Jantes en alliage",
    "Climatisation"
  ]
};
