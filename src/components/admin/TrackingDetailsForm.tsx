
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrderFormValues, orderFormSchema } from "@/types/admin";
import { TrackingEvent, TrackingOrder } from "@/types/tracking";
import { Button } from "@/components/ui/button";
import { CalendarIcon, PlusCircle, Trash2 } from "lucide-react";
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
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface TrackingDetailsFormProps {
  selectedOrder: TrackingOrder;
  onSubmit: (values: OrderFormValues) => void;
  onAddEvent: () => void;
  onDeleteEvent: (eventId: string) => void;
}

const TrackingDetailsForm = ({ selectedOrder, onSubmit, onAddEvent, onDeleteEvent }: TrackingDetailsFormProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    selectedOrder.estimatedDeliveryDate ? new Date(parseDate(selectedOrder.estimatedDeliveryDate)) : undefined
  );

  // Fonction pour convertir une date au format FR (DD/MM/YYYY) en Date
  function parseDate(dateStr: string): Date {
    if (!dateStr) return new Date();
    
    // Si la date est déjà au format français (DD/MM/YYYY)
    const frRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    const frMatches = dateStr.match(frRegex);
    
    if (frMatches) {
      return new Date(Number(frMatches[3]), Number(frMatches[2]) - 1, Number(frMatches[1]));
    }
    
    // Essayer de parser la date directement
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      return date;
    }
    
    // Fallback à la date actuelle
    return new Date();
  }

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

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    setSelectedDate(date);
    
    // Format la date au format français JJ/MM/AAAA
    const formattedDate = format(date, 'dd/MM/yyyy', { locale: fr });
    form.setValue('estimatedDeliveryDate', formattedDate);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="trackingStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Statut du suivi</FormLabel>
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
                    <SelectItem value="preparation">Préparation</SelectItem>
                    <SelectItem value="transport">Transport</SelectItem>
                    <SelectItem value="delivery">Livraison</SelectItem>
                    <SelectItem value="reception">Réception</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="trackingProgress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Progression (%)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="0" 
                    max="100" 
                    value={field.value}
                    onChange={e => field.onChange(parseInt(e.target.value))} 
                  />
                </FormControl>
                <FormDescription>Progression de 0 à 100%</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="estimatedDeliveryDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date de livraison estimée</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal flex justify-between items-center",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? field.value : <span>Sélectionner une date</span>}
                        <CalendarIcon className="h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDateSelect}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>Format: JJ/MM/AAAA</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <Separator className="my-4" />
          
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Localisation actuelle</h3>
          </div>
          
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="currentLocation.address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="currentLocation.lat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Latitude</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.000001" 
                        value={field.value}
                        onChange={e => field.onChange(parseFloat(e.target.value))} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="currentLocation.lng"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Longitude</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.000001" 
                        value={field.value}
                        onChange={e => field.onChange(parseFloat(e.target.value))} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Événements de suivi</h3>
            <Button 
              type="button" 
              onClick={onAddEvent} 
              variant="outline" 
              size="sm"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Ajouter un événement
            </Button>
          </div>
          
          {selectedOrder.trackingEvents && selectedOrder.trackingEvents.length > 0 ? (
            <div className="space-y-4 max-h-60 overflow-y-auto p-2">
              {selectedOrder.trackingEvents.map((event) => (
                <Card key={event.id} className="relative">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-2 right-2"
                    onClick={() => onDeleteEvent(event.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                  <CardContent className="pt-4">
                    <div className="grid gap-1">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">{event.title}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          event.status === 'completed' ? 'bg-green-100 text-green-800' :
                          event.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {event.status === 'completed' ? 'Terminé' :
                          event.status === 'in-progress' ? 'En cours' : 'À venir'}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{event.date}</p>
                      <p className="text-sm mt-1">{event.description}</p>
                      {event.location && (
                        <p className="text-xs text-muted-foreground mt-2">
                          {event.location.address}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center p-4 border border-dashed rounded-md">
              <p className="text-muted-foreground">Aucun événement de suivi</p>
              <p className="text-xs text-muted-foreground mt-1">
                Cliquez sur le bouton "Ajouter un événement" pour créer un nouvel événement
              </p>
            </div>
          )}
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

export default TrackingDetailsForm;
