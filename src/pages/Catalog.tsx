
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Search, Filter, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { vehicles } from "@/data/vehicles";

const Catalog = () => {
  const { toast } = useToast();
  const [displayVehicles, setDisplayVehicles] = useState(vehicles.map(v => ({
    id: v.id,
    name: `${v.brand} ${v.model}`,
    price: v.price,
    image: v.thumbnail || v.images[0],
    brand: v.brand,
    model: v.model,
    year: v.year
  })));
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const addToCart = (vehicle) => {
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
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">Catalogue</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Explorez notre sélection de véhicules d'exception : BMW, Mercedes-Benz, Audi et Porsche. 
            Filtrez par marque, prix ou année pour trouver la voiture de vos rêves.
          </p>
        </div>

        <div className="grid gap-8 mb-12">
          <section className="bg-white/50 backdrop-blur-sm p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-4 text-autop-red">Notre Collection Premium</h2>
            <p className="text-lg mb-6">
              Découvrez une sélection rigoureuse des plus beaux modèles du marché premium. 
              Chaque véhicule de notre collection est :
            </p>
            <ul className="list-disc pl-6 space-y-3 text-lg mb-6">
              <li>Minutieusement inspecté par nos experts</li>
              <li>Accompagné d'un historique complet</li>
              <li>Certifié pour sa qualité exceptionnelle</li>
              <li>Disponible avec une garantie étendue</li>
            </ul>
          </section>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4 bg-white/50 backdrop-blur-sm p-6 rounded-lg shadow-sm">
              <Search className="h-10 w-10 text-autop-red" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Recherche Avancée</h3>
                <p className="text-muted-foreground">
                  Utilisez nos filtres détaillés pour trouver exactement le véhicule qui vous correspond.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/50 backdrop-blur-sm p-6 rounded-lg shadow-sm">
              <Filter className="h-10 w-10 text-autop-red" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Filtres Personnalisés</h3>
                <p className="text-muted-foreground">
                  Affinez votre recherche par marque, modèle, année, kilométrage et bien plus.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Grille de véhicules */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayVehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-white dark:bg-autop-gray rounded-lg shadow-md overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src={vehicle.image} 
                  alt={vehicle.name} 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{vehicle.name}</h3>
                <p className="text-muted-foreground mb-2">{vehicle.year} · Premium</p>
                <p className="text-2xl font-bold text-autop-red mb-4">€{vehicle.price.toLocaleString()}</p>
                <div className="flex justify-between">
                  <Button asChild variant="outline">
                    <a href={`/vehicle/${vehicle.id}`}>Voir détails</a>
                  </Button>
                  <Button onClick={() => addToCart(vehicle)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Ajouter au panier
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Catalog;
