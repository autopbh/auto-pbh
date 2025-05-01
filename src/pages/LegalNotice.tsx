
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
            <h2 className="text-2xl font-semibold mb-6 text-autop-red">{t("legal.companyInfo")}</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Raison Sociale</h3>
                <p className="text-muted-foreground">
                  AUTO PBH<br />
                  Société à responsabilité limitée (SARL)<br />
                  Capital social : 100 000 €<br />
                  Immatriculation au Registre du Commerce des Pays-Bas : KVK 87654321<br />
                  Numéro de TVA intracommunautaire : NL123456789B01
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">Siège Social</h3>
                <p className="text-muted-foreground">
                  Autolettestraat 10<br />
                  3063 NP Rotterdam<br />
                  Pays-Bas
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">Contact</h3>
                <p className="text-muted-foreground">
                  Téléphone : +351 961 196 405<br />
                  Email : pbhauto@gmail.com
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">Direction de la Publication</h3>
                <p className="text-muted-foreground">
                  M. Pierre B., en qualité de gérant de AUTO PBH.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">Hébergement</h3>
                <p className="text-muted-foreground">
                  Le site www.autopbh.com est hébergé par:<br />
                  Société Lovable Technology<br />
                  2093 Philadelphia Pike #5620<br />
                  Claymont, DE 19703<br />
                  États-Unis
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">Propriété Intellectuelle</h3>
                <p className="text-muted-foreground">
                  L'ensemble du contenu du site www.autopbh.com (images, textes, logos, graphismes, etc.) est la propriété 
                  exclusive de AUTO PBH ou de ses partenaires. Toute reproduction partielle ou totale du contenu est strictement 
                  interdite sans autorisation préalable.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">Médiation et Litiges</h3>
                <p className="text-muted-foreground">
                  Conformément aux dispositions du Code de la consommation concernant le règlement amiable des litiges, 
                  AUTO PBH adhère au Service du Médiateur européen. Vous pouvez recourir gratuitement au service de médiation 
                  accessible via le site www.mediationeurope-consommation.eu
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
