
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Calculator, CreditCard, CheckCircle } from "lucide-react";

const Financing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
            <h2 className="text-2xl font-semibold mb-6 text-autop-red">Calculateur de Financement</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium mb-2">
                    Montant du véhicule (€)
                  </label>
                  <input 
                    type="number" 
                    id="amount" 
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-autop-red"
                    placeholder="Ex: 120 000"
                  />
                </div>
                
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium mb-2">
                    Durée du financement (mois)
                  </label>
                  <select 
                    id="duration" 
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-autop-red"
                  >
                    <option value="12">12 mois</option>
                    <option value="24">24 mois</option>
                    <option value="36">36 mois</option>
                    <option value="48">48 mois</option>
                    <option value="60">60 mois</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="rate" className="block text-sm font-medium mb-2">
                    Taux d'intérêt (%)
                  </label>
                  <input 
                    type="number" 
                    id="rate" 
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-autop-red"
                    placeholder="Ex: 2.9"
                    step="0.1"
                    defaultValue="2.9"
                  />
                </div>
                
                <Button className="w-full">
                  Calculer ma mensualité
                </Button>
              </div>
              
              <div className="bg-autop-red/5 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-4">Résultat de simulation</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span>Montant financé:</span>
                    <span className="font-semibold">120 000 €</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span>Durée:</span>
                    <span className="font-semibold">48 mois</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span>Taux:</span>
                    <span className="font-semibold">2.9%</span>
                  </div>
                  <div className="flex justify-between items-center text-lg pt-2">
                    <span className="font-bold">Mensualité:</span>
                    <span className="font-bold text-autop-red">2 649 €/mois</span>
                  </div>
                </div>
                
                <div className="mt-8 text-sm text-muted-foreground">
                  <p>Exemple: Un Porsche Taycan à 120 000€ sur 48 mois = 2 649€/mois</p>
                  <p className="mt-2 text-xs">
                    * Simulation non contractuelle. Un crédit vous engage et doit être remboursé.
                    Vérifiez vos capacités de remboursement avant de vous engager.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <Button>
                Demander un devis personnalisé
              </Button>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Financing;
