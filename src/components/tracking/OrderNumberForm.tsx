
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, Search } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface OrderNumberFormProps {
  orderNumber: string;
  setOrderNumber: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  isLoading: boolean;
  showRecoveryForm: boolean;
  setShowRecoveryForm: (value: boolean) => void;
}

const OrderNumberForm: React.FC<OrderNumberFormProps> = ({
  orderNumber,
  setOrderNumber,
  handleSubmit,
  isLoading,
  showRecoveryForm,
  setShowRecoveryForm
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Fonction pour valider et formater le numéro de commande
  const handleOrderNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setOrderNumber(value);

    // Réinitialiser le message d'erreur lorsque l'utilisateur tape
    if (errorMessage) setErrorMessage(null);
  };

  // Fonction pour gérer la soumission du formulaire avec validation
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Vérifier si le numéro de commande est vide
    if (!orderNumber.trim()) {
      setErrorMessage("Veuillez saisir un numéro de commande");
      return;
    }
    
    // Si le numéro commence par ACOMPTE-, informer l'utilisateur qu'on recherche la commande correspondante
    if (orderNumber.startsWith('ACOMPTE-')) {
      toast({
        title: "Information",
        description: "Recherche de votre commande avec la référence d'acompte...",
        variant: "default"
      });
    }
    
    // Procéder avec la recherche
    await handleSubmit(e);
  };

  return (
    <>
      <form onSubmit={handleFormSubmit} className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Saisissez votre numéro de commande (PBH- ou ACOMPTE-)"
              className={`w-full ${errorMessage ? 'border-red-500' : ''}`}
              value={orderNumber}
              onChange={handleOrderNumberChange}
              disabled={isLoading}
            />
            {errorMessage && (
              <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Vous pouvez utiliser votre référence d'acompte (ACOMPTE-XXXXX) ou votre numéro de commande (PBH-XXXXX)
            </p>
          </div>
          <Button 
            type="submit" 
            className="bg-autop-red hover:bg-autop-red/90 text-white"
            disabled={isLoading || !orderNumber.trim()}
          >
            {isLoading ? "Recherche..." : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Suivre ma commande
              </>
            )}
          </Button>
        </div>
      </form>
      
      {!showRecoveryForm && (
        <div className="text-center">
          <button 
            onClick={() => setShowRecoveryForm(true)}
            className="text-autop-red hover:underline text-sm inline-flex items-center"
            disabled={isLoading}
          >
            <Mail className="h-4 w-4 mr-1" />
            Je ne retrouve plus mon numéro de commande
          </button>
        </div>
      )}
    </>
  );
};

export default OrderNumberForm;
