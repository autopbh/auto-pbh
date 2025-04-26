
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Vehicle {
  id: string;
  brand: string;
  model: string;
  image: string;
  description: string;
}

const HeroSection = () => {
  const [activeVehicle, setActiveVehicle] = useState(0);
  
  // Featured vehicles for the hero
  const vehicles: Vehicle[] = [
    {
      id: "v1",
      brand: "Mercedes-Benz",
      model: "S-Class",
      image: "https://images.unsplash.com/photo-1583267746897-2cf4865e0729?q=80&w=2670&auto=format&fit=crop",
      description: "L'élégance et la technologie dans une parfaite harmonie"
    },
    {
      id: "v2",
      brand: "BMW",
      model: "7 Series",
      image: "https://images.unsplash.com/photo-1556800572-1b8aeef2c54f?q=80&w=2592&auto=format&fit=crop",
      description: "Une expérience de conduite prestigieuse et luxueuse"
    },
    {
      id: "v3",
      brand: "Audi",
      model: "A8 L",
      image: "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?q=80&w=2574&auto=format&fit=crop",
      description: "Sophistication, performance et confort exceptionnel"
    }
  ];
  
  // Auto-rotate featured vehicles
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveVehicle(prev => (prev + 1) % vehicles.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [vehicles.length]);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
        {vehicles.map((vehicle, index) => (
          <div
            key={vehicle.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === activeVehicle ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-10" />
            <img
              src={vehicle.image}
              alt={`${vehicle.brand} ${vehicle.model}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative h-full z-20 flex flex-col justify-center px-6 md:px-16 lg:px-24">
        <div className="max-w-2xl animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 font-gotham tracking-tight">
            {vehicles[activeVehicle].brand}{" "}
            <span className="text-autop-red">{vehicles[activeVehicle].model}</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-lg">
            {vehicles[activeVehicle].description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <Link to="/catalog">
              <Button className="btn-primary text-lg px-8 py-6">Découvrir</Button>
            </Link>
            <Link to={`/vehicle/${vehicles[activeVehicle].id}`}>
              <Button variant="outline" className="btn-secondary text-lg px-8 py-6">
                Plus de détails
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Indicators */}
        <div className="absolute bottom-8 left-6 md:left-16 lg:left-24 flex space-x-3">
          {vehicles.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveVehicle(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeVehicle 
                  ? "bg-autop-red w-8" 
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`View ${vehicles[index].brand} ${vehicles[index].model}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
