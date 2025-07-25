import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { vehicles } from "@/data/vehicles";
import { 
  Car, 
  Calendar, 
  Gauge, 
  Power, 
  Shield, 
  Wrench,
  Phone,
  ArrowLeft,
  ShoppingCart,
} from "lucide-react";
import { Vehicle } from "@/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useLanguage } from "@/contexts/LanguageContext";

const VehicleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const { t } = useLanguage();
  
  // Function to translate fuel types
  const translateFuelType = (fuelType: string) => {
    const fuelMap: { [key: string]: string } = {
      'Essence': t('fuel.essence'),
      'Diesel': t('fuel.diesel'), 
      'Essence/Flex': t('fuel.essenceFlex'),
      'Petrol': t('fuel.petrol')
    };
    return fuelMap[fuelType] || fuelType;
  };
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Find the vehicle with the matching ID
    const foundVehicle = vehicles.find(v => v.id === id);
    if (foundVehicle) {
      setVehicle(foundVehicle);
    }
    setLoading(false);
  }, [id]);

  const addToCart = () => {
    if (!vehicle) return;
    
    // Get current cart items from localStorage
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    
    // Check if vehicle is already in cart
    if (currentCart.some(item => item.id === vehicle.id)) {
      toast({
        title: t("shop.alreadyInCart"),
        description: t("shop.alreadyInCartDesc"),
      });
      return;
    }
    
    // Add vehicle to cart
    const vehicleForCart = {
      id: vehicle.id,
      name: `${vehicle.brand} ${vehicle.model}`,
      price: vehicle.price,
      image: vehicle.images[0]
    };
    
    const updatedCart = [...currentCart, vehicleForCart];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    
    // Correction ici : utiliser la syntaxe correcte pour les variables dans les traductions
    toast({
      title: t("shop.vehicleAdded"),
      description: t("shop.vehicleAddedDesc").replace("{vehicle}", `${vehicle.brand} ${vehicle.model}`),
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 mt-20">
          <p>{t("common.loading")}...</p>
        </div>
      </Layout>
    );
  }

  if (!vehicle) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 mt-20">
          <p>{t("vehicle.notFound")}</p>
          <Link to="/catalog" className="inline-flex items-center text-autop-red hover:underline mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("vehicle.backToCatalog")}
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 mt-20">
        <Link to="/catalog" className="inline-flex items-center text-muted-foreground hover:text-autop-red mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("vehicle.backToCatalog")}
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="mb-8">
              <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                <img 
                  src={vehicle.images[selectedImageIndex]} 
                  alt={`${vehicle.brand} ${vehicle.model}`} 
                  className="object-cover w-full h-full"
                />
              </div>
              
              <div className="relative">
                <Carousel className="w-full">
                  <CarouselContent>
                    {vehicle.images.map((image, index) => (
                      <CarouselItem key={index} className="basis-1/4 sm:basis-1/5 md:basis-1/6 lg:basis-1/6">
                        <div 
                          className={`cursor-pointer rounded-md overflow-hidden border-2 ${selectedImageIndex === index ? 'border-autop-red' : 'border-transparent'}`}
                          onClick={() => setSelectedImageIndex(index)}
                        >
                          <img 
                            src={image} 
                            alt={`Vue ${index + 1} de ${vehicle.brand} ${vehicle.model}`} 
                            className="aspect-square object-cover w-full h-full"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-0" />
                  <CarouselNext className="right-0" />
                </Carousel>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{vehicle.brand} {vehicle.model}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-8">
              <span>{vehicle.mileage > 0 ? `${vehicle.mileage.toLocaleString()} km` : t("vehicle.zeroKm")}</span>
              <span>•</span>
              <span>{translateFuelType(vehicle.fuelType)}</span>
              <span>•</span>
              <span>{vehicle.power} {t("shop.hp")}</span>
            </div>

            <div className="prose prose-lg max-w-none space-y-6">
              <section className="bg-white/50 backdrop-blur-sm p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-autop-red">{t("vehicle.mainFeatures")}</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-autop-red" />
                    <span>{t("vehicle.year")} : {vehicle.year}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Gauge className="h-5 w-5 text-autop-red" />
                    <span>{vehicle.mileage > 0 ? `${vehicle.mileage.toLocaleString()} km` : t("vehicle.zeroKm")}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Power className="h-5 w-5 text-autop-red" />
                    <span>{vehicle.power} {t("shop.hp")}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Car className="h-5 w-5 text-autop-red" />
                    <span>{translateFuelType(vehicle.fuelType)}</span>
                  </div>
                </div>
              </section>

              <section className="bg-white/50 backdrop-blur-sm p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-autop-red">{t("vehicle.options")}</h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {vehicle.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white/50 backdrop-blur-sm p-6 rounded-lg shadow-sm">
              <div className="mb-4">
                <span className="text-3xl font-bold text-autop-red">€{vehicle.price.toLocaleString()}</span>
              </div>
              <div className="space-y-4">
                <Button onClick={addToCart} className="w-full btn-primary">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {t("shop.addToCart")}
                </Button>
                <Link to="/contact">
                  <Button variant="outline" className="w-full">{t("vehicle.requestMoreInfo")}</Button>
                </Link>
              </div>
            </div>

            <div className="bg-white/50 backdrop-blur-sm p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-autop-red" />
                {t("vehicle.warranties")}
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                  {t("vehicle.manufacturerWarranty")} {vehicle.year === 2025 ? t("vehicle.full") : t("vehicle.partial")}
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                  {t("vehicle.warrantyExtension")}
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                  {t("vehicle.assistance")}
                </li>
              </ul>
            </div>

            <div className="bg-white/50 backdrop-blur-sm p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Wrench className="h-5 w-5 text-autop-red" />
                {t("vehicle.includedServices")}
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                  {t("vehicle.delivery")}
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                  {t("vehicle.tradeIn")}
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-autop-red rounded-full"></span>
                  {t("vehicle.financing")}
                </li>
              </ul>
            </div>

            <div className="bg-white/50 backdrop-blur-sm p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Phone className="h-5 w-5 text-autop-red" />
                {t("vehicle.directContact")}
              </h3>
              <p className="text-muted-foreground mb-4">
                {t("vehicle.teamAvailable")}
              </p>
              <Link to="/contact">
                <Button variant="outline" className="w-full">
                  {t("vehicle.contactAdvisor")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VehicleDetail;
