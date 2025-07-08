
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Award, TrendingUp, Users, Shield, Heart, Target } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">{t("about.title")}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("about.subtitle")}
            </p>
          </div>
          
          <section className="bg-white/50 backdrop-blur-sm p-8 rounded-lg shadow-sm mb-16">
            <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
              <div className="md:w-1/2">
                <h2 className="text-2xl font-semibold mb-4 text-autop-red border-b border-autop-red/20 pb-2">
                  {t("about.passion.title")}
                </h2>
                <div className="prose prose-lg text-muted-foreground">
                  <p className="mb-4">
                    {t("about.passion.text1")}
                  </p>
                  <p className="mb-4">
                    {t("about.passion.text2")}
                  </p>
                  <p>
                    {t("about.passion.text3")}
                  </p>
                </div>
              </div>
              <div className="md:w-1/2 bg-gradient-to-br from-autop-red/5 to-autop-red/10 p-6 rounded-lg">
                <h3 className="font-semibold text-xl mb-4 text-center">{t("about.evolution.title")}</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                      <span className="font-bold text-autop-red">2010</span>
                    </div>
                    <div>
                      <p className="font-semibold">{t("about.evolution.2010")}</p>
                      <p className="text-sm text-muted-foreground">
                        {t("about.evolution.2010.desc")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                      <span className="font-bold text-autop-red">2013</span>
                    </div>
                    <div>
                      <p className="font-semibold">{t("about.evolution.2013")}</p>
                      <p className="text-sm text-muted-foreground">
                        {t("about.evolution.2013.desc")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                      <span className="font-bold text-autop-red">2016</span>
                    </div>
                    <div>
                      <p className="font-semibold">{t("about.evolution.2016")}</p>
                      <p className="text-sm text-muted-foreground">
                        {t("about.evolution.2016.desc")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                      <span className="font-bold text-autop-red">2019</span>
                    </div>
                    <div>
                      <p className="font-semibold">{t("about.evolution.2019")}</p>
                      <p className="text-sm text-muted-foreground">
                        {t("about.evolution.2019.desc")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                      <span className="font-bold text-autop-red">2022</span>
                    </div>
                    <div>
                      <p className="font-semibold">{t("about.evolution.2022")}</p>
                      <p className="text-sm text-muted-foreground">
                        {t("about.evolution.2022.desc")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="my-12">
              <h2 className="text-2xl font-semibold mb-8 text-autop-red border-b border-autop-red/20 pb-2">
                {t("about.philosophy.title")}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="border-autop-red/10">
                  <CardContent className="pt-6 text-center">
                    <div className="bg-autop-red/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="h-8 w-8 text-autop-red" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{t("about.philosophy.excellence")}</h3>
                    <p className="text-muted-foreground">
                      {t("about.philosophy.excellence.desc")}
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-autop-red/10">
                  <CardContent className="pt-6 text-center">
                    <div className="bg-autop-red/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="h-8 w-8 text-autop-red" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{t("about.philosophy.transparency")}</h3>
                    <p className="text-muted-foreground">
                      {t("about.philosophy.transparency.desc")}
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-autop-red/10">
                  <CardContent className="pt-6 text-center">
                    <div className="bg-autop-red/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="h-8 w-8 text-autop-red" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{t("about.philosophy.passion")}</h3>
                    <p className="text-muted-foreground">
                      {t("about.philosophy.passion.desc")}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="my-12">
              <h2 className="text-2xl font-semibold mb-8 text-autop-red border-b border-autop-red/20 pb-2">
                {t("about.expertise.title")}
              </h2>
              
              <div className="bg-gradient-to-br from-white to-autop-red/5 p-8 rounded-lg mb-8">
                <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                  <div>
                    <h3 className="font-semibold text-xl mb-4 flex items-center">
                      <TrendingUp className="h-5 w-5 text-autop-red mr-2" />
                      {t("about.expertise.keyFigures")}
                    </h3>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>{t("about.expertise.vehicles")}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>{t("about.expertise.network")}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>{t("about.expertise.satisfaction")}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>{t("about.expertise.experts")}</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-xl mb-4 flex items-center">
                      <Users className="h-5 w-5 text-autop-red mr-2" />
                      {t("about.expertise.teamTitle")}
                    </h3>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>{t("about.expertise.advisors")}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>{t("about.expertise.technicians")}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>{t("about.expertise.specialists")}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>{t("about.expertise.training")}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="my-12">
              <h2 className="text-2xl font-semibold mb-8 text-autop-red border-b border-autop-red/20 pb-2">
                {t("about.commitment.title")}
              </h2>
              
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="mb-6">
                  <h3 className="font-semibold text-xl mb-3 flex items-center">
                    <Target className="h-5 w-5 text-autop-red mr-2" />
                    {t("about.commitment.subtitle")}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {t("about.commitment.text")}
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h4 className="font-semibold mb-3 border-l-3 border-autop-red pl-3">{t("about.commitment.clients")}</h4>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>{t("about.commitment.transparency")}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>{t("about.commitment.pricing")}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>{t("about.commitment.support")}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>{t("about.commitment.afterSales")}</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3 border-l-3 border-autop-red pl-3">{t("about.responsibility.title")}</h4>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>{t("about.responsibility.carbon")}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>{t("about.responsibility.electric")}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>{t("about.responsibility.ethics")}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>{t("about.responsibility.charity")}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <section className="bg-autop-red/5 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-semibold mb-4">{t("about.cta.title")}</h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              {t("about.cta.subtitle")}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/catalog">
                <Button size="lg" className="bg-autop-red hover:bg-autop-red/90 text-white">
                  {t("about.cta.explore")}
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="border-autop-red text-autop-red hover:bg-autop-red/10">
                  {t("about.cta.contact")}
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default About;
