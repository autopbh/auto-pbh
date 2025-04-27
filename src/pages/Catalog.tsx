
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

const Catalog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

        {/* Placeholder pour la grille de véhicules */}
        <div className="text-center">
          <Button className="btn-primary">Voir tous les véhicules disponibles</Button>
        </div>
      </div>
    </Layout>
  );
};

export default Catalog;
