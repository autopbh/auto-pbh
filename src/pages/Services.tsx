import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Car, 
  Truck, 
  Shield, 
  PhoneCall,
  Banknote,
  Wrench,
  Clock,
  Map,
  CheckCircle,
  Award,
  UserCheck,
  Sparkles
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const Services = () => {
  const { t } = useLanguage();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">{t("services.title")}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("services.subtitle")}
            </p>
          </div>
          
          <div className="space-y-16">
            <section className="bg-white/50 backdrop-blur-sm p-8 rounded-lg shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-autop-red rounded-full p-3">
                  <Car className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">{t("services.purchase.title")}</h2>
                  <p className="text-muted-foreground">{t("services.purchase.subtitle")}</p>
                </div>
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                {t("services.purchase.description")}
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <Card className="border-autop-red/20">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-3 flex items-center">
                      <CheckCircle className="h-5 w-5 text-autop-red mr-2" />
                      {t("services.purchase.evaluation")}
                    </h3>
                    <p className="text-muted-foreground">
                      {t("services.purchase.evaluation.desc")}
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-autop-red/20">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-3 flex items-center">
                      <CheckCircle className="h-5 w-5 text-autop-red mr-2" />
                      {t("services.purchase.tradein")}
                    </h3>
                    <p className="text-muted-foreground">
                      {t("services.purchase.tradein.desc")}
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-autop-red/20">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-3 flex items-center">
                      <CheckCircle className="h-5 w-5 text-autop-red mr-2" />
                      {t("services.purchase.transaction")}
                    </h3>
                    <p className="text-muted-foreground">
                      {t("services.purchase.transaction.desc")}
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-autop-red/20">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-3 flex items-center">
                      <CheckCircle className="h-5 w-5 text-autop-red mr-2" />
                      {t("services.purchase.admin")}
                    </h3>
                    <p className="text-muted-foreground">
                      {t("services.purchase.admin.desc")}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="bg-white/50 backdrop-blur-sm p-8 rounded-lg shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-autop-red rounded-full p-3">
                  <Truck className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">{t("services.delivery.title")}</h2>
                  <p className="text-muted-foreground">{t("services.delivery.subtitle")}</p>
                </div>
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                {t("services.delivery.description")}
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gradient-to-br from-white to-autop-red/5 p-6 rounded-lg border border-autop-red/10">
                  <h3 className="font-semibold text-lg mb-3 flex items-center">
                    <Award className="h-5 w-5 text-autop-red mr-2" />
                    {t("services.delivery.transport")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("services.delivery.transport.desc")}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-white to-autop-red/5 p-6 rounded-lg border border-autop-red/10">
                  <h3 className="font-semibold text-lg mb-3 flex items-center">
                    <Award className="h-5 w-5 text-autop-red mr-2" />
                    {t("services.delivery.tracking")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("services.delivery.tracking.desc")}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-white to-autop-red/5 p-6 rounded-lg border border-autop-red/10">
                  <h3 className="font-semibold text-lg mb-3 flex items-center">
                    <Award className="h-5 w-5 text-autop-red mr-2" />
                    {t("services.delivery.customized")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("services.delivery.customized.desc")}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-white to-autop-red/5 p-6 rounded-lg border border-autop-red/10">
                  <h3 className="font-semibold text-lg mb-3 flex items-center">
                    <Award className="h-5 w-5 text-autop-red mr-2" />
                    {t("services.delivery.documentation")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("services.delivery.documentation.desc")}
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-white/50 backdrop-blur-sm p-8 rounded-lg shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-autop-red rounded-full p-3">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">Garantie Premium</h2>
                  <p className="text-muted-foreground">Une protection complète pour votre tranquillité d'esprit</p>
                </div>
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                Notre programme de garantie exclusive a été conçu pour répondre aux exigences les plus élevées :
              </p>
              
              <div className="bg-autop-red/5 p-8 rounded-lg mb-6">
                <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                  <div>
                    <h3 className="font-semibold text-xl mb-4 text-autop-red flex items-center">
                      <Sparkles className="h-5 w-5 mr-2" />
                      Couverture Mécanique Premium
                    </h3>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span><strong>24 mois</strong> minimum sur moteur et boîte de vitesses</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>Extension possible jusqu'à <strong>36 mois</strong></span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>Diagnostic complet avant chaque intervention</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>Pièces d'origine et main d'œuvre qualifiée</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-xl mb-4 text-autop-red flex items-center">
                      <Sparkles className="h-5 w-5 mr-2" />
                      Couverture Électronique & Multimédia
                    </h3>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>Garantie de <strong>12 mois</strong> sur tous les systèmes électroniques</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>Systèmes de navigation et d'infodivertissement</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>Aides à la conduite et capteurs</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>Mises à jour logicielles incluses</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-xl mb-4 text-autop-red flex items-center">
                      <Sparkles className="h-5 w-5 mr-2" />
                      Assistance Exclusive
                    </h3>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>Assistance routière <strong>24h/24, 7j/7</strong> dans toute l'Europe</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>Dépannage et remorquage sans frais additionnels</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>Hébergement ou transport alternatif en cas d'immobilisation</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>Rapatriement du véhicule si nécessaire</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-xl mb-4 text-autop-red flex items-center">
                      <Sparkles className="h-5 w-5 mr-2" />
                      Services Complémentaires
                    </h3>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>Véhicule de remplacement de catégorie équivalente</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>Service de conciergerie dédié pour toute question</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>Entretien préférentiel avec remise de 15%</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>Bilan annuel offert avec diagnostic complet</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <Link to="/warranty">
                    <Button className="bg-autop-red text-white hover:bg-autop-red/90">
                      Découvrir notre programme de garantie complet
                    </Button>
                  </Link>
                </div>
              </div>
            </section>

            <section className="bg-white/50 backdrop-blur-sm p-8 rounded-lg shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-autop-red rounded-full p-3">
                  <PhoneCall className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">Assistance Personnalisée</h2>
                  <p className="text-muted-foreground">Un service client d'exception à votre écoute</p>
                </div>
              </div>
              <p className="text-lg text-muted-foreground mb-8">
                Notre équipe d'experts est disponible pour vous accompagner dans toutes vos démarches automobiles :
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 border-l-4 border-autop-red pl-4">Service Client Premium</h3>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      <span className="font-medium text-foreground">Conseillers dédiés</span> — Chaque client bénéficie d'un conseiller personnel, 
                      expert dans les véhicules premium et formé pour répondre à vos exigences spécifiques.
                    </p>
                    <p>
                      <span className="font-medium text-foreground">Service multilingue</span> — Nos conseillers parlent couramment français, 
                      anglais, allemand, espagnol et portugais pour vous servir dans votre langue préférée.
                    </p>
                    <p>
                      <span className="font-medium text-foreground">Disponibilité étendue</span> — Joignables 7j/7 de 8h à 22h par téléphone, 
                      email, chat en ligne ou visioconférence selon votre préférence.
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4 border-l-4 border-autop-red pl-4">Support Technique Spécialisé</h3>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      <span className="font-medium text-foreground">Techniciens certifiés</span> — Notre équipe technique est certifiée par les 
                      constructeurs premium pour diagnostiquer et résoudre efficacement tout problème.
                    </p>
                    <p>
                      <span className="font-medium text-foreground">Assistance à distance</span> — Diagnostic préliminaire par visioconférence 
                      pour résoudre rapidement les problèmes mineurs sans déplacement.
                    </p>
                    <p>
                      <span className="font-medium text-foreground">Intervention rapide</span> — En cas de besoin, déploiement d'équipes 
                      techniques sous 24h dans toute l'Europe pour intervention sur site.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-autop-red/10 to-transparent p-6 rounded-lg">
                <h3 className="font-semibold text-xl mb-3 flex items-center">
                  <UserCheck className="h-5 w-5 text-autop-red mr-2" />
                  Notre Engagement Qualité
                </h3>
                <p className="text-muted-foreground mb-4">
                  L'excellence du service est au cœur de notre philosophie. Nous nous engageons à :
                </p>
                <div className="grid sm:grid-cols-3 gap-4 text-sm">
                  <div className="bg-white/50 p-4 rounded">
                    <p className="font-medium text-center">Réponse sous 2h à toute demande</p>
                  </div>
                  <div className="bg-white/50 p-4 rounded">
                    <p className="font-medium text-center">Suivi personnalisé de chaque dossier</p>
                  </div>
                  <div className="bg-white/50 p-4 rounded">
                    <p className="font-medium text-center">Satisfaction client garantie à 100%</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white/50 backdrop-blur-sm p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold mb-6 text-center">{t("services.additionalServices")}</h2>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <div className="bg-white/80 p-6 rounded-lg text-center shadow-sm border border-autop-red/10 hover:shadow-md transition-all">
                  <Banknote className="h-10 w-10 mx-auto mb-4 text-autop-red" />
                  <h3 className="font-semibold text-lg mb-2">{t("services.financing")}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t("services.financing.desc")}
                  </p>
                  <Link to="/financing" className="text-autop-red hover:underline text-sm font-medium">
                    {t("services.discoverOffers")}
                  </Link>
                </div>
                
                <div className="bg-white/80 p-6 rounded-lg text-center shadow-sm border border-autop-red/10 hover:shadow-md transition-all">
                  <Wrench className="h-10 w-10 mx-auto mb-4 text-autop-red" />
                  <h3 className="font-semibold text-lg mb-2">{t("services.afterSales")}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t("services.afterSales.desc")}
                  </p>
                  <Link to="/warranty" className="text-autop-red hover:underline text-sm font-medium">
                    {t("services.learnMore")}
                  </Link>
                </div>
                
                <div className="bg-white/80 p-6 rounded-lg text-center shadow-sm border border-autop-red/10 hover:shadow-md transition-all">
                  <Clock className="h-10 w-10 mx-auto mb-4 text-autop-red" />
                  <h3 className="font-semibold text-lg mb-2">{t("services.expressAppointment")}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t("services.expressAppointment.desc")}
                  </p>
                  <Link to="/contact" className="text-autop-red hover:underline text-sm font-medium">
                    {t("services.makeAppointment")}
                  </Link>
                </div>
                
                <div className="bg-white/80 p-6 rounded-lg text-center shadow-sm border border-autop-red/10 hover:shadow-md transition-all">
                  <Map className="h-10 w-10 mx-auto mb-4 text-autop-red" />
                  <h3 className="font-semibold text-lg mb-2">{t("services.international")}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t("services.international.desc")}
                  </p>
                  <Link to="/contact" className="text-autop-red hover:underline text-sm font-medium">
                    {t("services.contactUs")}
                  </Link>
                </div>
              </div>

              <div className="bg-autop-red/5 p-8 rounded-lg text-center">
                <h3 className="text-2xl font-semibold mb-4">{t("services.customService")}</h3>
                <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                  {t("services.customService.desc")}
                </p>
                <Link to="/contact">
                  <Button size="lg" className="bg-autop-red hover:bg-autop-red/90 text-white">
                    {t("services.contactPremiumTeam")}
                  </Button>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Services;
