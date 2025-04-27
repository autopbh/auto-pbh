import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import VehicleCard from "@/components/shop/VehicleCard";
import { Vehicle } from "@/types";

const FeaturedVehicles = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const featuredVehicles: Vehicle[] = [
    {
      id: "featured1",
      brand: "AUTOP",
      model: "Atendimento Personalizado",
      year: 2023,
      mileage: 0,
      fuelType: "Electric",
      engineCapacity: 0,
      power: 0,
      transmission: "automatic",
      exteriorColor: "Black",
      interiorColor: "Black",
      features: ["Luxury Service"],
      previousOwners: 0,
      price: 0,
      condition: "excellent",
      availability: "in-stock",
      currentLocation: "Rotterdam, Netherlands",
      estimatedDelivery: "Immediate",
      images: ["/lovable-uploads/ad93af63-a6e2-4a5e-97a9-05ffbcbbda31.png"],
      thumbnail: "/lovable-uploads/ad93af63-a6e2-4a5e-97a9-05ffbcbbda31.png",
      description: "Experiência Inigualável",
      options: []
    },
    {
      id: "featured2",
      brand: "AUTOP",
      model: "& Nossos Clientes",
      year: 2023,
      mileage: 0,
      fuelType: "Electric",
      engineCapacity: 0,
      power: 0,
      transmission: "automatic",
      exteriorColor: "Black",
      interiorColor: "Black",
      features: ["Customer Focus"],
      previousOwners: 0,
      price: 0,
      condition: "excellent",
      availability: "in-stock",
      currentLocation: "Rotterdam, Netherlands",
      estimatedDelivery: "Immediate",
      images: ["/lovable-uploads/659428ab-10b9-406c-a076-b0a12f500702.png"],
      thumbnail: "/lovable-uploads/659428ab-10b9-406c-a076-b0a12f500702.png",
      description: "Uma jornada de sucesso",
      options: []
    },
    {
      id: "featured3",
      brand: "AUTOP",
      model: "Creta",
      year: 2023,
      mileage: 0,
      fuelType: "Electric",
      engineCapacity: 0,
      power: 0,
      transmission: "automatic",
      exteriorColor: "Black",
      interiorColor: "Black",
      features: ["Trust"],
      previousOwners: 0,
      price: 0,
      condition: "excellent",
      availability: "in-stock",
      currentLocation: "Rotterdam, Netherlands",
      estimatedDelivery: "Immediate",
      images: ["/lovable-uploads/50354ce4-8768-48c9-8f67-a5622dbd7179.png"],
      thumbnail: "/lovable-uploads/50354ce4-8768-48c9-8f67-a5622dbd7179.png",
      description: "Confiança que faz a Diferença",
      options: []
    }
  ];
  
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
            <h2 className="text-3xl md:text-4xl font-bold">Nossos Destaques</h2>
            <p className="text-muted-foreground mt-2">
              Descubra por que somos a escolha número 1
            </p>
          </div>
          <div className="hidden md:flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full"
              aria-label="Slide anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full"
              aria-label="Próximo slide"
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
            aria-label="Slide anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="rounded-full"
            aria-label="Próximo slide"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        <div className="text-center mt-12">
          <Link to="/catalog">
            <Button className="btn-primary px-8">
              Explorer Notre Collection Complète
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVehicles;
