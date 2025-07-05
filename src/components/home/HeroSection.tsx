
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();
  const [activeVehicle, setActiveVehicle] = useState(0);
  
  const vehicles = [
    {
      id: "v1",
      brand: "AUTOP",
      model: "home.hero.slide1.model",
      image: "/lovable-uploads/440bb6ab-fc1f-4420-b877-3e4a7ed2e682.png",
      description: "home.hero.slide1.description"
    },
    {
      id: "v2",
      brand: "AUTOP",
      model: "home.hero.slide2.model",
      image: "/lovable-uploads/95d5931e-180d-4916-a890-ea58eaac5925.png",
      description: "home.hero.slide2.description"
    },
    {
      id: "v3",
      brand: "AUTOP",
      model: "home.hero.slide3.model",
      image: "/lovable-uploads/bb8c411a-fcc6-478f-ad1d-165259777b4b.png",
      description: "home.hero.slide3.description"
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
              alt={`${vehicle.brand} ${t(vehicle.model)}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="relative h-full z-20 flex flex-col justify-center px-6 md:px-16 lg:px-24">
        <div className="max-w-2xl animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 font-gotham tracking-tight">
            {vehicles[activeVehicle].brand}{" "}
            <span className="text-autop-red">{t(vehicles[activeVehicle].model)}</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-lg">
            {t(vehicles[activeVehicle].description)}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <Link to="/catalog">
              <Button className="btn-primary text-lg px-8 py-6">
                {t("home.hero.discover")}
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" className="btn-secondary text-lg px-8 py-6">
                {t("home.hero.ourStory")}
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
              aria-label={t("nav.viewVehicle").replace("{brand}", vehicles[index].brand).replace("{model}", t(vehicles[index].model))}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
