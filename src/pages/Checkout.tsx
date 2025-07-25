import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Upload, ArrowLeft, ShoppingCart, Copy, Check } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import PaymentReceiptUploader from "@/components/checkout/PaymentReceiptUploader";

// Validation IBAN simplifiée
const validateIBAN = (iban: string) => {
  const ibanRegex = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{4}[0-9]{7}([A-Z0-9]?){0,16}$/;
  return ibanRegex.test(iban.replace(/\s/g, '').toUpperCase());
};

const createCheckoutSchema = (t: (key: string) => string) => z.object({
  // Informations personnelles
  firstName: z.string().min(2, t("validation.firstNameRequired")),
  lastName: z.string().min(2, t("validation.lastNameRequired")),
  gender: z.string().min(1, t("validation.genderRequired")),
  birthDate: z.string().min(1, t("validation.birthDateRequired")).refine((val) => {
    // Valider le format JJ/MM/AAAA
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateRegex.test(val)) return false;
    
    const [day, month, year] = val.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    
    // Vérifier que la date est valide et que l'utilisateur a au moins 18 ans
    const today = new Date();
    const age = today.getFullYear() - year;
    return date.getTime() && age >= 18 && year >= 1900 && year <= today.getFullYear();
  }, t("validation.birthDateInvalid")),
  nationality: z.string().min(2, t("validation.nationalityRequired")),
  street: z.string().min(5, t("validation.addressRequired")),
  postalCode: z.string().min(4, t("validation.postalCodeRequired")),
  city: z.string().min(2, t("validation.cityRequired")),
  country: z.string().min(2, t("validation.countryRequired")),
  phone: z.string().min(10, t("validation.phoneRequired")),
  email: z.string().email(t("validation.emailInvalid")),
  emailConfirm: z.string().email(t("validation.emailConfirmInvalid")),
  
  // Mode de paiement du solde (déplacé avant les infos professionnelles)
  paymentMethod: z.string().min(1, t("validation.paymentMethodRequired")),
  
  // Nombre de mois pour les mensualités (conditionnel)
  installmentMonths: z.number().optional(),
  
  // Informations professionnelles (conditionnelles)
  profession: z.string().optional(),
  employer: z.string().optional(),
  employerAddress: z.string().optional(),
  professionalId: z.string().optional(),
  monthlySalary: z.number().optional(),
  
  // Coordonnées bancaires
  accountHolder: z.string().min(2, t("validation.accountHolderRequired")),
  bankName: z.string().min(2, t("validation.bankNameRequired")),
  iban: z.string().refine(validateIBAN, t("validation.ibanInvalid")),
  bic: z.string().min(8, t("validation.bicRequired")),
  
  // Adresse de livraison
  deliveryRecipient: z.string().min(2, t("validation.deliveryRecipientRequired")),
  deliveryStreet: z.string().min(5, t("validation.deliveryAddressRequired")),
  deliveryPostalCode: z.string().min(4, t("validation.deliveryPostalCodeRequired")),
  deliveryCity: z.string().min(2, t("validation.deliveryCityRequired")),
  deliveryCountry: z.string().min(2, t("validation.deliveryCountryRequired")),
  
  // Paiement de l'acompte
  paymentType: z.string().min(1, t("validation.paymentTypeRequired")),
  paymentProof: z.string().min(1, t("validation.paymentProofRequired")),
  
  // Langue du contrat
  contractLanguage: z.string().min(1, t("validation.contractLanguageRequired"))
}).refine((data) => data.email === data.emailConfirm, {
  message: t("validation.emailsNoMatch"),
  path: ["emailConfirm"]
}).refine((data) => {
  // Si paiement par mensualités, les infos professionnelles sont requises
  if (data.paymentMethod === 'installments') {
    return data.profession && data.profession.length >= 2 &&
           data.employer && data.employer.length >= 2 &&
           data.employerAddress && data.employerAddress.length >= 5 &&
           data.professionalId && data.professionalId.length >= 2 &&
           data.monthlySalary && data.monthlySalary >= 1 &&
           data.installmentMonths && data.installmentMonths >= 6 && data.installmentMonths <= 84;
  }
  return true;
}, {
  message: t("validation.professionalInfoRequired"),
  path: ["profession"]
});

