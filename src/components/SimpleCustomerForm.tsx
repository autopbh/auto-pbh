import React, { useState } from "react";

export interface CustomerData {
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
  paymentMethod?: string;
  installmentMonths?: number;
  deliveryDate: string;
  deliveryTimeWindow: string;
  additionalNotes?: string;
}

interface Props {
  onSubmit: (data: CustomerData) => void;
  isSubmitting?: boolean;
}

const SimpleCustomerForm: React.FC<Props> = ({ onSubmit, isSubmitting = false }) => {
  const [data, setData] = useState<CustomerData>({
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
    paymentMethod: "",
    installmentMonths: undefined,
    deliveryDate: "",
    deliveryTimeWindow: "",
    additionalNotes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [selectedMonths, setSelectedMonths] = useState<number>();

  const handleChange = (field: string, value: any) => {
    if (field.startsWith('address.')) {
      const addressField = field.replace('address.', '');
      setData(prev => ({
        ...prev,
        address: { ...prev.address, [addressField]: value }
      }));
    } else {
      setData(prev => ({ ...prev, [field]: value }));
    }
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!data.firstName.trim()) newErrors.firstName = "Prénom requis";
    if (!data.lastName.trim()) newErrors.lastName = "Nom requis";
    if (!data.email.trim()) newErrors.email = "Email requis";
    if (!data.confirmEmail.trim()) newErrors.confirmEmail = "Confirmation email requise";
    if (data.email !== data.confirmEmail) newErrors.confirmEmail = "Les emails ne correspondent pas";
    if (!data.phone.trim()) newErrors.phone = "Téléphone requis";
    if (!data.address.street.trim()) newErrors.addressStreet = "Adresse requise";
    if (!data.address.city.trim()) newErrors.addressCity = "Ville requise";
    if (!data.address.postalCode.trim()) newErrors.addressPostalCode = "Code postal requis";
    if (!data.companyName.trim()) newErrors.companyName = "Nom entreprise requis";
    if (!data.jobTitle.trim()) newErrors.jobTitle = "Poste requis";
    if (!data.professionalAddress.trim()) newErrors.professionalAddress = "Adresse pro requise";
    if (!data.bankName.trim()) newErrors.bankName = "Banque requise";
    if (!data.iban.trim()) newErrors.iban = "IBAN requis";
    if (!data.accountHolder.trim()) newErrors.accountHolder = "Titulaire requis";
    if (!data.deliveryTimeWindow.trim()) newErrors.deliveryTimeWindow = "Créneau requis";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const finalData = {
        ...data,
        paymentMethod,
        installmentMonths: selectedMonths
      };
      onSubmit(finalData);
    }
  };

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white">
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Section 1: Informations personnelles */}
        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Informations personnelles</h2>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prénom *</label>
              <input
                type="text"
                value={data.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Jean"
              />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
              <input
                type="text"
                value={data.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Dupont"
              />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                value={data.email}
                onChange={(e) => handleChange('email', e.target.value)}
                onCopy={(e) => e.preventDefault()}
                onPaste={(e) => e.preventDefault()}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="email@exemple.fr"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirmez l'email *</label>
              <input
                type="email"
                value={data.confirmEmail}
                onChange={(e) => handleChange('confirmEmail', e.target.value)}
                onCopy={(e) => e.preventDefault()}
                onPaste={(e) => e.preventDefault()}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Confirmez votre email"
              />
              {errors.confirmEmail && <p className="text-red-500 text-sm mt-1">{errors.confirmEmail}</p>}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone (avec code pays) *</label>
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="+33612345678"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
        </div>

        {/* Section 2: Adresse */}
        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Adresse de livraison</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Rue *</label>
            <input
              type="text"
              value={data.address.street}
              onChange={(e) => handleChange('address.street', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="123 rue de la Paix"
            />
            {errors.addressStreet && <p className="text-red-500 text-sm mt-1">{errors.addressStreet}</p>}
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ville *</label>
              <input
                type="text"
                value={data.address.city}
                onChange={(e) => handleChange('address.city', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Paris"
              />
              {errors.addressCity && <p className="text-red-500 text-sm mt-1">{errors.addressCity}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Code postal *</label>
              <input
                type="text"
                value={data.address.postalCode}
                onChange={(e) => handleChange('address.postalCode', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="75001"
              />
              {errors.addressPostalCode && <p className="text-red-500 text-sm mt-1">{errors.addressPostalCode}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pays</label>
              <input
                type="text"
                value={data.address.country}
                onChange={(e) => handleChange('address.country', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="France"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Informations professionnelles */}
        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Informations professionnelles</h2>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom de l'entreprise *</label>
              <input
                type="text"
                value={data.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="SARL MonEntreprise"
              />
              {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Poste occupé *</label>
              <input
                type="text"
                value={data.jobTitle}
                onChange={(e) => handleChange('jobTitle', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Directeur commercial"
              />
              {errors.jobTitle && <p className="text-red-500 text-sm mt-1">{errors.jobTitle}</p>}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Adresse professionnelle *</label>
            <input
              type="text"
              value={data.professionalAddress}
              onChange={(e) => handleChange('professionalAddress', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="456 avenue des Affaires, 75008 Paris"
            />
            {errors.professionalAddress && <p className="text-red-500 text-sm mt-1">{errors.professionalAddress}</p>}
          </div>
        </div>

        {/* Section 4: Informations bancaires */}
        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Informations bancaires</h2>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la banque *</label>
              <input
                type="text"
                value={data.bankName}
                onChange={(e) => handleChange('bankName', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Crédit Agricole"
              />
              {errors.bankName && <p className="text-red-500 text-sm mt-1">{errors.bankName}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Titulaire du compte *</label>
              <input
                type="text"
                value={data.accountHolder}
                onChange={(e) => handleChange('accountHolder', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Jean Dupont"
              />
              {errors.accountHolder && <p className="text-red-500 text-sm mt-1">{errors.accountHolder}</p>}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">IBAN *</label>
            <input
              type="text"
              value={data.iban}
              onChange={(e) => handleChange('iban', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="FR76 XXXX XXXX XXXX XXXX XXXX XXX"
            />
            {errors.iban && <p className="text-red-500 text-sm mt-1">{errors.iban}</p>}
          </div>
        </div>

        {/* Section 5: Mode de paiement */}
        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Mode de paiement</h2>
          
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Le montant restant sera payé :</p>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setPaymentMethod("delivery")}
                className={`w-full p-3 rounded border text-left ${
                  paymentMethod === "delivery" 
                    ? "bg-blue-600 text-white border-blue-600" 
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                À la livraison
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("installments")}
                className={`w-full p-3 rounded border text-left ${
                  paymentMethod === "installments" 
                    ? "bg-blue-600 text-white border-blue-600" 
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                Par mensualités
              </button>
            </div>
          </div>

          {paymentMethod === "installments" && (
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Durée des mensualités :</p>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                {[6, 12, 18, 24, 30, 36, 42, 48, 54, 60, 66, 72].map((months) => (
                  <button
                    key={months}
                    type="button"
                    onClick={() => setSelectedMonths(months)}
                    className={`p-2 text-sm rounded border ${
                      selectedMonths === months 
                        ? "bg-blue-600 text-white border-blue-600" 
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {months}m
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Section 6: Livraison */}
        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Informations de livraison</h2>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date souhaitée</label>
              <input
                type="date"
                value={data.deliveryDate}
                onChange={(e) => handleChange('deliveryDate', e.target.value)}
                min={minDate}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Créneau horaire *</label>
              <input
                type="text"
                value={data.deliveryTimeWindow}
                onChange={(e) => handleChange('deliveryTimeWindow', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ex: Entre 14h et 18h"
              />
              {errors.deliveryTimeWindow && <p className="text-red-500 text-sm mt-1">{errors.deliveryTimeWindow}</p>}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes supplémentaires</label>
            <textarea
              value={data.additionalNotes || ""}
              onChange={(e) => handleChange('additionalNotes', e.target.value)}
              rows={3}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              placeholder="Instructions particulières pour la livraison, code d'entrée, etc."
            />
          </div>
        </div>

        {/* Bouton de soumission */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 rounded font-medium text-white ${
            isSubmitting 
              ? "bg-gray-400 cursor-not-allowed" 
              : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
          }`}
        >
          {isSubmitting ? "Traitement en cours..." : "Continuer vers le récapitulatif"}
        </button>
      </form>
    </div>
  );
};

export default SimpleCustomerForm;