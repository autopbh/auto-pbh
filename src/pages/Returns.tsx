
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeftRight, ShieldCheck, CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";

const Returns = () => {
  const { t } = useLanguage();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 mt-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-8">{t("returns.title")}</h1>
          
          <section className="bg-white/50 backdrop-blur-sm p-8 rounded-lg shadow-sm mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-autop-red">{t("returns.qualityCommitment")}</h2>
            
            <div className="mb-8">
              <div className="border-l-4 border-autop-red pl-4 italic mb-6">
                <p className="text-lg">
                  "{t("returns.unsatisfiedQuote")}"
                </p>
              </div>
              
              <p className="text-lg mb-4">
                {t("returns.description")}
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="bg-autop-red/10 h-16 w-16 flex items-center justify-center rounded-full mx-auto mb-4">
                  <CalendarClock className="h-8 w-8 text-autop-red" />
                </div>
                <h3 className="text-lg font-medium mb-2">{t("returns.sevenDaysTrial")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("returns.sevenDaysDescription")}
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-autop-red/10 h-16 w-16 flex items-center justify-center rounded-full mx-auto mb-4">
                  <ArrowLeftRight className="h-8 w-8 text-autop-red" />
                </div>
                <h3 className="text-lg font-medium mb-2">{t("returns.freeReturn")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("returns.freeReturnDescription")}
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-autop-red/10 h-16 w-16 flex items-center justify-center rounded-full mx-auto mb-4">
                  <ShieldCheck className="h-8 w-8 text-autop-red" />
                </div>
                <h3 className="text-lg font-medium mb-2">{t("returns.transparencyGuarantee")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("returns.transparencyDescription")}
                </p>
              </div>
            </div>
            
            <div className="bg-autop-red/5 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-semibold mb-4">{t("returns.returnConditions")}</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="h-5 w-5 bg-autop-red rounded-full flex-shrink-0 mt-1"></span>
                  <span>{t("returns.condition1")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-5 w-5 bg-autop-red rounded-full flex-shrink-0 mt-1"></span>
                  <span>{t("returns.condition2")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-5 w-5 bg-autop-red rounded-full flex-shrink-0 mt-1"></span>
                  <span>{t("returns.condition3")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-5 w-5 bg-autop-red rounded-full flex-shrink-0 mt-1"></span>
                  <span>{t("returns.condition4")}</span>
                </li>
              </ul>
            </div>
            
            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                {t("returns.contactMessage")}
              </p>
              <Button>
                {t("returns.contactAdvisorButton")}
              </Button>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Returns;
