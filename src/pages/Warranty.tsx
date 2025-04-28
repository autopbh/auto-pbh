import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Shield, Clock, PhoneCall, Car, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";

const Warranty = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 mt-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-8">Garanties Premium</h1>
          
          <section className="bg-white/50 backdrop-blur-sm p-8 rounded-lg shadow-sm mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-autop-red">Notre Engagement d'Excellence</h2>
            <p className="text-lg mb-6">
              Chez AUTO PBH, chaque véhicule bénéficie d'une couverture exceptionnelle pour votre tranquillité d'esprit.
              Notre garantie premium est l'une des plus complètes du marché des véhicules de prestige.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-autop-red/5 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-6 w-6 text-autop-red" />
                  <h3 className="text-xl font-medium">Garantie Mécanique & Boîte</h3>
                </div>
                <div className="space-y-3 text-muted-foreground pl-9">
                  <p>• Durée standard: <span className="font-semibold">24 mois</span></p>
                  <p>• Extension possible jusqu'à: <span className="font-semibold">36 mois</span></p>
                  <p>• Couverture complète moteur et transmission</p>
                  <p>• Pièces et main d'œuvre incluses</p>
                  <p>• Réseau de garages agréés dans toute l'Europe</p>
                </div>
              </div>
              
              <div className="bg-autop-red/5 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="h-6 w-6 text-autop-red" />
                  <h3 className="text-xl font-medium">Garantie Électronique</h3>
                </div>
                <div className="space-y-3 text-muted-foreground pl-9">
                  <p>• Durée standard: <span className="font-semibold">12 mois</span></p>
                  <p>• Extension possible jusqu'à: <span className="font-semibold">24 mois</span></p>
                  <p>• Systèmes d'infodivertissement</p>
                  <p>• Composants électroniques essentiels</p>
                  <p>• Capteurs et systèmes d'aide à la conduite</p>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="bg-autop-red/10 h-16 w-16 flex items-center justify-center rounded-full mx-auto mb-4">
                  <PhoneCall className="h-8 w-8 text-autop-red" />
                </div>
                <h3 className="text-lg font-medium mb-2">Assistance 24/7</h3>
                <p className="text-sm text-muted-foreground">
                  Service de dépannage et assistance disponible jour et nuit, partout en Europe
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-autop-red/10 h-16 w-16 flex items-center justify-center rounded-full mx-auto mb-4">
                  <Car className="h-8 w-8 text-autop-red" />
                </div>
                <h3 className="text-lg font-medium mb-2">Véhicule de remplacement</h3>
                <p className="text-sm text-muted-foreground">
                  Prêt d'un véhicule de catégorie similaire pendant toute la durée des réparations
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-autop-red/10 h-16 w-16 flex items-center justify-center rounded-full mx-auto mb-4">
                  <Wrench className="h-8 w-8 text-autop-red" />
                </div>
                <h3 className="text-lg font-medium mb-2">Entretien privilégié</h3>
                <p className="text-sm text-muted-foreground">
                  Remise de 15% sur les services d'entretien dans notre réseau de partenaires
                </p>
              </div>
            </div>
            
            <div className="border-t pt-6 text-center">
              <p className="text-muted-foreground mb-4">
                "Tous nos véhicules bénéficient de :<br />
                24 mois de garantie moteur/boîte<br />
                12 mois pour l'électronique<br />
                Assistance routière 24h/24"
              </p>
              <Button>
                Télécharger le contrat de garantie
              </Button>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Warranty;
