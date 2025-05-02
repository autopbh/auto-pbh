
import { Button } from "@/components/ui/button";
import VehicleCard from "@/components/shop/VehicleCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { Vehicle } from "@/types";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SearchResultsProps {
  searchResults: Vehicle[];
  hasSearched: boolean;
}

const SearchResults = ({ searchResults, hasSearched }: SearchResultsProps) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  if (!hasSearched) {
    return null;
  }

  // Group vehicles by brand for better organization
  const vehiclesByBrand = searchResults.reduce((acc, vehicle) => {
    if (!acc[vehicle.brand]) {
      acc[vehicle.brand] = [];
    }
    acc[vehicle.brand].push(vehicle);
    return acc;
  }, {} as Record<string, Vehicle[]>);

  // Sort brands alphabetically
  const sortedBrands = Object.keys(vehiclesByBrand).sort();

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-6">
        {searchResults.length > 0 
          ? `${searchResults.length} ${searchResults.length > 1 
              ? t("search.results_plural") 
              : t("search.results")}`
          : t("search.noResults")}
      </h2>
      
      {searchResults.length > 0 ? (
        <div>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">{t("search.allVehicles")}</TabsTrigger>
              {sortedBrands.map(brand => (
                <TabsTrigger key={brand} value={brand}>{brand}</TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value="all" className="grid md:grid-cols-2 gap-8">
              {searchResults.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </TabsContent>
            
            {sortedBrands.map(brand => (
              <TabsContent key={brand} value={brand} className="grid md:grid-cols-2 gap-8">
                {vehiclesByBrand[brand].map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      ) : (
        <div className="bg-white/50 backdrop-blur-sm p-8 rounded-lg shadow-sm text-center">
          <p className="text-lg mb-4">{t("search.noResultsDesc")}</p>
          <p className="mb-6">{t("search.tryOther")}</p>
          <Button onClick={() => navigate('/catalog')}>
            {t("search.viewCatalog")}
          </Button>
        </div>
      )}
    </section>
  );
};

export default SearchResults;
