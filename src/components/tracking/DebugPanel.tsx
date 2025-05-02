
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tables } from "@/integrations/supabase/types";

interface DebugPanelProps {
  fetchAllOrders: () => Promise<void>;
  createExampleOrder: () => Promise<void>;
  debugError: string | null;
  allOrders: Tables<"orders">[];
  setOrderNumber: (orderNumber: string) => void;
}

const DebugPanel: React.FC<DebugPanelProps> = ({
  fetchAllOrders,
  createExampleOrder,
  debugError,
  allOrders,
  setOrderNumber
}) => {
  return (
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
  );
};

export default DebugPanel;
