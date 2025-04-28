
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
                <AccordionItem value="etat">
                  <AccordionTrigger>Quel est l'état du véhicule et son kilométrage actuel ?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Tous nos véhicules sont inspectés par nos experts. Le kilométrage exact est indiqué sur chaque fiche produit (exemple : Audi A4 2021 – 45 000 km). L'état est classé comme :
                    </p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                      <li><strong>Comme neuf</strong> (aucun défaut mécanique ou esthétique)</li>
                      <li><strong>Très bon état</strong> (légères marques d'usage)</li>
                      <li><strong>Bon état</strong> (petits défauts sans impact technique)</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="pieces">
                  <AccordionTrigger>Y a-t-il eu remplacement ou mise à jour de pièces ?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Oui, nous indiquons toutes les pièces remplacées (ex : embrayage, freins, batterie) dans le <strong>rapport d'expertise</strong>. Demandez-le pour le véhicule qui vous intéresse !
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="prix">
                  <AccordionTrigger>Pourquoi vendez-vous le véhicule à ce prix ?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">Nos prix sont compétitifs car :</p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                      <li><strong>Occasions</strong> : Révisées et garanties (pas de mauvaises surprises)</li>
                      <li><strong>Neufs</strong> : Remises constructeur jusqu'à -15%</li>
                      <li><strong>Paiement comptant</strong> : Réduction supplémentaire de 10%</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="paiement">
                  <AccordionTrigger>Quand dois-je payer les 80% restants ?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      <strong>Aucun paiement entre l'acompte et la livraison !</strong>
                    </p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                      <li>Vous payez seulement <strong>20% à la commande</strong> pour réserver le véhicule</li>
                      <li>Les <strong>80% restants</strong> sont réglés :</li>
                      <li className="ml-4">- À la livraison en un seul versement</li>
                      <li className="ml-4">- OU en mensualités sans intérêt (6-84 mois) après livraison</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="essai">
                  <AccordionTrigger>Autorisez-vous des essais ?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">Oui ! Réservez un essai gratuit :</p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                      <li><strong>En concession</strong> : 30 min avec un conseiller</li>
                      <li><strong>À domicile</strong> : Possible pour les véhicules > 25k€ (frais selon distance)</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="inspection">
                  <AccordionTrigger>Puis-je soumettre le véhicule à une inspection indépendante ?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">Bien sûr ! Nous recommandons même :</p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                      <li><strong>Centres agréés</strong> : Dekra, Norauto</li>
                      <li><strong>Coût</strong> : Offert pour les véhicules > 20k€ (sinon 150€ à votre charge)</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="livraison">
                  <AccordionTrigger>Quel est le délai de livraison ?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Le délai de livraison en Portugal, en France, En Espagne, en Roumanie, en Italie ne dépasse pas 5 jours.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="garantie">
                  <AccordionTrigger>Le véhicule est-il encore sous garantie ?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Garantie constructeur ou <strong>AutoAdi Extended</strong> :
                    </p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                      <li><strong>Neufs</strong> : 2 à 5 ans (moteur, boîte, électronique)</li>
                      <li><strong>Occasions</strong> : 12 à 24 mois (selon kilométrage)</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="annulation">
                  <AccordionTrigger>Puis-je annuler ma commande ?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Oui ! Vous bénéficiez de 14 jours de rétractation avec remboursement intégral.
                    </p>
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
