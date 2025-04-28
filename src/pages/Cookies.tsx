
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Cookie, Info } from "lucide-react";

const Cookies = () => {
  const [preferences, setPreferences] = useState({
    essential: true,
    functional: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleToggleChange = (type: keyof typeof preferences) => {
    if (type === 'essential') return; // Essential cookies can't be disabled
    setPreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleAcceptAll = () => {
    setPreferences({
      essential: true,
      functional: true,
      analytics: true,
      marketing: true,
    });
  };

  const handleSavePreferences = () => {
    console.log("Cookie preferences saved:", preferences);
    // Here you would save the preferences to local storage or cookies
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 mt-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-8">Gestion des Cookies</h1>
          
          <section className="bg-white/50 backdrop-blur-sm p-8 rounded-lg shadow-sm mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-autop-red">Politique de Cookies</h2>
            
            <div className="space-y-6 mb-8">
              <p className="text-lg">
                AUTO PBH utilise des cookies pour améliorer votre expérience sur notre site, personnaliser le contenu et les publicités, 
                fournir des fonctionnalités de médias sociaux et analyser notre trafic. Nous partageons également des informations sur 
                votre utilisation de notre site avec nos partenaires de médias sociaux, de publicité et d'analyse.
              </p>
              
              <p className="text-lg">
                Vous pouvez personnaliser vos préférences de cookies ci-dessous ou accepter tous les cookies pour profiter 
                d'une expérience optimale sur notre site.
              </p>
            </div>
            
            <div className="space-y-6 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4">
                <div>
                  <h3 className="font-semibold">Cookies Essentiels</h3>
                  <p className="text-sm text-muted-foreground">Nécessaires au fonctionnement du site</p>
                </div>
                <Switch checked={preferences.essential} disabled className="mt-2 sm:mt-0" />
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4">
                <div>
                  <h3 className="font-semibold">Cookies Fonctionnels</h3>
                  <p className="text-sm text-muted-foreground">Pour des fonctionnalités améliorées et personnalisées</p>
                </div>
                <Switch 
                  checked={preferences.functional} 
                  onCheckedChange={() => handleToggleChange('functional')}
                  className="mt-2 sm:mt-0"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4">
                <div>
                  <h3 className="font-semibold">Cookies Analytiques</h3>
                  <p className="text-sm text-muted-foreground">Pour l'analyse du trafic et l'amélioration du site</p>
                </div>
                <Switch 
                  checked={preferences.analytics} 
                  onCheckedChange={() => handleToggleChange('analytics')}
                  className="mt-2 sm:mt-0"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div>
                  <h3 className="font-semibold">Cookies Marketing</h3>
                  <p className="text-sm text-muted-foreground">Pour des publicités ciblées selon vos centres d'intérêt</p>
                </div>
                <Switch 
                  checked={preferences.marketing} 
                  onCheckedChange={() => handleToggleChange('marketing')}
                  className="mt-2 sm:mt-0"
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button onClick={handleSavePreferences}>
                Enregistrer mes préférences
              </Button>
              <Button variant="outline" onClick={handleAcceptAll}>
                Accepter tous les cookies
              </Button>
            </div>
          </section>
          
          <section className="bg-white/50 backdrop-blur-sm p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-6 text-autop-red">Liste Détaillée des Cookies</h2>
            
            <div className="space-y-6">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="border rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Cookie className="h-5 w-5 text-autop-red" />
                        <h3 className="font-medium">Cookies Essentiels</h3>
                      </div>
                      <Info className="h-5 w-5" />
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Cookies Essentiels</DialogTitle>
                    <DialogDescription>
                      Ces cookies sont nécessaires au fonctionnement de notre site et ne peuvent pas être désactivés.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="border-b pb-3">
                      <h4 className="font-medium">session_id</h4>
                      <p className="text-sm text-muted-foreground">Durée: Session</p>
                      <p className="text-sm text-muted-foreground">Fonction: Identifie votre session sur le site</p>
                    </div>
                    <div className="border-b pb-3">
                      <h4 className="font-medium">csrf_token</h4>
                      <p className="text-sm text-muted-foreground">Durée: Session</p>
                      <p className="text-sm text-muted-foreground">Fonction: Sécurise les formulaires contre les attaques CSRF</p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button>Fermer</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <Dialog>
                <DialogTrigger asChild>
                  <div className="border rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Cookie className="h-5 w-5 text-autop-red" />
                        <h3 className="font-medium">Cookies Fonctionnels</h3>
                      </div>
                      <Info className="h-5 w-5" />
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Cookies Fonctionnels</DialogTitle>
                    <DialogDescription>
                      Ces cookies permettent d'améliorer les fonctionnalités et la personnalisation de votre expérience.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="border-b pb-3">
                      <h4 className="font-medium">preferences</h4>
                      <p className="text-sm text-muted-foreground">Durée: 1 an</p>
                      <p className="text-sm text-muted-foreground">Fonction: Sauvegarde vos préférences (langue, devise, etc.)</p>
                    </div>
                    <div className="border-b pb-3">
                      <h4 className="font-medium">recent_views</h4>
                      <p className="text-sm text-muted-foreground">Durée: 30 jours</p>
                      <p className="text-sm text-muted-foreground">Fonction: Mémorise les véhicules consultés récemment</p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button>Fermer</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <Dialog>
                <DialogTrigger asChild>
                  <div className="border rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Cookie className="h-5 w-5 text-autop-red" />
                        <h3 className="font-medium">Cookies Analytiques</h3>
                      </div>
                      <Info className="h-5 w-5" />
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Cookies Analytiques</DialogTitle>
                    <DialogDescription>
                      Ces cookies nous permettent d'analyser l'utilisation du site pour en améliorer les performances et l'expérience.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="border-b pb-3">
                      <h4 className="font-medium">_ga</h4>
                      <p className="text-sm text-muted-foreground">Durée: 2 ans</p>
                      <p className="text-sm text-muted-foreground">Fonction: Google Analytics - Mesure l'audience</p>
                    </div>
                    <div className="border-b pb-3">
                      <h4 className="font-medium">_gid</h4>
                      <p className="text-sm text-muted-foreground">Durée: 24 heures</p>
                      <p className="text-sm text-muted-foreground">Fonction: Google Analytics - Distingue les utilisateurs</p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button>Fermer</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <Dialog>
                <DialogTrigger asChild>
                  <div className="border rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Cookie className="h-5 w-5 text-autop-red" />
                        <h3 className="font-medium">Cookies Marketing</h3>
                      </div>
                      <Info className="h-5 w-5" />
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Cookies Marketing</DialogTitle>
                    <DialogDescription>
                      Ces cookies sont utilisés pour afficher des publicités pertinentes selon vos centres d'intérêt.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="border-b pb-3">
                      <h4 className="font-medium">_fbp</h4>
                      <p className="text-sm text-muted-foreground">Durée: 90 jours</p>
                      <p className="text-sm text-muted-foreground">Fonction: Facebook - Suivi des conversions</p>
                    </div>
                    <div className="border-b pb-3">
                      <h4 className="font-medium">_gcl_au</h4>
                      <p className="text-sm text-muted-foreground">Durée: 90 jours</p>
                      <p className="text-sm text-muted-foreground">Fonction: Google Ads - Mesure l'efficacité publicitaire</p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button>Fermer</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Cookies;
