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
import { Link } from "react-router-dom";
import PaymentReceiptUploader from "@/components/checkout/PaymentReceiptUploader";

// Validation IBAN simplifiée
const validateIBAN = (iban: string) => {
  const ibanRegex = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{4}[0-9]{7}([A-Z0-9]?){0,16}$/;
  return ibanRegex.test(iban.replace(/\s/g, '').toUpperCase());
};

const checkoutSchema = z.object({
  // Informations personnelles
  firstName: z.string().min(2, "Prénom requis"),
  lastName: z.string().min(2, "Nom requis"),
  gender: z.enum(["male", "female", "other"], { required_error: "Sexe requis" }),
  birthDate: z.date({ required_error: "Date de naissance requise" }),
  nationality: z.string().min(2, "Nationalité requise"),
  street: z.string().min(5, "Adresse complète requise"),
  postalCode: z.string().min(4, "Code postal requis"),
  city: z.string().min(2, "Ville requise"),
  country: z.string().min(2, "Pays requis"),
  phone: z.string().min(10, "Téléphone avec indicatif requis"),
  email: z.string().email("Email invalide"),
  emailConfirm: z.string().email("Confirmation email invalide"),
  
  // Mode de paiement du solde (déplacé avant les infos professionnelles)
  paymentMethod: z.enum(['delivery', 'installments'], { 
    required_error: "Veuillez choisir un mode de paiement pour le solde" 
  }),
  
  // Nombre de mois pour les mensualités (conditionnel)
  installmentMonths: z.number().optional(),
  
  // Informations professionnelles (conditionnelles)
  profession: z.string().optional(),
  employer: z.string().optional(),
  employerAddress: z.string().optional(),
  professionalId: z.string().optional(),
  monthlySalary: z.number().optional(),
  
  // Coordonnées bancaires
  accountHolder: z.string().min(2, "Titulaire du compte requis"),
  bankName: z.string().min(2, "Nom de la banque requis"),
  iban: z.string().refine(validateIBAN, "IBAN invalide"),
  bic: z.string().min(8, "BIC/SWIFT requis (8-11 caractères)"),
  
  // Adresse de livraison
  deliveryRecipient: z.string().min(2, "Nom du destinataire requis"),
  deliveryStreet: z.string().min(5, "Adresse de livraison requise"),
  deliveryPostalCode: z.string().min(4, "Code postal livraison requis"),
  deliveryCity: z.string().min(2, "Ville de livraison requise"),
  deliveryCountry: z.string().min(2, "Pays de livraison requis"),
  
  // Paiement de l'acompte
  paymentType: z.enum(["transfer"], { required_error: "Type de paiement requis" }),
  paymentProof: z.string().min(1, "Preuve de paiement requise"),
  
  // Langue du contrat
  contractLanguage: z.enum(["fr", "en", "es", "it", "pt", "de", "pl", "fi", "el"], { required_error: "Langue du contrat requise" }),
  
  // Consentements
  dataAccuracy: z.boolean().refine(val => val === true, "Confirmation de l'exactitude des données requise"),
  depositConfirmation: z.boolean().refine(val => val === true, "Acceptation validation commande par acompte requise"),
  dataProcessing: z.boolean().refine(val => val === true, "Acceptation traitement données personnelles requise")
}).refine((data) => data.email === data.emailConfirm, {
  message: "Les emails ne correspondent pas",
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
  message: "Les informations professionnelles et le nombre de mois sont requis pour le paiement par mensualités",
  path: ["profession"]
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [birthDate, setBirthDate] = useState<Date>();
  const [emailConfirmValue, setEmailConfirmValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const { t, currentLanguage } = useLanguage();

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

  const { register, handleSubmit, formState: { errors }, setValue, watch, control } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      contractLanguage: getContractLanguage(), // Pré-sélectionner la langue actuelle du site
    }
  });

  const watchedPaymentType = watch("paymentType");
  const watchedPaymentMethod = watch("paymentMethod");
  const watchedInstallmentMonths = watch("installmentMonths");
  const watchedContractLanguage = watch("contractLanguage");

  const onSubmit = async (data: CheckoutForm) => {
    setIsSubmitting(true);
    console.log("Commande complète soumise:", data);
    // Logique de traitement de la commande ici
    setIsSubmitting(false);
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
            Retour au catalogue
          </Link>
        </div>
        <div className="text-center">
          <div className="bg-gray-50 p-8 rounded-lg">
            <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4">Panier vide</h1>
            <p className="text-gray-600 mb-6">Votre panier est vide. Ajoutez des véhicules pour continuer.</p>
            <Link to={`/${currentLanguage}/catalog`}>
              <Button>Parcourir le catalogue</Button>
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
          Retour au catalogue
        </Link>
        
        <div className="flex items-center gap-4">
          <Link 
            to={`/${currentLanguage}`} 
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Accueil
          </Link>
          <Link 
            to={`/${currentLanguage}/catalog`} 
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Catalogue
          </Link>
        </div>
      </div>
      
      <h1 className="text-3xl font-bold mb-8 text-center">{t("checkout.title")}</h1>
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Formulaire principal */}
        <div className="xl:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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
                  <Label>Sexe *</Label>
                  <RadioGroup 
                    onValueChange={(value) => setValue("gender", value as "male" | "female" | "other")}
                    className="flex gap-6 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">Homme</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">Femme</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other">Autre</Label>
                    </div>
                  </RadioGroup>
                  {errors.gender && (
                    <p className="text-sm text-destructive mt-1">{errors.gender.message}</p>
                  )}
                </div>

                <div>
                  <Label>Date de naissance *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !birthDate && "text-muted-foreground",
                          errors.birthDate && "border-destructive"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {birthDate ? format(birthDate, "dd/MM/yyyy") : "Sélectionner une date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <div className="p-3 border-b">
                        <div className="grid grid-cols-3 gap-2 mb-2">
                          <div>
                            <Label className="text-xs">Jour</Label>
                            <Select
                              value={birthDate?.getDate()?.toString() || ""}
                              onValueChange={(day) => {
                                if (day) {
                                  const currentYear = birthDate?.getFullYear() || new Date().getFullYear() - 25;
                                  const currentMonth = birthDate?.getMonth() || 0;
                                  const newDate = new Date(currentYear, currentMonth, parseInt(day));
                                  setBirthDate(newDate);
                                  setValue("birthDate", newDate);
                                }
                              }}
                            >
                              <SelectTrigger className="h-8">
                                <SelectValue placeholder="Jour" />
                              </SelectTrigger>
                              <SelectContent className="max-h-[200px]">
                                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                                  <SelectItem key={day} value={day.toString()}>
                                    {day.toString().padStart(2, '0')}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label className="text-xs">Mois</Label>
                            <Select
                              value={birthDate?.getMonth()?.toString() || ""}
                              onValueChange={(month) => {
                                if (month) {
                                  const currentYear = birthDate?.getFullYear() || new Date().getFullYear() - 25;
                                  const currentDay = birthDate?.getDate() || 1;
                                  const newDate = new Date(currentYear, parseInt(month), currentDay);
                                  setBirthDate(newDate);
                                  setValue("birthDate", newDate);
                                }
                              }}
                            >
                              <SelectTrigger className="h-8">
                                <SelectValue placeholder="Mois" />
                              </SelectTrigger>
                              <SelectContent>
                                {[
                                  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
                                  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
                                ].map((month, index) => (
                                  <SelectItem key={index} value={index.toString()}>
                                    {month}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <Label className="text-xs">Année</Label>
                            <Select
                              value={birthDate?.getFullYear()?.toString() || ""}
                              onValueChange={(year) => {
                                if (year) {
                                  const currentMonth = birthDate?.getMonth() || 0;
                                  const currentDay = birthDate?.getDate() || 1;
                                  const newDate = new Date(parseInt(year), currentMonth, currentDay);
                                  setBirthDate(newDate);
                                  setValue("birthDate", newDate);
                                }
                              }}
                            >
                              <SelectTrigger className="h-8">
                                <SelectValue placeholder="Année" />
                              </SelectTrigger>
                              <SelectContent className="max-h-[200px]">
                                {Array.from({ length: 80 }, (_, i) => {
                                  const year = new Date().getFullYear() - 18 - i;
                                  return (
                                    <SelectItem key={year} value={year.toString()}>
                                      {year}
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                      <Calendar
                        mode="single"
                        selected={birthDate}
                        onSelect={(date) => {
                          if (date) {
                            setBirthDate(date);
                            setValue("birthDate", date);
                          }
                        }}
                        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.birthDate && (
                    <p className="text-sm text-destructive mt-1">{errors.birthDate.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="nationality">Nationalité *</Label>
                  <Input 
                    id="nationality"
                    {...register("nationality")}
                    className={errors.nationality ? "border-destructive" : ""}
                  />
                  {errors.nationality && (
                    <p className="text-sm text-destructive mt-1">{errors.nationality.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="street">Adresse complète (rue, numéro) *</Label>
                  <Input 
                    id="street"
                    {...register("street")}
                    className={errors.street ? "border-destructive" : ""}
                  />
                  {errors.street && (
                    <p className="text-sm text-destructive mt-1">{errors.street.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="postalCode">Code postal *</Label>
                    <Input 
                      id="postalCode"
                      {...register("postalCode")}
                      className={errors.postalCode ? "border-destructive" : ""}
                    />
                    {errors.postalCode && (
                      <p className="text-sm text-destructive mt-1">{errors.postalCode.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="city">Ville *</Label>
                    <Input 
                      id="city"
                      {...register("city")}
                      className={errors.city ? "border-destructive" : ""}
                    />
                    {errors.city && (
                      <p className="text-sm text-destructive mt-1">{errors.city.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="country">Pays *</Label>
                    <Input 
                      id="country"
                      {...register("country")}
                      className={errors.country ? "border-destructive" : ""}
                    />
                    {errors.country && (
                      <p className="text-sm text-destructive mt-1">{errors.country.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Téléphone (avec indicatif) *</Label>
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
                    onChange={(e) => {
                      setEmailValue(e.target.value);
                      register("email").onChange(e);
                    }}
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="emailConfirm">Confirmation e-mail *</Label>
                  <Input 
                    id="emailConfirm"
                    type="email"
                    {...register("emailConfirm")}
                    onPaste={handleEmailConfirmPaste}
                    onChange={(e) => {
                      setEmailConfirmValue(e.target.value);
                      register("emailConfirm").onChange(e);
                    }}
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
                  Comment souhaitez-vous payer le solde de {formatPrice(total - depositAmount)} ?
                </p>
              </CardHeader>
              <CardContent>
                <RadioGroup 
                  onValueChange={(value) => setValue("paymentMethod", value as "delivery" | "installments")}
                  className="space-y-4"
                >
                  <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="delivery" id="delivery" />
                      <div className="flex-1">
                        <Label htmlFor="delivery" className="font-medium cursor-pointer">
                          💰 Paiement intégral à la livraison
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Le solde complet de {formatPrice(total - depositAmount)} sera payé lors de la réception du véhicule
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="installments" id="installments" />
                      <div className="flex-1">
                        <Label htmlFor="installments" className="font-medium cursor-pointer">
                          📅 Paiement par mensualités
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Le solde sera payé en mensualités de 6 à 84 mois selon votre capacité financière
                        </p>
                      </div>
                    </div>
                  </div>
                </RadioGroup>
                
                {/* Sélection du nombre de mois si mensualités choisies */}
                {watchedPaymentMethod === 'installments' && (
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <Label htmlFor="installmentMonths" className="text-blue-800 font-medium">
                      Nombre de mois souhaité pour le financement *
                    </Label>
                    <Select onValueChange={(value) => setValue("installmentMonths", parseInt(value))}>
                      <SelectTrigger className="w-full mt-2">
                        <SelectValue placeholder="Choisissez la durée de financement" />
                      </SelectTrigger>
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
                    Ces informations sont nécessaires pour le financement par mensualités
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="profession">Profession *</Label>
                    <Input 
                      id="profession"
                      {...register("profession")}
                      className={errors.profession ? "border-destructive" : ""}
                    />
                    {errors.profession && (
                      <p className="text-sm text-destructive mt-1">{errors.profession.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="employer">Employeur *</Label>
                    <Input 
                      id="employer"
                      {...register("employer")}
                      className={errors.employer ? "border-destructive" : ""}
                    />
                    {errors.employer && (
                      <p className="text-sm text-destructive mt-1">{errors.employer.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="employerAddress">Adresse de l'employeur *</Label>
                    <Textarea 
                      id="employerAddress"
                      {...register("employerAddress")}
                      className={errors.employerAddress ? "border-destructive" : ""}
                    />
                    {errors.employerAddress && (
                      <p className="text-sm text-destructive mt-1">{errors.employerAddress.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="professionalId">Numéro d'identification professionnel *</Label>
                    <Input 
                      id="professionalId"
                      {...register("professionalId")}
                      className={errors.professionalId ? "border-destructive" : ""}
                    />
                    {errors.professionalId && (
                      <p className="text-sm text-destructive mt-1">{errors.professionalId.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="monthlySalary">Salaire mensuel net (€) *</Label>
                    <Input 
                      id="monthlySalary"
                      type="number"
                      step="0.01"
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
                  <Label htmlFor="accountHolder">Titulaire du compte *</Label>
                  <Input 
                    id="accountHolder"
                    {...register("accountHolder")}
                    className={errors.accountHolder ? "border-destructive" : ""}
                  />
                  {errors.accountHolder && (
                    <p className="text-sm text-destructive mt-1">{errors.accountHolder.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="bankName">Nom de la banque *</Label>
                  <Input 
                    id="bankName"
                    {...register("bankName")}
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
                  <Label htmlFor="deliveryRecipient">Nom du destinataire *</Label>
                  <Input 
                    id="deliveryRecipient"
                    {...register("deliveryRecipient")}
                    className={errors.deliveryRecipient ? "border-destructive" : ""}
                  />
                  {errors.deliveryRecipient && (
                    <p className="text-sm text-destructive mt-1">{errors.deliveryRecipient.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="deliveryStreet">Adresse complète de livraison *</Label>
                  <Textarea 
                    id="deliveryStreet"
                    {...register("deliveryStreet")}
                    className={errors.deliveryStreet ? "border-destructive" : ""}
                  />
                  {errors.deliveryStreet && (
                    <p className="text-sm text-destructive mt-1">{errors.deliveryStreet.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="deliveryPostalCode">Code postal *</Label>
                    <Input 
                      id="deliveryPostalCode"
                      {...register("deliveryPostalCode")}
                      className={errors.deliveryPostalCode ? "border-destructive" : ""}
                    />
                    {errors.deliveryPostalCode && (
                      <p className="text-sm text-destructive mt-1">{errors.deliveryPostalCode.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="deliveryCity">Ville *</Label>
                    <Input 
                      id="deliveryCity"
                      {...register("deliveryCity")}
                      className={errors.deliveryCity ? "border-destructive" : ""}
                    />
                    {errors.deliveryCity && (
                      <p className="text-sm text-destructive mt-1">{errors.deliveryCity.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="deliveryCountry">Pays *</Label>
                    <Input 
                      id="deliveryCountry"
                      {...register("deliveryCountry")}
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
                    ✅ Un acompte de 20% ({formatPrice(depositAmount)}) a déjà été payé pour confirmer la commande.
                  </p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="bg-green-500 text-white rounded-full p-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h4 className="font-medium text-green-800">💳 Coordonnées bancaires pour le virement</h4>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-green-700"><span className="font-medium">Bénéficiaire :</span> AURA AUTO GENESIS</span>
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
                        Copier
                      </Button>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-green-700"><span className="font-medium">Banque :</span> BNP Paribas</span>
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
                        Copier
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
                        Copier
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
                        <span className="font-medium">Montant :</span> 
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
                        Copier
                      </Button>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-green-700">
                        <span className="font-medium">Motif :</span> 
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
                        Copier
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Méthode de paiement utilisée pour l'acompte *</Label>
                  <RadioGroup 
                    onValueChange={(value) => setValue("paymentType", value as "transfer")}
                    defaultValue="transfer"
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="transfer" id="transfer" />
                      <Label htmlFor="transfer">✅ Virement bancaire (effectué vers le compte ci-dessus)</Label>
                    </div>
                  </RadioGroup>
                  {errors.paymentType && (
                    <p className="text-sm text-destructive mt-1">{errors.paymentType.message}</p>
                  )}
                </div>

                <div>
                  <Label>📎 Preuve de paiement de l'acompte *</Label>
                  <PaymentReceiptUploader
                    onUploadComplete={(url) => setValue("paymentProof", url)}
                    orderReference={`ORDER-${Date.now()}`}
                  />
                  {errors.paymentProof && (
                    <p className="text-sm text-destructive mt-1">Preuve de paiement requise</p>
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
                <RadioGroup 
                  onValueChange={(value) => setValue("contractLanguage", value as any)}
                  className="grid grid-cols-2 md:grid-cols-3 gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fr" id="contract-fr" />
                    <Label htmlFor="contract-fr">🇫🇷 {t("checkout.french")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="en" id="contract-en" />
                    <Label htmlFor="contract-en">🇬🇧 {t("checkout.english")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="es" id="contract-es" />
                    <Label htmlFor="contract-es">🇪🇸 {t("checkout.spanish")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="it" id="contract-it" />
                    <Label htmlFor="contract-it">🇮🇹 Italien</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pt" id="contract-pt" />
                    <Label htmlFor="contract-pt">🇵🇹 Portugais</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="de" id="contract-de" />
                    <Label htmlFor="contract-de">🇩🇪 Allemand</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pl" id="contract-pl" />
                    <Label htmlFor="contract-pl">🇵🇱 Polonais</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fi" id="contract-fi" />
                    <Label htmlFor="contract-fi">🇫🇮 Finnois</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="el" id="contract-el" />
                    <Label htmlFor="contract-el">🇬🇷 Grec</Label>
                  </div>
                </RadioGroup>
                {errors.contractLanguage && (
                  <p className="text-sm text-destructive mt-2">{errors.contractLanguage.message}</p>
                )}
              </CardContent>
            </Card>

            {/* 8. Consentements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">8</span>
                  Consentements obligatoires
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="dataAccuracy"
                    onCheckedChange={(checked) => setValue("dataAccuracy", checked as boolean)}
                    className={errors.dataAccuracy ? "border-destructive" : ""}
                  />
                  <Label htmlFor="dataAccuracy" className="text-sm leading-5">
                    Je confirme que toutes les informations fournies sont exactes et complètes *
                  </Label>
                </div>
                {errors.dataAccuracy && (
                  <p className="text-sm text-destructive">{errors.dataAccuracy.message}</p>
                )}

                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="depositConfirmation"
                    onCheckedChange={(checked) => setValue("depositConfirmation", checked as boolean)}
                    className={errors.depositConfirmation ? "border-destructive" : ""}
                  />
                  <Label htmlFor="depositConfirmation" className="text-sm leading-5">
                    J'accepte que mon acompte de 20% valide définitivement ma commande *
                  </Label>
                </div>
                {errors.depositConfirmation && (
                  <p className="text-sm text-destructive">{errors.depositConfirmation.message}</p>
                )}

                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="dataProcessing"
                    onCheckedChange={(checked) => setValue("dataProcessing", checked as boolean)}
                    className={errors.dataProcessing ? "border-destructive" : ""}
                  />
                  <Label htmlFor="dataProcessing" className="text-sm leading-5">
                    J'accepte le traitement de mes données personnelles conformément à la réglementation en vigueur *
                  </Label>
                </div>
                {errors.dataProcessing && (
                  <p className="text-sm text-destructive">{errors.dataProcessing.message}</p>
                )}
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
                  {isSubmitting ? "Traitement en cours..." : `Valider la commande - Total: ${formatPrice(total)}`}
                </Button>
                <p className="text-sm text-muted-foreground text-center mt-4">
                  En validant, vous confirmez votre commande et acceptez nos conditions générales de vente.
                </p>
              </CardContent>
            </Card>
          </form>
        </div>

        {/* Résumé de commande */}
        <div className="xl:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>📄 Récapitulatif de commande</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-start py-3 border-b">
                  <div className="flex-1">
                    <p className="font-medium">{item.brand} {item.model}</p>
                    <p className="text-sm text-muted-foreground">Année: {item.year}</p>
                    <p className="text-sm text-muted-foreground">Ref: {item.id}</p>
                  </div>
                  <p className="font-medium">{formatPrice(item.price)}</p>
                </div>
              ))}
              
              <div className="space-y-2 pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span>Sous-total</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between items-center text-green-600">
                  <span>Acompte payé (20%)</span>
                  <span>-{formatPrice(depositAmount)}</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold border-t pt-2">
                  <span>Solde à payer</span>
                  <span>{formatPrice(total - depositAmount)}</span>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mt-4">
                <h4 className="font-medium mb-2">🚚 Informations de livraison</h4>
                <p className="text-sm text-muted-foreground">
                  Livraison prévue sous 5 jours après validation du dossier et réception du solde.
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2 text-blue-800">🔒 Sécurité des données</h4>
                <p className="text-sm text-blue-700">
                  Toutes vos informations sont chiffrées et traitées de manière sécurisée conformément au RGPD.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}