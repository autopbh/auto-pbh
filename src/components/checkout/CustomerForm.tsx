import React, { useState } from "react";

export interface CustomerFormValues {
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
  phone: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  companyName: string;
  jobTitle: string;
  professionalAddress: string;
  bankName: string;
  iban: string;
  accountHolder: string;
  paymentMethod?: 'delivery' | 'installments';
  installmentMonths?: number;
  deliveryDate: Date;
  deliveryTimeWindow: string;
  additionalNotes?: string;
}

interface CustomerFormProps {
  onSubmit: (data: CustomerFormValues) => void;
  defaultValues?: Partial<CustomerFormValues>;
  isSubmitting?: boolean;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ 
  onSubmit, 
  defaultValues, 
  isSubmitting = false 
}) => {
  const [formData, setFormData] = useState<CustomerFormValues>({
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
    deliveryDate: new Date(),
    deliveryTimeWindow: "",
    additionalNotes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [installmentMonths, setInstallmentMonths] = useState<number | undefined>();

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof CustomerFormValues] as any),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = "Le prénom est requis";
    if (!formData.lastName.trim()) newErrors.lastName = "Le nom est requis";
    if (!formData.email.trim()) newErrors.email = "L'email est requis";
    if (!formData.confirmEmail.trim()) newErrors.confirmEmail = "La confirmation d'email est requise";
    if (formData.email !== formData.confirmEmail) newErrors.confirmEmail = "Les emails ne correspondent pas";
    if (!formData.phone.trim()) newErrors.phone = "Le téléphone est requis";
    if (!formData.address.street.trim()) newErrors["address.street"] = "L'adresse est requise";
    if (!formData.address.city.trim()) newErrors["address.city"] = "La ville est requise";
    if (!formData.address.postalCode.trim()) newErrors["address.postalCode"] = "Le code postal est requis";
    if (!formData.companyName.trim()) newErrors.companyName = "Le nom de l'entreprise est requis";
    if (!formData.jobTitle.trim()) newErrors.jobTitle = "Le poste est requis";
    if (!formData.professionalAddress.trim()) newErrors.professionalAddress = "L'adresse professionnelle est requise";
    if (!formData.bankName.trim()) newErrors.bankName = "Le nom de la banque est requis";
    if (!formData.iban.trim()) newErrors.iban = "L'IBAN est requis";
    if (!formData.accountHolder.trim()) newErrors.accountHolder = "Le titulaire du compte est requis";
    if (!formData.deliveryTimeWindow.trim()) newErrors.deliveryTimeWindow = "Le créneau horaire est requis";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const inputStyle = "w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";
  const labelStyle = "block text-sm font-medium text-gray-700 mb-1";
  const errorStyle = "text-red-500 text-sm mt-1";
  const sectionStyle = "space-y-4 p-4 border border-gray-200 rounded-lg";
  const buttonStyle = "w-full py-3 px-4 rounded-md font-medium transition-colors";

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Informations personnelles */}
        <div className={sectionStyle}>
          <h3 className="text-lg font-medium mb-4">Informations personnelles</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelStyle}>Prénom</label>
              <input
                type="text"
                className={inputStyle}
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                placeholder="Jean"
              />
              {errors.firstName && <div className={errorStyle}>{errors.firstName}</div>}
            </div>
            
            <div>
              <label className={labelStyle}>Nom</label>
              <input
                type="text"
                className={inputStyle}
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                placeholder="Dupont"
              />
              {errors.lastName && <div className={errorStyle}>{errors.lastName}</div>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelStyle}>Email</label>
              <input
                type="email"
                className={inputStyle}
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                onCopy={(e) => e.preventDefault()}
                onPaste={(e) => e.preventDefault()}
                placeholder="email@exemple.fr"
              />
              {errors.email && <div className={errorStyle}>{errors.email}</div>}
            </div>
            
            <div>
              <label className={labelStyle}>Confirmation email</label>
              <input
                type="email"
                className={inputStyle}
                value={formData.confirmEmail}
                onChange={(e) => handleInputChange('confirmEmail', e.target.value)}
                onCopy={(e) => e.preventDefault()}
                onPaste={(e) => e.preventDefault()}
                placeholder="Confirmez votre email"
              />
              {errors.confirmEmail && <div className={errorStyle}>{errors.confirmEmail}</div>}
            </div>
          </div>

          <div>
            <label className={labelStyle}>Téléphone (avec code pays)</label>
            <input
              type="tel"
              className={inputStyle}
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="+33612345678"
            />
            {errors.phone && <div className={errorStyle}>{errors.phone}</div>}
          </div>
        </div>

        {/* Adresse de livraison */}
        <div className={sectionStyle}>
          <h3 className="text-lg font-medium mb-4">Adresse de livraison</h3>
          
          <div>
            <label className={labelStyle}>Rue</label>
            <input
              type="text"
              className={inputStyle}
              value={formData.address.street}
              onChange={(e) => handleInputChange('address.street', e.target.value)}
              placeholder="123 rue de la Paix"
            />
            {errors["address.street"] && <div className={errorStyle}>{errors["address.street"]}</div>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelStyle}>Ville</label>
              <input
                type="text"
                className={inputStyle}
                value={formData.address.city}
                onChange={(e) => handleInputChange('address.city', e.target.value)}
                placeholder="Paris"
              />
              {errors["address.city"] && <div className={errorStyle}>{errors["address.city"]}</div>}
            </div>
            
            <div>
              <label className={labelStyle}>Code postal</label>
              <input
                type="text"
                className={inputStyle}
                value={formData.address.postalCode}
                onChange={(e) => handleInputChange('address.postalCode', e.target.value)}
                placeholder="75001"
              />
              {errors["address.postalCode"] && <div className={errorStyle}>{errors["address.postalCode"]}</div>}
            </div>
          </div>

          <div>
            <label className={labelStyle}>Pays</label>
            <input
              type="text"
              className={inputStyle}
              value={formData.address.country}
              onChange={(e) => handleInputChange('address.country', e.target.value)}
              placeholder="France"
            />
          </div>
        </div>

        {/* Informations professionnelles */}
        <div className={sectionStyle}>
          <h3 className="text-lg font-medium mb-4">Informations professionnelles</h3>
          
          <div>
            <label className={labelStyle}>Nom de l'entreprise</label>
            <input
              type="text"
              className={inputStyle}
              value={formData.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
              placeholder="SARL MonEntreprise"
            />
            {errors.companyName && <div className={errorStyle}>{errors.companyName}</div>}
          </div>
          
          <div>
            <label className={labelStyle}>Poste occupé</label>
            <input
              type="text"
              className={inputStyle}
              value={formData.jobTitle}
              onChange={(e) => handleInputChange('jobTitle', e.target.value)}
              placeholder="Directeur commercial"
            />
            {errors.jobTitle && <div className={errorStyle}>{errors.jobTitle}</div>}
          </div>
          
          <div>
            <label className={labelStyle}>Adresse professionnelle</label>
            <input
              type="text"
              className={inputStyle}
              value={formData.professionalAddress}
              onChange={(e) => handleInputChange('professionalAddress', e.target.value)}
              placeholder="456 avenue des Affaires, 75008 Paris"
            />
            {errors.professionalAddress && <div className={errorStyle}>{errors.professionalAddress}</div>}
          </div>
        </div>

        {/* Informations bancaires */}
        <div className={sectionStyle}>
          <h3 className="text-lg font-medium mb-4">Informations bancaires</h3>
          
          <div>
            <label className={labelStyle}>Nom de la banque</label>
            <input
              type="text"
              className={inputStyle}
              value={formData.bankName}
              onChange={(e) => handleInputChange('bankName', e.target.value)}
              placeholder="Crédit Agricole"
            />
            {errors.bankName && <div className={errorStyle}>{errors.bankName}</div>}
          </div>
          
          <div>
            <label className={labelStyle}>IBAN</label>
            <input
              type="text"
              className={inputStyle}
              value={formData.iban}
              onChange={(e) => handleInputChange('iban', e.target.value)}
              placeholder="FR76 XXXX XXXX XXXX XXXX XXXX XXX"
            />
            {errors.iban && <div className={errorStyle}>{errors.iban}</div>}
          </div>
          
          <div>
            <label className={labelStyle}>Titulaire du compte</label>
            <input
              type="text"
              className={inputStyle}
              value={formData.accountHolder}
              onChange={(e) => handleInputChange('accountHolder', e.target.value)}
              placeholder="Jean Dupont"
            />
            {errors.accountHolder && <div className={errorStyle}>{errors.accountHolder}</div>}
          </div>
        </div>

        {/* Mode de paiement */}
        <div className={sectionStyle}>
          <h3 className="text-lg font-medium mb-4">Mode de paiement</h3>
          
          <div className="space-y-2">
            <label className={labelStyle}>Le montant restant sera payé :</label>
            
            <button
              type="button"
              className={`${buttonStyle} ${paymentMethod === "delivery" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 border border-gray-300"}`}
              onClick={() => {
                setPaymentMethod("delivery");
                handleInputChange('paymentMethod', 'delivery');
              }}
            >
              À la livraison
            </button>
            
            <button
              type="button"
              className={`${buttonStyle} ${paymentMethod === "installments" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 border border-gray-300"}`}
              onClick={() => {
                setPaymentMethod("installments");
                handleInputChange('paymentMethod', 'installments');
              }}
            >
              Par mensualités
            </button>
          </div>
          
          {paymentMethod === 'installments' && (
            <div className="mt-4">
              <label className={labelStyle}>Durée des mensualités</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                {[6, 12, 18, 24, 30, 36, 42, 48, 54, 60, 66, 72, 78, 84].map((months) => (
                  <button
                    key={months}
                    type="button"
                    className={`py-2 px-3 rounded-md text-sm font-medium ${installmentMonths === months ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 border border-gray-300"}`}
                    onClick={() => {
                      setInstallmentMonths(months);
                      handleInputChange('installmentMonths', months);
                    }}
                  >
                    {months} mois
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Informations de livraison */}
        <div className={sectionStyle}>
          <h3 className="text-lg font-medium mb-4">Informations de livraison</h3>
          
          <div>
            <label className={labelStyle}>Date de livraison souhaitée</label>
            <input
              type="date"
              className={inputStyle}
              value={formData.deliveryDate.toISOString().split('T')[0]}
              onChange={(e) => handleInputChange('deliveryDate', new Date(e.target.value))}
              min={new Date(Date.now() + 86400000).toISOString().split('T')[0]} // Demain minimum
            />
          </div>
          
          <div>
            <label className={labelStyle}>Créneau horaire préféré</label>
            <input
              type="text"
              className={inputStyle}
              value={formData.deliveryTimeWindow}
              onChange={(e) => handleInputChange('deliveryTimeWindow', e.target.value)}
              placeholder="Ex: Entre 14h et 18h"
            />
            {errors.deliveryTimeWindow && <div className={errorStyle}>{errors.deliveryTimeWindow}</div>}
          </div>
          
          <div>
            <label className={labelStyle}>Notes supplémentaires (optionnel)</label>
            <textarea
              className={`${inputStyle} resize-none`}
              rows={4}
              value={formData.additionalNotes || ""}
              onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
              placeholder="Instructions particulières pour la livraison, code d'entrée, etc."
            />
          </div>
        </div>

        {/* Bouton de soumission */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`${buttonStyle} ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"} text-white`}
        >
          {isSubmitting ? "Traitement en cours..." : "Continuer vers le récapitulatif"}
        </button>
      </form>
    </div>
  );
};

export default CustomerForm;