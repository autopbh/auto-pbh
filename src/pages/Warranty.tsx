
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Shield, Clock, PhoneCall, Car, Wrench, CheckCircle, Award, Zap, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Warranty = () => {
  const { t } = useLanguage();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">{t("warranty.title")}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("warranty.subtitle")}
            </p>
          </div>
          
          <section className="bg-white/50 backdrop-blur-sm p-8 rounded-lg shadow-sm mb-16">
            <div className="mb-10">
              <h2 className="text-2xl font-semibold mb-6 text-autop-red border-b border-autop-red/20 pb-2">
                Notre Engagement d'Excellence
              </h2>
              <div className="grid md:grid-cols-2 gap-8 mb-6">
                <div>
                  <p className="text-lg mb-4">
                    Chez AUTO PBH, nous comprenons que l'acquisition d'un véhicule premium représente un 
                    investissement important. C'est pourquoi nous avons conçu le programme de garantie 
                    le plus complet du marché.
                  </p>
                  <p className="text-lg mb-4">
                    Notre garantie couvre non seulement les composants mécaniques essentiels, mais 
                    s'étend également aux systèmes électroniques sophistiqués qui équipent les véhicules 
                    premium modernes.
                  </p>
                  <p className="text-lg">
                    Chaque aspect de notre programme a été pensé pour vous offrir une protection maximale 
                    et un service d'exception en toutes circonstances.
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-autop-red/5 to-autop-red/10 p-6 rounded-lg flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4">
                    <Shield className="h-12 w-12 text-autop-red" />
                    <div>
                      <h3 className="text-xl font-semibold">Protection Intégrale</h3>
                      <p className="text-muted-foreground">Le programme le plus complet du marché</p>
                    </div>
                  </div>
                  <ul className="space-y-3 pl-4">
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-autop-red shrink-0" />
                      <span>Couverture étendue sur les composants mécaniques et électroniques</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-autop-red shrink-0" />
                      <span>Assistance routière premium incluse</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-autop-red shrink-0" />
                      <span>Entretien préférentiel dans notre réseau</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-autop-red shrink-0" />
                      <span>Transfert de garantie possible lors de la revente</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-8 text-autop-red border-b border-autop-red/20 pb-2">
                Couvertures Détaillées
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                <Card className="overflow-hidden border-autop-red/20">
                  <div className="bg-autop-red text-white p-4">
                    <div className="flex items-center gap-3">
                      <Shield className="h-6 w-6" />
                      <h3 className="text-xl font-medium">Garantie Mécanique & Boîte</h3>
                    </div>
                    <p className="mt-2 text-white/80 text-sm">La protection complète du cœur de votre véhicule</p>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-autop-red/10 rounded-full p-2">
                          <Clock className="h-5 w-5 text-autop-red" />
                        </div>
                        <div>
                          <p className="font-medium">Durée standard</p>
                          <p className="text-2xl font-bold text-autop-red">24 mois</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-sm bg-gray-50 p-3 rounded-lg">
                          <p className="font-medium">Extension possible</p>
                          <p>Jusqu'à 36 mois</p>
                        </div>
                        <div className="text-sm bg-gray-50 p-3 rounded-lg">
                          <p className="font-medium">Kilométrage</p>
                          <p>Illimité</p>
                        </div>
                      </div>
                      
                      <div className="pt-3">
                        <h4 className="font-medium mb-2 border-l-4 border-autop-red pl-2">Composants couverts:</h4>
                        <ul className="space-y-1 text-muted-foreground pl-4 list-disc">
                          <li>Bloc moteur et composants internes</li>
                          <li>Culasse et joints de culasse</li>
                          <li>Boîte de vitesses (manuelle et automatique)</li>
                          <li>Pompes à huile et systèmes de refroidissement</li>
                          <li>Arbres de transmission et différentiels</li>
                          <li>Circuits d'alimentation et d'injection</li>
                          <li>Turbocompresseurs et compresseurs</li>
                          <li>Volant moteur et amortisseurs de torsion</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="overflow-hidden border-autop-red/20">
                  <div className="bg-autop-red text-white p-4">
                    <div className="flex items-center gap-3">
                      <Zap className="h-6 w-6" />
                      <h3 className="text-xl font-medium">Garantie Électronique</h3>
                    </div>
                    <p className="mt-2 text-white/80 text-sm">Pour les systèmes technologiques avancés</p>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-autop-red/10 rounded-full p-2">
                          <Clock className="h-5 w-5 text-autop-red" />
                        </div>
                        <div>
                          <p className="font-medium">Durée standard</p>
                          <p className="text-2xl font-bold text-autop-red">12 mois</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-sm bg-gray-50 p-3 rounded-lg">
                          <p className="font-medium">Extension possible</p>
                          <p>Jusqu'à 24 mois</p>
                        </div>
                        <div className="text-sm bg-gray-50 p-3 rounded-lg">
                          <p className="font-medium">Mises à jour</p>
                          <p>Incluses</p>
                        </div>
                      </div>
                      
                      <div className="pt-3">
                        <h4 className="font-medium mb-2 border-l-4 border-autop-red pl-2">Systèmes couverts:</h4>
                        <ul className="space-y-1 text-muted-foreground pl-4 list-disc">
                          <li>Systèmes d'infodivertissement et navigation</li>
                          <li>Tableaux de bord numériques et écrans tactiles</li>
                          <li>Systèmes d'aide à la conduite (ADAS)</li>
                          <li>Capteurs et caméras périphériques</li>
                          <li>Systèmes de connectivité et télématique</li>
                          <li>Calculateurs électroniques (ECU)</li>
                          <li>Climatisation et systèmes de confort</li>
                          <li>Systèmes audio premium</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white shadow-sm rounded-lg p-6 text-center border border-autop-red/10">
                  <div className="bg-autop-red/10 h-16 w-16 flex items-center justify-center rounded-full mx-auto mb-4">
                    <PhoneCall className="h-8 w-8 text-autop-red" />
                  </div>
                  <h3 className="text-lg font-medium mb-3">Assistance 24/7</h3>
                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <p>Service de dépannage et assistance disponible jour et nuit</p>
                    <p>Couverture dans toute l'Europe</p>
                    <p>Interlocuteurs multilingues</p>
                  </div>
                  <div className="text-sm font-medium text-autop-red">
                    Temps de réponse moyen: 30 minutes
                  </div>
                </div>
                
                <div className="bg-white shadow-sm rounded-lg p-6 text-center border border-autop-red/10">
                  <div className="bg-autop-red/10 h-16 w-16 flex items-center justify-center rounded-full mx-auto mb-4">
                    <Car className="h-8 w-8 text-autop-red" />
                  </div>
                  <h3 className="text-lg font-medium mb-3">Véhicule de Remplacement</h3>
                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <p>Prêt d'un véhicule de catégorie équivalente</p>
                    <p>Disponible pendant toute la durée des réparations</p>
                    <p>Livraison à domicile ou sur lieu de travail</p>
                  </div>
                  <div className="text-sm font-medium text-autop-red">
                    Délai de mise à disposition: 3h maximum
                  </div>
                </div>
                
                <div className="bg-white shadow-sm rounded-lg p-6 text-center border border-autop-red/10">
                  <div className="bg-autop-red/10 h-16 w-16 flex items-center justify-center rounded-full mx-auto mb-4">
                    <Wrench className="h-8 w-8 text-autop-red" />
                  </div>
                  <h3 className="text-lg font-medium mb-3">Entretien Privilégié</h3>
                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <p>Remise de 15% sur les services d'entretien régulier</p>
                    <p>Accès prioritaire dans notre réseau de partenaires</p>
                    <p>Utilisation exclusive de pièces d'origine</p>
                  </div>
                  <div className="text-sm font-medium text-autop-red">
                    Prise en charge sous 24h garantie
                  </div>
                </div>
              </div>
              
              <div className="bg-autop-red/5 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="h-5 w-5 text-autop-red" />
                  <h3 className="text-xl font-semibold">À Noter</h3>
                </div>
                <p className="text-muted-foreground mb-3">
                  Notre programme de garantie premium est conçu pour couvrir les pannes mécaniques et électroniques 
                  résultant d'une utilisation normale du véhicule. Pour une tranquillité d'esprit maximale, nous 
                  recommandons de:
                </p>
                <ul className="space-y-2 text-muted-foreground pl-4 list-disc">
                  <li>Respecter le calendrier d'entretien recommandé par le constructeur</li>
                  <li>Faire effectuer toutes les interventions dans notre réseau de partenaires agréés</li>
                  <li>Signaler toute anomalie dès sa première manifestation</li>
                  <li>Consulter les conditions détaillées du contrat pour connaître les exclusions spécifiques</li>
                </ul>
              </div>
            </div>
            
            <div className="mb-10">
              <h2 className="text-2xl font-semibold mb-6 text-autop-red border-b border-autop-red/20 pb-2">
                Programmes de Garantie
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="border-autop-red/10">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold mb-1">Standard</h3>
                      <p className="text-muted-foreground text-sm">Inclus avec chaque véhicule</p>
                      <div className="flex items-baseline mt-4 mb-2">
                        <span className="text-3xl font-bold">24</span>
                        <span className="text-lg ml-1">mois</span>
                      </div>
                    </div>
                    <ul className="space-y-2 text-sm mb-6">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-autop-red mr-2 shrink-0" />
                        <span>Garantie mécanique complète</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-autop-red mr-2 shrink-0" />
                        <span>12 mois sur l'électronique</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-autop-red mr-2 shrink-0" />
                        <span>Assistance routière de base</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-autop-red mr-2 shrink-0" />
                        <span>Véhicule de remplacement (7 jours)</span>
                      </li>
                    </ul>
                    <div>
                      <p className="text-center text-muted-foreground text-sm">Inclus sans frais supplémentaires</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-autop-red relative z-10 transform scale-105 shadow-lg">
                  <div className="absolute -top-4 inset-x-0 flex justify-center">
                    <span className="bg-autop-red text-white text-sm font-medium px-4 py-1 rounded-full">
                      Recommandé
                    </span>
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold mb-1">Premium</h3>
                      <p className="text-muted-foreground text-sm">Pour une protection optimale</p>
                      <div className="flex items-baseline mt-4 mb-2">
                        <span className="text-3xl font-bold">30</span>
                        <span className="text-lg ml-1">mois</span>
                      </div>
                    </div>
                    <ul className="space-y-2 text-sm mb-6">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-autop-red mr-2 shrink-0" />
                        <span>Garantie mécanique étendue</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-autop-red mr-2 shrink-0" />
                        <span>24 mois sur l'électronique</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-autop-red mr-2 shrink-0" />
                        <span>Assistance routière premium</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-autop-red mr-2 shrink-0" />
                        <span>Véhicule de remplacement illimité</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-autop-red mr-2 shrink-0" />
                        <span>2 révisions complètes incluses</span>
                      </li>
                    </ul>
                    <div className="text-center">
                      <Button className="w-full bg-autop-red hover:bg-autop-red/90 text-white">
                        Sélectionner
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-autop-red/10">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold mb-1">Excellence</h3>
                      <p className="text-muted-foreground text-sm">Protection maximale</p>
                      <div className="flex items-baseline mt-4 mb-2">
                        <span className="text-3xl font-bold">36</span>
                        <span className="text-lg ml-1">mois</span>
                      </div>
                    </div>
                    <ul className="space-y-2 text-sm mb-6">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-autop-red mr-2 shrink-0" />
                        <span>Garantie mécanique complète</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-autop-red mr-2 shrink-0" />
                        <span>24 mois sur l'électronique</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-autop-red mr-2 shrink-0" />
                        <span>Assistance VIP 24/7</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-autop-red mr-2 shrink-0" />
                        <span>Véhicule de remplacement premium</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-autop-red mr-2 shrink-0" />
                        <span>Toutes révisions incluses</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-autop-red mr-2 shrink-0" />
                        <span>Conciergerie automobile dédiée</span>
                      </li>
                    </ul>
                    <div className="text-center">
                      <Button variant="outline" className="w-full border-autop-red text-autop-red hover:bg-autop-red/10">
                        Sélectionner
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="border-t pt-8 text-center">
              <p className="text-muted-foreground mb-4 max-w-2xl mx-auto">
                "Tous nos programmes de garantie sont soutenus par des assureurs de premier plan européens.
                Nos contrats sont clairs, sans clause cachée et transparents dans leurs conditions d'application."
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button className="bg-autop-red text-white hover:bg-autop-red/90">
                  Télécharger le contrat de garantie
                </Button>
                <Link to="/contact">
                  <Button variant="outline" className="border-autop-red text-autop-red hover:bg-autop-red/10">
                    Contacter un conseiller
                  </Button>
                </Link>
              </div>
            </div>
          </section>
          
          <section className="bg-gradient-to-br from-autop-red to-autop-red/80 text-white p-8 rounded-lg text-center">
            <div className="max-w-3xl mx-auto">
              <div className="mb-6">
                <Award className="h-12 w-12 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold mb-2">Notre Promesse</h2>
                <p className="text-lg opacity-90">
                  Nous nous engageons à offrir la garantie la plus complète et la plus transparente du marché.
                  Si vous trouvez une meilleure couverture pour un véhicule équivalent, nous nous alignerons sur cette offre.
                </p>
              </div>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                  Discuter avec un expert
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Warranty;
