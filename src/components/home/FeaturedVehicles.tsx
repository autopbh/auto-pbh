
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import VehicleCard from "@/components/shop/VehicleCard";
import { vehicles } from "@/data/vehicles";

const FeaturedVehicles = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const featuredVehicles = vehicles.slice(0, 6);
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
            <h2 className="text-3xl md:text-4xl font-bold">Nos meilleures offres</h2>
            <p className="text-muted-foreground mt-2">
              Découvrez nos véhicules sélectionnés avec soin pour leur qualité exceptionnelle
            </p>
          </div>
          <div className="hidden md:flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full"
              aria-label="Slide précédent"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full"
              aria-label="Slide suivant"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Desktop Carousel */}
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

        {/* Mobile Version (Scroll instead of carousel) */}
        <div className="md:hidden flex overflow-x-auto space-x-4 pb-6 -mx-4 px-4">
          {featuredVehicles.map((vehicle) => (
            <div key={vehicle.id} className="w-80 flex-shrink-0">
              <VehicleCard vehicle={vehicle} />
            </div>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex justify-center space-x-2 mt-6">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="rounded-full"
            aria-label="Slide précédent"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="rounded-full"
            aria-label="Slide suivant"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link to="/catalog">
            <Button className="btn-primary px-8">Voir tout le catalogue</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVehicles;
