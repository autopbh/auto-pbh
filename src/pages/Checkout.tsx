
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Load cart from localStorage
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    } else {
      // If no cart items, redirect back to catalog
      navigate("/catalog");
    }
  }, [navigate]);

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
  const depositAmount = totalPrice * 0.2;

  // Reference number for payment
  const referenceNumber = "ACOMPTE-" + Date.now().toString().slice(-6);

  const handleOrderCompletion = () => {
    setIsProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      // Clear cart after successful order
      localStorage.setItem("cart", JSON.stringify([]));
      window.dispatchEvent(new Event("storage"));
      
      setOrderPlaced(true);
      setIsProcessing(false);
      
      toast({
        title: "Commande Confirmée",
        description: "Votre demande de réservation a été confirmée. Veuillez effectuer le virement pour finaliser la réservation.",
      });
    }, 1500);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 mt-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Finaliser votre commande</h1>

          {orderPlaced ? (
            <div className="bg-white dark:bg-autop-gray shadow-md rounded-lg p-8">
              <div className="flex items-center justify-center mb-6">
                <div className="h-20 w-20 rounded-full bg-green-50 flex items-center justify-center">
                  <CheckCircle className="h-12 w-12 text-green-500" />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-center mb-6">Commande confirmée</h2>
              
              <div className="mb-8 text-center">
                <p className="mb-4">
                  Merci pour votre commande. Votre demande de réservation a été enregistrée avec succès.
                </p>
                <p className="font-medium text-lg mb-2">Veuillez effectuer le virement de l'acompte :</p>
                <p className="font-bold text-2xl text-autop-red">€{depositAmount.toLocaleString()}</p>
              </div>
              
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-md mb-8">
                <h3 className="font-medium text-lg mb-4">Informations de Paiement</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Bénéficiaire:</span>
                    <span>AutoPBH SAS</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">IBAN:</span>
                    <span className="font-mono">FR76 3000 6000 0123 4567 8901 234</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">BIC/SWIFT:</span>
                    <span className="font-mono">AGRIFRPP</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Référence:</span>
                    <span className="font-mono">{referenceNumber}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col space-y-4">
                <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-md flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Important</p>
                    <p className="text-sm mt-1">
                      L'acompte est requis pour réserver votre véhicule. Nous vous contacterons après réception du paiement pour organiser la suite.
                    </p>
                  </div>
                </div>
                
                <Button onClick={() => navigate("/")}>
                  Retour à l'accueil
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="bg-white dark:bg-autop-gray shadow-md rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Récapitulatif de la commande</h2>
                
                <div className="divide-y divide-border">
                  {cartItems.map(item => (
                    <div key={item.id} className="py-4 flex items-center space-x-4">
                      <div className="w-24 h-16 rounded overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-autop-red">€{item.price.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between">
                    <span>Prix total</span>
                    <span>€{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-bold text-autop-red">
                    <span>Acompte à verser (20%)</span>
                    <span>€{depositAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-autop-gray shadow-md rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Mode de paiement</h2>
                <div className="p-4 border border-border rounded-md bg-gray-50 dark:bg-gray-800 flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M2 9V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H8"></path>
                      <path d="M13 14h6"></path>
                      <path d="m2 14 2.3-2.3a2.1 2.1 0 0 1 2.9 0L9 14"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Virement bancaire</p>
                    <p className="text-sm text-muted-foreground">
                      Un acompte de 20% par virement est requis pour réserver votre véhicule
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  onClick={handleOrderCompletion} 
                  disabled={isProcessing} 
                  className="w-full md:w-auto"
                >
                  {isProcessing ? "Traitement en cours..." : "Confirmer la commande"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
