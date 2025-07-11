
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Shield, Lock, Database } from "lucide-react";

const Privacy = () => {
  const { t } = useLanguage();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 mt-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-8">{t("privacy.title")}</h1>
          
          <section className="bg-white/50 backdrop-blur-sm p-8 rounded-lg shadow-sm mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-autop-red">{t("privacy.policyTitle")}</h2>
            
            <div className="space-y-6 mb-8">
              <p className="text-lg">
                {t("privacy.introduction")}
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="bg-autop-red/10 h-16 w-16 flex items-center justify-center rounded-full mx-auto mb-4">
                  <Database className="h-8 w-8 text-autop-red" />
                </div>
                <h3 className="text-lg font-medium mb-2">{t("privacy.dataCollected")}</h3>
                <ul className="text-sm text-muted-foreground text-left space-y-1">
                  <li>• {t("privacy.identityInfo")}</li>
                  <li>• {t("privacy.contactInfo")}</li>
                  <li>• {t("privacy.purchaseHistory")}</li>
                  <li>• {t("privacy.autoPreferences")}</li>
                  <li>• {t("privacy.navigationData")}</li>
                </ul>
              </div>
              
              <div className="text-center">
                <div className="bg-autop-red/10 h-16 w-16 flex items-center justify-center rounded-full mx-auto mb-4">
                  <Lock className="h-8 w-8 text-autop-red" />
                </div>
                <h3 className="text-lg font-medium mb-2">{t("privacy.dataUsage")}</h3>
                <ul className="text-sm text-muted-foreground text-left space-y-1">
                  <li>• {t("privacy.orderProcessing")}</li>
                  <li>• {t("privacy.customerService")}</li>
                  <li>• {t("privacy.serviceImprovement")}</li>
                  <li>• {t("privacy.targetedCommunication")}</li>
                  <li>• {t("privacy.legalObligations")}</li>
                </ul>
              </div>
              
              <div className="text-center">
                <div className="bg-autop-red/10 h-16 w-16 flex items-center justify-center rounded-full mx-auto mb-4">
                  <Shield className="h-8 w-8 text-autop-red" />
                </div>
                <h3 className="text-lg font-medium mb-2">{t("privacy.dataProtection")}</h3>
                <ul className="text-sm text-muted-foreground text-left space-y-1">
                  <li>• {t("privacy.sslEncryption")}</li>
                  <li>• {t("privacy.restrictedAccess")}</li>
                  <li>• {t("privacy.regularAudits")}</li>
                  <li>• {t("privacy.staffTraining")}</li>
                  <li>• {t("privacy.continuousUpdates")}</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">{t("privacy.dataRetention")}</h3>
                <p className="text-muted-foreground">
                  {t("privacy.retentionDescription")}
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">{t("privacy.yourRights")}</h3>
                <p className="text-muted-foreground mb-3">
                  {t("privacy.rightsDescription")}
                </p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• {t("privacy.accessRight")}</li>
                  <li>• {t("privacy.erasureRight")}</li>
                  <li>• {t("privacy.limitationRight")}</li>
                  <li>• {t("privacy.portabilityRight")}</li>
                  <li>• {t("privacy.oppositionRight")}</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">{t("privacy.contact")}</h3>
                <p className="text-muted-foreground">
                  {t("privacy.contactDescription")}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;
