import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  AlertCircle, 
  Copy, 
  CreditCard, 
  Banknote, 
  Calendar, 
  Euro
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");
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
  const remainingAmount = totalPrice - depositAmount;

  // Reference number for payment
  const referenceNumber = "ACOMPTE-" + Date.now().toString().slice(-6);
  
  // Expected delivery date (30 days from now)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 30);
  const formattedDeliveryDate = deliveryDate.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

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

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(field);
    
    toast({
      title: "Copié!",
      description: `${field} copié dans le presse-papiers.`,
    });
    
    setTimeout(() => setCopySuccess(""), 2000);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 mt-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            {orderPlaced ? "Confirmation de Commande" : "Finaliser votre commande"}
          </h1>

          {orderPlaced ? (
            <div className="space-y-8">
              <Card className="border-none shadow-lg">
                <CardHeader className="text-center pb-2">
                  <div className="flex items-center justify-center mb-6">
                    <div className="h-20 w-20 rounded-full bg-green-50 flex items-center justify-center">
                      <CheckCircle className="h-12 w-12 text-green-500" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold mb-2">Commande confirmée</CardTitle>
                  <CardDescription className="text-lg">
                    Votre numéro de commande: <span className="font-medium">{referenceNumber}</span>
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="text-center space-y-2">
                    <p className="text-lg">
                      Merci pour votre commande. Votre demande de réservation a été enregistrée avec succès.
                    </p>
                    <div className="mt-4 mb-6">
                      <p className="font-medium text-base mb-1">Pour confirmer votre réservation, veuillez verser un acompte de:</p>
                      <p className="font-bold text-3xl text-autop-red flex items-center justify-center gap-1">
                        <Euro className="h-7 w-7" /> 
                        {depositAmount.toLocaleString('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Soit 20% du montant total de {totalPrice.toLocaleString('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2})} €
                      </p>
                    </div>
                  </div>

                  <Card className="bg-gray-50 dark:bg-gray-800 border-none">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Banknote className="mr-2 h-5 w-5" /> 
                        Coordonnées bancaires pour le virement
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 items-center">
                          <span className="font-medium text-sm">Bénéficiaire:</span>
                          <div className="flex items-center justify-between">
                            <span className="font-mono">AutoPBH SAS</span>
                            <button 
                              onClick={() => copyToClipboard("AutoPBH SAS", "Bénéficiaire")}
                              className="text-primary hover:text-primary/80"
                            >
                              <Copy className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 items-center">
                          <span className="font-medium text-sm">IBAN:</span>
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-sm">FR76 3000 6000 0123 4567 8901 234</span>
                            <button 
                              onClick={() => copyToClipboard("FR76 3000 6000 0123 4567 8901 234", "IBAN")}
                              className="text-primary hover:text-primary/80"
                            >
                              <Copy className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 items-center">
                          <span className="font-medium text-sm">BIC/SWIFT:</span>
                          <div className="flex items-center justify-between">
                            <span className="font-mono">AGRIFRPP</span>
                            <button 
                              onClick={() => copyToClipboard("AGRIFRPP", "BIC/SWIFT")}
                              className="text-primary hover:text-primary/80"
                            >
                              <Copy className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 items-center">
                          <span className="font-medium text-sm">Référence à indiquer:</span>
                          <div className="flex items-center justify-between">
                            <span className="font-mono">{referenceNumber}</span>
                            <button 
                              onClick={() => copyToClipboard(referenceNumber, "Référence")}
                              className="text-primary hover:text-primary/80"
                            >
                              <Copy className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 items-center">
                          <span className="font-medium text-sm">Montant:</span>
                          <div className="flex items-center justify-between">
                            <span className="font-mono">{depositAmount.toLocaleString('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2})} €</span>
                            <button 
                              onClick={() => copyToClipboard(depositAmount.toLocaleString('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}), "Montant")}
                              className="text-primary hover:text-primary/80"
                            >
                              <Copy className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="space-y-3">
                    <h3 className="font-medium text-lg">Détails de la commande</h3>
                    
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Véhicule</TableHead>
                          <TableHead className="text-right">Prix</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {cartItems.map(item => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell className="text-right">{item.price.toLocaleString('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2})} €</TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell className="font-medium">Total</TableCell>
                          <TableCell className="text-right font-bold">{totalPrice.toLocaleString('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2})} €</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center text-green-800 dark:text-green-400">
                          <Euro className="mr-2 h-5 w-5" />
                          Acompte à verser
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                          {depositAmount.toLocaleString('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2})} €
                        </p>
                        <p className="text-sm text-green-600 dark:text-green-500">
                          À payer maintenant (20%)
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="border border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center text-blue-800 dark:text-blue-400">
                          <CreditCard className="mr-2 h-5 w-5" />
                          Solde restant
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                          {remainingAmount.toLocaleString('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2})} €
                        </p>
                        <p className="text-sm text-blue-600 dark:text-blue-500">
                          À payer à la livraison (80%)
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="space-y-2">
                    <Card className="border border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center text-amber-800 dark:text-amber-400">
                          <Calendar className="mr-2 h-5 w-5" />
                          Date de livraison estimée
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="font-medium">{formattedDeliveryDate}</p>
                        <p className="text-sm text-amber-600 dark:text-amber-500">
                          Après réception de votre acompte
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Alert className="bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800">
                    <AlertCircle className="h-5 w-5 text-amber-800 dark:text-amber-400" />
                    <AlertTitle className="text-amber-800 dark:text-amber-400">Important</AlertTitle>
                    <AlertDescription className="text-amber-700 dark:text-amber-300">
                      <p className="mb-1">
                        L'acompte de 20% est obligatoire pour confirmer votre réservation et sécuriser votre véhicule.
                      </p>
                      <p>
                        Notre équipe vous contactera dans les 24 à 48h après réception du paiement pour finaliser les détails de la livraison.
                      </p>
                    </AlertDescription>
                  </Alert>
                </CardContent>
                
                <CardFooter className="flex justify-center pt-2">
                  <Button 
                    onClick={() => navigate("/")}
                    size="lg"
                    className="w-full md:w-auto"
                  >
                    Retour à l'accueil
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ) : (
            <div className="space-y-8">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">Récapitulatif de la commande</CardTitle>
                  <CardDescription>Vérifiez les détails de votre commande avant de confirmer</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="divide-y divide-border border rounded-lg">
                    {cartItems.map(item => (
                      <div key={item.id} className="p-4 flex items-center space-x-4">
                        <div className="w-24 h-16 rounded overflow-hidden bg-gray-100">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-autop-red text-lg">{item.price.toLocaleString('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2})} €</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Card className="bg-gray-50 dark:bg-gray-800 border-none">
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Prix total</span>
                          <span className="font-medium">{totalPrice.toLocaleString('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2})} €</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between text-lg font-bold text-autop-red pt-2">
                          <span>Acompte à verser (20%)</span>
                          <span>{depositAmount.toLocaleString('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2})} €</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground text-sm">
                          <span>Solde restant à payer à la livraison</span>
                          <span>{remainingAmount.toLocaleString('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2})} €</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-medium">Mode de paiement</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="border-2 border-primary bg-primary/5 relative">
                        <div className="absolute top-2 right-2 h-4 w-4 rounded-full bg-primary"></div>
                        <CardContent className="p-4 flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Banknote className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Virement bancaire</p>
                            <p className="text-sm text-muted-foreground">
                              Virement de l'acompte requis pour réserver votre véhicule
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="border border-muted opacity-50">
                        <CardContent className="p-4 flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <CreditCard className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium">Carte bancaire</p>
                            <p className="text-sm text-muted-foreground">
                              Prochainement disponible
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  
                  <Alert className="bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800">
                    <AlertCircle className="h-5 w-5 text-amber-800 dark:text-amber-400" />
                    <AlertTitle className="text-amber-800 dark:text-amber-400">
                      Informations importantes
                    </AlertTitle>
                    <AlertDescription className="text-amber-700 dark:text-amber-300">
                      <p className="mb-2">En confirmant votre commande:</p>
                      <ul className="list-disc list-inside space-y-1 pl-2">
                        <li>Vous vous engagez à verser un acompte de 20% pour réserver votre véhicule</li>
                        <li>Le solde restant sera à régler lors de la livraison du véhicule</li>
                        <li>La livraison est estimée à 30 jours après réception de l'acompte</li>
                      </ul>
                    </AlertDescription>
                  </Alert>
                </CardContent>
                
                <CardFooter className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 pb-6">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate("/cart")}
                    size="lg"
                    className="w-full md:w-auto"
                  >
                    Retour au panier
                  </Button>
                  <Button 
                    onClick={handleOrderCompletion} 
                    disabled={isProcessing}
                    size="lg"
                    className="w-full md:w-auto"
                  >
                    {isProcessing ? "Traitement en cours..." : "Confirmer la commande"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
