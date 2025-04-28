
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const Faq = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 mt-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-8">FAQ</h1>
          
          <div className="space-y-8">
            <section className="bg-white/50 backdrop-blur-sm p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold mb-6 text-autop-red">Questions Fréquentes</h2>
              
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="financement">
                  <AccordionTrigger>Proposez-vous des financements ?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Oui, nous collaborons avec des banques partenaires pour des crédits avantageux. 
                      Nos solutions de financement sont flexibles et adaptées à chaque situation :
                    </p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                      <li>Taux compétitifs négociés avec nos partenaires</li>
                      <li>Durées de financement adaptables de 12 à 72 mois</li>
                      <li>Options de leasing pour les professionnels</li>
                      <li>Simulation personnalisée gratuite</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="livraison">
                  <AccordionTrigger>Livrez-vous en Europe ?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Oui, nous organisons la logistique vers tous les pays de l'UE. Notre service de livraison comprend :
                    </p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                      <li>Transport sécurisé par transporteur spécialisé</li>
                      <li>Suivi en temps réel de la livraison</li>
                      <li>Assurance transport incluse</li>
                      <li>Documentation complète pour l'immatriculation</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="garantie">
                  <AccordionTrigger>Quelle garantie proposez-vous ?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Tous nos véhicules bénéficient d'une garantie minimum de 12 mois, extensible jusqu'à 36 mois. 
                      La garantie couvre :
                    </p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                      <li>Pièces et main d'œuvre</li>
                      <li>Assistance dépannage 24/7</li>
                      <li>Véhicule de remplacement selon conditions</li>
                      <li>Validité dans toute l'Europe</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="paiement">
                  <AccordionTrigger>Quels moyens de paiement acceptez-vous ?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Nous acceptons plusieurs modes de paiement sécurisés :
                    </p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                      <li>Virement bancaire</li>
                      <li>Financement bancaire</li>
                      <li>Chèque de banque</li>
                      <li>Paiement échelonné selon conditions</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="reprise">
                  <AccordionTrigger>Faites-vous la reprise de véhicules ?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Oui, nous proposons un service de reprise professionnel :
                    </p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                      <li>Évaluation gratuite de votre véhicule</li>
                      <li>Proposition de reprise sous 24h</li>
                      <li>Prise en charge de toutes les démarches administratives</li>
                      <li>Possibilité de reprise même sans achat</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            <section className="bg-white/50 backdrop-blur-sm p-6 rounded-lg shadow-sm text-center">
              <h2 className="text-xl font-semibold mb-4">Vous avez d'autres questions ?</h2>
              <p className="text-muted-foreground mb-6">
                Notre équipe est à votre disposition pour répondre à toutes vos interrogations.
              </p>
              <Button className="btn-primary">Contactez-nous</Button>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Faq;
