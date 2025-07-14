
import { useState, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
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
    message: "Veuillez entrer un numéro de téléphone valide avec le code pays",
  }),
  phoneCountryCode: z.string().min(1, {
    message: "Veuillez sélectionner un code pays",
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
    country: z.string().min(1, {
      message: "Veuillez sélectionner un pays",
    }),
  }),
  // Informations professionnelles
  companyName: z.string().min(1, {
    message: "Le nom de l'entreprise est requis",
  }),
  jobTitle: z.string().min(1, {
    message: "Le poste occupé est requis",
  }),
  professionalAddress: z.string().min(5, {
    message: "L'adresse professionnelle est requise",
  }),
  // Informations bancaires
  bankName: z.string().min(1, {
    message: "Le nom de la banque est requis",
  }),
  iban: z.string().min(15, {
    message: "L'IBAN est requis et doit être valide",
  }),
  accountHolder: z.string().min(1, {
    message: "Le titulaire du compte est requis",
  }),
  // Mode de paiement
  paymentMethod: z.enum(['delivery', 'installments']).optional(),
  installmentMonths: z.number().optional(),
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
      phoneCountryCode: "+33",
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
      installmentMonths: undefined,
      deliveryTimeWindow: "",
      additionalNotes: ""
    },
  });

  // Utilisation de useWatch pour éviter les re-rendus excessifs
  const phoneCountryCode = useWatch({
    control: form.control,
    name: 'phoneCountryCode',
    defaultValue: '+33'
  });
  
  const paymentMethod = useWatch({
    control: form.control,
    name: 'paymentMethod'
  });

  const handleSubmit = (values: CustomerFormValues) => {
    onSubmit(values);
  };

  // Mémoisation de la date minimale pour éviter les re-calculs
  const tomorrow = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    date.setHours(0, 0, 0, 0); // Réinitialise l'heure pour éviter les problèmes de comparaison
    return date;
  }, []);

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
          
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="phoneCountryCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code pays</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Code pays" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem key="fr" value="+33">🇫🇷 France (+33)</SelectItem>
                      <SelectItem key="be" value="+32">🇧🇪 Belgique (+32)</SelectItem>
                      <SelectItem key="ch" value="+41">🇨🇭 Suisse (+41)</SelectItem>
                      <SelectItem key="de" value="+49">🇩🇪 Allemagne (+49)</SelectItem>
                      <SelectItem key="it" value="+39">🇮🇹 Italie (+39)</SelectItem>
                      <SelectItem key="es" value="+34">🇪🇸 Espagne (+34)</SelectItem>
                      <SelectItem key="pt" value="+351">🇵🇹 Portugal (+351)</SelectItem>
                      <SelectItem key="nl" value="+31">🇳🇱 Pays-Bas (+31)</SelectItem>
                      <SelectItem key="gb" value="+44">🇬🇧 Royaume-Uni (+44)</SelectItem>
                      <SelectItem key="us" value="+1-us">🇺🇸 États-Unis (+1)</SelectItem>
                      <SelectItem key="ca" value="+1-ca">🇨🇦 Canada (+1)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numéro de téléphone</FormLabel>
                  <FormControl>
                    <div className="flex">
                      <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted text-muted-foreground">
                        {(phoneCountryCode && phoneCountryCode.includes('-')) ? phoneCountryCode.split('-')[0] : (phoneCountryCode || '+33')}
                      </div>
                      <Input 
                        placeholder="06 12 34 56 78" 
                        className="rounded-l-none"
                        {...field} 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un pays" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="France">🇫🇷 France</SelectItem>
                    <SelectItem value="Belgique">🇧🇪 Belgique</SelectItem>
                    <SelectItem value="Suisse">🇨🇭 Suisse</SelectItem>
                    <SelectItem value="Allemagne">🇩🇪 Allemagne</SelectItem>
                    <SelectItem value="Italie">🇮🇹 Italie</SelectItem>
                    <SelectItem value="Espagne">🇪🇸 Espagne</SelectItem>
                    <SelectItem value="Portugal">🇵🇹 Portugal</SelectItem>
                    <SelectItem value="Pays-Bas">🇳🇱 Pays-Bas</SelectItem>
                    <SelectItem value="Royaume-Uni">🇬🇧 Royaume-Uni</SelectItem>
                    <SelectItem value="Luxembourg">🇱🇺 Luxembourg</SelectItem>
                    <SelectItem value="Autriche">🇦🇹 Autriche</SelectItem>
                  </SelectContent>
                </Select>
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
                <FormLabel>Nom de l'entreprise</FormLabel>
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
                <FormLabel>Poste occupé</FormLabel>
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
                <FormLabel>Adresse professionnelle</FormLabel>
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
                <FormLabel>Nom de la banque</FormLabel>
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
                <FormLabel>IBAN</FormLabel>
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
                <FormLabel>Titulaire du compte</FormLabel>
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
          
          {paymentMethod === 'installments' && (
            <FormField
              control={form.control}
              name="installmentMonths"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Durée des mensualités</FormLabel>
                  <Select onValueChange={(value) => field.onChange(parseInt(value))} value={field.value?.toString()}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir la durée" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="6">6 mois</SelectItem>
                      <SelectItem value="12">12 mois</SelectItem>
                      <SelectItem value="18">18 mois</SelectItem>
                      <SelectItem value="24">24 mois</SelectItem>
                      <SelectItem value="30">30 mois</SelectItem>
                      <SelectItem value="36">36 mois</SelectItem>
                      <SelectItem value="42">42 mois</SelectItem>
                      <SelectItem value="48">48 mois</SelectItem>
                      <SelectItem value="54">54 mois</SelectItem>
                      <SelectItem value="60">60 mois</SelectItem>
                      <SelectItem value="66">66 mois</SelectItem>
                      <SelectItem value="72">72 mois</SelectItem>
                      <SelectItem value="78">78 mois</SelectItem>
                      <SelectItem value="84">84 mois</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
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
