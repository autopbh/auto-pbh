import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import VehicleCard from "@/components/shop/VehicleCard";
import { Vehicle } from "@/types";
import { vehicles } from "@/data/vehicles";
import { useLanguage } from "@/contexts/LanguageContext";

const FeaturedVehicles = () => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Utiliser les 3 premiers véhicules du fichier de données (les plus récents)
  const featuredVehicles: Vehicle[] = vehicles.slice(0, 3);
  
  const slidesPerView = { mobile: 1, tablet: 2, desktop: 3 };
  const totalSlides = Math.ceil(featuredVehicles.length / slidesPerView.desktop);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-autop-dark">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">{t("home.featured.title")}</h2>
            <p className="text-muted-foreground mt-2">
              {t("home.featured.subtitle")}
            </p>
          </div>
          <div className="hidden md:flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full"
              aria-label={t("nav.prevSlide")}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full"
              aria-label={t("nav.nextSlide")}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="hidden md:block overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
              width: `${(featuredVehicles.length / slidesPerView.desktop) * 100}%`,
            }}
          >
            {featuredVehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="w-1/3 px-4 transition-all duration-500"
              >
                <VehicleCard vehicle={vehicle} />
              </div>
            ))}
          </div>
        </div>

        <div className="md:hidden flex overflow-x-auto space-x-4 pb-6 -mx-4 px-4">
          {featuredVehicles.map((vehicle) => (
            <div key={vehicle.id} className="w-80 flex-shrink-0">
              <VehicleCard vehicle={vehicle} />
            </div>
          ))}
        </div>

        <div className="md:hidden flex justify-center space-x-2 mt-6">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="rounded-full"
            aria-label={t("nav.prevSlide")}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="rounded-full"
            aria-label={t("nav.nextSlide")}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        <div className="text-center mt-12">
          <Link to="/catalog">
            <Button className="btn-primary px-8">
              {t("home.featured.viewAll")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVehicles;
