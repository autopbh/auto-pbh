
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Shield, Lock, Database } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

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
            <h2 className="text-2xl font-semibold mb-6 text-autop-red">{t("privacy.description")}</h2>
            
            <div className="space-y-6 mb-8">
              <p className="text-lg">
                {t("privacy.statement")}
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="bg-autop-red/10 h-16 w-16 flex items-center justify-center rounded-full mx-auto mb-4">
                  <Database className="h-8 w-8 text-autop-red" />
                </div>
                <h3 className="text-lg font-medium mb-2">Données Collectées</h3>
                <ul className="text-sm text-muted-foreground text-left space-y-1">
                  <li>• Informations d'identité</li>
                  <li>• Coordonnées de contact</li>
                  <li>• Historique d'achats</li>
                  <li>• Préférences automobiles</li>
                  <li>• Données de navigation</li>
                </ul>
              </div>
              
              <div className="text-center">
                <div className="bg-autop-red/10 h-16 w-16 flex items-center justify-center rounded-full mx-auto mb-4">
                  <Lock className="h-8 w-8 text-autop-red" />
                </div>
                <h3 className="text-lg font-medium mb-2">Utilisation des Données</h3>
                <ul className="text-sm text-muted-foreground text-left space-y-1">
                  <li>• Traitement des commandes</li>
                  <li>• Service client personnalisé</li>
                  <li>• Amélioration de nos services</li>
                  <li>• Communication ciblée</li>
                  <li>• Obligations légales</li>
                </ul>
              </div>
              
              <div className="text-center">
                <div className="bg-autop-red/10 h-16 w-16 flex items-center justify-center rounded-full mx-auto mb-4">
                  <Shield className="h-8 w-8 text-autop-red" />
                </div>
                <h3 className="text-lg font-medium mb-2">Protection des Données</h3>
                <ul className="text-sm text-muted-foreground text-left space-y-1">
                  <li>• Chiffrement SSL</li>
                  <li>• Accès restreint</li>
                  <li>• Audits réguliers</li>
                  <li>• Formation du personnel</li>
                  <li>• Mise à jour continue</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Conservation des Données</h3>
                <p className="text-muted-foreground">
                  Vos données personnelles sont conservées pour la durée nécessaire à l'accomplissement des finalités pour 
                  lesquelles elles ont été collectées, conformément au Règlement Général sur la Protection des Données (RGPD). 
                  Les données relatives aux achats sont conservées pendant 10 ans à des fins comptables et fiscales.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">Vos Droits</h3>
                <p className="text-muted-foreground mb-3">
                  Conformément au RGPD, vous disposez des droits suivants concernant vos données personnelles :
                </p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Droit d'accès et de rectification</li>
                  <li>• Droit à l'effacement (« droit à l'oubli »)</li>
                  <li>• Droit à la limitation du traitement</li>
                  <li>• Droit à la portabilité</li>
                  <li>• Droit d'opposition</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">Contact</h3>
                <p className="text-muted-foreground">
                  Pour toute question relative à la protection de vos données personnelles ou pour exercer vos droits, 
                  vous pouvez nous contacter à l'adresse : privacy@autopbh.com ou par courrier à notre adresse postale.
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
