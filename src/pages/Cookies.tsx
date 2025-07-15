
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
import { useLanguage } from "@/contexts/LanguageContext";

const Cookies = () => {
  const { t } = useLanguage();
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
          <h1 className="text-3xl md:text-5xl font-bold mb-8">{t("cookies.title")}</h1>
          
          <section className="bg-white/50 backdrop-blur-sm p-8 rounded-lg shadow-sm mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-autop-red">{t("cookies.policyTitle")}</h2>
            
            <div className="space-y-6 mb-8">
              <p className="text-lg">
                {t("cookies.description1")}
              </p>
              
              <p className="text-lg">
                {t("cookies.description2")}
              </p>
            </div>
            
            <div className="space-y-6 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4">
                <div>
                  <h3 className="font-semibold">{t("cookies.essential.title")}</h3>
                  <p className="text-sm text-muted-foreground">{t("cookies.essential.description")}</p>
                </div>
                <Switch checked={preferences.essential} disabled className="mt-2 sm:mt-0" />
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4">
                <div>
                  <h3 className="font-semibold">{t("cookies.functional.title")}</h3>
                  <p className="text-sm text-muted-foreground">{t("cookies.functional.description")}</p>
                </div>
                <Switch 
                  checked={preferences.functional} 
                  onCheckedChange={() => handleToggleChange('functional')}
                  className="mt-2 sm:mt-0"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4">
                <div>
                  <h3 className="font-semibold">{t("cookies.analytics.title")}</h3>
                  <p className="text-sm text-muted-foreground">{t("cookies.analytics.description")}</p>
                </div>
                <Switch 
                  checked={preferences.analytics} 
                  onCheckedChange={() => handleToggleChange('analytics')}
                  className="mt-2 sm:mt-0"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div>
                  <h3 className="font-semibold">{t("cookies.marketing.title")}</h3>
                  <p className="text-sm text-muted-foreground">{t("cookies.marketing.description")}</p>
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
                {t("cookies.savePreferences")}
              </Button>
              <Button variant="outline" onClick={handleAcceptAll}>
                {t("cookies.acceptAll")}
              </Button>
            </div>
          </section>
          
          <section className="bg-white/50 backdrop-blur-sm p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-6 text-autop-red">{t("cookies.detailList")}</h2>
            
            <div className="space-y-6">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="border rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Cookie className="h-5 w-5 text-autop-red" />
                        <h3 className="font-medium">{t("cookies.essential.title")}</h3>
                      </div>
                      <Info className="h-5 w-5" />
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{t("cookies.essential.title")}</DialogTitle>
                    <DialogDescription>
                      {t("cookies.essential.dialogDescription")}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="border-b pb-3">
                      <h4 className="font-medium">session_id</h4>
                      <p className="text-sm text-muted-foreground">{t("cookies.duration")}: {t("cookies.session")}</p>
                      <p className="text-sm text-muted-foreground">{t("cookies.function")}: {t("cookies.essential.sessionId")}</p>
                    </div>
                    <div className="border-b pb-3">
                      <h4 className="font-medium">csrf_token</h4>
                      <p className="text-sm text-muted-foreground">{t("cookies.duration")}: {t("cookies.session")}</p>
                      <p className="text-sm text-muted-foreground">{t("cookies.function")}: {t("cookies.essential.csrfToken")}</p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button>{t("cookies.close")}</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <Dialog>
                <DialogTrigger asChild>
                  <div className="border rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Cookie className="h-5 w-5 text-autop-red" />
                        <h3 className="font-medium">{t("cookies.functional.title")}</h3>
                      </div>
                      <Info className="h-5 w-5" />
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{t("cookies.functional.title")}</DialogTitle>
                    <DialogDescription>
                      {t("cookies.functional.dialogDescription")}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="border-b pb-3">
                      <h4 className="font-medium">preferences</h4>
                      <p className="text-sm text-muted-foreground">{t("cookies.duration")}: {t("cookies.oneYear")}</p>
                      <p className="text-sm text-muted-foreground">{t("cookies.function")}: {t("cookies.functional.preferences")}</p>
                    </div>
                    <div className="border-b pb-3">
                      <h4 className="font-medium">recent_views</h4>
                      <p className="text-sm text-muted-foreground">{t("cookies.duration")}: {t("cookies.thirtyDays")}</p>
                      <p className="text-sm text-muted-foreground">{t("cookies.function")}: {t("cookies.functional.recentViews")}</p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button>{t("cookies.close")}</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <Dialog>
                <DialogTrigger asChild>
                  <div className="border rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Cookie className="h-5 w-5 text-autop-red" />
                        <h3 className="font-medium">{t("cookies.analytics.title")}</h3>
                      </div>
                      <Info className="h-5 w-5" />
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{t("cookies.analytics.title")}</DialogTitle>
                    <DialogDescription>
                      {t("cookies.analytics.dialogDescription")}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="border-b pb-3">
                      <h4 className="font-medium">_ga</h4>
                      <p className="text-sm text-muted-foreground">{t("cookies.duration")}: {t("cookies.twoYears")}</p>
                      <p className="text-sm text-muted-foreground">{t("cookies.function")}: {t("cookies.analytics.ga")}</p>
                    </div>
                    <div className="border-b pb-3">
                      <h4 className="font-medium">_gid</h4>
                      <p className="text-sm text-muted-foreground">{t("cookies.duration")}: {t("cookies.twentyFourHours")}</p>
                      <p className="text-sm text-muted-foreground">{t("cookies.function")}: {t("cookies.analytics.gid")}</p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button>{t("cookies.close")}</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <Dialog>
                <DialogTrigger asChild>
                  <div className="border rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Cookie className="h-5 w-5 text-autop-red" />
                        <h3 className="font-medium">{t("cookies.marketing.title")}</h3>
                      </div>
                      <Info className="h-5 w-5" />
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{t("cookies.marketing.title")}</DialogTitle>
                    <DialogDescription>
                      {t("cookies.marketing.dialogDescription")}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="border-b pb-3">
                      <h4 className="font-medium">_fbp</h4>
                      <p className="text-sm text-muted-foreground">{t("cookies.duration")}: {t("cookies.ninetyDays")}</p>
                      <p className="text-sm text-muted-foreground">{t("cookies.function")}: {t("cookies.marketing.fbp")}</p>
                    </div>
                    <div className="border-b pb-3">
                      <h4 className="font-medium">_gcl_au</h4>
                      <p className="text-sm text-muted-foreground">{t("cookies.duration")}: {t("cookies.ninetyDays")}</p>
                      <p className="text-sm text-muted-foreground">{t("cookies.function")}: {t("cookies.marketing.gclAu")}</p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button>{t("cookies.close")}</Button>
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
