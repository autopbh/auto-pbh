
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  Car, 
  Calendar, 
  Gauge, 
  Power, 
  Shield, 
  Wrench,
  Phone,
  ArrowLeft
} from "lucide-react";

const VehicleDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 mt-20">
        <Link to="/catalog" className="inline-flex items-center text-muted-foreground hover:text-autop-red mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour au catalogue
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">BMW Série 5 2023</h1>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-8">
              <span>25 000 km</span>
              <span>•</span>
              <span>Diesel</span>
              <span>•</span>
              <span>300 CH</span>
            </div>

            <div className="prose prose-lg max-w-none space-y-6">
              <section className="bg-white/50 backdrop-blur-sm p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-autop-red">Caractéristiques Principales</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-autop-red" />
                    <span>Année : 2023</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Gauge className="h-5 w-5 text-autop-red" />
                    <span>25 000 km</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Power className="h-5 w-5 text-autop-red" />
                    <span>300 CH</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Car className="h-5 w-5 text-autop-red" />
                    <span>Diesel</span>
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
                <span className="text-3xl font-bold text-autop-red">49 990 €</span>
              </div>
              <div className="space-y-4">
                <Button className="w-full btn-primary">Réserver ce véhicule</Button>
                <Button variant="outline" className="w-full">Demander plus d'informations</Button>
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
              <Button variant="outline" className="w-full">
                Contactez votre conseiller dédié
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VehicleDetail;
