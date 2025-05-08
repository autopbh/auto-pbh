
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

const Financing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { toast } = useToast();
  const [vehiclePrice, setVehiclePrice] = useState<number>(12000);
  const [initialContribution, setInitialContribution] = useState<number>(2400);
  const [duration, setDuration] = useState<number>(36);
  const [financingType, setFinancingType] = useState<string>("credit");
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);

  const calculateMonthlyPayment = () => {
    if (vehiclePrice <= 0 || initialContribution < 0 || duration <= 0) {
      toast({
        title: "Erreur de saisie",
        description: "Veuillez vérifier les valeurs saisies.",
        variant: "destructive",
      });
      return;
    }

    if (initialContribution >= vehiclePrice) {
      toast({
        title: "Erreur de saisie",
        description: "L'apport initial ne peut pas être supérieur ou égal au prix du véhicule.",
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
      title: "Calcul effectué",
      description: "Votre mensualité a été calculée avec succès.",
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 mt-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-8">Solutions de Financement</h1>
          
          <section className="bg-white/50 backdrop-blur-sm p-8 rounded-lg shadow-sm mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-autop-red">Financement Sur-Mesure</h2>
            <p className="text-lg mb-6">
              AUTO PBH vous propose des solutions de financement adaptées à votre situation financière 
              avec nos banques partenaires d'exception.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="flex flex-col items-center text-center">
                <div className="bg-autop-red/10 p-4 rounded-full mb-4">
                  <CreditCard className="h-8 w-8 text-autop-red" />
                </div>
                <h3 className="text-xl font-medium mb-2">Taux Privilégiés</h3>
                <p className="text-muted-foreground">
                  Bénéficiez de taux négociés dès 2.9% avec nos établissements bancaires partenaires.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="bg-autop-red/10 p-4 rounded-full mb-4">
                  <Calculator className="h-8 w-8 text-autop-red" />
                </div>
                <h3 className="text-xl font-medium mb-2">Simulation Instantanée</h3>
                <p className="text-muted-foreground">
                  Obtenez une simulation personnalisée en ligne et recevez un accord de principe sous 2 heures.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="bg-autop-red/10 p-4 rounded-full mb-4">
                  <CheckCircle className="h-8 w-8 text-autop-red" />
                </div>
                <h3 className="text-xl font-medium mb-2">Options Flexibles</h3>
                <p className="text-muted-foreground">
                  Choisissez entre crédit classique, leasing longue durée ou paiement différé selon vos préférences.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-white/50 backdrop-blur-sm p-8 rounded-lg shadow-sm mb-8">
            <h1 className="text-4xl font-bold mb-4 text-center">Simulez votre financement</h1>
            <p className="text-lg text-center text-muted-foreground mb-12">
              Utilisez notre calculateur pour obtenir une estimation de vos mensualités selon le type de financement choisi.
            </p>
            
            <div className="max-w-2xl mx-auto space-y-8">
              <div className="space-y-2">
                <label htmlFor="vehicle-price" className="text-xl font-medium">
                  Prix du véhicule
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
                  Apport initial
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
                  Durée (en mois)
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
                  Type de financement
                </label>
                <Select
                  value={financingType}
                  onValueChange={setFinancingType}
                >
                  <SelectTrigger className="text-xl p-6 h-auto">
                    <SelectValue placeholder="Sélectionnez un type de financement" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="credit">Crédit classique</SelectItem>
                    <SelectItem value="leasing">Leasing</SelectItem>
                    <SelectItem value="balloon">Paiement ballon</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                onClick={calculateMonthlyPayment}
                className="w-full bg-autop-red hover:bg-autop-red/90 text-xl py-6 h-auto"
              >
                Calculer ma mensualité
              </Button>
              
              {monthlyPayment !== null && (
                <div className="mt-8 p-6 border rounded-lg bg-blue-50">
                  <h3 className="text-xl font-semibold mb-2">Estimation de votre mensualité :</h3>
                  <p className="text-3xl font-bold text-autop-red">€ {monthlyPayment.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                  <p className="text-sm text-muted-foreground mt-4">
                    * Cette estimation est donnée à titre indicatif. La mensualité finale peut varier en fonction de l'approbation du crédit et d'autres facteurs.
                  </p>
                </div>
              )}
            </div>
            
            <div className="mt-12 text-center">
              <Button variant="outline" className="mr-4">
                Comparer les options de financement
              </Button>
              <Button className="bg-autop-red hover:bg-autop-red/90">
                Contacter un conseiller
              </Button>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Financing;
