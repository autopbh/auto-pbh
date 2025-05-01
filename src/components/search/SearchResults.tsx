
import { Button } from "@/components/ui/button";
import VehicleCard from "@/components/shop/VehicleCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { Vehicle } from "@/types";
import { useNavigate } from "react-router-dom";

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
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {searchResults.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
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
