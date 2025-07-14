
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
  Euro,
  Upload,
  Send,
  ChevronDown
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
import PaymentReceiptUploader from "@/components/checkout/PaymentReceiptUploader";
import SimpleCustomerForm, { CustomerData } from "@/components/SimpleCustomerForm";
import { supabase } from "@/integrations/supabase/client";

// Définition des étapes du processus de commande
const CHECKOUT_STEPS = {
  CUSTOMER_INFO: 'customer_info',
  ORDER_SUMMARY: 'order_summary',
  PAYMENT: 'payment'
};

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");
  const [paymentReceiptUrl, setPaymentReceiptUrl] = useState("");
  const [receiptUploaded, setReceiptUploaded] = useState(false);
  const [isFinalizingOrder, setIsFinalizingOrder] = useState(false);
  const [orderFinalized, setOrderFinalized] = useState(false);
  const [customerInfo, setCustomerInfo] = useState(null);
  const [currentStep, setCurrentStep] = useState(CHECKOUT_STEPS.CUSTOMER_INFO);
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
  
  // Expected delivery date (based on customer selection or default to 5 days from now)
  const getDeliveryDate = () => {
    if (customerInfo?.deliveryDate) {
      // Si c'est déjà un objet Date, on le retourne directement
      // Sinon on le convertit en Date
      const date = customerInfo.deliveryDate instanceof Date 
        ? customerInfo.deliveryDate 
        : new Date(customerInfo.deliveryDate);
      return isNaN(date.getTime()) ? getDefaultDate() : date;
    } 
    return getDefaultDate();
  };
  
  const getDefaultDate = () => {
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 5);
    return defaultDate;
  };
  
  const formattedDeliveryDate = getDeliveryDate().toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleCustomerFormSubmit = (data) => {
    setCustomerInfo(data);
    setCurrentStep(CHECKOUT_STEPS.ORDER_SUMMARY);
    window.scrollTo(0, 0);
  };

  const handleOrderCompletion = () => {
    setIsProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      setOrderPlaced(true);
      setIsProcessing(false);
      setCurrentStep(CHECKOUT_STEPS.PAYMENT);
      
      toast({
        title: "Commande Confirmée",
        description: "Votre demande de réservation a été confirmée. Veuillez effectuer le virement et télécharger la preuve de paiement.",
      });
      
      window.scrollTo(0, 0);
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

  const handleReceiptUpload = (url) => {
    setPaymentReceiptUrl(url);
    setReceiptUploaded(true);
    
    toast({
      title: "Preuve de paiement reçue",
      description: "Votre preuve de paiement a été téléchargée avec succès.",
    });
  };

  const handleFinalizeOrder = async () => {
    if (!receiptUploaded) {
      toast({
        title: "Preuve de paiement manquante",
        description: "Veuillez télécharger une preuve de paiement avant de finaliser votre commande.",
        variant: "destructive"
      });
      return;
    }

    setIsFinalizingOrder(true);
    
    try {
      // Save order to database with customer info
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([
          {
            order_number: referenceNumber,
            customer_name: `${customerInfo.firstName} ${customerInfo.lastName}`,
            customer_email: customerInfo.email,
            customer_phone: customerInfo.phone,
            price: totalPrice,
            payment_receipt_url: paymentReceiptUrl,
            status: 'pending',
            vehicle_id: cartItems[0]?.id, // Simplification, in real app would handle multiple vehicles
            additional_options: {
              deliveryAddress: customerInfo.address,
              deliveryDate: customerInfo.deliveryDate,
              deliveryTimeWindow: customerInfo.deliveryTimeWindow,
              additionalNotes: customerInfo.additionalNotes || ''
            }
          }
        ])
        .select()
        .single();
        
      if (orderError) throw orderError;
      
      // Send email confirmation
      const response = await fetch('https://sgtaboftjgiugrprqjnh.supabase.co/functions/v1/send-order-confirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderReference: referenceNumber,
          customerName: `${customerInfo.firstName} ${customerInfo.lastName}`,
          customerEmail: customerInfo.email,
          customerPhone: customerInfo.phone,
          deliveryAddress: `${customerInfo.address.street}, ${customerInfo.address.postalCode} ${customerInfo.address.city}, ${customerInfo.address.country}`,
          deliveryDate: formattedDeliveryDate,
          deliveryTimeWindow: customerInfo.deliveryTimeWindow,
          totalPrice,
          depositAmount,
          remainingAmount,
          estimatedDelivery: formattedDeliveryDate,
          cartItems: cartItems.map(item => ({
            name: item.name,
            price: item.price
          })),
          paymentReceiptUrl
        })
      });
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || "Échec de l'envoi de l'email de confirmation");
      }
      
      // Update order with confirmation sent status
      await supabase
        .from('orders')
        .update({ order_confirmation_sent: true })
        .eq('order_number', referenceNumber);
      
      setOrderFinalized(true);
      
      toast({
        title: "Commande finalisée",
        description: "Votre commande a été finalisée et nous avons reçu votre preuve de paiement.",
      });
      
      toast({
        title: "Email de confirmation envoyé",
        description: `Un email de confirmation a été envoyé à ${customerInfo.email}.`,
      });
      
      // Clear cart after successful order
      localStorage.setItem("cart", JSON.stringify([]));
      window.dispatchEvent(new Event("storage"));
      
    } catch (error) {
      console.error("Error finalizing order:", error);
      
      toast({
        title: "Erreur",
        description: `Une erreur est survenue lors de la finalisation de la commande: ${error.message}`,
        variant: "destructive"
      });
    } finally {
      setIsFinalizingOrder(false);
    }
  };

  const renderCheckoutStep = () => {
    switch (currentStep) {
      case CHECKOUT_STEPS.CUSTOMER_INFO:
        return (
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Vos informations</CardTitle>
              <CardDescription>Veuillez fournir vos coordonnées pour la livraison</CardDescription>
            </CardHeader>
            <CardContent>
              <SimpleCustomerForm 
                onSubmit={handleCustomerFormSubmit}
                isSubmitting={false}
              />
            </CardContent>
          </Card>
        );
        
      case CHECKOUT_STEPS.ORDER_SUMMARY:
        return (
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
                <h3 className="text-lg font-medium">Informations client</h3>
                <Card className="bg-gray-50 dark:bg-gray-800">
                  <CardContent className="p-4">
                    <dl className="divide-y divide-gray-200 dark:divide-gray-700">
                      <div className="py-2 grid grid-cols-3">
                        <dt className="font-medium">Nom</dt>
                        <dd className="col-span-2">{customerInfo.firstName} {customerInfo.lastName}</dd>
                      </div>
                      <div className="py-2 grid grid-cols-3">
                        <dt className="font-medium">Email</dt>
                        <dd className="col-span-2">{customerInfo.email}</dd>
                      </div>
                      <div className="py-2 grid grid-cols-3">
                        <dt className="font-medium">Téléphone</dt>
                        <dd className="col-span-2">{customerInfo.phone}</dd>
                      </div>
                      <div className="py-2 grid grid-cols-3">
                        <dt className="font-medium">Adresse</dt>
                        <dd className="col-span-2">
                          {customerInfo.address.street}<br />
                          {customerInfo.address.postalCode} {customerInfo.address.city}<br />
                          {customerInfo.address.country}
                        </dd>
                      </div>
                      <div className="py-2 grid grid-cols-3">
                        <dt className="font-medium">Date souhaitée</dt>
                        <dd className="col-span-2">{getDeliveryDate().toLocaleDateString('fr-FR')}</dd>
                      </div>
                      <div className="py-2 grid grid-cols-3">
                        <dt className="font-medium">Créneau horaire</dt>
                        <dd className="col-span-2">{customerInfo.deliveryTimeWindow}</dd>
                      </div>
                      {customerInfo.additionalNotes && (
                        <div className="py-2 grid grid-cols-3">
                          <dt className="font-medium">Notes</dt>
                          <dd className="col-span-2">{customerInfo.additionalNotes}</dd>
                        </div>
                      )}
                    </dl>
                  </CardContent>
                </Card>
              </div>
              
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
                    <li>La livraison est estimée à la date sélectionnée après réception de l'acompte</li>
                    <li>Une preuve de paiement de l'acompte sera exigée pour confirmer votre réservation</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </CardContent>
            
            <CardFooter className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 pb-6">
              <Button 
                variant="outline" 
                onClick={() => {
                  setCurrentStep(CHECKOUT_STEPS.CUSTOMER_INFO);
                  window.scrollTo(0, 0);
                }}
                size="lg"
                className="w-full md:w-auto"
              >
                Modifier mes informations
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
        );
        
      case CHECKOUT_STEPS.PAYMENT:
        return (
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
              
              {/* Payment Receipt Upload Section */}
              <Alert className="bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800">
                <AlertCircle className="h-5 w-5 text-red-800 dark:text-red-400" />
                <AlertTitle className="text-red-800 dark:text-red-400">Important: Preuve de paiement requise</AlertTitle>
                <AlertDescription className="text-red-700 dark:text-red-300">
                  <p className="mb-2">Votre commande ne sera pas traitée tant que nous n'aurons pas reçu une preuve de paiement de l'acompte.</p>
                  <p className="mb-4">Veuillez télécharger une capture d'écran ou une photo du reçu de votre virement ci-dessous.</p>
                  <PaymentReceiptUploader 
                    onUploadComplete={handleReceiptUpload}
                    orderReference={referenceNumber}
                  />
                </AlertDescription>
              </Alert>
              
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
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Informations du client</h3>
                <Card className="bg-gray-50 dark:bg-gray-800">
                  <CardContent className="p-4">
                    <dl className="divide-y divide-gray-200 dark:divide-gray-700">
                      <div className="py-2 grid grid-cols-3">
                        <dt className="font-medium">Nom</dt>
                        <dd className="col-span-2">{customerInfo.firstName} {customerInfo.lastName}</dd>
                      </div>
                      <div className="py-2 grid grid-cols-3">
                        <dt className="font-medium">Email</dt>
                        <dd className="col-span-2">{customerInfo.email}</dd>
                      </div>
                      <div className="py-2 grid grid-cols-3">
                        <dt className="font-medium">Téléphone</dt>
                        <dd className="col-span-2">{customerInfo.phone}</dd>
                      </div>
                      <div className="py-2 grid grid-cols-3">
                        <dt className="font-medium">Adresse</dt>
                        <dd className="col-span-2">
                          {customerInfo.address.street}<br />
                          {customerInfo.address.postalCode} {customerInfo.address.city}<br />
                          {customerInfo.address.country}
                        </dd>
                      </div>
                      <div className="py-2 grid grid-cols-3">
                        <dt className="font-medium">Livraison prévue</dt>
                        <dd className="col-span-2">{formattedDeliveryDate}<br/>{customerInfo.deliveryTimeWindow}</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
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
                      Après réception de votre acompte et validation de votre preuve de paiement
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
                    Notre équipe vous contactera dans les 24 à 48h après réception et validation du paiement pour finaliser les détails de la livraison.
                  </p>
                </AlertDescription>
              </Alert>
            </CardContent>
            
            <CardFooter className="flex justify-center pt-2">
              <Button 
                onClick={handleFinalizeOrder}
                disabled={isFinalizingOrder || !receiptUploaded || orderFinalized}
                size="lg"
                className="w-full md:w-auto"
              >
                {isFinalizingOrder ? (
                  "Finalisation en cours..."
                ) : orderFinalized ? (
                  "Commande finalisée ✓"
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Finaliser ma commande
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 mt-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            {currentStep === CHECKOUT_STEPS.CUSTOMER_INFO ? "Vos informations" : 
             currentStep === CHECKOUT_STEPS.ORDER_SUMMARY ? "Finaliser votre commande" :
             "Confirmation de Commande"}
          </h1>
          
          {/* Checkout Progress Bar */}
          {!orderPlaced && (
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div className="flex flex-col items-center">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${currentStep === CHECKOUT_STEPS.CUSTOMER_INFO ? 'bg-primary text-white' : 'bg-primary/20 text-primary'}`}>
                    1
                  </div>
                  <p className="text-xs mt-1">Informations</p>
                </div>
                <div className="h-0.5 flex-1 bg-gray-200 mx-2" />
                <div className="flex flex-col items-center">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${currentStep === CHECKOUT_STEPS.ORDER_SUMMARY ? 'bg-primary text-white' : 'bg-primary/20 text-primary'}`}>
                    2
                  </div>
                  <p className="text-xs mt-1">Récapitulatif</p>
                </div>
                <div className="h-0.5 flex-1 bg-gray-200 mx-2" />
                <div className="flex flex-col items-center">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${currentStep === CHECKOUT_STEPS.PAYMENT ? 'bg-primary text-white' : 'bg-primary/20 text-primary'}`}>
                    3
                  </div>
                  <p className="text-xs mt-1">Paiement</p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-8">
            {renderCheckoutStep()}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
