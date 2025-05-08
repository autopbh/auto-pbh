
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Calculator, CreditCard, CheckCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const Financing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { toast } = useToast();
  const { t } = useLanguage();
  const [vehiclePrice, setVehiclePrice] = useState<number>(12000);
  const [initialContribution, setInitialContribution] = useState<number>(2400);
  const [duration, setDuration] = useState<number>(36);
  const [financingType, setFinancingType] = useState<string>("credit");
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);

  const calculateMonthlyPayment = () => {
    if (vehiclePrice <= 0 || initialContribution < 0 || duration <= 0) {
      toast({
        title: t("financing.error"),
        description: t("financing.errorValues"),
        variant: "destructive",
      });
      return;
    }

    if (initialContribution >= vehiclePrice) {
      toast({
        title: t("financing.error"),
        description: t("financing.errorContribution"),
        variant: "destructive",
      });
      return;
    }

    const amount = vehiclePrice - initialContribution;
    let rate = 0.029; // Taux par défaut (2.9%)

    if (financingType === "leasing") {
      rate = 0.025; // 2.5% pour leasing
    } else if (financingType === "balloon") {
      rate = 0.032; // 3.2% pour balloon
    }

    const monthlyRate = rate / 12;
    const payment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -duration));
    
    setMonthlyPayment(parseFloat(payment.toFixed(2)));
    
    toast({
      title: t("financing.calculationDone"),
      description: t("financing.calculationSuccess"),
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 mt-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-8">{t("financing.title")}</h1>
          
          <section className="bg-white/50 backdrop-blur-sm p-8 rounded-lg shadow-sm mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-autop-red">{t("financing.customFinancing")}</h2>
            <p className="text-lg mb-6">
              {t("financing.description")}
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="flex flex-col items-center text-center">
                <div className="bg-autop-red/10 p-4 rounded-full mb-4">
                  <CreditCard className="h-8 w-8 text-autop-red" />
                </div>
                <h3 className="text-xl font-medium mb-2">{t("financing.privilegedRates")}</h3>
                <p className="text-muted-foreground">
                  {t("financing.ratesDescription")}
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="bg-autop-red/10 p-4 rounded-full mb-4">
                  <Calculator className="h-8 w-8 text-autop-red" />
                </div>
                <h3 className="text-xl font-medium mb-2">{t("financing.instantSimulation")}</h3>
                <p className="text-muted-foreground">
                  {t("financing.simulationDescription")}
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="bg-autop-red/10 p-4 rounded-full mb-4">
                  <CheckCircle className="h-8 w-8 text-autop-red" />
                </div>
                <h3 className="text-xl font-medium mb-2">{t("financing.flexibleOptions")}</h3>
                <p className="text-muted-foreground">
                  {t("financing.optionsDescription")}
                </p>
              </div>
            </div>
          </section>

          <section className="bg-white/50 backdrop-blur-sm p-8 rounded-lg shadow-sm mb-8">
            <h1 className="text-4xl font-bold mb-4 text-center">{t("financing.simulateFinancing")}</h1>
            <p className="text-lg text-center text-muted-foreground mb-12">
              {t("financing.useCalculator")}
            </p>
            
            <div className="max-w-2xl mx-auto space-y-8">
              <div className="space-y-2">
                <label htmlFor="vehicle-price" className="text-xl font-medium">
                  {t("financing.vehiclePrice")}
                </label>
                <div className="flex items-center">
                  <span className="text-xl mr-2">€</span>
                  <Input
                    id="vehicle-price"
                    type="number"
                    value={vehiclePrice}
                    onChange={(e) => setVehiclePrice(Number(e.target.value))}
                    className="text-xl p-6"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="initial-contribution" className="text-xl font-medium">
                  {t("financing.initialContribution")}
                </label>
                <div className="flex items-center">
                  <span className="text-xl mr-2">€</span>
                  <Input
                    id="initial-contribution"
                    type="number"
                    value={initialContribution}
                    onChange={(e) => setInitialContribution(Number(e.target.value))}
                    className="text-xl p-6"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="duration" className="text-xl font-medium">
                  {t("financing.duration")}
                </label>
                <Input
                  id="duration"
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="text-xl p-6"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="financing-type" className="text-xl font-medium">
                  {t("financing.financingType")}
                </label>
                <Select
                  value={financingType}
                  onValueChange={setFinancingType}
                >
                  <SelectTrigger className="text-xl p-6 h-auto">
                    <SelectValue placeholder={t("financing.selectType")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="credit">{t("financing.standardCredit")}</SelectItem>
                    <SelectItem value="leasing">{t("financing.leasing")}</SelectItem>
                    <SelectItem value="balloon">{t("financing.balloonPayment")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                onClick={calculateMonthlyPayment}
                className="w-full bg-autop-red hover:bg-autop-red/90 text-xl py-6 h-auto"
              >
                {t("financing.calculateMonthlyPayment")}
              </Button>
              
              {monthlyPayment !== null && (
                <div className="mt-8 p-6 border rounded-lg bg-blue-50">
                  <h3 className="text-xl font-semibold mb-2">{t("financing.estimatedMonthlyPayment")}</h3>
                  <p className="text-3xl font-bold text-autop-red">€ {monthlyPayment.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                  <p className="text-sm text-muted-foreground mt-4">
                    {t("financing.disclaimer")}
                  </p>
                </div>
              )}
            </div>
            
            <div className="mt-12 text-center">
              <Button variant="outline" className="mr-4">
                {t("financing.compareOptions")}
              </Button>
              <Button className="bg-autop-red hover:bg-autop-red/90">
                {t("financing.contactAdvisor")}
              </Button>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Financing;
