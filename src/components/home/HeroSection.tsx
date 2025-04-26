import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [activeVehicle, setActiveVehicle] = useState(0);
  
  const vehicles = [
    {
      id: "v1",
      brand: "AUTOP",
      model: "Baseada em Transparência",
      image: "/lovable-uploads/1068bf95-3ca6-4fbb-b34b-e4e1940c56bf.png",
      description: "Todas as marcas em um só lugar"
    },
    {
      id: "v2",
      brand: "AUTOP",
      model: "Nº 1!",
      image: "/lovable-uploads/bbd5ba0b-6732-48ed-8e5f-36b5a57b3f59.png",
      description: "Venha descobrir porque somos a escolha"
    },
    {
      id: "v3",
      brand: "AUTOP",
      model: "Confiança",
      image: "/lovable-uploads/844223f6-9e5e-430e-8c29-dcd896ecbd91.png",
      description: "Confiança que faz a Diferença"
    }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveVehicle(prev => (prev + 1) % vehicles.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [vehicles.length]);

  return (
    <section className="relative h-screen overflow-hidden">
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
              <Button className="btn-primary text-lg px-8 py-6">
                Ver Catálogo Completo
              </Button>
            </Link>
            <Link to={`/vehicle/${vehicles[activeVehicle].id}`}>
              <Button variant="outline" className="btn-secondary text-lg px-8 py-6">
                Saiba Mais
              </Button>
            </Link>
          </div>
        </div>
        
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
