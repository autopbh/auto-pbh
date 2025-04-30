
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { TrackingOrder, TrackingEvent } from "@/types/tracking";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tables } from "@/integrations/supabase/types";
import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormDescription,
  FormMessage
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, PlusCircle, Save, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const Admin = () => {
  const [orders, setOrders] = useState<Tables<"orders">[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<TrackingOrder | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isNewEventDialogOpen, setIsNewEventDialogOpen] = useState(false);
  
  // Formulaire d'édition avec validation Zod
  const formSchema = z.object({
    customer_name: z.string().min(1, { message: "Le nom du client est requis" }),
    customer_email: z.string().email({ message: "Email invalide" }),
    customer_phone: z.string().optional(),
    status: z.string(),
    vehicle_id: z.string().optional(),
    estimatedDeliveryDate: z.string().optional(),
    currentLocation: z.object({
      lat: z.number(),
      lng: z.number(),
      address: z.string()
    }).optional(),
    trackingStatus: z.enum(['preparation', 'transport', 'delivery', 'reception']).optional(),
    trackingProgress: z.number().min(0).max(100).optional()
  });

  const eventFormSchema = z.object({
    title: z.string().min(1, { message: "Le titre est requis" }),
    description: z.string().min(1, { message: "La description est requise" }),
    date: z.string(),
    status: z.enum(['completed', 'in-progress', 'pending']),
    location: z.object({
      address: z.string(),
      lat: z.number(),
      lng: z.number()
    }).optional()
  });
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customer_name: "",
      customer_email: "",
      customer_phone: "",
      status: "processing",
      trackingStatus: "preparation",
      trackingProgress: 0
    }
  });

  const eventForm = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: "",
      description: "",
      date: new Date().toLocaleDateString('fr-FR'),
      status: "pending",
      location: {
        address: "",
        lat: 48.8566,
        lng: 2.3522
      }
    }
  });

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
    // Convertir la commande en TrackingOrder avec les détails supplémentaires
    const trackingOrder: TrackingOrder = {
      ...order,
      // Ajouter des valeurs par défaut pour les propriétés de suivi
      trackingStatus: 'preparation',
      trackingProgress: 0,
      currentLocation: {
        lat: 48.8566,
        lng: 2.3522,
        address: 'Paris, France'
      },
      trackingEvents: [],
      estimatedDeliveryDate: new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR'), // +14 jours
      orderDate: new Date(order.created_at).toLocaleDateString('fr-FR'),
      lastUpdateDate: new Date().toLocaleDateString('fr-FR')
    };
    
    setSelectedOrder(trackingOrder);
    
    // Pré-remplir le formulaire avec les données existantes
    form.reset({
      customer_name: order.customer_name,
      customer_email: order.customer_email,
      customer_phone: order.customer_phone || "",
      status: order.status,
      vehicle_id: order.vehicle_id || "",
      estimatedDeliveryDate: trackingOrder.estimatedDeliveryDate,
      currentLocation: trackingOrder.currentLocation,
      trackingStatus: trackingOrder.trackingStatus,
      trackingProgress: trackingOrder.trackingProgress
    });
    
    setIsEditDialogOpen(true);
  };

  // Sauvegarder les modifications d'une commande
  const handleSaveOrder = async (values: z.infer<typeof formSchema>) => {
    if (!selectedOrder) return;
    
    setIsLoading(true);
    
    try {
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
              currentLocation: values.currentLocation,
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

  // Ajouter un nouvel événement à une commande
  const handleAddEvent = () => {
    if (!selectedOrder) return;
    
    eventForm.reset({
      title: "",
      description: "",
      date: new Date().toLocaleDateString('fr-FR'),
      status: "pending",
      location: {
        address: selectedOrder.currentLocation?.address || "Paris, France",
        lat: selectedOrder.currentLocation?.lat || 48.8566,
        lng: selectedOrder.currentLocation?.lng || 2.3522
      }
    });
    
    setIsNewEventDialogOpen(true);
  };
  
  // Sauvegarder un nouvel événement
  const handleSaveEvent = (values: z.infer<typeof eventFormSchema>) => {
    if (!selectedOrder) return;
    
    // Créer un nouvel événement
    const newEvent: TrackingEvent = {
      id: `event-${Date.now()}`,
      title: values.title,
      description: values.description,
      date: values.date,
      status: values.status,
      location: values.location
    };
    
    // Ajouter l'événement à la liste des événements de la commande sélectionnée
    const updatedEvents = [...(selectedOrder.trackingEvents || []), newEvent];
    setSelectedOrder({
      ...selectedOrder,
      trackingEvents: updatedEvents
    });
    
    setIsNewEventDialogOpen(false);
    
    // Mettre à jour le formulaire principal
    form.setValue('trackingStatus', values.status === 'completed' ? 'transport' : 
                                    values.status === 'in-progress' ? 'delivery' : 'preparation');
    
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

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 mt-20">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Administration des Commandes</h1>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Gestion des commandes et suivi</CardTitle>
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
              
              <div className="border rounded-md overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">N° Commande</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{order.order_number}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{order.customer_name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{order.customer_email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                            order.status === 'processing' ? 'bg-blue-100 text-blue-800' : 
                            order.status === 'shipped' ? 'bg-purple-100 text-purple-800' : 
                            order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                            'bg-gray-100 text-gray-800'}`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{new Date(order.created_at).toLocaleDateString('fr-FR')}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                          <Button 
                            variant="ghost" 
                            onClick={() => handleEditOrder(order)}
                          >
                            Éditer
                          </Button>
                        </td>
                      </tr>
                    ))}
                    {orders.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                          Aucune commande trouvée
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

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
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSaveOrder)}>
                <TabsContent value="details" className="py-4">
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
                </TabsContent>
                
                <TabsContent value="tracking" className="py-4">
                  <div className="space-y-6">
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
                              <Input {...field} type="number" min="0" max="100" onChange={e => field.onChange(parseInt(e.target.value))} />
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
                          <FormItem>
                            <FormLabel>Date de livraison estimée</FormLabel>
                            <div className="flex">
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <Button
                                variant="outline"
                                size="icon"
                                type="button"
                                className="ml-2"
                              >
                                <CalendarIcon className="h-4 w-4" />
                              </Button>
                            </div>
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
                                  <Input {...field} type="number" step="0.000001" onChange={e => field.onChange(parseFloat(e.target.value))} />
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
                                  <Input {...field} type="number" step="0.000001" onChange={e => field.onChange(parseFloat(e.target.value))} />
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
                          onClick={handleAddEvent} 
                          variant="outline" 
                          size="sm"
                        >
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Ajouter un événement
                        </Button>
                      </div>
                      
                      {selectedOrder?.trackingEvents && selectedOrder.trackingEvents.length > 0 ? (
                        <div className="space-y-4 max-h-60 overflow-y-auto p-2">
                          {selectedOrder.trackingEvents.map((event) => (
                            <Card key={event.id} className="relative">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="absolute top-2 right-2"
                                onClick={() => handleDeleteEvent(event.id)}
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
                  </div>
                </TabsContent>
                
                <DialogFooter className="mt-6">
                  <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button type="submit" className="bg-autop-red hover:bg-autop-red/90 text-white" disabled={isLoading}>
                    <Save className="h-4 w-4 mr-2" />
                    {isLoading ? "Enregistrement..." : "Enregistrer"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </Tabs>
        </DialogContent>
      </Dialog>
      
      {/* Dialogue d'ajout d'événement */}
      <Dialog open={isNewEventDialogOpen} onOpenChange={setIsNewEventDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Ajouter un événement</DialogTitle>
          </DialogHeader>
          
          <Form {...eventForm}>
            <form onSubmit={eventForm.handleSubmit(handleSaveEvent)} className="space-y-4">
              <FormField
                control={eventForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titre</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={eventForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={eventForm.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={eventForm.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Statut</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="completed">Terminé</SelectItem>
                          <SelectItem value="in-progress">En cours</SelectItem>
                          <SelectItem value="pending">À venir</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={eventForm.control}
                name="location.address"
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
                  control={eventForm.control}
                  name="location.lat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Latitude</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.000001" 
                          value={field.value} 
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={eventForm.control}
                  name="location.lng"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Longitude</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.000001" 
                          value={field.value} 
                          onChange={(e) => field.onChange(parseFloat(e.target.value))} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsNewEventDialogOpen(false)}>
                  Annuler
                </Button>
                <Button type="submit">
                  Ajouter
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Admin;
