
import React from 'react';
import { TrackingOrder } from '@/types/tracking';
import { CalendarDays, Clock, Car, MapPin, Navigation } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

interface OrderDetailsProps {
  order: TrackingOrder;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  // Fonction pour ouvrir la localisation sur Google Maps
  const openLocationInMap = () => {
    if (order.currentLocation?.lat && order.currentLocation?.lng) {
      const url = `https://www.google.com/maps/search/?api=1&query=${order.currentLocation.lat},${order.currentLocation.lng}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Détails de la commande</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <Car className="h-4 w-4 mr-2 text-autop-red" />
                <span className="text-sm">
                  Véhicule: {order.vehicle_id || "Information non disponible"}
                </span>
              </div>
              <div className="flex items-center">
                <CalendarDays className="h-4 w-4 mr-2 text-autop-red" />
                <span className="text-sm">
                  Date de commande: {order.orderDate || new Date(order.created_at).toLocaleDateString('fr-FR')}
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-autop-red" />
                <span className="text-sm">
                  Livraison estimée: {order.estimatedDeliveryDate || "À déterminer"}
                </span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-autop-red" />
                <span className="text-sm">
                  Adresse de livraison: {order.currentLocation?.address || "À confirmer"}
                </span>
              </div>
              {order.currentLocation?.lat && order.currentLocation?.lng && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={openLocationInMap}
                  className="mt-2 flex items-center gap-2"
                >
                  <Navigation className="h-4 w-4 text-autop-red" />
                  Voir l'emplacement sur la carte
                </Button>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Informations client</h3>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Nom</TableCell>
                  <TableCell>{order.customer_name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Email</TableCell>
                  <TableCell>{order.customer_email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Téléphone</TableCell>
                  <TableCell>{order.customer_phone || "Non renseigné"}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderDetails;
