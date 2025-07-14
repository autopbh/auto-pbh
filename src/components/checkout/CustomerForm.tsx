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
import { Separator } from "@/components/ui/separator";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";

// Schema de validation
const customerFormSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit comporter au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit comporter au moins 2 caractères"),
  email: z.string().email("Veuillez entrer une adresse e-mail valide"),
  confirmEmail: z.string().email("Veuillez confirmer votre adresse e-mail"),
  phone: z.string().min(10, "Veuillez entrer un numéro de téléphone complet avec le code pays (ex: +33612345678)"),
  address: z.object({
    street: z.string().min(5, "L'adresse est requise (min. 5 caractères)"),
    city: z.string().min(2, "La ville est requise"),
    postalCode: z.string().min(5, "Le code postal est requis"),
    country: z.string().min(1, "Veuillez saisir un pays"),
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
}).refine((data) => data.email === data.confirmEmail, {
  message: "Les adresses e-mail ne correspondent pas",
  path: ["confirmEmail"],
});

export type CustomerFormValues = z.infer<typeof customerFormSchema>;

interface CustomerFormProps {
  onSubmit: (data: CustomerFormValues) => void;
  defaultValues?: Partial<CustomerFormValues>;
  isSubmitting?: boolean;
}

const CustomerForm = ({ onSubmit, defaultValues, isSubmitting = false }: CustomerFormProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [installmentMonths, setInstallmentMonths] = useState<number | undefined>();

  // Date minimale (demain)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      confirmEmail: "",
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
      installmentMonths: undefined,
      deliveryTimeWindow: "",
      additionalNotes: "",
      ...defaultValues,
    },
  });

  const handleSubmit = (values: CustomerFormValues) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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
                    <Input 
                      type="email" 
                      placeholder="email@exemple.fr" 
                      onCopy={(e) => e.preventDefault()}
                      onPaste={(e) => e.preventDefault()}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="confirmEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmation de l'email</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="Confirmez votre email" 
                      onCopy={(e) => e.preventDefault()}
                      onPaste={(e) => e.preventDefault()}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numéro de téléphone</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="+33612345678" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                <FormControl>
                  <Input placeholder="France" {...field} />
                </FormControl>
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
              <FormItem className="space-y-3">
                <FormLabel>Le montant restant sera payé</FormLabel>
                <FormControl>
                  <div className="flex flex-col space-y-2">
                    <Button
                      type="button"
                      variant={paymentMethod === "delivery" ? "default" : "outline"}
                      className="justify-start"
                      onClick={() => {
                        setPaymentMethod("delivery");
                        field.onChange("delivery");
                      }}
                    >
                      À la livraison
                    </Button>
                    <Button
                      type="button"
                      variant={paymentMethod === "installments" ? "default" : "outline"}
                      className="justify-start"
                      onClick={() => {
                        setPaymentMethod("installments");
                        field.onChange("installments");
                      }}
                    >
                      Par mensualités
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {paymentMethod === 'installments' && (
            <FormField
              control={form.control}
              name="installmentMonths"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Durée des mensualités</FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {[6, 12, 18, 24, 30, 36, 42, 48, 54, 60, 66, 72, 78, 84].map((months) => (
                        <Button
                          key={months}
                          type="button"
                          variant={installmentMonths === months ? "default" : "outline"}
                          size="sm"
                          onClick={() => {
                            setInstallmentMonths(months);
                            field.onChange(months);
                          }}
                        >
                          {months} mois
                        </Button>
                      ))}
                    </div>
                  </FormControl>
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
                  <PopoverContent className="w-auto p-0 bg-background border z-50" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        field.onChange(date);
                        setSelectedDate(date);
                      }}
                      disabled={(date) => date < tomorrow}
                      initialFocus
                      className="p-3 pointer-events-auto"
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