
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
                  {t("about.history.title")}
                </h2>
                <div className="prose prose-lg text-muted-foreground">
                  <p className="mb-4">
                    {t("about.history.paragraph1")}
                  </p>
                  <p className="mb-4">
                    {t("about.history.paragraph2")}
                  </p>
                  <p>
                    {t("about.history.paragraph3")}
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
                      <p className="font-semibold">{t("about.evolution.2010.title")}</p>
                      <p className="text-sm text-muted-foreground">
                        {t("about.evolution.2010.description")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                      <span className="font-bold text-autop-red">2013</span>
                    </div>
                    <div>
                      <p className="font-semibold">{t("about.evolution.2013.title")}</p>
                      <p className="text-sm text-muted-foreground">
                        {t("about.evolution.2013.description")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                      <span className="font-bold text-autop-red">2016</span>
                    </div>
                    <div>
                      <p className="font-semibold">{t("about.evolution.2016.title")}</p>
                      <p className="text-sm text-muted-foreground">
                        {t("about.evolution.2016.description")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                      <span className="font-bold text-autop-red">2019</span>
                    </div>
                    <div>
                      <p className="font-semibold">{t("about.evolution.2019.title")}</p>
                      <p className="text-sm text-muted-foreground">
                        {t("about.evolution.2019.description")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                      <span className="font-bold text-autop-red">2022</span>
                    </div>
                    <div>
                      <p className="font-semibold">{t("about.evolution.2022.title")}</p>
                      <p className="text-sm text-muted-foreground">
                        {t("about.evolution.2022.description")}
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
                    <h3 className="font-semibold text-lg mb-2">{t("about.philosophy.excellence.title")}</h3>
                    <p className="text-muted-foreground">
                      {t("about.philosophy.excellence.description")}
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-autop-red/10">
                  <CardContent className="pt-6 text-center">
                    <div className="bg-autop-red/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="h-8 w-8 text-autop-red" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{t("about.philosophy.transparency.title")}</h3>
                    <p className="text-muted-foreground">
                      {t("about.philosophy.transparency.description")}
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-autop-red/10">
                  <CardContent className="pt-6 text-center">
                    <div className="bg-autop-red/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="h-8 w-8 text-autop-red" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{t("about.philosophy.passion.title")}</h3>
                    <p className="text-muted-foreground">
                      {t("about.philosophy.passion.description")}
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
                      {t("about.expertise.keyFigures.title")}
                    </h3>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>{t("about.expertise.keyFigures.item1")}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>{t("about.expertise.keyFigures.item2")}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>{t("about.expertise.keyFigures.item3")}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>{t("about.expertise.keyFigures.item4")}</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-xl mb-4 flex items-center">
                      <Users className="h-5 w-5 text-autop-red mr-2" />
                      {t("about.expertise.team.title")}
                    </h3>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>{t("about.expertise.team.item1")}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>{t("about.expertise.team.item2")}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>{t("about.expertise.team.item3")}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>{t("about.expertise.team.item4")}</span>
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
                    {t("about.commitment.description")}
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h4 className="font-semibold mb-3 border-l-3 border-autop-red pl-3">{t("about.commitment.customerCommitments.title")}</h4>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>{t("about.commitment.customerCommitments.item1")}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>{t("about.commitment.customerCommitments.item2")}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>{t("about.commitment.customerCommitments.item3")}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>{t("about.commitment.customerCommitments.item4")}</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3 border-l-3 border-autop-red pl-3">{t("about.commitment.responsibility.title")}</h4>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>{t("about.commitment.responsibility.item1")}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>{t("about.commitment.responsibility.item2")}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>{t("about.commitment.responsibility.item3")}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>{t("about.commitment.responsibility.item4")}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <section className="bg-autop-red/5 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-semibold mb-4">{t("about.joinUs.title")}</h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              {t("about.joinUs.description")}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/catalog">
                <Button size="lg" className="bg-autop-red hover:bg-autop-red/90 text-white">
                  {t("about.joinUs.exploreCatalog")}
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="border-autop-red text-autop-red hover:bg-autop-red/10">
                  {t("about.joinUs.contactExpert")}
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
