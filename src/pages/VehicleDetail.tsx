
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Car, 
  Calendar, 
  Gauge, 
  Power, 
  Shield, 
  Wrench,
  Phone,
  ArrowLeft,
  ShoppingCart
} from "lucide-react";

// Mock vehicle data for the demo
const mockVehicle = {
  id: "v2",
  name: "BMW Série 5 2023",
  price: 49990,
  image: "/images/bmw-5-series-thumb.jpg",
  brand: "BMW",
  model: "Série 5",
  year: 2023,
  mileage: 25000,
  fuelType: "Diesel",
  power: 300
};

const VehicleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [vehicle, setVehicle] = useState(mockVehicle);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // In a real app, you would fetch the vehicle data using the ID
    // For now, we'll use mock data
  }, [id]);

  const addToCart = () => {
    // Get current cart items from localStorage
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    
    // Check if vehicle is already in cart
    if (currentCart.some(item => item.id === vehicle.id)) {
      toast({
        title: "Véhicule déjà dans le panier",
        description: "Ce véhicule est déjà dans votre panier.",
      });
      return;
    }
    
    // Add vehicle to cart
    const updatedCart = [...currentCart, vehicle];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    
    toast({
      title: "Véhicule ajouté",
      description: `${vehicle.name} a été ajouté à votre panier.`,
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 mt-20">
        <Link to="/catalog" className="inline-flex items-center text-muted-foreground hover:text-autop-red mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour au catalogue
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{vehicle.name}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-8">
              <span>{vehicle.mileage.toLocaleString()} km</span>
              <span>•</span>
              <span>{vehicle.fuelType}</span>
              <span>•</span>
              <span>{vehicle.power} CH</span>
            </div>

            <div className="prose prose-lg max-w-none space-y-6">
              <section className="bg-white/50 backdrop-blur-sm p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-autop-red">Caractéristiques Principales</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-autop-red" />
                    <span>Année : {vehicle.year}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Gauge className="h-5 w-5 text-autop-red" />
                    <span>{vehicle.mileage.toLocaleString()} km</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Power className="h-5 w-5 text-autop-red" />
                    <span>{vehicle.power} CH</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Car className="h-5 w-5 text-autop-red" />
                    <span>{vehicle.fuelType}</span>
                  </div>
                </div>
              </section>

              <section className="bg-white/50 backdrop-blur-sm p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-autop-red">Options et Équipements</h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                    Toit panoramique
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                    Sièges chauffants
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                    Système audio Harman Kardon
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                    Navigation GPS
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                    Caméra de recul
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                    Aide au stationnement
                  </li>
                </ul>
              </section>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white/50 backdrop-blur-sm p-6 rounded-lg shadow-sm">
              <div className="mb-4">
                <span className="text-3xl font-bold text-autop-red">€{vehicle.price.toLocaleString()}</span>
              </div>
              <div className="space-y-4">
                <Button onClick={addToCart} className="w-full btn-primary">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Ajouter au panier
                </Button>
                <Link to="/contact">
                  <Button variant="outline" className="w-full">Demander plus d'informations</Button>
                </Link>
              </div>
            </div>

            <div className="bg-white/50 backdrop-blur-sm p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-autop-red" />
                Garanties
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                  Garantie 12 mois incluse
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                  Extension possible jusqu'à 36 mois
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                  Assistance 24/7 incluse
                </li>
              </ul>
            </div>

            <div className="bg-white/50 backdrop-blur-sm p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Wrench className="h-5 w-5 text-autop-red" />
                Services Inclus
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                  Livraison possible dans toute l'Europe
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                  Reprise de votre ancien véhicule
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                  Solutions de financement personnalisées
                </li>
              </ul>
            </div>

            <div className="bg-white/50 backdrop-blur-sm p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Phone className="h-5 w-5 text-autop-red" />
                Contact Direct
              </h3>
              <p className="text-muted-foreground mb-4">
                Notre équipe est à votre disposition pour répondre à toutes vos questions.
              </p>
              <Link to="/contact">
                <Button variant="outline" className="w-full">
                  Contactez votre conseiller dédié
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VehicleDetail;
