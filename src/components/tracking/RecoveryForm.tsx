
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface RecoveryFormProps {
  isRecoverySent: boolean;
  email: string;
  setEmail: (value: string) => void;
  handleRecoverySubmit: (e: React.FormEvent) => Promise<void>;
  isLoading: boolean;
  setShowRecoveryForm: (value: boolean) => void;
}

const RecoveryForm: React.FC<RecoveryFormProps> = ({
  isRecoverySent,
  email,
  setEmail,
  handleRecoverySubmit,
  isLoading,
  setShowRecoveryForm
}) => {
  return (
    <Card className="mt-6">
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium mb-4">Récupérer votre numéro de commande</h3>
        {!isRecoverySent ? (
          <form onSubmit={handleRecoverySubmit}>
            <div className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="email">Adresse email utilisée lors de votre achat</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  type="submit" 
                  className="bg-autop-red hover:bg-autop-red/90 text-white"
                  disabled={isLoading || !email.trim()}
                >
                  {isLoading ? "Envoi..." : "Recevoir mes numéros de commande"}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowRecoveryForm(false)}
                  disabled={isLoading}
                >
                  Annuler
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Nous vous enverrons un email contenant tous vos numéros de commande associés à cette adresse email.
              </p>
            </div>
          </form>
        ) : (
          <div className="text-center py-2">
            <Check className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="font-medium">Email envoyé avec succès !</p>
            <p className="text-sm text-muted-foreground">
              Veuillez consulter votre boîte de réception et vos spams.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecoveryForm;
