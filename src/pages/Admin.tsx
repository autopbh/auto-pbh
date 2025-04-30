
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { TrackingOrder, TrackingEvent } from "@/types/tracking";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tables } from "@/integrations/supabase/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { EventFormValues, NewOrderFormValues, OrderFormValues } from "@/types/admin";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

// Import our components
import OrdersTable from "@/components/admin/OrdersTable";
import OrderDetailsForm from "@/components/admin/OrderDetailsForm";
import TrackingDetailsForm from "@/components/admin/TrackingDetailsForm";
import EventForm from "@/components/admin/EventForm";
import NewOrderForm from "@/components/admin/NewOrderForm";

const Admin = () => {
  const [orders, setOrders] = useState<Tables<"orders">[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<TrackingOrder | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isNewEventDialogOpen, setIsNewEventDialogOpen] = useState(false);
  const [isNewOrderDialogOpen, setIsNewOrderDialogOpen] = useState(false);
  const [deleteOrderId, setDeleteOrderId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  // Charger les commandes au chargement de la page
  useEffect(() => {
    fetchOrders();
  }, []);
  
  // Récupérer toutes les commandes
  const fetchOrders = async () => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) {
        toast({
          title: "Erreur",
          description: `Impossible de récupérer les commandes: ${error.message}`,
          variant: "destructive"
        });
        return;
      }
      
      setOrders(data || []);
      
    } catch (error) {
      console.error("Erreur inattendue:", error);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue s'est produite",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Ouvrir le dialogue d'édition pour une commande
  const handleEditOrder = (order: Tables<"orders">) => {
    // Récupérer les options de suivi depuis les additional_options si disponible
    const additionalOptions = order.additional_options as Record<string, any> | null;
    const trackingInfo = additionalOptions?.tracking || {};
    
    // S'assurer que la currentLocation est définie
    const currentLocation = trackingInfo.currentLocation || {
      lat: 48.8566,
      lng: 2.3522,
      address: 'Paris, France'
    };
    
    // Convertir la commande en TrackingOrder avec les détails supplémentaires
    const trackingOrder: TrackingOrder = {
      ...order,
      // Ajouter des valeurs par défaut pour les propriétés de suivi
      trackingStatus: trackingInfo.status || 'preparation',
      trackingProgress: trackingInfo.progress || 0,
      currentLocation: currentLocation,
      trackingEvents: trackingInfo.events || [],
      estimatedDeliveryDate: trackingInfo.estimatedDeliveryDate || new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR'),
      orderDate: new Date(order.created_at).toLocaleDateString('fr-FR'),
      lastUpdateDate: new Date().toLocaleDateString('fr-FR')
    };
    
    setSelectedOrder(trackingOrder);
    setIsEditDialogOpen(true);
  };

  // Sauvegarder les modifications d'une commande
  const handleSaveOrder = async (values: OrderFormValues) => {
    if (!selectedOrder) return;
    
    setIsLoading(true);
    
    try {
      // S'assurer que currentLocation est défini avec des valeurs non-nulles
      const currentLocationValue = {
        lat: values.currentLocation?.lat ?? 48.8566,
        lng: values.currentLocation?.lng ?? 2.3522,
        address: values.currentLocation?.address ?? 'Paris, France'
      };

      // Mettre à jour les informations de base de la commande dans la base de données
      const { error } = await supabase
        .from('orders')
        .update({
          customer_name: values.customer_name,
          customer_email: values.customer_email,
          customer_phone: values.customer_phone,
          status: values.status,
          vehicle_id: values.vehicle_id,
          // Les champs de suivi seraient stockés dans une table séparée ou dans additional_options
          additional_options: {
            ...selectedOrder.additional_options,
            tracking: {
              status: values.trackingStatus,
              progress: values.trackingProgress,
              currentLocation: currentLocationValue,
              estimatedDeliveryDate: values.estimatedDeliveryDate,
              events: selectedOrder.trackingEvents
            }
          }
        })
        .eq('id', selectedOrder.id);
        
      if (error) {
        toast({
          title: "Erreur",
          description: `Impossible de mettre à jour la commande: ${error.message}`,
          variant: "destructive"
        });
        return;
      }
      
      toast({
        title: "Succès",
        description: "La commande a été mise à jour avec succès",
      });
      
      // Rafraîchir la liste des commandes
      fetchOrders();
      setIsEditDialogOpen(false);
      
    } catch (error) {
      console.error("Erreur inattendue:", error);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue s'est produite",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Créer une nouvelle commande
  const handleCreateOrder = async (values: NewOrderFormValues) => {
    setIsLoading(true);
    
    try {
      // Insérer une nouvelle commande
      const { data, error } = await supabase
        .from('orders')
        .insert({
          customer_name: values.customer_name,
          customer_email: values.customer_email,
          customer_phone: values.customer_phone,
          vehicle_id: values.vehicle_id,
          price: values.price,
          status: 'pending',
          additional_options: {
            tracking: {
              status: 'preparation',
              progress: 0,
              currentLocation: {
                lat: 48.8566,
                lng: 2.3522,
                address: 'Paris, France'
              },
              estimatedDeliveryDate: new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR')
            }
          }
        })
        .select();
        
      if (error) {
        toast({
          title: "Erreur",
          description: `Impossible de créer la commande: ${error.message}`,
          variant: "destructive"
        });
        return;
      }
      
      toast({
        title: "Succès",
        description: "La commande a été créée avec succès",
      });
      
      // Rafraîchir la liste des commandes
      fetchOrders();
      setIsNewOrderDialogOpen(false);
      
    } catch (error) {
      console.error("Erreur inattendue:", error);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue s'est produite",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Supprimer une commande
  const handleDeleteOrder = async () => {
    if (!deleteOrderId) return;
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', deleteOrderId);
        
      if (error) {
        toast({
          title: "Erreur",
          description: `Impossible de supprimer la commande: ${error.message}`,
          variant: "destructive"
        });
        return;
      }
      
      toast({
        title: "Succès",
        description: "La commande a été supprimée avec succès",
      });
      
      // Rafraîchir la liste des commandes
      fetchOrders();
      
    } catch (error) {
      console.error("Erreur inattendue:", error);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue s'est produite",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
      setIsDeleteDialogOpen(false);
      setDeleteOrderId(null);
    }
  };

  // Confirmer la suppression d'une commande
  const confirmDeleteOrder = (orderId: string) => {
    setDeleteOrderId(orderId);
    setIsDeleteDialogOpen(true);
  };

  // Ajouter un nouvel événement à une commande
  const handleAddEvent = () => {
    if (!selectedOrder) return;
    
    setIsNewEventDialogOpen(true);
  };
  
  // Sauvegarder un nouvel événement
  const handleSaveEvent = (values: EventFormValues) => {
    if (!selectedOrder) return;
    
    // Créer un nouvel événement
    const newEvent: TrackingEvent = {
      id: `event-${Date.now()}`,
      title: values.title,
      description: values.description,
      date: values.date,
      status: values.status,
      location: {
        lat: values.location.lat,
        lng: values.location.lng,
        address: values.location.address
      }
    };
    
    // Ajouter l'événement à la liste des événements de la commande sélectionnée
    const updatedEvents = [...(selectedOrder.trackingEvents || []), newEvent];
    setSelectedOrder({
      ...selectedOrder,
      trackingEvents: updatedEvents
    });
    
    setIsNewEventDialogOpen(false);
    
    toast({
      title: "Événement ajouté",
      description: "L'événement a été ajouté au suivi de la commande"
    });
  };
  
  // Supprimer un événement
  const handleDeleteEvent = (eventId: string) => {
    if (!selectedOrder || !selectedOrder.trackingEvents) return;
    
    const updatedEvents = selectedOrder.trackingEvents.filter(event => event.id !== eventId);
    setSelectedOrder({
      ...selectedOrder,
      trackingEvents: updatedEvents
    });
    
    toast({
      title: "Événement supprimé",
      description: "L'événement a été supprimé du suivi de la commande"
    });
  };

  // Default values for new events
  const getDefaultEventValues = (): EventFormValues => {
    return {
      title: "",
      description: "",
      date: new Date().toLocaleDateString('fr-FR'),
      status: "pending",
      location: {
        address: selectedOrder?.currentLocation?.address || "Paris, France",
        lat: selectedOrder?.currentLocation?.lat || 48.8566,
        lng: selectedOrder?.currentLocation?.lng || 2.3522
      }
    };
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 mt-20">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Administration des Commandes</h1>
        
        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Gestion des commandes et suivi</CardTitle>
            <Button onClick={() => setIsNewOrderDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" /> Nouvelle commande
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Liste des commandes</h3>
                <Button 
                  onClick={fetchOrders} 
                  disabled={isLoading}
                  variant="outline"
                >
                  {isLoading ? "Chargement..." : "Actualiser"}
                </Button>
              </div>
              
              <OrdersTable
                orders={orders}
                isLoading={isLoading}
                onEditOrder={handleEditOrder}
                onDeleteOrder={confirmDeleteOrder}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dialogue pour créer une nouvelle commande */}
      <Dialog open={isNewOrderDialogOpen} onOpenChange={setIsNewOrderDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Créer une nouvelle commande</DialogTitle>
          </DialogHeader>
          
          <NewOrderForm 
            onSubmit={handleCreateOrder}
            onCancel={() => setIsNewOrderDialogOpen(false)}
            isLoading={isLoading}
          />
        </DialogContent>
      </Dialog>

      {/* Dialogue d'édition de commande */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Éditer la commande {selectedOrder?.order_number}
            </DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="details" className="mt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Détails de commande</TabsTrigger>
              <TabsTrigger value="tracking">Informations de suivi</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details">
              {selectedOrder && (
                <OrderDetailsForm 
                  selectedOrder={selectedOrder}
                  onSubmit={handleSaveOrder}
                />
              )}
            </TabsContent>
            
            <TabsContent value="tracking">
              {selectedOrder && (
                <TrackingDetailsForm 
                  selectedOrder={selectedOrder}
                  onSubmit={handleSaveOrder}
                  onAddEvent={handleAddEvent}
                  onDeleteEvent={handleDeleteEvent}
                />
              )}
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
      
      {/* Dialogue d'ajout d'événement */}
      <Dialog open={isNewEventDialogOpen} onOpenChange={setIsNewEventDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Ajouter un événement</DialogTitle>
          </DialogHeader>
          
          <EventForm 
            defaultValues={getDefaultEventValues()}
            onSubmit={handleSaveEvent}
            onCancel={() => setIsNewEventDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Dialogue de confirmation de suppression */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer cette commande ? Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Annuler</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteOrder} 
              disabled={isLoading}
              className="bg-red-500 hover:bg-red-600"
            >
              {isLoading ? "Suppression..." : "Supprimer"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
};

export default Admin;
