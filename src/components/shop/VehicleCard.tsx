
import { Link } from "react-router-dom";
import { Vehicle } from "@/types";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  // Fallback image if the vehicle images are not available
  const imageUrl = vehicle.images && vehicle.images.length > 0 
    ? vehicle.images[0] 
    : "https://images.unsplash.com/photo-1583267746897-2cf4865e0729?q=80&w=2670&auto=format&fit=crop";

  return (
    <div className="product-card group h-full flex flex-col">
      <div className="relative overflow-hidden aspect-[16/9]">
        <Link to={`/vehicle/${vehicle.id}`}>
          <img
            src={imageUrl}
            alt={`${vehicle.brand} ${vehicle.model}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {vehicle.availability === "reserved" && (
            <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
              Réservé
            </div>
          )}
          {vehicle.availability === "sold" && (
            <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
              Vendu
            </div>
          )}
        </Link>
      </div>
      
      <div className="flex-1 flex flex-col p-6">
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <Link to={`/vehicle/${vehicle.id}`} className="hover:text-autop-red transition-colors">
                <h3 className="text-lg font-bold">
                  {vehicle.brand} {vehicle.model}
                </h3>
              </Link>
              <p className="text-muted-foreground text-sm">
                {vehicle.year} • {vehicle.mileage.toLocaleString()} km • {vehicle.fuelType}
              </p>
            </div>
          </div>
          
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Transmission</span>
              <span className="font-medium">{vehicle.transmission === 'automatic' ? 'Automatique' : 'Manuelle'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Puissance</span>
              <span className="font-medium">{vehicle.power} ch</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="block text-autop-red text-2xl font-bold">
                € {vehicle.price.toLocaleString()}
              </span>
            </div>
            {vehicle.availability === "in-stock" && (
              <Button size="sm" className="btn-primary">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Ajouter
              </Button>
            )}
          </div>
          
          <Link to={`/vehicle/${vehicle.id}`} className="w-full">
            <Button variant="outline" className="w-full">
              Plus de détails
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
