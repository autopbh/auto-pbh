
import { Tables } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";

interface OrdersTableProps {
  orders: Tables<"orders">[];
  isLoading: boolean;
  onEditOrder?: (order: Tables<"orders">) => void;
  onDeleteOrder: (orderId: string) => void;
}

const OrdersTable = ({ orders, isLoading, onEditOrder, onDeleteOrder }: OrdersTableProps) => {
  return (
    <div className="border rounded-md overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>N° Commande</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} className="hover:bg-gray-50">
              <TableCell>{order.order_number}</TableCell>
              <TableCell>{order.customer_name}</TableCell>
              <TableCell>{order.customer_email}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                  ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                  order.status === 'processing' ? 'bg-blue-100 text-blue-800' : 
                  order.status === 'shipped' ? 'bg-purple-100 text-purple-800' : 
                  order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                  'bg-gray-100 text-gray-800'}`}
                >
                  {order.status}
                </span>
              </TableCell>
              <TableCell>{new Date(order.created_at).toLocaleDateString('fr-FR')}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  {onEditOrder && (
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => onEditOrder(order)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => onDeleteOrder(order.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {orders.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-sm text-gray-500">
                Aucune commande trouvée
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrdersTable;
