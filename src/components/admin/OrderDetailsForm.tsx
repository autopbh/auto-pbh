
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrderFormValues, orderFormSchema } from "@/types/admin";
import { TrackingOrder } from "@/types/tracking";
import { CalendarIcon } from "lucide-react";
import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage,
  FormDescription 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface OrderDetailsFormProps {
  selectedOrder: TrackingOrder;
  onSubmit: (values: OrderFormValues) => void;
}

const OrderDetailsForm = ({ selectedOrder, onSubmit }: OrderDetailsFormProps) => {
  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      customer_name: selectedOrder.customer_name,
      customer_email: selectedOrder.customer_email,
      customer_phone: selectedOrder.customer_phone || "",
      status: selectedOrder.status,
      vehicle_id: selectedOrder.vehicle_id || "",
      estimatedDeliveryDate: selectedOrder.estimatedDeliveryDate,
      currentLocation: selectedOrder.currentLocation || {
        lat: 48.8566,
        lng: 2.3522,
        address: 'Paris, France'
      },
      trackingStatus: selectedOrder.trackingStatus || "preparation",
      trackingProgress: selectedOrder.trackingProgress || 0
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="customer_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom du client</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="customer_email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="customer_phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Téléphone</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="vehicle_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID du véhicule</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Statut de la commande</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un statut" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="pending">En attente</SelectItem>
                    <SelectItem value="processing">En traitement</SelectItem>
                    <SelectItem value="shipped">Expédiée</SelectItem>
                    <SelectItem value="delivered">Livrée</SelectItem>
                    <SelectItem value="cancelled">Annulée</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mt-4 flex justify-end">
          <Button type="submit">
            Sauvegarder
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default OrderDetailsForm;
