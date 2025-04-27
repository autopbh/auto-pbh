
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  Car, 
  Truck, 
  Shield, 
  PhoneCall,
  Banknote,
  Tool,
  Clock,
  Map
} from "lucide-react";

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 mt-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-8">Nos Services</h1>
          
          <div className="space-y-12">
            <section className="bg-white/50 backdrop-blur-sm p-8 rounded-lg shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <Car className="h-8 w-8 text-autop-red" />
                <h2 className="text-2xl font-semibold">Achat & Reprise de Véhicules</h2>
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                Notre expertise dans l'achat et la reprise de véhicules premium vous garantit une transaction 
                en toute sérénité. Nous vous proposons :
              </p>
              <ul className="grid sm:grid-cols-2 gap-4 mb-6">
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                  Évaluation professionnelle gratuite
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                  Reprise de votre ancien véhicule
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                  Paiement sécurisé et rapide
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                  Gestion administrative complète
                </li>
              </ul>
            </section>

            <section className="bg-white/50 backdrop-blur-sm p-8 rounded-lg shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <Truck className="h-8 w-8 text-autop-red" />
                <h2 className="text-2xl font-semibold">Livraison Clé en Main</h2>
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                Service de livraison premium dans toute l'Europe, adapté à vos exigences :
              </p>
              <ul className="grid sm:grid-cols-2 gap-4 mb-6">
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                  Transport sécurisé et assuré
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                  Suivi en temps réel
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                  Documentation complète fournie
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                  Livraison à domicile possible
                </li>
              </ul>
            </section>

            <section className="bg-white/50 backdrop-blur-sm p-8 rounded-lg shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <Shield className="h-8 w-8 text-autop-red" />
                <h2 className="text-2xl font-semibold">Garantie Premium</h2>
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                Une protection complète pour votre tranquillité d'esprit :
              </p>
              <ul className="grid sm:grid-cols-2 gap-4 mb-6">
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                  Garantie minimum 12 mois
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                  Extension possible jusqu'à 36 mois
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                  Assistance 24/7
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                  Réseau de partenaires agréés
                </li>
              </ul>
            </section>

            <section className="bg-white/50 backdrop-blur-sm p-8 rounded-lg shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <PhoneCall className="h-8 w-8 text-autop-red" />
                <h2 className="text-2xl font-semibold">Assistance 7j/7</h2>
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                Un support client premium disponible en permanence :
              </p>
              <ul className="grid sm:grid-cols-2 gap-4 mb-6">
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                  Service client multilingue
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                  Assistance technique 24/7
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                  Dépannage d'urgence
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                  Suivi personnalisé
                </li>
              </ul>
            </section>

            <section className="bg-white/50 backdrop-blur-sm p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold mb-6 text-center">Services Complémentaires</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <Banknote className="h-8 w-8 mx-auto mb-4 text-autop-red" />
                  <h3 className="font-semibold mb-2">Solutions de Financement</h3>
                  <p className="text-sm text-muted-foreground">Offres personnalisées et taux avantageux</p>
                </div>
                <div className="text-center">
                  <Tool className="h-8 w-8 mx-auto mb-4 text-autop-red" />
                  <h3 className="font-semibold mb-2">Service Après-Vente</h3>
                  <p className="text-sm text-muted-foreground">Suivi et maintenance expert</p>
                </div>
                <div className="text-center">
                  <Clock className="h-8 w-8 mx-auto mb-4 text-autop-red" />
                  <h3 className="font-semibold mb-2">Rendez-vous Express</h3>
                  <p className="text-sm text-muted-foreground">Disponibilité sous 24h</p>
                </div>
                <div className="text-center">
                  <Map className="h-8 w-8 mx-auto mb-4 text-autop-red" />
                  <h3 className="font-semibold mb-2">Service International</h3>
                  <p className="text-sm text-muted-foreground">Présence dans toute l'Europe</p>
                </div>
              </div>
            </section>

            <section className="bg-white/50 backdrop-blur-sm p-8 rounded-lg shadow-sm text-center">
              <h2 className="text-2xl font-semibold mb-4">Besoin d'Plus d'Informations ?</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Notre équipe d'experts est à votre disposition pour répondre à toutes vos questions
                et vous accompagner dans votre projet.
              </p>
              <Button className="btn-primary">Contactez-nous</Button>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Services;
