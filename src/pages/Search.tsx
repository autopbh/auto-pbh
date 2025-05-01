
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { vehicles } from "@/data/vehicles";
import { Vehicle } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import SearchBar from "@/components/search/SearchBar";
import BrandFilter from "@/components/search/BrandFilter";
import FilterTags from "@/components/search/FilterTags";
import SearchResults from "@/components/search/SearchResults";
import SearchCommandDialog from "@/components/search/SearchCommandDialog";
import SearchAssistance from "@/components/search/SearchAssistance";

const Search = () => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Vehicle[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Close command dialog when hitting escape
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSearch = (searchQuery: string = query) => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    const normalizedQuery = searchQuery.trim().toLowerCase();
    
    // Debug logs
    console.log('Recherche pour:', normalizedQuery);
    console.log('Véhicules disponibles:', vehicles.map(v => v.brand));
    
    const filteredVehicles = vehicles.filter(vehicle => {
      // Case-insensitive comparison
      const brandMatch = vehicle.brand.toLowerCase().includes(normalizedQuery);
      const modelMatch = vehicle.model.toLowerCase().includes(normalizedQuery);
      const yearMatch = vehicle.year.toString().includes(normalizedQuery);
      const colorMatch = vehicle.exteriorColor.toLowerCase().includes(normalizedQuery);
      const featureMatch = vehicle.features.some(feature => 
        feature.toLowerCase().includes(normalizedQuery)
      );
      const optionMatch = vehicle.options.some(option => 
        option.toLowerCase().includes(normalizedQuery)
      );
      
      // Debug log for matches
      if (brandMatch || modelMatch || yearMatch || colorMatch || featureMatch || optionMatch) {
        console.log('Match trouvé pour', vehicle.brand, vehicle.model);
      }
      
      return brandMatch || modelMatch || yearMatch || colorMatch || featureMatch || optionMatch;
    });
    
    console.log('Résultats de recherche:', filteredVehicles.length, 'véhicules trouvés');
    console.log('Véhicules trouvés:', filteredVehicles.map(v => `${v.brand} ${v.model}`));
    
    setSearchResults(filteredVehicles);
    setHasSearched(true);
  };

  const handleCommandSelect = (value: string) => {
    setQuery(value);
    setOpen(false);
    handleSearch(value);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 mt-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-8">{t("search.title")}</h1>
          
          <section className="bg-white/50 backdrop-blur-sm p-8 rounded-lg shadow-sm mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-autop-red">{t("search.advanced")}</h2>
            
            <div className="mb-8">
              <p className="text-lg mb-6">
                {t("search.description")}
              </p>
              
              <SearchBar 
                onSearch={handleSearch}
                initialQuery={query}
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <BrandFilter 
                onBrandSelect={(brand) => {
                  setQuery(brand);
                  handleSearch(brand);
                }}
                vehicles={vehicles}
              />
              
              <FilterTags 
                onFilterSelect={(filter) => {
                  setQuery(filter);
                  handleSearch(filter);
                }}
              />
            </div>
          </section>
          
          <SearchResults 
            searchResults={searchResults}
            hasSearched={hasSearched}
          />
          
          <SearchAssistance />
        </div>
      </div>
      
      <SearchCommandDialog
        open={open}
        setOpen={setOpen}
        query={query}
        setQuery={setQuery}
        onSelect={handleCommandSelect}
        vehicles={vehicles}
      />
    </Layout>
  );
};

export default Search;