type CheckoutForm = z.infer<ReturnType<typeof createCheckoutSchema>>;

export default function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const { t, currentLanguage } = useLanguage();
  const { toast } = useToast();

  useEffect(() => {
    const loadCart = () => {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    };
    loadCart();
  }, []);

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);
  const depositAmount = total * 0.2; // 20% d'acompte

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  // Mapper la langue actuelle vers une langue supportée par le formulaire
  const getContractLanguage = (): "fr" | "en" | "es" | "it" | "pt" | "de" | "pl" | "fi" | "el" => {
    const supportedLanguages = ["fr", "en", "es", "it", "pt", "de", "pl", "fi", "el"] as const;
    return supportedLanguages.includes(currentLanguage as any) ? currentLanguage as any : "fr";
  };

  const checkoutSchema = createCheckoutSchema(t);
  
  const { register, handleSubmit, formState: { errors }, setValue, watch, control } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      contractLanguage: getContractLanguage(), // Pré-sélectionner la langue actuelle du site
      paymentType: "transfer", // Valeur par défaut pour le type de paiement
    }
  });

  const watchedPaymentType = watch("paymentType");
  const watchedPaymentMethod = watch("paymentMethod");
  const watchedInstallmentMonths = watch("installmentMonths");
  const watchedContractLanguage = watch("contractLanguage");

  const onSubmit = async (data: CheckoutForm) => {
    console.log("🚀 DEBUT onSubmit - Données reçues:", data);
    setIsSubmitting(true);
    
    try {
      console.log("✅ Soumission de la commande:", data);
      
      // Générer un numéro de commande unique
      const orderNumber = `PBH-${Date.now()}`;
      
      // Préparer les données complètes pour Make
      const makeData = {
        orderNumber,
        timestamp: new Date().toISOString(),
        personalInfo: {
          firstName: data.firstName,
          lastName: data.lastName,
          gender: data.gender,
          birthDate: (() => {
            // Convertir JJ/MM/AAAA en Date ISO
            const [day, month, year] = data.birthDate.split('/').map(Number);
            return new Date(year, month - 1, day).toISOString();
          })(),
          nationality: data.nationality,
          address: {
            street: data.street,
            postalCode: data.postalCode,
            city: data.city,
            country: data.country,
          },
          phone: data.phone,
          email: data.email,
        },
        paymentInfo: {
          method: data.paymentMethod,
          installmentMonths: data.installmentMonths,
          type: data.paymentType,
          proofUrl: data.paymentProof,
          depositAmount: depositAmount,
          totalAmount: total,
          remainingBalance: total - depositAmount,
        },
        professionalInfo: data.paymentMethod === 'installments' ? {
          profession: data.profession,
          employer: data.employer,
          employerAddress: data.employerAddress,
          professionalId: data.professionalId,
          monthlySalary: data.monthlySalary,
        } : null,
        bankDetails: {
          accountHolder: data.accountHolder,
          bankName: data.bankName,
          iban: data.iban,
          bic: data.bic,
        },
        deliveryAddress: {
          recipient: data.deliveryRecipient,
          street: data.deliveryStreet,
          postalCode: data.deliveryPostalCode,
          city: data.deliveryCity,
          country: data.deliveryCountry,
        },
        contractLanguage: data.contractLanguage,
        vehicleInfo: cartItems[0] || null
      };

      // Envoyer vers Make webhook
      try {
        const makeResponse = await fetch('https://hook.eu2.make.com/8c2yp7wu0aw98nbw4is985n2asdnrrcf', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(makeData),
        });

        if (!makeResponse.ok) {
          console.warn('Erreur lors de l\'envoi vers Make:', makeResponse.status);
        } else {
          console.log('Données envoyées vers Make avec succès');
        }
      } catch (makeError) {
        console.warn('Erreur lors de l\'envoi vers Make:', makeError);
        // Continue le processus même si Make échoue
      }

      // Envoyer vers le second webhook Make
      try {
        await fetch("https://hook.eu2.make.com/8c2yp7wu0aw98nbw4is985n2asdnrrcf", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(makeData),
        });
        console.log('Données envoyées vers le second webhook Make avec succès');
      } catch (secondWebhookError) {
        console.warn('Erreur lors de l\'envoi vers le second webhook Make:', secondWebhookError);
      }

      // Envoyer vers le troisième webhook Make
      try {
        await fetch("https://hook.eu2.make.com/8c2yp7wu0aw98nbw4is985n2asdnrrcf", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(makeData),
        });
        console.log('Données envoyées vers le troisième webhook Make avec succès');
      } catch (thirdWebhookError) {
        console.warn('Erreur lors de l\'envoi vers le troisième webhook Make:', thirdWebhookError);
      }
      
      // Préparer les données de la commande pour Supabase
      const orderData = {
        order_number: orderNumber,
        customer_name: `${data.firstName} ${data.lastName}`,
        customer_email: data.email,
        customer_phone: data.phone,
        status: 'pending',
        price: total,
        vehicle_id: cartItems[0]?.id || null,
        payment_receipt_url: data.paymentProof,
        additional_options: makeData, // Stocker toutes les données complètes
      };

      // Insérer la commande dans Supabase
      const { data: insertedOrder, error } = await supabase
        .from('orders')
        .insert([orderData])
        .select();

      if (error) {
        throw error;
      }

      console.log("Commande créée avec succès:", insertedOrder);
      
      // Vider le panier
      localStorage.removeItem('cart');
      
      // Afficher un message de succès
      toast({
        title: "Commande validée !",
        description: `Votre commande ${orderNumber} a été enregistrée avec succès. Vous recevrez un email de confirmation sous peu.`,
      });
      
    } catch (error) {
      console.error('Erreur lors de la création de la commande:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la validation de votre commande. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fonction de copie dans le presse-papiers
  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
    }
  };

  // Empêcher le copier-coller pour la confirmation email
  const handleEmailConfirmPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link 
            to={`/${currentLanguage}/catalog`} 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("checkout.backToCatalog")}
          </Link>
        </div>
        <div className="text-center">
          <div className="bg-gray-50 p-8 rounded-lg">
            <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4">{t("checkout.emptyCart")}</h1>
            <p className="text-gray-600 mb-6">{t("checkout.emptyCartMessage")}</p>
            <Link to={`/${currentLanguage}/catalog`}>
              <Button>{t("checkout.browseCatalog")}</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Barre de navigation */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <Link 
          to={`/${currentLanguage}/catalog`} 
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("checkout.backToCatalog")}
        </Link>
        
        <div className="flex items-center gap-4">
          <Link 
            to={`/${currentLanguage}`} 
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("checkout.home")}
          </Link>
          <Link 
            to={`/${currentLanguage}/catalog`} 
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("checkout.catalog")}
          </Link>
        </div>
      </div>
      
      <h1 className="text-3xl font-bold mb-8 text-center">{t("checkout.title")}</h1>
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Formulaire principal */}
        <div className="xl:col-span-2">
          <form onSubmit={handleSubmit((data) => {
            console.log("🎯 FORM SUBMIT - Données du formulaire:", data);
            console.log("🔍 Erreurs de validation:", errors);
            return onSubmit(data);
          })} className="space-y-8">
            {/* 1. Informations personnelles */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                  {t("checkout.personalInfo")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">{t("checkout.firstName")} *</Label>
                    <Input 
                      id="firstName"
                      {...register("firstName")}
                      className={errors.firstName ? "border-destructive" : ""}
                    />
                    {errors.firstName && (
                      <p className="text-sm text-destructive mt-1">{errors.firstName.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="lastName">{t("checkout.lastName")} *</Label>
                    <Input 
                      id="lastName"
                      {...register("lastName")}
                      className={errors.lastName ? "border-destructive" : ""}
                    />
                    {errors.lastName && (
                      <p className="text-sm text-destructive mt-1">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="gender">{t("checkout.gender")} *</Label>
                  <Input 
                    id="gender"
                    {...register("gender")}
                    placeholder="Ex: Homme, Femme, Autre"
                    className={errors.gender ? "border-destructive" : ""}
                  />
                  {errors.gender && (
                    <p className="text-sm text-destructive mt-1">{errors.gender.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="birthDate">{t("checkout.birthDate")} *</Label>
                  <Input 
                    id="birthDate"
                    type="text"
                    {...register("birthDate")}
                    placeholder="Ex: 15/03/1985"
                    className={errors.birthDate ? "border-destructive" : ""}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Saisissez votre date de naissance au format JJ/MM/AAAA (ex: 15/03/1985)
                  </p>
                  {errors.birthDate && (
                    <p className="text-sm text-destructive mt-1">{errors.birthDate.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="nationality">{t("checkout.nationality")} *</Label>
                  <Input 
                    id="nationality"
                    {...register("nationality")}
                    placeholder="Ex: Française, Espagnole, Italienne"
                    className={errors.nationality ? "border-destructive" : ""}
                  />
                  {errors.nationality && (
                    <p className="text-sm text-destructive mt-1">{errors.nationality.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="street">{t("checkout.street")} *</Label>
                  <Input 
                    id="street"
                    {...register("street")}
                    placeholder="Ex: 123 rue de la République"
                    className={errors.street ? "border-destructive" : ""}
                  />
                  {errors.street && (
                    <p className="text-sm text-destructive mt-1">{errors.street.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="postalCode">{t("checkout.postalCode")} *</Label>
                    <Input 
                      id="postalCode"
                      {...register("postalCode")}
                      placeholder="Ex: 75001"
                      className={errors.postalCode ? "border-destructive" : ""}
                    />
                    {errors.postalCode && (
                      <p className="text-sm text-destructive mt-1">{errors.postalCode.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="city">{t("checkout.city")} *</Label>
                    <Input 
                      id="city"
                      {...register("city")}
                      placeholder="Ex: Paris"
                      className={errors.city ? "border-destructive" : ""}
                    />
                    {errors.city && (
                      <p className="text-sm text-destructive mt-1">{errors.city.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="country">{t("checkout.country")} *</Label>
                    <Input 
                      id="country"
                      {...register("country")}
                      placeholder="Ex: France"
                      className={errors.country ? "border-destructive" : ""}
                    />
                    {errors.country && (
                      <p className="text-sm text-destructive mt-1">{errors.country.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">{t("checkout.phoneWithCode")} *</Label>
                  <Input 
                    id="phone"
                    placeholder="+33 6 12 34 56 78"
                    {...register("phone")}
                    className={errors.phone ? "border-destructive" : ""}
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">{t("checkout.email")} *</Label>
                  <Input 
                    id="email"
                    type="email"
                    {...register("email")}
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="emailConfirm">{t("checkout.confirmEmailLabel")} *</Label>
                  <Input 
                    id="emailConfirm"
                    type="email"
                    {...register("emailConfirm")}
                    onPaste={handleEmailConfirmPaste}
                    className={errors.emailConfirm ? "border-destructive" : ""}
                  />
                  {errors.emailConfirm && (
                    <p className="text-sm text-destructive mt-1">{errors.emailConfirm.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* 2. Mode de paiement du solde */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                  {t("checkout.paymentMethod")}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {t("checkout.paymentMethodDesc")}
                </p>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="paymentMethod">{t("checkout.paymentMethod")} *</Label>
                  <Input 
                    id="paymentMethod"
                    {...register("paymentMethod")}
                    placeholder="Tapez 'delivery' pour paiement à la livraison ou 'installments' pour paiement en mensualités"
                    className={errors.paymentMethod ? "border-destructive" : ""}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    <strong>Valeurs acceptées :</strong> 'delivery' (paiement à la livraison) ou 'installments' (paiement en mensualités)
                  </p>
                </div>
                
                {/* Sélection du nombre de mois si mensualités choisies */}
                {watchedPaymentMethod === 'installments' && (
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <Label htmlFor="installmentMonths" className="text-blue-800 font-medium">
                      {t("checkout.installmentMonthsLabel")} *
                    </Label>
                    <Select onValueChange={(value) => setValue("installmentMonths", parseInt(value))}>
                      <SelectTrigger className="w-full mt-2">
                        <SelectValue placeholder={t("checkout.selectFinancingDuration")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6">6 {t("checkout.months")}</SelectItem>
                        <SelectItem value="12">12 {t("checkout.months")}</SelectItem>
                        <SelectItem value="18">18 {t("checkout.months")}</SelectItem>
                        <SelectItem value="24">24 {t("checkout.months")}</SelectItem>
                        <SelectItem value="30">30 {t("checkout.months")}</SelectItem>
                        <SelectItem value="36">36 {t("checkout.months")}</SelectItem>
                        <SelectItem value="42">42 {t("checkout.months")}</SelectItem>
                        <SelectItem value="48">48 {t("checkout.months")}</SelectItem>
                        <SelectItem value="54">54 {t("checkout.months")}</SelectItem>
                        <SelectItem value="60">60 {t("checkout.months")}</SelectItem>
                        <SelectItem value="66">66 {t("checkout.months")}</SelectItem>
                        <SelectItem value="72">72 {t("checkout.months")}</SelectItem>
                        <SelectItem value="78">78 {t("checkout.months")}</SelectItem>
                        <SelectItem value="84">84 {t("checkout.months")}</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.installmentMonths && (
                      <p className="text-sm text-destructive mt-1">{errors.installmentMonths.message}</p>
                    )}
                    
                    {watchedPaymentMethod === 'installments' && watchedInstallmentMonths && (
                      <div className="mt-3 p-3 bg-white border rounded text-sm">
                        <p className="text-green-700">
                          <strong>Mensualité estimée :</strong> {formatPrice((total - depositAmount) / watchedInstallmentMonths)}
                        </p>
                        <p className="text-gray-600 text-xs mt-1">
                          * Montant indicatif, les conditions exactes seront définies avec notre équipe
                        </p>
                      </div>
                    )}
                  </div>
                )}
                
                {errors.paymentMethod && (
                  <p className="text-sm text-destructive mt-2">{errors.paymentMethod.message}</p>
                )}
              </CardContent>
            </Card>

            {/* 3. Informations professionnelles (conditionnelles) */}
            {watchedPaymentMethod === 'installments' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                    {t("checkout.professionalInfo")}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {t("checkout.professionalInfoDesc")}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="profession">{t("checkout.profession")} *</Label>
                    <Input 
                      id="profession"
                      {...register("profession")}
                      placeholder="Ex: Ingénieur, Médecin, Avocat, Professeur"
                      className={errors.profession ? "border-destructive" : ""}
                    />
                    {errors.profession && (
                      <p className="text-sm text-destructive mt-1">{errors.profession.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="employer">{t("checkout.employer")} *</Label>
                    <Input 
                      id="employer"
                      {...register("employer")}
                      placeholder="Ex: Nom de votre entreprise ou employeur"
                      className={errors.employer ? "border-destructive" : ""}
                    />
                    {errors.employer && (
                      <p className="text-sm text-destructive mt-1">{errors.employer.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="employerAddress">{t("checkout.employerAddress")} *</Label>
                    <Textarea 
                      id="employerAddress"
                      {...register("employerAddress")}
                      placeholder="Ex: 456 Avenue des Entreprises, 69000 Lyon, France"
                      className={errors.employerAddress ? "border-destructive" : ""}
                    />
                    {errors.employerAddress && (
                      <p className="text-sm text-destructive mt-1">{errors.employerAddress.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="professionalId">{t("checkout.professionalId")} *</Label>
                    <Input 
                      id="professionalId"
                      {...register("professionalId")}
                      placeholder="Ex: Numéro de sécurité sociale ou identifiant professionnel"
                      className={errors.professionalId ? "border-destructive" : ""}
                    />
                    {errors.professionalId && (
                      <p className="text-sm text-destructive mt-1">{errors.professionalId.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="monthlySalary">{t("checkout.monthlySalary")} *</Label>
                    <Input 
                      id="monthlySalary"
                      type="number"
                      step="0.01"
                      placeholder="Ex: 3500 (montant en euros)"
                      {...register("monthlySalary", { valueAsNumber: true })}
                      className={errors.monthlySalary ? "border-destructive" : ""}
                    />
                    {errors.monthlySalary && (
                      <p className="text-sm text-destructive mt-1">{errors.monthlySalary.message}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* 4. Coordonnées bancaires */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span>
                  {t("checkout.bankDetails")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="accountHolder">{t("checkout.accountHolder")} *</Label>
                  <Input 
                    id="accountHolder"
                    {...register("accountHolder")}
                    placeholder="Ex: Jean Dupont (nom complet du titulaire du compte)"
                    className={errors.accountHolder ? "border-destructive" : ""}
                  />
                  {errors.accountHolder && (
                    <p className="text-sm text-destructive mt-1">{errors.accountHolder.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="bankName">{t("checkout.bankName")} *</Label>
                  <Input 
                    id="bankName"
                    {...register("bankName")}
                    placeholder="Ex: BNP Paribas, Crédit Agricole, Banque Postale"
                    className={errors.bankName ? "border-destructive" : ""}
                  />
                  {errors.bankName && (
                    <p className="text-sm text-destructive mt-1">{errors.bankName.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="iban">IBAN *</Label>
                  <Input 
                    id="iban"
                    placeholder="FR76 3000 3000 0000 0000 0000 000"
                    {...register("iban")}
                    className={errors.iban ? "border-destructive" : ""}
                  />
                  {errors.iban && (
                    <p className="text-sm text-destructive mt-1">{errors.iban.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="bic">BIC/SWIFT *</Label>
                  <Input 
                    id="bic"
                    placeholder="BNPAFRPP"
                    {...register("bic")}
                    className={errors.bic ? "border-destructive" : ""}
                  />
                  {errors.bic && (
                    <p className="text-sm text-destructive mt-1">{errors.bic.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* 5. Adresse de livraison */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">5</span>
                  {t("checkout.deliveryAddress")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="deliveryRecipient">{t("checkout.deliveryRecipient")} *</Label>
                  <Input 
                    id="deliveryRecipient"
                    {...register("deliveryRecipient")}
                    placeholder="Ex: Jean Dupont (nom complet du destinataire)"
                    className={errors.deliveryRecipient ? "border-destructive" : ""}
                  />
                  {errors.deliveryRecipient && (
                    <p className="text-sm text-destructive mt-1">{errors.deliveryRecipient.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="deliveryStreet">{t("checkout.deliveryStreet")} *</Label>
                  <Textarea 
                    id="deliveryStreet"
                    {...register("deliveryStreet")}
                    placeholder="Ex: 789 Boulevard de la Livraison, Apt 12, Bâtiment B"
                    className={errors.deliveryStreet ? "border-destructive" : ""}
                  />
                  {errors.deliveryStreet && (
                    <p className="text-sm text-destructive mt-1">{errors.deliveryStreet.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="deliveryPostalCode">{t("checkout.deliveryPostalCode")} *</Label>
                    <Input 
                      id="deliveryPostalCode"
                      {...register("deliveryPostalCode")}
                      placeholder="Ex: 69000"
                      className={errors.deliveryPostalCode ? "border-destructive" : ""}
                    />
                    {errors.deliveryPostalCode && (
                      <p className="text-sm text-destructive mt-1">{errors.deliveryPostalCode.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="deliveryCity">{t("checkout.deliveryCity")} *</Label>
                    <Input 
                      id="deliveryCity"
                      {...register("deliveryCity")}
                      placeholder="Ex: Lyon"
                      className={errors.deliveryCity ? "border-destructive" : ""}
                    />
                    {errors.deliveryCity && (
                      <p className="text-sm text-destructive mt-1">{errors.deliveryCity.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="deliveryCountry">{t("checkout.deliveryCountry")} *</Label>
                    <Input 
                      id="deliveryCountry"
                      {...register("deliveryCountry")}
                      placeholder="Ex: France"
                      className={errors.deliveryCountry ? "border-destructive" : ""}
                    />
                    {errors.deliveryCountry && (
                      <p className="text-sm text-destructive mt-1">{errors.deliveryCountry.message}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 6. Paiement de l'acompte */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">6</span>
                  {t("checkout.depositPayment")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-blue-800 font-medium">
                    ✅ {t("checkout.depositAlreadyPaid").replace("{amount}", formatPrice(depositAmount))}
                  </p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="bg-green-500 text-white rounded-full p-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h4 className="font-medium text-green-800">💳 {t("checkout.bankingCoordinates")}</h4>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-green-700"><span className="font-medium">{t("checkout.beneficiary")} :</span> AURA AUTO GENESIS</span>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard("AURA AUTO GENESIS", "beneficiaire")}
                        className="h-7 px-2 text-xs"
                      >
                        {copiedField === "beneficiaire" ? (
                          <Check className="h-3 w-3 text-green-600 mr-1" />
                        ) : (
                          <Copy className="h-3 w-3 mr-1" />
                        )}
                        {t("checkout.copy")}
                      </Button>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-green-700"><span className="font-medium">{t("checkout.bank")} :</span> BNP Paribas</span>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard("BNP Paribas", "banque")}
                        className="h-7 px-2 text-xs"
                      >
                        {copiedField === "banque" ? (
                          <Check className="h-3 w-3 text-green-600 mr-1" />
                        ) : (
                          <Copy className="h-3 w-3 mr-1" />
                        )}
                        {t("checkout.copy")}
                      </Button>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-green-700">
                        <span className="font-medium">IBAN :</span> 
                        <span className="font-mono ml-1">FR76 1234 5678 9012 3456 7890 123</span>
                      </span>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard("FR76123456789012345678900123", "iban")}
                        className="h-7 px-2 text-xs"
                      >
                        {copiedField === "iban" ? (
                          <Check className="h-3 w-3 text-green-600 mr-1" />
                        ) : (
                          <Copy className="h-3 w-3 mr-1" />
                        )}
                        {t("checkout.copy")}
                      </Button>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-green-700">
                        <span className="font-medium">BIC/SWIFT :</span> 
                        <span className="font-mono ml-1">BNPAFRPPXXX</span>
                      </span>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard("BNPAFRPPXXX", "bic")}
                        className="h-7 px-2 text-xs"
                      >
                        {copiedField === "bic" ? (
                          <Check className="h-3 w-3 text-green-600 mr-1" />
                        ) : (
                          <Copy className="h-3 w-3 mr-1" />
                        )}
                        Copier
                      </Button>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-green-700">
                        <span className="font-medium">{t("checkout.amount")} :</span> 
                        <span className="font-bold ml-1">{formatPrice(depositAmount)}</span>
                      </span>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(depositAmount.toString(), "montant")}
                        className="h-7 px-2 text-xs"
                      >
                        {copiedField === "montant" ? (
                          <Check className="h-3 w-3 text-green-600 mr-1" />
                        ) : (
                          <Copy className="h-3 w-3 mr-1" />
                        )}
                        {t("checkout.copy")}
                      </Button>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-green-700">
                        <span className="font-medium">{t("checkout.reference")} :</span> 
                        <span className="text-xs">Acompte commande véhicule</span>
                      </span>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard("Acompte commande véhicule", "motif")}
                        className="h-7 px-2 text-xs"
                      >
                        {copiedField === "motif" ? (
                          <Check className="h-3 w-3 text-green-600 mr-1" />
                        ) : (
                          <Copy className="h-3 w-3 mr-1" />
                        )}
                        {t("checkout.copy")}
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">{t("checkout.paymentMethodUsed")}</Label>
                  <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-2 text-green-700">
                      <span className="text-lg">✅</span>
                      <span className="font-medium">{t("checkout.bankTransfer")}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label>📎 {t("checkout.paymentProof")} *</Label>
                  <PaymentReceiptUploader
                    onUploadComplete={(url) => setValue("paymentProof", url)}
                    orderReference={`ORDER-${Date.now()}`}
                  />
                  {errors.paymentProof && (
                    <p className="text-sm text-destructive mt-1">{t("checkout.paymentProofRequired")}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* 7. Langue du contrat */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">7</span>
                  {t("checkout.contractLanguage")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="contractLanguage">{t("checkout.contractLanguage")} *</Label>
                  <Input 
                    id="contractLanguage"
                    {...register("contractLanguage")}
                    placeholder="Tapez le code de langue: 'fr' (français), 'es' (espagnol), 'pt' (portugais), 'it' (italien)"
                    className={errors.contractLanguage ? "border-destructive" : ""}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    <strong>Codes acceptés :</strong> fr, es, pt, it
                  </p>
                </div>
                {errors.contractLanguage && (
                  <p className="text-sm text-destructive mt-2">{errors.contractLanguage.message}</p>
                )}
              </CardContent>
            </Card>

            {/* 8. Conditions d'engagement */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">8</span>
                  Conditions d'engagement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-500 text-white rounded-full p-1 mt-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-800 mb-2">Information importante</h4>
                      <p className="text-sm text-blue-700 leading-relaxed">
                        En confirmant votre commande, vous acceptez automatiquement nos conditions générales de vente, 
                        confirmez l'exactitude des informations fournies, validez que le versement de l'acompte engage définitivement votre commande 
                        et consentez au traitement de vos données personnelles dans le cadre de cette transaction.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bouton de soumission */}
            <Card>
              <CardContent className="pt-6">
                <Button 
                  type="submit" 
                  className="w-full h-12 text-lg font-semibold" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t("checkout.processing") : t("checkout.validateOrderTotal").replace("{total}", formatPrice(total))}
                </Button>
                <p className="text-sm text-muted-foreground text-center mt-4">
                  {t("checkout.validationConfirmation")}
                </p>
              </CardContent>
            </Card>
          </form>
        </div>

        {/* Résumé de commande */}
        <div className="xl:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>{t("checkout.orderSummaryTitle")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-start py-3 border-b">
                  <div className="flex-1">
                    <p className="font-medium">{item.brand} {item.model}</p>
                    <p className="text-sm text-muted-foreground">{t("vehicle.year")}: {item.year}</p>
                    <p className="text-sm text-muted-foreground">{t("common.reference")}: {item.id}</p>
                  </div>
                  <p className="font-medium">{formatPrice(item.price)}</p>
                </div>
              ))}
              
              <div className="space-y-2 pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span>{t("checkout.subtotal")}</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between items-center text-green-600">
                  <span>{t("checkout.depositAmount")}</span>
                  <span>-{formatPrice(depositAmount)}</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold border-t pt-2">
                  <span>{t("checkout.remainingBalance")}</span>
                  <span>{formatPrice(total - depositAmount)}</span>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mt-4">
                <h4 className="font-medium mb-2">{t("checkout.deliveryInfo")}</h4>
                <p className="text-sm text-muted-foreground">
                  {t("checkout.deliveryExpected")}
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2 text-blue-800">{t("checkout.dataSecurityTitle")}</h4>
                <p className="text-sm text-blue-700">
                  {t("checkout.dataSecurityDesc")}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}