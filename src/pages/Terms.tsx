
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const Terms = () => {
  const { t } = useLanguage();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 mt-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-8">{t("terms.title")}</h1>
          
          <section className="bg-white/50 backdrop-blur-sm p-8 rounded-lg shadow-sm mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-autop-red">{t("terms.shortVersion")}</h2>
            
            <div className="space-y-6 mb-8">
              <p className="text-lg">
                {t("terms.keyPoints")}
              </p>
              
              <ul className="space-y-4 list-disc pl-5">
                <li>
                  <span className="font-medium">{t("terms.withdrawalPeriod")}</span> {t("terms.withdrawalPeriodDesc")}
                </li>
                <li>
                  <span className="font-medium">{t("terms.jurisdiction")}</span> {t("terms.jurisdictionDesc")}
                </li>
                <li>
                  <span className="font-medium">{t("terms.legalWarranties")}</span> {t("terms.legalWarrantiesDesc")}
                </li>
                <li>
                  <span className="font-medium">{t("terms.reservation")}</span> {t("terms.reservationDesc")}
                </li>
                <li>
                  <span className="font-medium">{t("terms.delivery")}</span> {t("terms.deliveryDesc")}
                </li>
                <li>
                  <span className="font-medium">{t("terms.documents")}</span> {t("terms.documentsDesc")}
                </li>
              </ul>
              
              <div className="text-center mt-8">
                <Button className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  {t("terms.readFullVersion")}
                </Button>
              </div>
            </div>
            
            <div className="border-t pt-6">
              <h3 className="text-xl font-semibold mb-4">{t("terms.mainArticles")}</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">{t("terms.article1Title")}</h4>
                  <p className="text-muted-foreground">
                    {t("terms.article1Content")}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">{t("terms.article2Title")}</h4>
                  <p className="text-muted-foreground">
                    {t("terms.article2Content")}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">{t("terms.article3Title")}</h4>
                  <p className="text-muted-foreground">
                    {t("terms.article3Content")}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
