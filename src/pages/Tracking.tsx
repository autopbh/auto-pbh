import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TruckIcon, ClipboardCheck, Package, Check, Mail, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { TrackingOrder } from "@/types/tracking";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tables } from "@/integrations/supabase/types";
import TrackingMap from "@/components/tracking/TrackingMap";
import OrderDetails from "@/components/tracking/OrderDetails";
import TrackingTimeline from "@/components/tracking/TrackingTimeline";

const Tracking = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showRecoveryForm, setShowRecoveryForm] = useState(false);
  const [isRecoverySent, setIsRecoverySent] = useState(false);
  const [order, setOrder] = useState<TrackingOrder | null>(null);
  const [showNotFoundDialog, setShowNotFoundDialog] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  const [allOrders, setAllOrders] = useState<Tables<"orders">[]>([]);
  const [debugError, setDebugError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fonction de débogage pour vérifier si nous pouvons accéder aux commandes
  const fetchAllOrders = async () => {
    setDebugError(null);
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .limit(10);
        
      if (error) {
        console.error("Erreur lors de la récupération des commandes:", error);
        setDebugError(error.message);
        return;
      }
      
      setAllOrders(data || []);
      
      if (data && data.length > 0) {
        toast({
          title: "Succès",
          description: `${data.length} commandes récupérées.`,
          variant: "default"
        });
      } else {
        toast({
          title: "Aucune commande",
          description: "Aucune commande trouvée dans la base de données.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Erreur inattendue:", error);
      setDebugError(error instanceof Error ? error.message : "Erreur inconnue");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) return;
    
    setIsLoading(true);
    console.log("Recherche de commande avec le numéro:", orderNumber.trim());
    
    try {
      // Amélioration: utiliser ilike pour une recherche insensible à la casse
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .ilike('order_number', orderNumber.trim())
        .maybeSingle();
        
      if (error) {
        console.error("Error fetching order:", error);
        setShowNotFoundDialog(true);
        setIsTracking(false);
        setDebugError(error.message);
        return;
      }
      
      if (data) {
        console.log("Commande trouvée:", data);
        // Transform the data into a TrackingOrder with tracking info
        const additionalOptions = data.additional_options as Record<string, any> | null;
        const trackingInfo = additionalOptions?.tracking || {};

        const trackingOrder: TrackingOrder = {
          ...data,
          trackingStatus: trackingInfo.status || 'transport',
          trackingProgress: trackingInfo.progress || 65,
          currentLocation: trackingInfo.currentLocation || {
            lat: 48.8566,
            lng: 2.3522,
            address: 'Centre logistique de Paris, 75008 Paris'
          },
          estimatedDeliveryDate: trackingInfo.estimatedDeliveryDate || '29 avril 2025',
          orderDate: new Date(data.created_at).toLocaleDateString('fr-FR'),
          lastUpdateDate: new Date().toLocaleDateString('fr-FR'),
          trackingEvents: trackingInfo.events || [
            {
              id: '1',
              date: '15 avril 2025',
              title: 'Préparation complétée',
              description: 'Valetage premium et contrôle final réalisés',
              status: 'completed',
              location: {
                lat: 48.8566,
                lng: 2.3522,
                address: 'Centre de préparation Autopremium, Roissy'
              }
            },
            {
              id: '2',
              date: '18 avril 2025',
              title: 'Transport en cours',
              description: 'Véhicule en transit, arrivée prévue le 22 avril',
              status: 'in-progress',
              location: {
                lat: 48.8566,
                lng: 2.3522,
                address: 'En route vers Paris - A1'
              }
            },
            {
              id: '3',
              date: '22 avril 2025',
              title: 'Livraison programmée',
              description: 'Votre conseiller vous contactera pour convenir d\'un rendez-vous',
              status: 'pending',
              location: {
                lat: 48.8566,
                lng: 2.3522,
                address: 'Concession Paris 17ème'
              }
            }
          ]
        };
        
        setOrder(trackingOrder);
        setIsTracking(true);
      } else {
        console.log("Commande non trouvée:", orderNumber);
        setShowNotFoundDialog(true);
        setIsTracking(false);
      }
    } catch (error) {
      console.error("Error in tracking:", error);
      setDebugError(error instanceof Error ? error.message : "Erreur inconnue");
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la recherche de votre commande.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecoverySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('order_number')
        .eq('customer_email', email.trim());
        
      if (error) {
        console.error("Error recovering order numbers:", error);
        setDebugError(error.message);
        toast({
          title: "Erreur",
          description: "Une erreur s'est produite lors de la récupération de vos numéros de commande.",
          variant: "destructive"
        });
        return;
      }
      
      // Even if no orders are found, we'll still show success to avoid leaking information
      setIsRecoverySent(true);
      
      // Reset form after 3 seconds for better UX
      setTimeout(() => {
        setIsRecoverySent(false);
        setShowRecoveryForm(false);
        setEmail("");
      }, 3000);
      
    } catch (error) {
      console.error("Error in recovery:", error);
      setDebugError(error instanceof Error ? error.message : "Erreur inconnue");
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour créer un exemple de commande pour les tests
  const createExampleOrder = async () => {
    try {
      // We need to generate a temporary order number since it's required
      // In production, this would be handled by the trigger we created
      const tempOrderNum = `PBH-TEST-${Math.floor(Math.random() * 10000)}`;
      
      const { data, error } = await supabase
        .from('orders')
        .insert(
          {
            customer_name: 'Client Test',
            customer_email: 'test@example.com',
            customer_phone: '+33123456789',
            status: 'processing',
            order_number: tempOrderNum // Adding the required field
          }
        )
        .select();
        
      if (error) {
        console.error("Erreur lors de la création de la commande test:", error);
        setDebugError(error.message);
        toast({
          title: "Erreur",
          description: "Impossible de créer la commande test: " + error.message,
          variant: "destructive"
        });
        return;
      }
      
      if (data && data.length > 0) {
        toast({
          title: "Commande créée",
          description: `Numéro de commande: ${data[0].order_number}`,
          variant: "default"
        });
        
        // Actualiser la liste des commandes
        fetchAllOrders();
      }
    } catch (error) {
      console.error("Erreur inattendue:", error);
      setDebugError(error instanceof Error ? error.message : "Erreur inconnue");
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 mt-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-8">Suivi de Livraison Personnalisé</h1>
          
          {/* Mode débogage */}
          <div className="mb-6">
            <Button 
              onClick={() => setDebugMode(!debugMode)} 
              variant="outline" 
              className="text-xs"
            >
              {debugMode ? "Masquer le mode débogage" : "Afficher le mode débogage"}
            </Button>
          </div>
          
          {debugMode && (
            <Card className="mb-8 bg-slate-50 border-dashed border-slate-300">
              <CardContent className="pt-6">
                <h2 className="text-lg font-semibold mb-4">Mode Débogage</h2>
                
                <div className="space-y-4">
                  <div>
                    <Button onClick={fetchAllOrders} className="mr-2">
                      Tester l'accès à la base de données
                    </Button>
                    <Button onClick={createExampleOrder} variant="outline">
                      Créer une commande test
                    </Button>
                  </div>
                  
                  {debugError && (
                    <div className="bg-red-50 border border-red-200 p-4 rounded">
                      <h3 className="font-medium text-red-800 mb-1">Erreur</h3>
                      <p className="text-sm text-red-700">{debugError}</p>
                    </div>
                  )}
                  
                  <div>
                    <h3 className="font-medium mb-2">Commandes disponibles ({allOrders.length})</h3>
                    {allOrders.length > 0 ? (
                      <div className="bg-white p-4 rounded border overflow-x-auto max-h-60">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead>
                            <tr>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">N° Commande</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {allOrders.map((order) => (
                              <tr key={order.id}>
                                <td className="px-4 py-2 text-sm">{order.order_number}</td>
                                <td className="px-4 py-2 text-sm">{order.customer_name}</td>
                                <td className="px-4 py-2 text-sm">{order.status}</td>
                                <td className="px-4 py-2 text-sm">
                                  <Button 
                                    variant="link" 
                                    className="p-0 h-auto text-blue-600"
                                    onClick={() => {
                                      setOrderNumber(order.order_number);
                                      // Optionnellement, déclenchement de la recherche
                                      // handleSubmit(new Event('click') as any);
                                    }}
                                  >
                                    Utiliser
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">Aucune commande trouvée.</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          <section className="bg-white/50 backdrop-blur-sm p-8 rounded-lg shadow-sm mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-autop-red">Service de Livraison d'Exception</h2>
            <p className="text-lg mb-6">
              Suivez en temps réel l'évolution de la préparation et de la livraison de votre véhicule d'exception. 
              Notre service "Livraison Clé en Or" vous garantit une expérience premium de bout en bout.
            </p>
            
            <div className="bg-autop-red/5 p-6 rounded-lg mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-autop-red mt-1 shrink-0" />
                <div>
                  <h3 className="font-medium mb-1">Où trouver votre numéro de commande ?</h3>
                  <p className="text-muted-foreground text-sm">
                    Votre numéro de commande commence par "PBH-" et se trouve dans :
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                    <li>L'email de confirmation reçu lors de votre achat</li>
                    <li>Le document de vente signé avec votre conseiller</li>
                    <li>Votre espace client (section "Mes commandes")</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <Input
                  type="text"
                  placeholder="Saisissez votre numéro de commande"
                  className="flex-1"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  disabled={isLoading}
                />
                <Button 
                  type="submit" 
                  className="bg-autop-red hover:bg-autop-red/90 text-white"
                  disabled={isLoading || !orderNumber.trim()}
                >
                  {isLoading ? "Recherche..." : "Suivre ma commande"}
                </Button>
              </div>
            </form>
            
            {!showRecoveryForm ? (
              <div className="text-center">
                <button 
                  onClick={() => setShowRecoveryForm(true)}
                  className="text-autop-red hover:underline text-sm inline-flex items-center"
                  disabled={isLoading}
                >
                  <Mail className="h-4 w-4 mr-1" />
                  Je ne retrouve plus mon numéro de commande
                </button>
              </div>
            ) : (
              <Card className="mt-6">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-4">Récupérer votre numéro de commande</h3>
                  {!isRecoverySent ? (
                    <form onSubmit={handleRecoverySubmit}>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <Label htmlFor="email">Adresse email utilisée lors de votre achat</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="votre@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading}
                            required
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            type="submit" 
                            className="bg-autop-red hover:bg-autop-red/90 text-white"
                            disabled={isLoading || !email.trim()}
                          >
                            {isLoading ? "Envoi..." : "Recevoir mes numéros de commande"}
                          </Button>
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => setShowRecoveryForm(false)}
                            disabled={isLoading}
                          >
                            Annuler
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Nous vous enverrons un email contenant tous vos numéros de commande associés à cette adresse email.
                        </p>
                      </div>
                    </form>
                  ) : (
                    <div className="text-center py-2">
                      <Check className="h-8 w-8 text-green-500 mx-auto mb-2" />
                      <p className="font-medium">Email envoyé avec succès !</p>
                      <p className="text-sm text-muted-foreground">
                        Veuillez consulter votre boîte de réception et vos spams.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </section>

          {isTracking && order && (
            <section className="bg-white/50 backdrop-blur-sm p-8 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-autop-red">Commande #{order.order_number}</h2>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  {order.status === 'pending' ? 'En attente' : 
                   order.status === 'processing' ? 'En préparation' :
                   order.status === 'shipped' ? 'En transit' :
                   order.status === 'delivered' ? 'Livrée' : 'En traitement'}
                </span>
              </div>

              {/* Carte de localisation */}
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Localisation Actuelle</h3>
                <TrackingMap order={order} />
              </div>
              
              {/* Détails de la commande */}
              <div className="mb-8">
                <OrderDetails order={order} />
              </div>
              
              {/* Barre de progression */}
              <div className="mb-8">
                <div className="relative">
                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div 
                      className="bg-autop-red h-2 rounded-full" 
                      style={{ width: `${order.trackingProgress || 0}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between mt-4">
                    <div className="flex flex-col items-center text-center">
                      <div className={`rounded-full p-2 mb-2 ${
                        order.trackingStatus === 'preparation' || 
                        order.trackingStatus === 'transport' || 
                        order.trackingStatus === 'delivery' || 
                        order.trackingStatus === 'reception' ? 'bg-autop-red' : 'bg-gray-200'
                      }`}>
                        <Check className={`h-4 w-4 ${
                          order.trackingStatus === 'preparation' || 
                          order.trackingStatus === 'transport' || 
                          order.trackingStatus === 'delivery' || 
                          order.trackingStatus === 'reception' ? 'text-white' : 'text-gray-400'
                        }`} />
                      </div>
                      <span className="text-sm font-medium">Préparation</span>
                      <span className="text-xs text-muted-foreground">{
                        order.trackingStatus === 'preparation' || 
                        order.trackingStatus === 'transport' || 
                        order.trackingStatus === 'delivery' || 
                        order.trackingStatus === 'reception' ? 'Terminé' : 'À venir'
                      }</span>
                    </div>
                    
                    <div className="flex flex-col items-center text-center">
                      <div className={`rounded-full p-2 mb-2 ${
                        order.trackingStatus === 'transport' || 
                        order.trackingStatus === 'delivery' || 
                        order.trackingStatus === 'reception' ? 'bg-autop-red' : 'bg-gray-200'
                      }`}>
                        <TruckIcon className={`h-4 w-4 ${
                          order.trackingStatus === 'transport' || 
                          order.trackingStatus === 'delivery' || 
                          order.trackingStatus === 'reception' ? 'text-white' : 'text-gray-400'
                        }`} />
                      </div>
                      <span className="text-sm font-medium">Transport</span>
                      <span className="text-xs text-muted-foreground">{
                        order.trackingStatus === 'transport' ? 'En cours' : 
                        order.trackingStatus === 'delivery' || order.trackingStatus === 'reception' ? 'Terminé' : 'À venir'
                      }</span>
                    </div>
                    
                    <div className="flex flex-col items-center text-center">
                      <div className={`rounded-full p-2 mb-2 ${
                        order.trackingStatus === 'delivery' || 
                        order.trackingStatus === 'reception' ? 'bg-autop-red' : 'bg-gray-200'
                      }`}>
                        <Package className={`h-4 w-4 ${
                          order.trackingStatus === 'delivery' || 
                          order.trackingStatus === 'reception' ? 'text-white' : 'text-gray-400'
                        }`} />
                      </div>
                      <span className="text-sm font-medium">Livraison</span>
                      <span className="text-xs text-muted-foreground">{
                        order.trackingStatus === 'delivery' ? 'En cours' :
                        order.trackingStatus === 'reception' ? 'Terminé' : 'À venir'
                      }</span>
                    </div>
                    
                    <div className="flex flex-col items-center text-center">
                      <div className={`rounded-full p-2 mb-2 ${
                        order.trackingStatus === 'reception' ? 'bg-autop-red' : 'bg-gray-200'
                      }`}>
                        <ClipboardCheck className={`h-4 w-4 ${
                          order.trackingStatus === 'reception' ? 'text-white' : 'text-gray-400'
                        }`} />
                      </div>
                      <span className="text-sm font-medium">Réception</span>
                      <span className="text-xs text-muted-foreground">{
                        order.trackingStatus === 'reception' ? 'Terminé' : 'À venir'
                      }</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Timeline des événements */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium mb-4">Historique de Suivi</h3>
                {order.trackingEvents && <TrackingTimeline events={order.trackingEvents} />}
              </div>
            </section>
          )}
        </div>
      </div>

      <Dialog open={showNotFoundDialog} onOpenChange={setShowNotFoundDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center text-lg font-semibold text-autop-red">
              Commande introuvable
            </DialogTitle>
          </DialogHeader>
          <div className="py-4 text-center">
            <p className="mb-4">
              Aucune commande trouvée avec le numéro <strong>{orderNumber}</strong>.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Veuillez vérifier le numéro saisi ou utiliser l'option "Je ne retrouve plus mon numéro de commande".
            </p>
            <Button
              variant="default"
              className="bg-autop-red hover:bg-autop-red/90 text-white"
              onClick={() => {
                setShowNotFoundDialog(false);
                setShowRecoveryForm(true);
              }}
            >
              Récupérer mon numéro de commande
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Tracking;
