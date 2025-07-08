import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tables } from "@/integrations/supabase/types";
import { Plus } from "lucide-react";
import { NewOrderFormValues } from "@/types/admin";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

// Import our components
import OrdersTable from "@/components/admin/OrdersTable";
import NewOrderForm from "@/components/admin/NewOrderForm";

const Admin = () => {
  const [orders, setOrders] = useState<Tables<"orders">[]>([]);
  const [isLoading, setIsLoading] = useState(false);
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

  // Créer une nouvelle commande
  const handleCreateOrder = async (values: NewOrderFormValues) => {
    setIsLoading(true);
    
    try {
      // Générer un numéro de commande temporaire (dans une application réelle, cela serait géré côté serveur)
      const tempOrderNum = `PBH-TEMP-${Math.floor(Math.random() * 10000)}`;

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
          order_number: tempOrderNum,
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

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 mt-20">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Administration des Commandes</h1>
        
        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Gestion des commandes</CardTitle>
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
                onDeleteOrder={confirmDeleteOrder}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dialogues and modals */}
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