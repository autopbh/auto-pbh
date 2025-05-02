
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

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
  return (
    <>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            type="text"
            placeholder="Saisissez votre numéro de commande"
            className="flex-1"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            className="bg-autop-red hover:bg-autop-red/90 text-white"
            disabled={isLoading || !orderNumber.trim()}
          >
            {isLoading ? "Recherche..." : "Suivre ma commande"}
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
