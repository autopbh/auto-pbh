
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 mt-20">
        <h1 className="text-3xl md:text-5xl font-bold mb-8">À propos</h1>
        
        <div className="prose prose-lg max-w-none space-y-8">
          <section className="bg-white/50 backdrop-blur-sm p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-4 text-autop-red">Notre Histoire</h2>
            <p className="text-lg mb-6">
              AUTO PBH est spécialisé dans la vente de véhicules premium depuis 2010. Notre mission est d'offrir une expérience d'achat haut de gamme, transparente et personnalisée à chaque client.
            </p>
            <p className="text-lg mb-6">
              Fondée sur des valeurs d'excellence et de confiance, notre entreprise s'est imposée comme une référence dans le secteur automobile premium en Europe. Nous sélectionnons méticuleusement chaque véhicule pour garantir à nos clients une qualité irréprochable.
            </p>
          </section>

          <section className="bg-white/50 backdrop-blur-sm p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-4 text-autop-red">Notre Expertise</h2>
            <p className="text-lg mb-6">
              Chaque membre de notre équipe est un expert passionné, formé aux dernières technologies automobiles. Nous accompagnons nos clients tout au long de leur parcours d'achat, du premier contact jusqu'au service après-vente.
            </p>
            <ul className="list-disc pl-6 space-y-3 text-lg">
              <li>Plus de 1000 véhicules premium livrés depuis 2010</li>
              <li>Un réseau de partenaires certifiés dans toute l'Europe</li>
              <li>Des inspections rigoureuses sur plus de 200 points de contrôle</li>
              <li>Un service client disponible 7j/7</li>
            </ul>
          </section>

          <section className="bg-white/50 backdrop-blur-sm p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-4 text-autop-red">Notre Engagement</h2>
            <p className="text-lg mb-6">
              La satisfaction de nos clients est notre priorité absolue. Nous nous engageons à offrir :
            </p>
            <ul className="list-disc pl-6 space-y-3 text-lg">
              <li>Une transparence totale sur l'historique des véhicules</li>
              <li>Des prix compétitifs sur le marché premium</li>
              <li>Un accompagnement personnalisé</li>
              <li>Une garantie étendue sur tous nos véhicules</li>
            </ul>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default About;
