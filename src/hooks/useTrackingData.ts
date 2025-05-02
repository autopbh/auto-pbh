
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { TrackingOrder } from '@/types/tracking';
import { toast } from '@/components/ui/use-toast';
import { Tables } from "@/integrations/supabase/types";

export function useTrackingData() {
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
      // Première recherche: rechercher exactement le numéro de commande saisi
      let { data, error } = await supabase
        .from('orders')
        .select('*')
        .ilike('order_number', orderNumber.trim())
        .maybeSingle();
        
      // Si pas trouvé et que c'est un numéro ACOMPTE-, rechercher dans le champ référence
      if (!data && orderNumber.trim().startsWith('ACOMPTE-')) {
        const { data: dataByReference, error: errorByReference } = await supabase
          .from('orders')
          .select('*')
          .eq('order_number', orderNumber.trim())
          .maybeSingle();
        
        if (errorByReference) {
          console.error("Error fetching order by reference:", errorByReference);
        } else if (dataByReference) {
          data = dataByReference;
          error = null;
        }
      }
      
      // Si nous avons toujours une erreur
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
        
        // Notification pour indiquer à l'utilisateur le numéro de commande utilisé
        if (orderNumber.trim().startsWith('ACOMPTE-')) {
          toast({
            title: "Commande trouvée",
            description: `Votre commande avec référence ${orderNumber.trim()} a été trouvée.`,
            variant: "default"
          });
        }
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

  return {
    orderNumber,
    setOrderNumber,
    email,
    setEmail,
    isTracking,
    setIsTracking,
    isLoading,
    setIsLoading,
    showRecoveryForm,
    setShowRecoveryForm,
    isRecoverySent,
    setIsRecoverySent,
    order,
    setOrder,
    showNotFoundDialog,
    setShowNotFoundDialog,
    debugMode,
    setDebugMode,
    allOrders,
    setAllOrders,
    debugError,
    setDebugError,
    fetchAllOrders,
    handleSubmit,
    handleRecoverySubmit,
    createExampleOrder
  };
}
