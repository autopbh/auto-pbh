
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
                      {t("services.purchase.evaluation.title")}
                    </h3>
                    <p className="text-muted-foreground">
                      {t("services.purchase.evaluation.description")}
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-autop-red/20">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-3 flex items-center">
                      <CheckCircle className="h-5 w-5 text-autop-red mr-2" />
                      {t("services.purchase.tradein.title")}
                    </h3>
                    <p className="text-muted-foreground">
                      {t("services.purchase.tradein.description")}
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-autop-red/20">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-3 flex items-center">
                      <CheckCircle className="h-5 w-5 text-autop-red mr-2" />
                      {t("services.purchase.transaction.title")}
                    </h3>
                    <p className="text-muted-foreground">
                      {t("services.purchase.transaction.description")}
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-autop-red/20">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-3 flex items-center">
                      <CheckCircle className="h-5 w-5 text-autop-red mr-2" />
                      {t("services.purchase.admin.title")}
                    </h3>
                    <p className="text-muted-foreground">
                      {t("services.purchase.admin.description")}
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
                    {t("services.delivery.premium.title")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("services.delivery.premium.description")}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-white to-autop-red/5 p-6 rounded-lg border border-autop-red/10">
                  <h3 className="font-semibold text-lg mb-3 flex items-center">
                    <Award className="h-5 w-5 text-autop-red mr-2" />
                    {t("services.delivery.tracking.title")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("services.delivery.tracking.description")}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-white to-autop-red/5 p-6 rounded-lg border border-autop-red/10">
                  <h3 className="font-semibold text-lg mb-3 flex items-center">
                    <Award className="h-5 w-5 text-autop-red mr-2" />
                    {t("services.delivery.personalized.title")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("services.delivery.personalized.description")}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-white to-autop-red/5 p-6 rounded-lg border border-autop-red/10">
                  <h3 className="font-semibold text-lg mb-3 flex items-center">
                    <Award className="h-5 w-5 text-autop-red mr-2" />
                    {t("services.delivery.documentation.title")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("services.delivery.documentation.description")}
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
                  <h2 className="text-2xl font-semibold">{t("services.warranty.title")}</h2>
                  <p className="text-muted-foreground">{t("services.warranty.subtitle")}</p>
                </div>
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                {t("services.warranty.description")}
              </p>
              
              <div className="bg-autop-red/5 p-8 rounded-lg mb-6">
                <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                  <div>
                    <h3 className="font-semibold text-xl mb-4 text-autop-red flex items-center">
                      <Sparkles className="h-5 w-5 mr-2" />
                      {t("services.warranty.mechanical.title")}
                    </h3>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span><strong>{t("services.warranty.mechanical.bullet1")}</strong></span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>{t("services.warranty.mechanical.bullet2")}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>{t("services.warranty.mechanical.bullet3")}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>{t("services.warranty.mechanical.bullet4")}</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-xl mb-4 text-autop-red flex items-center">
                      <Sparkles className="h-5 w-5 mr-2" />
                      {t("services.warranty.electronic.title")}
                    </h3>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span><strong>{t("services.warranty.electronic.bullet1")}</strong></span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>{t("services.warranty.electronic.bullet2")}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>{t("services.warranty.electronic.bullet3")}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>{t("services.warranty.electronic.bullet4")}</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-xl mb-4 text-autop-red flex items-center">
                      <Sparkles className="h-5 w-5 mr-2" />
                      {t("services.warranty.assistance.title")}
                    </h3>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span><strong>{t("services.warranty.assistance.bullet1")}</strong></span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>{t("services.warranty.assistance.bullet2")}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>{t("services.warranty.assistance.bullet3")}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>{t("services.warranty.assistance.bullet4")}</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-xl mb-4 text-autop-red flex items-center">
                      <Sparkles className="h-5 w-5 mr-2" />
                      {t("services.warranty.additional.title")}
                    </h3>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>{t("services.warranty.additional.bullet1")}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>{t("services.warranty.additional.bullet2")}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>{t("services.warranty.additional.bullet3")}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>{t("services.warranty.additional.bullet4")}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <Link to="/warranty">
                    <Button className="bg-autop-red text-white hover:bg-autop-red/90">
                      {t("services.warranty.discover")}
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
                  <h2 className="text-2xl font-semibold">{t("services.assistance.title")}</h2>
                  <p className="text-muted-foreground">{t("services.assistance.subtitle")}</p>
                </div>
              </div>
              <p className="text-lg text-muted-foreground mb-8">
                {t("services.assistance.description")}
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 border-l-4 border-autop-red pl-4">{t("services.assistance.premium.title")}</h3>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      <span className="font-medium text-foreground">{t("services.assistance.premium.advisors")}</span> — {t("services.assistance.premium.advisors.description")}
                    </p>
                    <p>
                      <span className="font-medium text-foreground">{t("services.assistance.premium.multilingual")}</span> — {t("services.assistance.premium.multilingual.description")}
                    </p>
                    <p>
                      <span className="font-medium text-foreground">{t("services.assistance.premium.availability")}</span> — {t("services.assistance.premium.availability.description")}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4 border-l-4 border-autop-red pl-4">{t("services.assistance.technical.title")}</h3>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      <span className="font-medium text-foreground">{t("services.assistance.technical.certified")}</span> — {t("services.assistance.technical.certified.description")}
                    </p>
                    <p>
                      <span className="font-medium text-foreground">{t("services.assistance.technical.remote")}</span> — {t("services.assistance.technical.remote.description")}
                    </p>
                    <p>
                      <span className="font-medium text-foreground">{t("services.assistance.technical.rapid")}</span> — {t("services.assistance.technical.rapid.description")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-autop-red/10 to-transparent p-6 rounded-lg">
                <h3 className="font-semibold text-xl mb-3 flex items-center">
                  <UserCheck className="h-5 w-5 text-autop-red mr-2" />
                  {t("services.assistance.commitment.title")}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {t("services.assistance.commitment.description")}
                </p>
                <div className="grid sm:grid-cols-3 gap-4 text-sm">
                  <div className="bg-white/50 p-4 rounded">
                    <p className="font-medium text-center">{t("services.assistance.commitment.response")}</p>
                  </div>
                  <div className="bg-white/50 p-4 rounded">
                    <p className="font-medium text-center">{t("services.assistance.commitment.followup")}</p>
                  </div>
                  <div className="bg-white/50 p-4 rounded">
                    <p className="font-medium text-center">{t("services.assistance.commitment.satisfaction")}</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white/50 backdrop-blur-sm p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold mb-6 text-center">{t("services.additional.title")}</h2>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <div className="bg-white/80 p-6 rounded-lg text-center shadow-sm border border-autop-red/10 hover:shadow-md transition-all">
                  <Banknote className="h-10 w-10 mx-auto mb-4 text-autop-red" />
                  <h3 className="font-semibold text-lg mb-2">{t("services.additional.financing.title")}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t("services.additional.financing.description")}
                  </p>
                  <Link to="/financing" className="text-autop-red hover:underline text-sm font-medium">
                    {t("services.additional.financing.cta")}
                  </Link>
                </div>
                
                <div className="bg-white/80 p-6 rounded-lg text-center shadow-sm border border-autop-red/10 hover:shadow-md transition-all">
                  <Wrench className="h-10 w-10 mx-auto mb-4 text-autop-red" />
                  <h3 className="font-semibold text-lg mb-2">{t("services.additional.aftersales.title")}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t("services.additional.aftersales.description")}
                  </p>
                  <Link to="/warranty" className="text-autop-red hover:underline text-sm font-medium">
                    {t("services.additional.aftersales.cta")}
                  </Link>
                </div>
                
                <div className="bg-white/80 p-6 rounded-lg text-center shadow-sm border border-autop-red/10 hover:shadow-md transition-all">
                  <Clock className="h-10 w-10 mx-auto mb-4 text-autop-red" />
                  <h3 className="font-semibold text-lg mb-2">{t("services.additional.express.title")}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t("services.additional.express.description")}
                  </p>
                  <Link to="/contact" className="text-autop-red hover:underline text-sm font-medium">
                    {t("services.additional.express.cta")}
                  </Link>
                </div>
                
                <div className="bg-white/80 p-6 rounded-lg text-center shadow-sm border border-autop-red/10 hover:shadow-md transition-all">
                  <Map className="h-10 w-10 mx-auto mb-4 text-autop-red" />
                  <h3 className="font-semibold text-lg mb-2">{t("services.additional.international.title")}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t("services.additional.international.description")}
                  </p>
                  <Link to="/contact" className="text-autop-red hover:underline text-sm font-medium">
                    {t("services.additional.international.cta")}
                  </Link>
                </div>
              </div>

              <div className="bg-autop-red/5 p-8 rounded-lg text-center">
                <h3 className="text-2xl font-semibold mb-4">{t("services.custom.title")}</h3>
                <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                  {t("services.custom.description")}
                </p>
                <Link to="/contact">
                  <Button size="lg" className="bg-autop-red hover:bg-autop-red/90 text-white">
                    {t("services.custom.cta")}
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

