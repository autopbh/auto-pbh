
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

interface OrderHistoryProps {
  userId: string;
}

const OrderHistory = ({ userId }: OrderHistoryProps) => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setOrders(data || []);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  // Map des couleurs de badge selon le statut
  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, string> = {
      'pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      'processing': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      'shipped': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      'delivered': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      'cancelled': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    };
    
    return statusMap[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
  };

  const getStatusText = (status: string) => {
    const statusTextMap: Record<string, string> = {
      'pending': 'En attente',
      'processing': 'En traitement',
      'shipped': 'Expédié',
      'delivered': 'Livré',
      'cancelled': 'Annulé',
    };
    
    return statusTextMap[status] || status;
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Historique des commandes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center py-4">Chargement...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Historique des commandes</CardTitle>
      </CardHeader>
      <CardContent>
        {orders.length === 0 ? (
          <p className="text-center py-4">Aucune commande trouvée</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="border rounded-lg p-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                  <div>
                    <p className="font-medium">Commande #{order.order_number}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.created_at && formatDistanceToNow(new Date(order.created_at), {
                        addSuffix: true,
                        locale: fr
                      })}
                    </p>
                  </div>
                  <Badge className={getStatusBadge(order.status)}>
                    {getStatusText(order.status)}
                  </Badge>
                </div>
                <Separator className="my-2" />
                <div className="mt-2">
                  <p className="font-medium">Total: {order.price ? `${order.price} €` : 'Prix non disponible'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderHistory;
