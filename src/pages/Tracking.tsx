
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { TruckIcon, ClipboardCheck, Package, Check } from "lucide-react";

const Tracking = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [isTracking, setIsTracking] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderNumber.trim()) {
      setIsTracking(true);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 mt-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-8">Suivi de Livraison Personnalisé</h1>
          
          <section className="bg-white/50 backdrop-blur-sm p-8 rounded-lg shadow-sm mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-autop-red">Service de Livraison d'Exception</h2>
            <p className="text-lg mb-6">
              Suivez en temps réel l'évolution de la préparation et de la livraison de votre véhicule d'exception. 
              Notre service "Livraison Clé en Or" vous garantit une expérience premium de bout en bout.
            </p>
            
            <form onSubmit={handleSubmit} className="mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Saisissez votre numéro de commande"
                  className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-autop-red"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                />
                <Button type="submit">
                  Suivre ma commande
                </Button>
              </div>
            </form>
          </section>

          {isTracking && (
            <section className="bg-white/50 backdrop-blur-sm p-8 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-autop-red">Commande #PBH-23856</h2>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  En transit
                </span>
              </div>
              
              <div className="mb-8">
                <div className="relative">
                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div className="bg-autop-red h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  
                  <div className="flex justify-between mt-4">
                    <div className="flex flex-col items-center text-center">
                      <div className="rounded-full bg-autop-red p-2 mb-2">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-sm font-medium">Préparation</span>
                      <span className="text-xs text-muted-foreground">Terminé</span>
                    </div>
                    
                    <div className="flex flex-col items-center text-center">
                      <div className="rounded-full bg-autop-red p-2 mb-2">
                        <TruckIcon className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-sm font-medium">Transport</span>
                      <span className="text-xs text-muted-foreground">En cours</span>
                    </div>
                    
                    <div className="flex flex-col items-center text-center">
                      <div className="rounded-full bg-gray-200 p-2 mb-2">
                        <Package className="h-4 w-4 text-gray-400" />
                      </div>
                      <span className="text-sm font-medium">Livraison</span>
                      <span className="text-xs text-muted-foreground">À venir</span>
                    </div>
                    
                    <div className="flex flex-col items-center text-center">
                      <div className="rounded-full bg-gray-200 p-2 mb-2">
                        <ClipboardCheck className="h-4 w-4 text-gray-400" />
                      </div>
                      <span className="text-sm font-medium">Réception</span>
                      <span className="text-xs text-muted-foreground">À venir</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 rounded-full p-2">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Préparation complétée</p>
                    <p className="text-sm text-muted-foreground">15 avril 2025 - Valetage premium et contrôle final réalisés</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 rounded-full p-2">
                    <TruckIcon className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Transport en cours</p>
                    <p className="text-sm text-muted-foreground">18 avril 2025 - Véhicule en transit, arrivée prévue le 22 avril</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-gray-100 rounded-full p-2">
                    <Package className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium">Livraison programmée</p>
                    <p className="text-sm text-muted-foreground">22 avril 2025 - Votre conseiller vous contactera pour convenir d'un rendez-vous</p>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Tracking;
