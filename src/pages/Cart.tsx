
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, CheckCircle, Banknote } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

const Cart = () => {
  // Initialize cart state
  const [cartItems, setCartItems] = useState([]);
  const [paymentSubmitted, setPaymentSubmitted] = useState(false);
  const { toast } = useToast();

  // Load cart from localStorage on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const loadCart = () => {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    };
    
    loadCart();
    
    // Set up event listener for storage changes (for multi-tab support)
    window.addEventListener("storage", loadCart);
    
    return () => {
      window.removeEventListener("storage", loadCart);
    };
  }, []);

  // Calculer le total
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
  
  // Calculer l'acompte (20%)
  const depositAmount = totalPrice * 0.2;

  // Informations bancaires pour le virement
  const bankInfo = {
    accountName: "AutoPBH SAS",
    iban: "FR76 3000 6000 0123 4567 8901 234",
    bic: "AGRIFRPP",
    bankName: "Crédit Agricole",
    reference: "ACOMPTE-" + Date.now().toString().slice(-6) // Référence unique simple
  };

  const handlePaymentRequest = () => {
    // Simuler la demande de paiement
    toast({
      title: "Demande d'acompte envoyée",
      description: "Veuillez effectuer le virement dans les 3 jours pour confirmer votre réservation.",
    });
    setPaymentSubmitted(true);
  };

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    
    toast({
      title: "Article retiré",
      description: "L'article a été retiré de votre panier.",
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 mt-20">
        <h1 className="text-3xl md:text-5xl font-bold mb-8">Panier</h1>
        
        {cartItems.length === 0 ? (
          <div className="bg-white dark:bg-autop-gray shadow-md rounded-md p-8 text-center">
            <p className="text-lg mb-8">
              Votre panier est actuellement vide.
            </p>
            <Button asChild>
              <a href="/catalog">Parcourir notre catalogue</a>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Articles ({cartItems.length})</h2>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Produit</TableHead>
                        <TableHead className="text-right">Prix</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cartItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div className="flex items-center space-x-4">
                              <div className="w-16 h-12 rounded overflow-hidden">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <p className="font-medium">{item.name}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">€{item.price.toLocaleString()}</TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleRemoveItem(item.id)}
                            >
                              Supprimer
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Résumé de la commande</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Sous-total</span>
                      <span>€{totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-medium text-autop-red">
                      <span>Acompte à verser (20%)</span>
                      <span>€{depositAmount.toLocaleString()}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold">
                      <span>Prix total</span>
                      <span>€{totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 dark:bg-gray-900 p-6 flex flex-col space-y-4">
                  {!paymentSubmitted ? (
                    <Button 
                      onClick={handlePaymentRequest}
                      className="w-full"
                    >
                      <Banknote className="mr-2 h-4 w-4" />
                      Demander les informations de virement
                    </Button>
                  ) : (
                    <Alert>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <AlertTitle>Instructions de paiement</AlertTitle>
                      <AlertDescription>
                        <div className="mt-2 space-y-2 text-sm">
                          <p>Veuillez effectuer un virement bancaire avec les informations suivantes :</p>
                          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md mt-2">
                            <table className="w-full">
                              <tbody>
                                <tr>
                                  <td className="font-medium py-1">Montant :</td>
                                  <td>€{depositAmount.toLocaleString()}</td>
                                </tr>
                                <tr>
                                  <td className="font-medium py-1">Bénéficiaire :</td>
                                  <td>{bankInfo.accountName}</td>
                                </tr>
                                <tr>
                                  <td className="font-medium py-1">IBAN :</td>
                                  <td>{bankInfo.iban}</td>
                                </tr>
                                <tr>
                                  <td className="font-medium py-1">BIC/SWIFT :</td>
                                  <td>{bankInfo.bic}</td>
                                </tr>
                                <tr>
                                  <td className="font-medium py-1">Banque :</td>
                                  <td>{bankInfo.bankName}</td>
                                </tr>
                                <tr>
                                  <td className="font-medium py-1">Référence :</td>
                                  <td className="font-mono">{bankInfo.reference}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <Alert className="mt-4 bg-amber-50 text-amber-800 border-amber-200">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Important</AlertTitle>
                            <AlertDescription>
                              <p>L'acompte est requis pour réserver votre véhicule. Le solde sera à régler avant la livraison.</p>
                              <p className="mt-1">Veuillez indiquer la référence exacte dans votre virement pour faciliter le traitement.</p>
                            </AlertDescription>
                          </Alert>
                        </div>
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  <div className="text-sm text-muted-foreground">
                    <p>En continuant, vous acceptez nos <a href="/terms" className="text-autop-red hover:underline">conditions générales</a> et notre <a href="/privacy" className="text-autop-red hover:underline">politique de confidentialité</a>.</p>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
