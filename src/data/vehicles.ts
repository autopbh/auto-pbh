
import { Vehicle } from "../types";

export const vehicles: Vehicle[] = [
  {
    id: "v1",
    brand: "MERCEDES-BENZ",
    model: "CLA 200",
    year: 2025,
    mileage: 0,
    fuelType: "Hybride léger (MHEV)",
    engineCapacity: 1.3,
    power: 163,
    transmission: "automatic",
    exteriorColor: "Gris Métallisé",
    interiorColor: "Noir Artico",
    features: [
      "Toit Panoramique",
      "Système ACC",
      "Frenagem autônoma de emergência",
      "Airbags frontais, lateraux et de cortina",
      "Faróis e lanternas de LED",
      "Paddle Shift",
      "Espelhamento do celular",
      "Rodas diamantadas de 18\"",
      "IPVA pago",
      "Emplacada"
    ],
    previousOwners: 0,
    maintenanceHistory: [],
    technicalInspection: {
      lastDate: "2025-01-15",
      validUntil: "2027-01-15",
      status: "passed"
    },
    price: 33000,
    condition: "excellent",
    availability: "in-stock",
    currentLocation: "Porto, Portugal",
    estimatedDelivery: "Immédiatement",
    images: [
      "/lovable-uploads/ea60817f-3c37-41ea-85e2-6ad9684492c2.png",
      "/lovable-uploads/91f857e6-1b8f-4640-9362-9f5b23adf212.png",
      "/lovable-uploads/4abf5ff5-33eb-4283-b90a-3d00afed4a46.png",
      "/lovable-uploads/a4c69399-1ff1-46f8-ab6a-422498500ac3.png",
      "/lovable-uploads/adbf3bbd-91a7-42f1-9804-851b0090815b.png",
      "/lovable-uploads/0fb379e0-2f77-432a-ae7d-0ff7ba0fb01d.png",
      "/lovable-uploads/6a472330-4603-4ac1-95f6-7027a440d154.png",
      "/lovable-uploads/cea1d329-3f69-47c2-9560-e339d664e7ec.png"
    ],
    thumbnail: "/lovable-uploads/ea60817f-3c37-41ea-85e2-6ad9684492c2.png",
    description: "MERCEDES-BENZ CLA 200 ZERO KM - 2025. Véhicule avec motorisation hybride légère 1.3 MHEV, déjà immatriculé avec IPVA payé. Equipé de roues diamantées de 18\", système ACC, freinage autonome d'urgence, airbags frontaux, latéraux et rideaux, phares et feux LED, palettes de changement de vitesse et toit panoramique. Compatible avec la mise en miroir du smartphone.",
    options: ["Pack Premium", "Pack Assistance à la Conduite", "Toit Panoramique"]
  },
  {
    id: "v2",
    brand: "BMW",
    model: "Série 7 740i",
    year: 2023,
    mileage: 12000,
    fuelType: "Essence",
    engineCapacity: 3.0,
    power: 381,
    transmission: "automatic",
    exteriorColor: "Bleu Tanzanite",
    interiorColor: "Cuir Merino Cognac",
    features: [
      "Pack Exécutif",
      "Son Bowers & Wilkins",
      "Commande Gestuelle",
      "Toit Panoramique Sky Lounge LED",
      "Éclairage Ambiant",
      "Sièges Ventilés",
      "Assistance à la Conduite Professionnelle",
      "Assistant de Stationnement Plus"
    ],
    previousOwners: 1,
    technicalInspection: {
      lastDate: "2023-11-10",
      validUntil: "2025-11-10",
      status: "passed"
    },
    price: 92500,
    condition: "excellent",
    availability: "in-stock",
    currentLocation: "Porto, Portugal",
    estimatedDelivery: "2-4 semaines",
    images: [
      "/lovable-uploads/440bb6ab-fc1f-4420-b877-3e4a7ed2e682.png",
      "/lovable-uploads/7ec2f080-9b4d-457c-a48f-e7534f6cd457.png",
      "/lovable-uploads/6f26994d-a59f-41da-be90-c2104cad1ccd.png"
    ],
    thumbnail: "/lovable-uploads/440bb6ab-fc1f-4420-b877-3e4a7ed2e682.png",
    description: "Cette BMW Série 7 allie luxe et performance dans un équilibre parfait. Avec son moteur puissant et ses technologies avancées, elle offre une expérience de conduite de première classe.",
    options: ["Pack M Sport", "Pack Premium", "Pack Executive"]
  },
  {
    id: "v3",
    brand: "Audi",
    model: "A8 L 55 TFSI",
    year: 2023,
    mileage: 8000,
    fuelType: "Essence",
    engineCapacity: 3.0,
    power: 340,
    transmission: "automatic",
    exteriorColor: "Gris Manhattan",
    interiorColor: "Cuir Valcona Noir",
    features: [
      "Système Audio Bang & Olufsen 3D",
      "Toit Ouvrant Panoramique",
      "Phares LED Matrix",
      "Navigation MMI plus",
      "Affichage Tête Haute",
      "Audi Virtual Cockpit",
      "Suspension Pneumatique Adaptative",
      "Assistant de Vision Nocturne"
    ],
    previousOwners: 1,
    technicalInspection: {
      lastDate: "2024-04-05",
      validUntil: "2026-04-05",
      status: "passed"
    },
    price: 89900,
    condition: "excellent",
    availability: "in-stock",
    currentLocation: "Porto, Portugal",
    estimatedDelivery: "1-2 semaines",
    images: [
      "/lovable-uploads/bb8c411a-fcc6-478f-ad1d-165259777b4b.png",
      "/lovable-uploads/8e8098a6-34a4-4f27-ad19-b367b166c836.png",
      "/lovable-uploads/9bd15bc2-bfb1-4c1e-9109-36905330b679.png"
    ],
    thumbnail: "/lovable-uploads/bb8c411a-fcc6-478f-ad1d-165259777b4b.png",
    description: "Cette Audi A8 représente le summum du luxe et de l'innovation technologique. Avec son intérieur spacieux et sa dynamique de conduite raffinée, elle offre une expérience de conduite exceptionnelle tant pour le conducteur que pour les passagers.",
    options: ["Pack Exécutif", "Pack Luxe", "Pack Technologie"]
  },
  {
    id: "v4",
    brand: "Porsche",
    model: "911 Carrera S",
    year: 2023,
    mileage: 5500,
    fuelType: "Essence",
    engineCapacity: 3.0,
    power: 450,
    transmission: "automatic",
    exteriorColor: "Rouge Carmin",
    interiorColor: "Cuir Noir",
    features: [
      "Pack Chrono Sport",
      "Système Audio BOSE® Surround",
      "Phares LED avec Faisceau Matriciel",
      "Sièges Sport Chauffants",
      "Assistant de Changement de Voie",
      "Porsche Dynamic Chassis Control",
      "Direction de l'Essieu Arrière",
      "Système d'Échappement Sport"
    ],
    previousOwners: 1,
    maintenanceHistory: [
      {
        date: "2024-05-10",
        mileage: 5000,
        service: "Révision Complète",
        description: "Entretien complet avec pièces Porsche d'origine",
        servicedBy: "Service Officiel Porsche"
      }
    ],
    technicalInspection: {
      lastDate: "2023-10-15",
      validUntil: "2025-10-15",
      status: "passed"
    },
    price: 149500,
    condition: "excellent",
    availability: "in-stock",
    currentLocation: "Porto, Portugal",
    estimatedDelivery: "1-3 semaines",
    images: [
      "/lovable-uploads/844223f6-9e5e-430e-8c29-dcd896ecbd91.png",
      "/lovable-uploads/bbd5ba0b-6732-48ed-8e5f-36b5a57b3f59.png",
      "/lovable-uploads/e65f475b-cd7a-4f0d-92e2-a91a88ba0866.png"
    ],
    thumbnail: "/lovable-uploads/844223f6-9e5e-430e-8c29-dcd896ecbd91.png",
    description: "Cette magnifique Porsche 911 Carrera S allie design emblématique et performances exaltantes. Parfaitement entretenue et dans un état impeccable, cette voiture de sport offre une expérience de conduite inégalée.",
    options: ["Pack Chrono Sport", "Pack Premium", "Pack Assistance à la Conduite"]
  },
  {
    id: "v5",
    brand: "Range Rover",
    model: "Sport HSE Dynamic",
    year: 2022,
    mileage: 22000,
    fuelType: "Diesel",
    engineCapacity: 3.0,
    power: 350,
    transmission: "automatic",
    exteriorColor: "Noir Santorini",
    interiorColor: "Ebony/Ivory",
    features: [
      "Toit Panoramique",
      "Système Audio Meridian™ Surround",
      "Affichage Tête Haute",
      "Touch Pro Duo",
      "Sièges Chauffants et Refroidissants",
      "Régulateur de Vitesse Adaptatif",
      "Terrain Response® 2",
      "Phares LED Pixel"
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
    currentLocation: "Porto, Portugal",
    estimatedDelivery: "2-3 semaines",
    images: [
      "/lovable-uploads/563a475b-11eb-4bd0-b822-84c94f8545b4.png",
      "/lovable-uploads/c846b54a-7bd2-49c0-b0cd-f6544a88bd6f.png"
    ],
    thumbnail: "/lovable-uploads/563a475b-11eb-4bd0-b822-84c94f8545b4.png",
    description: "Ce Range Rover Sport HSE Dynamic allie luxe et capacités tout-terrain dans un package élégant. Avec son moteur puissant et son intérieur sophistiqué, il offre polyvalence sans compromis sur le confort.",
    options: ["Pack Extérieur Noir", "Pack Assistance au Conducteur", "Pack Climat Froid"]
  },
  {
    id: "v6",
    brand: "Tesla",
    model: "Model S Plaid",
    year: 2023,
    mileage: 5000,
    fuelType: "Electric",
    engineCapacity: 0,
    power: 1020,
    transmission: "automatic",
    exteriorColor: "Gris Métallisé",
    interiorColor: "Noir et Blanc",
    features: [
      "Jantes Arachnid 21\"",
      "Connectivité Premium",
      "Capacité de Conduite Entièrement Autonome",
      "Volant Yoke",
      "Son Ultra Haute-Fidélité",
      "Toit en Verre Panoramique",
      "Sièges Chauffants et Ventilés",
      "Filtration d'Air HEPA"
    ],
    previousOwners: 1,
    technicalInspection: {
      lastDate: "2024-01-20",
      validUntil: "2026-01-20",
      status: "passed"
    },
    price: 119900,
    condition: "excellent",
    availability: "in-stock",
    currentLocation: "Porto, Portugal",
    estimatedDelivery: "1-2 semaines",
    images: [
      "/lovable-uploads/659428ab-10b9-406c-a076-b0a12f500702.png",
      "/lovable-uploads/50354ce4-8768-48c9-8f67-a5622dbd7179.png",
      "/lovable-uploads/ad93af63-a6e2-4a5e-97a9-05ffbcbbda31.png"
    ],
    thumbnail: "/lovable-uploads/659428ab-10b9-406c-a076-b0a12f500702.png",
    description: "Cette Tesla Model S Plaid est le summum de la performance électrique avec son installation à trois moteurs et son accélération fulgurante. Combinant technologie de pointe et luxe, elle représente l'avenir de l'excellence automobile.",
    options: ["Autopilote Amélioré", "Conduite Entièrement Autonome", "Intérieur Premium"]
  }
];

export const featuredVehicles = vehicles.slice(0, 3);
