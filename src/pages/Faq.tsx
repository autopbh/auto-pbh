
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

                <AccordionItem value="source">
                  <AccordionTrigger>Quand et de qui avez-vous acheté le véhicule ?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">Nous sourçons nos véhicules :</p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                      <li><strong>Neufs</strong> : Directement des constructeurs</li>
                      <li><strong>Occasions</strong> : Anciens locataires (LOA), reprises clients, ou flottes d'entreprise</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="entretien">
                  <AccordionTrigger>A-t-on changé régulièrement l'huile du véhicule ? Qu'en est-il de son entretien ?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Tous nos véhicules ont un <strong>carnet d'entretien complet</strong> (huile, filtres, vidanges) respectant les préconisations constructeur. Exemple : BMW X3 2020 – 4 vidanges effectuées.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="documents">
                  <AccordionTrigger>Puis-je voir le NIV, le titre de propriété du véhicule et une pièce d'identité ?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">Absolument ! Ces documents sont disponibles :</p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                      <li><strong>En concession</strong> : Présentés avant l'achat</li>
                      <li><strong>En ligne</strong> : Envoyés cryptés après signature d'un NDA (pour éviter la fraude)</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="essai">
                  <AccordionTrigger>Autorisez-vous des essais ?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">Oui ! Réservez un essai gratuit :</p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                      <li><strong>En concession</strong> : 30 min avec un conseiller</li>
                      <li><strong>À domicile</strong> : Possible pour les véhicules {'>'}25k€ (frais selon distance)</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="inspection">
                  <AccordionTrigger>Puis-je soumettre le véhicule à une inspection indépendante ?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">Bien sûr ! Nous recommandons même :</p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                      <li><strong>Centres agréés</strong> : Dekra, Norauto</li>
                      <li><strong>Coût</strong> : Offert pour les véhicules {'>'}20k€ (sinon 150€ à votre charge)</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="probleme">
                  <AccordionTrigger>Pouvons-nous régler ce problème avant l'achat ?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Tout défaut détecté est réparé avant livraison (ex : peinture, pièce mécanique). Sinon, nous ajustons le prix ou annulons la vente.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="budget">
                  <AccordionTrigger>Quel est votre budget ?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Nous avons des véhicules de <strong>10k€ à 100k€</strong>. Dites-nous votre fourchette, nous trouverons la meilleure offre !
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="kilometrage">
                  <AccordionTrigger>Quel est le kilométrage actuel du véhicule ?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Indiqué sur chaque fiche (ex : Peugeot 308 – 60 000 km). Nos occasions ont moins de <strong>120 000 km</strong>.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="consommation">
                  <AccordionTrigger>Quelle est la consommation de carburant constatée ?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">Elle correspond aux données constructeur (±5%). Exemple :</p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                      <li><strong>Diesel</strong> : 4,5L/100km (autoroute)</li>
                      <li><strong>Essence</strong> : 6,0L/100km (ville)</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="etat-general">
                  <AccordionTrigger>Quel est l'état général du véhicule ?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">Évalué via notre grille <strong>AutoAdi Certified</strong> :</p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                      <li><strong>Mécanique</strong> : 10/10</li>
                      <li><strong>Carrosserie</strong> : 8/10 (rayures mineures)</li>
                      <li><strong>Intérieur</strong> : 9/10 (sièges quasi neufs)</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="controle-technique">
                  <AccordionTrigger>Y a-t-il un contrôle technique ?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Oui, valide 6 mois minimum pour toutes nos occasions. Exemple : Contrôle technique du 01/01/2024 – Aucun point critique.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="proprietaires">
                  <AccordionTrigger>S'agit-il d'un véhicule de première, seconde main ou troisième main ?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">Nous précisons toujours le nombre de propriétaires :</p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                      <li><strong>Première main</strong> : Modèles neufs ou ex-LOA</li>
                      <li><strong>Seconde main</strong> : 80% de notre stock</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="negociable">
                  <AccordionTrigger>Le prix est-il négociable ?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">Oui, surtout pour :</p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                      <li><strong>Paiement comptant</strong> (jusqu'à -10%)</li>
                      <li><strong>Anciens modèles</strong> (stock {'>'}6 mois)</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="ancien-proprietaire">
                  <AccordionTrigger>Combien de personnes ont possédé le véhicule avant vous ?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Entre <strong>1 et 3 maximum</strong>. Exemple : Volvo XC60 – 1 propriétaire (dossier transparent disponible).
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="usage">
                  <AccordionTrigger>Le véhicule a-t-il été utilisé en ville, sur autoroute ou pour de longs trajets ?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">Nous vérifions l'historique :</p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                      <li><strong>Autoroute</strong> : Usure moteur réduite (idéal)</li>
                      <li><strong>Ville</strong> : Embrayage plus sollicité</li>
                    </ul>
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

                <AccordionItem value="carrosserie">
                  <AccordionTrigger>Quel est l'état de la carrosserie ?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Inspectée avec un <strong>testeur d'épaisseur de peinture</strong>. Aucune réparation masquée !
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="pneus">
                  <AccordionTrigger>Les pneus sont-ils en bon état ?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Profondeur minimale de <strong>3 mm</strong> (sinon remplacés). Exemple : Pneus neufs Michelin sur Tesla Model 3.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="interieur">
                  <AccordionTrigger>L'intérieur de la voiture est-il bien entretenu ?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Oui, nettoyage <strong>pro complet</strong> avant livraison (sièges, moquette, odeur).
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="bruits">
                  <AccordionTrigger>Le véhicule fait-il des bruits étranges au démarrage ou en roulant ?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Non, tous nos véhicules passent un <strong>test acoustique</strong>. Bruit = diagnostic gratuit.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="papiers">
                  <AccordionTrigger>Quels sont les papiers nécessaires pour acheter une voiture d'occasion ?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">Les documents requis :</p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                      <li><strong>Pour vous</strong> : Pièce d'identité + justificatif de domicile</li>
                      <li><strong>Pour la voiture</strong> : Carte grise + contrôle technique + rapport d'expertise</li>
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

                <AccordionItem value="paiement-restant">
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

                <AccordionItem value="exemple-paiement">
                  <AccordionTrigger>Exemple concret de paiement différé</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">Pour un véhicule à <strong>40 000€</strong> :</p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                      <li><strong>Aujourd'hui</strong> : 8 000€ (20%)</li>
                      <li><strong>À la livraison (dans 2 semaines)</strong> :</li>
                      <li className="ml-4">- Option 1 : Paiement des <strong>32 000€</strong> restants en une fois</li>
                      <li className="ml-4">- Option 2 : Mensualités de <strong>533€/mois sur 60 mois</strong> (0% d'intérêt)</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="voir-avant">
                  <AccordionTrigger>Puis-je voir le véhicule avant de payer les 80% ?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      <strong>Oui, absolument ! vous pouvez venir voir la voiture en Italie ou en Espagne</strong>
                    </p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                      <li>Vous pouvez :</li>
                      <li className="ml-4">- <strong>Vérifier le véhicule</strong> à la livraison</li>
                      <li className="ml-4">- <strong>Faire un essai final</strong></li>
                      <li className="ml-4">- <strong>Payer seulement si satisfait</strong> (dans les 48h suivant la livraison)</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="refus">
                  <AccordionTrigger>Que se passe-t-il si je refuse le véhicule à la livraison ?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">Deux options :</p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                      <li><strong>Échange</strong> : Nous trouvons un autre modèle</li>
                      <li><strong>Remboursement</strong> : Votre acompte de 20% est intégralement restitué</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="paiement-mixte">
                  <AccordionTrigger>Puis-je payer une partie à la livraison et le reste en mensualités ?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">Oui ! Par exemple :</p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                      <li><strong>À la livraison</strong> : 10 000€</li>
                      <li><strong>Reste</strong> : 22 000€ en 36 mensualités de 611€</li>
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
