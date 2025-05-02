
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface NotFoundDialogProps {
  showNotFoundDialog: boolean;
  setShowNotFoundDialog: (value: boolean) => void;
  orderNumber: string;
  setShowRecoveryForm: (value: boolean) => void;
}

const NotFoundDialog: React.FC<NotFoundDialogProps> = ({
  showNotFoundDialog,
  setShowNotFoundDialog,
  orderNumber,
  setShowRecoveryForm
}) => {
  return (
    <Dialog open={showNotFoundDialog} onOpenChange={setShowNotFoundDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold text-autop-red">
            Commande introuvable
          </DialogTitle>
        </DialogHeader>
        <div className="py-4 text-center">
          <p className="mb-4">
            Aucune commande trouvée avec le numéro <strong>{orderNumber}</strong>.
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            Veuillez vérifier le numéro saisi ou utiliser l'option "Je ne retrouve plus mon numéro de commande".
          </p>
          <Button
            variant="default"
            className="bg-autop-red hover:bg-autop-red/90 text-white"
            onClick={() => {
              setShowNotFoundDialog(false);
              setShowRecoveryForm(true);
            }}
          >
            Récupérer mon numéro de commande
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotFoundDialog;
