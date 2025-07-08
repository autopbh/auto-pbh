
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

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
              <h2 className="text-2xl font-semibold mb-6 text-autop-red">{t("faq.frequentQuestions")}</h2>
              
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="etat">
                  <AccordionTrigger>{t("faq.vehicleState.question")}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      {t("faq.vehicleState.answer")}
                    </p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                      <li><strong>{t("faq.vehicleState.likeNew")}</strong></li>
                      <li><strong>{t("faq.vehicleState.veryGood")}</strong></li>
                      <li><strong>{t("faq.vehicleState.good")}</strong></li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="pieces">
                  <AccordionTrigger>{t("faq.parts.question")}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      {t("faq.parts.answer")}
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="prix">
                  <AccordionTrigger>{t("faq.price.question")}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">{t("faq.price.answer")}</p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                      <li><strong>{t("faq.price.used")}</strong></li>
                      <li><strong>{t("faq.price.new")}</strong></li>
                      <li><strong>{t("faq.price.cash")}</strong></li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="source">
                  <AccordionTrigger>{t("faq.source.question")}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">{t("faq.source.answer")}</p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                      <li><strong>{t("faq.source.new")}</strong></li>
                      <li><strong>{t("faq.source.used")}</strong></li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="entretien">
                  <AccordionTrigger>{t("faq.maintenance.question")}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      {t("faq.maintenance.answer")}
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="documents">
                  <AccordionTrigger>{t("faq.documents.question")}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">{t("faq.documents.answer")}</p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                      <li><strong>{t("faq.documents.showroom")}</strong></li>
                      <li><strong>{t("faq.documents.online")}</strong></li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="essai">
                  <AccordionTrigger>{t("faq.testDrive.question")}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">{t("faq.testDrive.answer")}</p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                      <li><strong>{t("faq.testDrive.showroom")}</strong></li>
                      <li><strong>{t("faq.testDrive.home")}</strong></li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="inspection">
                  <AccordionTrigger>{t("faq.inspection.question")}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">{t("faq.inspection.answer")}</p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                      <li><strong>{t("faq.inspection.centers")}</strong></li>
                      <li><strong>{t("faq.inspection.cost")}</strong></li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="problem">
                  <AccordionTrigger>{t("faq.problem.question")}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">{t("faq.problem.answer")}</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="budget">
                  <AccordionTrigger>{t("faq.budget.question")}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">{t("faq.budget.answer")}</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="kilometrage">
                  <AccordionTrigger>{t("faq.currentKm.question")}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">{t("faq.currentKm.answer")}</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="consommation">
                  <AccordionTrigger>{t("faq.consumption.question")}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">{t("faq.consumption.answer")}</p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                      <li><strong>{t("faq.consumption.diesel")}</strong></li>
                      <li><strong>{t("faq.consumption.petrol")}</strong></li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="etat-general">
                  <AccordionTrigger>{t("faq.generalState.question")}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">{t("faq.generalState.answer")}</p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                      <li><strong>{t("faq.generalState.mechanical")}</strong></li>
                      <li><strong>{t("faq.generalState.bodywork")}</strong></li>
                      <li><strong>{t("faq.generalState.interior")}</strong></li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="livraison">
                  <AccordionTrigger>{t("faq.deliveryTime.question")}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">{t("faq.deliveryTime.answer")}</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            <section className="bg-white/50 backdrop-blur-sm p-6 rounded-lg shadow-sm text-center">
              <h2 className="text-xl font-semibold mb-4">{t("faq.moreQuestions")}</h2>
              <p className="text-muted-foreground mb-6">
                {t("faq.moreQuestionsText")}
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
