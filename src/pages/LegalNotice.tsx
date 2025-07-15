
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";

const LegalNotice = () => {
  const { t } = useLanguage();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 mt-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-8">{t("legal.title")}</h1>
          
          <section className="bg-white/50 backdrop-blur-sm p-8 rounded-lg shadow-sm mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-autop-red">{t("legal.company")}</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">{t("legal.companyName")}</h3>
                <p className="text-muted-foreground whitespace-pre-line">
                  {t("legal.companyDetails")}
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">{t("legal.address")}</h3>
                <p className="text-muted-foreground whitespace-pre-line">
                  {t("legal.addressDetails")}
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">{t("legal.contact")}</h3>
                <p className="text-muted-foreground whitespace-pre-line">
                  {t("legal.contactDetails")}
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">{t("legal.publisher")}</h3>
                <p className="text-muted-foreground">
                  {t("legal.publisherDetails")}
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">{t("legal.hosting")}</h3>
                <p className="text-muted-foreground whitespace-pre-line">
                  {t("legal.hostingDetails")}
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">{t("legal.intellectual")}</h3>
                <p className="text-muted-foreground">
                  {t("legal.intellectualDetails")}
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">{t("legal.mediation")}</h3>
                <p className="text-muted-foreground">
                  {t("legal.mediationDetails")}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default LegalNotice;
