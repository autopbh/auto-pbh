
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { vehicles } from "@/data/vehicles";
import { ArrowLeft, Check, Shield, Car, Phone, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const VehicleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [vehicle, setVehicle] = useState(vehicles.find(v => v.id === id));
  
  useEffect(() => {
    window.scrollTo(0, 0);
    setVehicle(vehicles.find(v => v.id === id));
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
    const vehicleToAdd = {
      id: vehicle.id,
      name: `${vehicle.brand} ${vehicle.model}`,
      price: vehicle.price,
      image: vehicle.thumbnail || vehicle.images[0],
      brand: vehicle.brand,
      model: vehicle.model,
      year: vehicle.year
    };
    
    const updatedCart = [...currentCart, vehicleToAdd];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    
    toast({
      title: t("shop.vehicleAdded"),
      description: t("shop.vehicleAddedDesc").replace("{vehicle}", `${vehicle.brand} ${vehicle.model}`),
    });
  };

  if (!vehicle) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 mt-20">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">{t("vehicle.notFound")}</h1>
            <Button asChild>
              <Link to="/catalog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t("vehicle.backToCatalog")}
              </Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const features = [
    { id: "panoramicRoof", name: t("vehicle.features.panoramicRoof") },
    { id: "acc", name: t("vehicle.features.acc") },
    { id: "emergencyBraking", name: t("vehicle.features.emergencyBraking") },
    { id: "airbags", name: t("vehicle.features.airbags") },
    { id: "ledLights", name: t("vehicle.features.ledLights") },
    { id: "paddleShift", name: t("vehicle.features.paddleShift") },
    { id: "phoneIntegration", name: t("vehicle.features.phoneIntegration") },
    { id: "alloyWheels", name: t("vehicle.features.alloyWheels") },
    { id: "taxPaid", name: t("vehicle.features.taxPaid") },
    { id: "registered", name: t("vehicle.features.registered") },
  ];

  // Vehicle specs with icons
  const specs = [
    { 
      icon: <Car className="h-8 w-8 text-autop-red" />, 
      value: vehicle.kilometers === 0 ? t("vehicle.specs.zeroKm") : `${vehicle.kilometers.toLocaleString()} km` 
    },
    { 
      icon: <span className="text-autop-red text-2xl">⚡</span>, 
      value: t("vehicle.specs.horsePower").replace("{hp}", vehicle.power.toString()) 
    },
    { 
      icon: <span className="text-autop-red text-2xl">🔋</span>, 
      value: t("vehicle.specs.mildHybrid")
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 mt-20">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left column - Gallery */}
          <div className="lg:col-span-7">
            {/* Vehicle title visible on mobile only */}
            <div className="block lg:hidden mb-6">
              <Link to="/catalog" className="text-autop-red hover:underline flex items-center mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" /> {t("vehicle.backToCatalog")}
              </Link>
              <h1 className="text-3xl font-bold mb-2">{vehicle.brand} {vehicle.model}</h1>
              <p className="text-xl mb-4">{vehicle.version}</p>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-lg py-1 px-3 border-autop-red text-autop-red">
                  {vehicle.year}
                </Badge>
                <span className="text-3xl font-bold text-autop-red">€{vehicle.price.toLocaleString()}</span>
              </div>
            </div>
            
            {/* Main image */}
            <div className="aspect-[16/9] rounded-lg overflow-hidden mb-4 bg-black">
              <img 
                src={vehicle.images[0]} 
                alt={`${vehicle.brand} ${vehicle.model}`} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnails row */}
            <div className="grid grid-cols-4 gap-2 mb-8">
              {vehicle.images.slice(1, 5).map((image, idx) => (
                <div key={idx} className="aspect-[4/3] rounded-md overflow-hidden bg-gray-100">
                  <img 
                    src={image} 
                    alt={`${vehicle.brand} ${vehicle.model} view ${idx+2}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            
            {/* Specifications */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {specs.map((spec, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-white/70 p-4 rounded-lg shadow-sm">
                  {spec.icon}
                  <div className="text-lg font-medium">{spec.value}</div>
                </div>
              ))}
            </div>
            
            {/* Features */}
            <div className="bg-white/70 rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">{t("vehicle.options")}</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {features.map((feature) => (
                  <li key={feature.id} className="flex items-center">
                    <span className="mr-3 text-autop-red">•</span>
                    {feature.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Right column - Details and CTA */}
          <div className="lg:col-span-5">
            {/* Vehicle title hidden on mobile */}
            <div className="hidden lg:block mb-6">
              <Link to="/catalog" className="text-autop-red hover:underline flex items-center mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" /> {t("vehicle.backToCatalog")}
              </Link>
              <h1 className="text-3xl font-bold mb-2">{vehicle.brand} {vehicle.model}</h1>
              <p className="text-xl mb-4">{vehicle.version}</p>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-lg py-1 px-3 border-autop-red text-autop-red">
                  {vehicle.year}
                </Badge>
                <span className="text-3xl font-bold text-autop-red">€{vehicle.price.toLocaleString()}</span>
              </div>
            </div>
            
            {/* Main features */}
            <div className="bg-white/70 rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">{t("vehicle.mainFeatures")}</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">{t("shop.transmission")}</p>
                  <p className="font-medium">
                    {vehicle.transmission === "automatic" ? t("shop.automatic") : t("shop.manual")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("vehicle.year")}</p>
                  <p className="font-medium">{vehicle.year}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("shop.power")}</p>
                  <p className="font-medium">{vehicle.power} {t("shop.hp")}</p>
                </div>
              </div>
            </div>
            
            {/* CTA */}
            <div className="flex gap-4 mb-6">
              <Button onClick={addToCart} className="flex-1">
                <Plus className="mr-2 h-4 w-4" />
                {t("shop.addToCart")}
              </Button>
              <Button variant="outline" className="flex-1">
                {t("vehicle.requestMoreInfo")}
              </Button>
            </div>
            
            {/* Warranty */}
            <div className="bg-white/70 rounded-lg shadow-sm p-6 mb-6">
              <h2 className="flex items-center text-xl font-semibold mb-4">
                <Shield className="mr-2 h-5 w-5 text-autop-red" />
                {t("vehicle.warranties")}
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="mr-2 h-4 w-4 mt-1 text-autop-red" />
                  <span>{t("vehicle.manufacturerWarranty")} {vehicle.warranty ? t("vehicle.full") : t("vehicle.partial")}</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-4 w-4 mt-1 text-autop-red" />
                  <span>{t("vehicle.warrantyExtension")}</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-4 w-4 mt-1 text-autop-red" />
                  <span>{t("vehicle.assistance")}</span>
                </li>
              </ul>
            </div>
            
            {/* Included services */}
            <div className="bg-white/70 rounded-lg shadow-sm p-6 mb-6">
              <h2 className="flex items-center text-xl font-semibold mb-4">
                <Car className="mr-2 h-5 w-5 text-autop-red" />
                {t("vehicle.includedServices")}
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="mr-2 h-4 w-4 mt-1 text-autop-red" />
                  <span>{t("vehicle.delivery")}</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-4 w-4 mt-1 text-autop-red" />
                  <span>{t("vehicle.tradeIn")}</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-4 w-4 mt-1 text-autop-red" />
                  <span>{t("vehicle.financing")}</span>
                </li>
              </ul>
            </div>
            
            {/* Contact */}
            <div className="bg-white/70 rounded-lg shadow-sm p-6">
              <h2 className="flex items-center text-xl font-semibold mb-2">
                <Phone className="mr-2 h-5 w-5 text-autop-red" />
                {t("vehicle.directContact")}
              </h2>
              <p className="text-muted-foreground mb-4">
                {t("vehicle.teamAvailable")}
              </p>
              <Button className="w-full">
                {t("vehicle.contactAdvisor")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VehicleDetail;
