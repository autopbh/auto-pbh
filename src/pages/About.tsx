
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Award, TrendingUp, Users, Shield, Heart, Target } from "lucide-react";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">Notre Histoire</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Depuis plus d'une décennie, AUTO PBH redéfinit l'excellence dans le secteur des véhicules premium.
            </p>
          </div>
          
          <section className="bg-white/50 backdrop-blur-sm p-8 rounded-lg shadow-sm mb-16">
            <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
              <div className="md:w-1/2">
                <h2 className="text-2xl font-semibold mb-4 text-autop-red border-b border-autop-red/20 pb-2">
                  Une Passion Née en 2010
                </h2>
                <div className="prose prose-lg text-muted-foreground">
                  <p className="mb-4">
                    AUTO PBH a été fondé par Paulo Henriques, passionné d'automobiles premium et ancien directeur 
                    commercial chez un constructeur de prestige. Sa vision : créer une entreprise où l'excellence,
                    la transparence et le service personnalisé seraient au cœur de chaque transaction.
                  </p>
                  <p className="mb-4">
                    Débutant avec une équipe restreinte de 5 experts et une sélection limitée de véhicules, 
                    l'entreprise s'est rapidement distinguée par sa rigueur et son approche centrée sur le client, 
                    devenant une référence pour les connaisseurs et collectionneurs exigeants.
                  </p>
                  <p>
                    Aujourd'hui, AUTO PBH est fière de compter plus de 30 professionnels passionnés et 
                    d'offrir un catalogue en constante évolution de véhicules soigneusement sélectionnés
                    pour répondre aux plus hautes exigences de qualité et d'exclusivité.
                  </p>
                </div>
              </div>
              <div className="md:w-1/2 bg-gradient-to-br from-autop-red/5 to-autop-red/10 p-6 rounded-lg">
                <h3 className="font-semibold text-xl mb-4 text-center">Notre Évolution</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                      <span className="font-bold text-autop-red">2010</span>
                    </div>
                    <div>
                      <p className="font-semibold">Création d'AUTO PBH à Rotterdam</p>
                      <p className="text-sm text-muted-foreground">
                        Fondation avec une vision d'excellence et une équipe de 5 passionnés
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                      <span className="font-bold text-autop-red">2013</span>
                    </div>
                    <div>
                      <p className="font-semibold">Expansion européenne</p>
                      <p className="text-sm text-muted-foreground">
                        Développement d'un réseau de partenaires dans 6 pays européens
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                      <span className="font-bold text-autop-red">2016</span>
                    </div>
                    <div>
                      <p className="font-semibold">Lancement du programme de garantie premium</p>
                      <p className="text-sm text-muted-foreground">
                        Création d'un programme de garantie sans précédent dans l'industrie
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                      <span className="font-bold text-autop-red">2019</span>
                    </div>
                    <div>
                      <p className="font-semibold">Certification ISO 9001 pour notre qualité de service</p>
                      <p className="text-sm text-muted-foreground">
                        Reconnaissance internationale de nos processus d'excellence
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                      <span className="font-bold text-autop-red">2022</span>
                    </div>
                    <div>
                      <p className="font-semibold">Modernisation digitale et expérience client enrichie</p>
                      <p className="text-sm text-muted-foreground">
                        Investissement majeur dans les technologies et l'expérience client omnicanale
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="my-12">
              <h2 className="text-2xl font-semibold mb-8 text-autop-red border-b border-autop-red/20 pb-2">
                Notre Philosophie
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="border-autop-red/10">
                  <CardContent className="pt-6 text-center">
                    <div className="bg-autop-red/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="h-8 w-8 text-autop-red" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Excellence</h3>
                    <p className="text-muted-foreground">
                      Nous ne proposons que l'exceptionnel. Chaque véhicule est méticuleusement inspecté 
                      selon plus de 200 points de contrôle et doit répondre à nos standards rigoureux.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-autop-red/10">
                  <CardContent className="pt-6 text-center">
                    <div className="bg-autop-red/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="h-8 w-8 text-autop-red" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Transparence</h3>
                    <p className="text-muted-foreground">
                      Nous partageons l'historique complet de chaque véhicule, sans rien dissimuler. 
                      Cette transparence totale est la base de la confiance que nos clients nous accordent.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-autop-red/10">
                  <CardContent className="pt-6 text-center">
                    <div className="bg-autop-red/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="h-8 w-8 text-autop-red" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Passion</h3>
                    <p className="text-muted-foreground">
                      Notre équipe partage une passion authentique pour l'automobile d'exception. 
                      Cette passion se traduit par une connaissance approfondie et un service inégalé.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="my-12">
              <h2 className="text-2xl font-semibold mb-8 text-autop-red border-b border-autop-red/20 pb-2">
                Notre Expertise
              </h2>
              
              <div className="bg-gradient-to-br from-white to-autop-red/5 p-8 rounded-lg mb-8">
                <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                  <div>
                    <h3 className="font-semibold text-xl mb-4 flex items-center">
                      <TrendingUp className="h-5 w-5 text-autop-red mr-2" />
                      Chiffres Clés
                    </h3>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span><strong>Plus de 1500</strong> véhicules premium livrés depuis 2010</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span><strong>Réseau de partenaires</strong> dans 12 pays européens</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span><strong>Taux de satisfaction client</strong> supérieur à 98%</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span><strong>30 experts</strong> passionnés à votre service</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-xl mb-4 flex items-center">
                      <Users className="h-5 w-5 text-autop-red mr-2" />
                      Notre équipe d'experts
                    </h3>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span><strong>Conseillers certifiés</strong> par les plus grands constructeurs</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span><strong>Techniciens qualifiés</strong> avec minimum 10 ans d'expérience</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span><strong>Spécialistes en authenticité</strong> pour modèles de collection</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span><strong>Formation continue</strong> sur les nouvelles technologies</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="my-12">
              <h2 className="text-2xl font-semibold mb-8 text-autop-red border-b border-autop-red/20 pb-2">
                Notre Engagement
              </h2>
              
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="mb-6">
                  <h3 className="font-semibold text-xl mb-3 flex items-center">
                    <Target className="h-5 w-5 text-autop-red mr-2" />
                    La Satisfaction Client au Centre de Notre Démarche
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Chez AUTO PBH, notre engagement va bien au-delà de la simple transaction commerciale. 
                    Nous cultivons des relations durables basées sur la confiance et l'excellence du service.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h4 className="font-semibold mb-3 border-l-3 border-autop-red pl-3">Nos Engagements Clients</h4>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>Transparence totale sur l'historique et l'état des véhicules</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>Prix compétitifs avec garantie du meilleur rapport qualité-prix</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>Accompagnement personnalisé tout au long de votre parcours</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>Suivi après-vente proactif et service réactif</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3 border-l-3 border-autop-red pl-3">Notre Responsabilité</h4>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>Programme de compensation carbone pour réduire notre empreinte</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>Promotion des véhicules électriques et hybrides premium</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>Pratiques commerciales éthiques et équitables</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                        <span>Soutien à des initiatives caritatives locales et internationales</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <section className="bg-autop-red/5 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-semibold mb-4">Rejoignez l'Univers AUTO PBH</h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Découvrez notre sélection exceptionnelle de véhicules premium et laissez-nous vous accompagner
              dans votre recherche du véhicule parfait.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/catalog">
                <Button size="lg" className="bg-autop-red hover:bg-autop-red/90 text-white">
                  Explorer Notre Catalogue
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="border-autop-red text-autop-red hover:bg-autop-red/10">
                  Contacter Un Expert
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
