
import React from 'react';
import { AlertCircle } from 'lucide-react';

const ServiceDescription: React.FC = () => {
  return (
    <section className="bg-white/50 backdrop-blur-sm p-8 rounded-lg shadow-sm mb-8">
      <h2 className="text-2xl font-semibold mb-6 text-autop-red">Service de Livraison d'Exception</h2>
      <p className="text-lg mb-6">
        Suivez en temps réel l'évolution de la préparation et de la livraison de votre véhicule d'exception. 
        Notre service "Livraison Clé en Or" vous garantit une expérience premium de bout en bout.
      </p>
      
      <div className="bg-autop-red/5 p-6 rounded-lg mb-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-autop-red mt-1 shrink-0" />
          <div>
            <h3 className="font-medium mb-1">Où trouver votre numéro de commande ?</h3>
            <p className="text-muted-foreground text-sm">
              Votre numéro de commande commence par "PBH-" et se trouve dans :
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
              <li>L'email de confirmation reçu lors de votre achat</li>
              <li>Le document de vente signé avec votre conseiller</li>
              <li>Votre espace client (section "Mes commandes")</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDescription;
