import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const Faq = () => {
  const { t } = useLanguage();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 mt-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-8">{t("faq.title")}</h1>
          
          <div className="space-y-8">
            <section className="bg-white/50 backdrop-blur-sm p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold mb-6 text-autop-red">{t("faq.title")}</h2>
              
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="etat">
                  <AccordionTrigger>{t("faq.vehicleCondition")}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      {t("faq.vehicleConditionAnswer")}
                    </p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                      <li><strong>{t("faq.condition.asNew")}</strong></li>
                      <li><strong>{t("faq.condition.veryGood")}</strong></li>
                      <li><strong>{t("faq.condition.good")}</strong></li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="pieces">
                  <AccordionTrigger>{t("faq.partsReplacement")}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      {t("faq.partsReplacementAnswer")}
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="prix">
                  <AccordionTrigger>{t("faq.priceReason")}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">Nos prix sont compétitifs car :</p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                      <li><strong>{t("faq.priceReasonOption1")}</strong></li>
                      <li><strong>{t("faq.priceReasonOption2")}</strong></li>
                      <li><strong>{t("faq.priceReasonOption3")}</strong></li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="source">
                  <AccordionTrigger>{t("faq.purchaseSource")}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">Nous sourçons nos véhicules :</p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                      <li><strong>{t("faq.purchaseSourceOption1")}</strong></li>
                      <li><strong>{t("faq.purchaseSourceOption2")}</strong></li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="entretien">
                  <AccordionTrigger>{t("faq.maintenance")}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Tous nos véhicules ont un <strong>{t("faq.maintenanceDescription")}</strong> (huile, filtres, vidanges) respectant les préconisations constructeur. Exemple : BMW X3 2020 – 4 vidanges effectuées.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="documents">
                  <AccordionTrigger>{t("faq.documents")}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">Absolument ! Ces documents sont disponibles :</p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                      <li><strong>{t("faq.documentsOption1")}</strong></li>
                      <li><strong>{t("faq.documentsOption2")}</strong></li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="essai">
                  <AccordionTrigger>{t("faq.testDrive")}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">Oui ! Réservez un essai gratuit :</p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                      <li><strong>{t("faq.testDriveOption1")}</strong></li>
                      <li><strong>{t("faq.testDriveOption2")}</strong></li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="inspection">
                  <AccordionTrigger>{t("faq.inspection")}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">Bien sûr ! Nous recommandons même :</p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                      <li><strong>{t("faq.inspectionOption1")}</strong></li>
                      <li><strong>{t("faq.inspectionOption2")}</strong></li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="probleme">
                  <AccordionTrigger>{t("faq.problem")}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Tout défaut détecté est réparé avant livraison (ex : peinture, pièce mécanique). Sinon, nous ajustons le prix ou annulons la vente.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="budget">
                  <AccordionTrigger>{t("faq.budget")}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Nous avons des véhicules de <strong>{t("faq.budgetRange")}</strong>. Dites-nous votre fourchette, nous trouverons la meilleure offre !
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="kilometrage">
                  <AccordionTrigger>{t("faq.kilometrage")}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Indiqué sur chaque fiche (ex : Peugeot 308 – 60 000 km). Nos occasions ont moins de <strong>{t("faq.kilometrageLimit")}</strong>.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="consommation">
                  <AccordionTrigger>{t("faq.consumption")}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">Elle correspond aux données constructeur (±5%). Exemple :</p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                      <li><strong>{t("faq.consumptionOption1")}</strong></li>
                      <li><strong>{t("faq.consumptionOption2")}</strong></li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="etat-general">
                  <AccordionTrigger>{t("faq.generalCondition")}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">Évalué via notre grille <strong>{t("faq.grading")}</strong> :</p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                      <li><strong>{t("faq.condition.mechanical")}</strong></li>
                      <li><strong>{t("faq.condition.body")}</strong></li>
                      <li><strong>{t("faq.condition.interior")}</strong></li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="controle-technique">
                  <AccordionTrigger>{t("faq.control")}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Oui, valide 6 mois minimum pour toutes nos occasions. Exemple : Contrôle technique du 01/01/2024 – Aucun point critique.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="proprietaires">
                  <AccordionTrigger>{t("faq.owner")}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">Nous précisons toujours le nombre de propriétaires :</p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                      <li><strong>{t("faq.ownerOption1")}</strong></li>
                      <li><strong>{t("faq.ownerOption2")}</strong></li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="negociable">
                  <AccordionTrigger>{t("faq.negotiable")}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">Oui, surtout pour :</p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                      <li><strong>{t("faq.negotiableOption1")}</strong></li>
                      <li><strong>{t("faq.negotiableOption2")}</strong></li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="ancien-proprietaire">
                  <AccordionTrigger>{t("faq.previousOwner")}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Entre <strong>{t("faq.previousOwnerOption1")}</strong>. Exemple : Volvo XC60 – 1 propriétaire (dossier transparent disponible).
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="usage">
                  <AccordionTrigger>{t("faq.usage")}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">Nous vérifions l'historique :</p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                      <li><strong>{t("faq.usageOption1")}</strong></li>
                      <li><strong>{t("faq.usageOption2")}</strong></li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="garantie">
                  <AccordionTrigger>{t("faq.warranty")}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Garantie constructeur ou <strong>{t("faq.warrantyOption1")}</strong> :
                    </p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                      <li><strong>{t("faq.warrantyOption2")}</strong></li>
                      <li><strong>{t("faq.warrantyOption3")}</strong></li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="carrosserie">
                  <AccordionTrigger>{t("faq.bodyCondition")}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Inspectée avec un <strong>{t("faq.bodyConditionOption1")}</strong>. Aucune réparation masquée !
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="pneus">
                  <AccordionTrigger>{t("faq.tires")}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Profondeur minimale de <strong>{t("faq.tiresOption1")}</strong> (sinon remplacés). Exemple : Pneus neufs Michelin sur Tesla Model 3.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="interieur">
                  <AccordionTrigger>{t("faq.interiorCondition")}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Oui, nettoyage <strong>{t("faq.interiorConditionOption1")}</strong> avant livraison (sièges, moquette, odeur).
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="bruits">
                  <AccordionTrigger>{t("faq.noise")}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Non, tous nos véhicules passent un <strong>{t("faq.noiseOption1")}</strong>. Bruit = diagnostic gratuit.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="papiers">
                  <AccordionTrigger>{t("faq.documents")}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">Les documents requis :</p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                      <li><strong>{t("faq.documentsOption1")}</strong></li>
                      <li><strong>{t("faq.documentsOption2")}</strong></li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="annulation">
                  <AccordionTrigger>{t("faq.refund")}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Oui ! Vous bénéficiez de 14 jours de rétractation avec remboursement intégral.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="paiement-restant">
                  <AccordionTrigger>{t("faq.paymentRemaining")}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      <strong>{t("faq.paymentRemainingOption1")}</strong>
                    </p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                      <li>{t("faq.paymentRemainingOption2")}</li>
                      <li className="ml-4">{t("faq.paymentRemainingOption3")}</li>
                      <li className="ml-4">{t("faq.paymentRemainingOption4")}</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="exemple-paiement">
                  <AccordionTrigger>{t("faq.paymentExample")}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">Pour un véhicule à <strong>{t("faq.paymentExampleOption1")}</strong> :</p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                      <li><strong>{t("faq.paymentExampleOption2")}</strong></li>
                      <li><strong>{t("faq.paymentExampleOption3")}</strong></li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="voir-avant">
                  <AccordionTrigger>{t("faq.seeBefore")}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      <strong>{t("faq.seeBeforeOption1")}</strong>
                    </p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                      <li>{t("faq.seeBeforeOption2")}</li>
                      <li>{t("faq.seeBeforeOption3")}</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="refus">
                  <AccordionTrigger>{t("faq.refuse")}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">Deux options :</p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                      <li>{t("faq.refuseOption1")}</li>
                      <li>{t("faq.refuseOption2")}</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="paiement-mixte">
                  <AccordionTrigger>{t("faq.mixedPayment")}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">Oui ! Par exemple :</p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                      <li><strong>{t("faq.mixedPaymentOption1")}</strong></li>
                      <li><strong>{t("faq.mixedPaymentOption2")}</strong></li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="livraison">
                  <AccordionTrigger>{t("faq.delivery")}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Le délai de livraison en Portugal, en France, En Espagne, en Roumanie, en Italie ne dépasse pas 5 jours.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            <section className="bg-white/50 backdrop-blur-sm p-6 rounded-lg shadow-sm text-center">
              <h2 className="text-xl font-semibold mb-4">{t("faq.otherQuestions")}</h2>
              <p className="text-muted-foreground mb-6">
                {t("faq.ourTeam")}
              </p>
              <Button className="btn-primary">{t("faq.contactUs")}</Button>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Faq;
