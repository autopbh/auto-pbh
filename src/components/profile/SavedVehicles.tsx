
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface SavedVehiclesProps {
  userId: string;
}

const SavedVehicles = ({ userId }: SavedVehiclesProps) => {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('favorites')
          .select('*, vehicle_id')
          .eq('user_id', userId);

        if (error) throw error;
        setFavorites(data || []);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchFavorites();
    }
  }, [userId]);

  const handleRemoveFavorite = async (favoriteId: string) => {
    try {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('id', favoriteId);

      if (error) throw error;

      // Mise à jour de l'état local
      setFavorites(favorites.filter(fav => fav.id !== favoriteId));

      toast({
        title: "Favori supprimé",
        description: "Le véhicule a été supprimé de vos favoris",
      });
    } catch (error) {
      console.error('Error removing favorite:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer ce favori",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Véhicules favoris</CardTitle>
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
        <CardTitle>Véhicules favoris</CardTitle>
      </CardHeader>
      <CardContent>
        {favorites.length === 0 ? (
          <div className="text-center py-4">
            <p className="mb-4">Vous n'avez pas encore de véhicules favoris</p>
            <Button asChild>
              <Link to="/catalog">Explorer le catalogue</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {favorites.map((favorite) => (
              <div key={favorite.id} className="border rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                <div>
                  <p className="font-medium">Véhicule #{favorite.vehicle_id}</p>
                </div>
                <div className="flex gap-2 w-full md:w-auto justify-end">
                  <Button variant="outline" asChild>
                    <Link to={`/vehicle/${favorite.vehicle_id}`}>Voir</Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleRemoveFavorite(favorite.id)}
                  >
                    Supprimer
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SavedVehicles;
