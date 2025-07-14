
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";

// Définition du schéma de validation
const customerFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "Le prénom doit comporter au moins 2 caractères",
  }),
  lastName: z.string().min(2, {
    message: "Le nom doit comporter au moins 2 caractères",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse e-mail valide",
  }),
  phone: z.string().min(10, {
    message: "Veuillez entrer un numéro de téléphone valide",
  }),
  address: z.object({
    street: z.string().min(5, {
      message: "L'adresse est requise (min. 5 caractères)",
    }),
    city: z.string().min(2, {
      message: "La ville est requise",
    }),
    postalCode: z.string().min(5, {
      message: "Le code postal est requis",
    }),
    country: z.string().min(2, {
      message: "Le pays est requis",
    }),
  }),
  // Informations professionnelles
  companyName: z.string().optional(),
  jobTitle: z.string().optional(),
  professionalAddress: z.string().optional(),
  // Informations bancaires
  bankName: z.string().optional(),
  iban: z.string().optional(),
  accountHolder: z.string().optional(),
  // Mode de paiement
  paymentMethod: z.enum(['delivery', 'installments']).optional(),
  deliveryDate: z.date({
    required_error: "Veuillez sélectionner une date",
  }),
  deliveryTimeWindow: z.string().min(1, {
    message: "Veuillez indiquer vos disponibilités",
  }),
  additionalNotes: z.string().optional(),
});

export type CustomerFormValues = z.infer<typeof customerFormSchema>;

interface CustomerFormProps {
  onSubmit: (data: CustomerFormValues) => void;
  defaultValues?: Partial<CustomerFormValues>;
  isSubmitting?: boolean;
}

const CustomerForm = ({ onSubmit, defaultValues, isSubmitting = false }: CustomerFormProps) => {
  const [date, setDate] = useState<Date | undefined>(defaultValues?.deliveryDate);
  
  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: defaultValues || {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: {
        street: "",
        city: "",
        postalCode: "",
        country: "France",
      },
      companyName: "",
      jobTitle: "",
      professionalAddress: "",
      bankName: "",
      iban: "",
      accountHolder: "",
      paymentMethod: undefined,
      deliveryTimeWindow: "",
      additionalNotes: ""
    },
  });

  const handleSubmit = (values: CustomerFormValues) => {
    onSubmit(values);
  };

  // Définit la date minimale à demain
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prénom</FormLabel>
                <FormControl>
                  <Input placeholder="Jean" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input placeholder="Dupont" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="email@exemple.fr" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Téléphone</FormLabel>
                <FormControl>
                  <Input placeholder="06 12 34 56 78" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-lg">Adresse de livraison</h3>
          
          <FormField
            control={form.control}
            name="address.street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rue</FormLabel>
                <FormControl>
                  <Input placeholder="123 rue de la Paix" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="address.city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ville</FormLabel>
                  <FormControl>
                    <Input placeholder="Paris" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="address.postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code postal</FormLabel>
                  <FormControl>
                    <Input placeholder="75001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="address.country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pays</FormLabel>
                <FormControl>
                  <Input placeholder="France" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator className="my-6" />
        <div className="space-y-4">
          <h3 className="font-medium text-lg">Informations professionnelles</h3>
          
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom de l'entreprise (optionnel)</FormLabel>
                <FormControl>
                  <Input placeholder="SARL MonEntreprise" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Poste occupé (optionnel)</FormLabel>
                <FormControl>
                  <Input placeholder="Directeur commercial" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="professionalAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adresse professionnelle (optionnel)</FormLabel>
                <FormControl>
                  <Input placeholder="456 avenue des Affaires, 75008 Paris" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator className="my-6" />
        <div className="space-y-4">
          <h3 className="font-medium text-lg">Informations bancaires</h3>
          
          <FormField
            control={form.control}
            name="bankName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom de la banque (optionnel)</FormLabel>
                <FormControl>
                  <Input placeholder="Crédit Agricole" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="iban"
            render={({ field }) => (
              <FormItem>
                <FormLabel>IBAN (optionnel)</FormLabel>
                <FormControl>
                  <Input placeholder="FR76 XXXX XXXX XXXX XXXX XXXX XXX" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="accountHolder"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titulaire du compte (optionnel)</FormLabel>
                <FormControl>
                  <Input placeholder="Jean Dupont" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator className="my-6" />
        <div className="space-y-4">
          <h3 className="font-medium text-lg">Mode de paiement</h3>
          
          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Le montant restant sera payé</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner le mode de paiement" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="delivery">À la livraison</SelectItem>
                    <SelectItem value="installments">Par mensualités</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator className="my-6" />
        <div className="space-y-4">
          <h3 className="font-medium text-lg">Informations de livraison</h3>
          
          <FormField
            control={form.control}
            name="deliveryDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date de livraison souhaitée</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: fr })
                        ) : (
                          <span>Sélectionnez une date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        field.onChange(date);
                        setDate(date);
                      }}
                      disabled={(date) => date < tomorrow}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="deliveryTimeWindow"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Créneau horaire préféré</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Entre 14h et 18h" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="additionalNotes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes supplémentaires (optionnel)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Instructions particulières pour la livraison, code d'entrée, etc."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Traitement en cours..." : "Continuer"}
        </Button>
      </form>
    </Form>
  );
};

export default CustomerForm;
