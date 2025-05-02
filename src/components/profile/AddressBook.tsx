
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

interface AddressBookProps {
  profileId: string;
}

const AddressBook = ({ profileId }: AddressBookProps) => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAddress = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('address, city, postal_code, country')
          .eq('id', profileId)
          .single();

        if (error) throw error;
        
        if (data) {
          setAddress(data.address || "");
          setCity(data.city || "");
          setPostalCode(data.postal_code || "");
          setCountry(data.country || "France"); // Valeur par défaut pour la France
        }
      } catch (error) {
        console.error('Error fetching address:', error);
      } finally {
        setLoading(false);
      }
    };

    if (profileId) {
      fetchAddress();
    }
  }, [profileId]);

  const handleUpdateAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          address,
          city,
          postal_code: postalCode,
          country,
          updated_at: new Date().toISOString(),
        })
        .eq('id', profileId);

      if (error) throw error;
      
      toast({
        title: "Adresse mise à jour",
        description: "Votre adresse a été mise à jour avec succès",
      });
    } catch (error) {
      console.error('Error updating address:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour votre adresse",
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Carnet d'adresses</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center py-4">Chargement...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Carnet d'adresses</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleUpdateAddress} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="address">Adresse</Label>
            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Votre adresse"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">Ville</Label>
              <Input
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Ville"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="postalCode">Code Postal</Label>
              <Input
                id="postalCode"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="Code postal"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="country">Pays</Label>
            <Input
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Pays"
            />
          </div>
          
          <Button type="submit" disabled={updating} className="mt-4">
            {updating ? "Mise à jour..." : "Mettre à jour l'adresse"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddressBook;
