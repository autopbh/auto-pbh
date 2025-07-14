import React, { useState, useMemo } from "react";
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

// Schéma de validation avec Zod
const customerFormSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit comporter au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit comporter au moins 2 caractères"),
  email: z.string().email("Veuillez entrer une adresse e-mail valide"),
  phone: z.string().min(10, "Veuillez entrer un numéro de téléphone valide"),
  phoneCountryCode: z.string().min(1, "Veuillez sélectionner un code pays"),
  address: z.object({
    street: z.string().min(5, "L'adresse est requise (min. 5 caractères)"),
    city: z.string().min(2, "La ville est requise"),
    postalCode: z.string().min(5, "Le code postal est requis"),
    country: z.string().min(1, "Veuillez sélectionner un pays"),
  }),
  companyName: z.string().min(1, "Le nom de l'entreprise est requis"),
  jobTitle: z.string().min(1, "Le poste occupé est requis"),
  professionalAddress: z.string().min(5, "L'adresse professionnelle est requise"),
  bankName: z.string().min(1, "Le nom de la banque est requis"),
  iban: z.string().min(15, "L'IBAN est requis et doit être valide"),
  accountHolder: z.string().min(1, "Le titulaire du compte est requis"),
  paymentMethod: z.enum(['delivery', 'installments']).optional(),
  installmentMonths: z.number().optional(),
  deliveryDate: z.date({
    required_error: "Veuillez sélectionner une date",
  }),
  deliveryTimeWindow: z.string().min(1, "Veuillez indiquer vos disponibilités"),
  additionalNotes: z.string().optional(),
});

export type CustomerFormValues = z.infer<typeof customerFormSchema>;

interface CustomerFormProps {
  onSubmit: (data: CustomerFormValues) => void;
  defaultValues?: Partial<CustomerFormValues>;
  isSubmitting?: boolean;
}

const COUNTRY_CODES = [
  { value: "+33", label: "🇫🇷 France (+33)", key: "fr" },
  { value: "+32", label: "🇧🇪 Belgique (+32)", key: "be" },
  { value: "+41", label: "🇨🇭 Suisse (+41)", key: "ch" },
  { value: "+49", label: "🇩🇪 Allemagne (+49)", key: "de" },
  { value: "+39", label: "🇮🇹 Italie (+39)", key: "it" },
  { value: "+34", label: "🇪🇸 Espagne (+34)", key: "es" },
  { value: "+351", label: "🇵🇹 Portugal (+351)", key: "pt" },
  { value: "+31", label: "🇳🇱 Pays-Bas (+31)", key: "nl" },
  { value: "+44", label: "🇬🇧 Royaume-Uni (+44)", key: "gb" },
  { value: "+1-us", label: "🇺🇸 États-Unis (+1)", key: "us" },
  { value: "+1-ca", label: "🇨🇦 Canada (+1)", key: "ca" },
];

const COUNTRIES = [
  { value: "France", label: "🇫🇷 France" },
  { value: "Belgique", label: "🇧🇪 Belgique" },
  { value: "Suisse", label: "🇨🇭 Suisse" },
  { value: "Allemagne", label: "🇩🇪 Allemagne" },
  { value: "Italie", label: "🇮🇹 Italie" },
  { value: "Espagne", label: "🇪🇸 Espagne" },
  { value: "Portugal", label: "🇵🇹 Portugal" },
  { value: "Pays-Bas", label: "🇳🇱 Pays-Bas" },
  { value: "Royaume-Uni", label: "🇬🇧 Royaume-Uni" },
  { value: "Luxembourg", label: "🇱🇺 Luxembourg" },
  { value: "Autriche", label: "🇦🇹 Autriche" },
];

const INSTALLMENT_OPTIONS = [
  { value: 6, label: "6 mois" },
  { value: 12, label: "12 mois" },
  { value: 18, label: "18 mois" },
  { value: 24, label: "24 mois" },
  { value: 30, label: "30 mois" },
  { value: 36, label: "36 mois" },
  { value: 42, label: "42 mois" },
  { value: 48, label: "48 mois" },
  { value: 54, label: "54 mois" },
  { value: 60, label: "60 mois" },
  { value: 66, label: "66 mois" },
  { value: 72, label: "72 mois" },
  { value: 78, label: "78 mois" },
  { value: 84, label: "84 mois" },
];

const CustomerForm: React.FC<CustomerFormProps> = ({ 
  onSubmit, 
  defaultValues, 
  isSubmitting = false 
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    defaultValues?.deliveryDate
  );

  // Date minimale (demain)
  const minDate = useMemo(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return tomorrow;
  }, []);

  // Configuration du formulaire
  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
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
      additionalNotes: "",
      ...defaultValues,
    },
  });

  // Surveillance optimisée des champs
  const watchedPhoneCountryCode = useWatch({
    control: form.control,
    name: 'phoneCountryCode',
    defaultValue: '+33'
  });

  const watchedPaymentMethod = useWatch({
    control: form.control,
    name: 'paymentMethod'
  });

  // Fonction de soumission
  const handleFormSubmit = (values: CustomerFormValues) => {
    try {
      onSubmit(values);
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire:", error);
    }
  };

  // Affichage du code pays pour le téléphone
  const displayPhoneCode = useMemo(() => {
    if (!watchedPhoneCountryCode) return '+33';
    return watchedPhoneCountryCode.includes('-') 
      ? watchedPhoneCountryCode.split('-')[0] 
      : watchedPhoneCountryCode;
  }, [watchedPhoneCountryCode]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Informations personnelles */}
        <div className="space-y-4">
          <h3 className="font-medium text-lg">Informations personnelles</h3>
          
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
                        {COUNTRY_CODES.map((country) => (
                          <SelectItem key={country.key} value={country.value}>
                            {country.label}
                          </SelectItem>
                        ))}
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
                          {displayPhoneCode}
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
        </div>

        <Separator className="my-6" />

        {/* Adresse de livraison */}
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
                    {COUNTRIES.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator className="my-6" />

        {/* Informations professionnelles */}
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

        {/* Informations bancaires */}
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

        {/* Mode de paiement */}
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
          
          {watchedPaymentMethod === 'installments' && (
            <FormField
              control={form.control}
              name="installmentMonths"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Durée des mensualités</FormLabel>
                  <Select 
                    onValueChange={(value) => field.onChange(parseInt(value, 10))} 
                    value={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir la durée" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {INSTALLMENT_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value.toString()}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        <Separator className="my-6" />

        {/* Informations de livraison */}
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
                        variant="outline"
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
                        setSelectedDate(date);
                      }}
                      disabled={(date) => date < minDate}
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

        {/* Bouton de soumission */}
        <div className="pt-6">
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Traitement en cours..." : "Continuer vers le récapitulatif"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CustomerForm;