
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
import { useToast } from "@/hooks/use-toast";

const Search = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Vehicle[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

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

  const normalizeText = (text: string | number): string => {
    return String(text).toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const handleSearch = (searchQuery: string = query) => {
    const normalizedQuery = normalizeText(searchQuery);
    
    if (!normalizedQuery) {
      setSearchResults([]);
      setHasSearched(false);
      setActiveFilters([]);
      return;
    }

    let filteredVehicles = vehicles.filter(vehicle => {
      // Case-insensitive and accent-insensitive comparison
      const brandMatch = normalizeText(vehicle.brand).includes(normalizedQuery);
      const modelMatch = normalizeText(vehicle.model).includes(normalizedQuery);
      const yearMatch = normalizeText(vehicle.year).includes(normalizedQuery);
      const colorMatch = normalizeText(vehicle.exteriorColor).includes(normalizedQuery);
      
      // Search in features and options
      const featureMatch = vehicle.features.some(feature => 
        normalizeText(feature).includes(normalizedQuery)
      );
      const optionMatch = vehicle.options.some(option => 
        normalizeText(option).includes(normalizedQuery)
      );
      
      return brandMatch || modelMatch || yearMatch || colorMatch || featureMatch || optionMatch;
    });
    
    // Apply active filters if any
    if (activeFilters.length > 0) {
      filteredVehicles = filteredVehicles.filter(vehicle => {
        return activeFilters.some(filter => {
          const normalizedFilter = normalizeText(filter);
          
          // Match filter against various vehicle properties
          return normalizeText(vehicle.brand).includes(normalizedFilter) ||
            normalizeText(vehicle.model).includes(normalizedFilter) ||
            normalizeText(vehicle.year).includes(normalizedFilter) ||
            vehicle.features.some(f => normalizeText(f).includes(normalizedFilter)) ||
            vehicle.options.some(o => normalizeText(o).includes(normalizedFilter));
        });
      });
    }
    
    setSearchResults(filteredVehicles);
    setHasSearched(true);
    
    if (filteredVehicles.length === 0) {
      toast({
        title: t("search.noResults"),
        description: t("search.tryOther"),
      });
    } else {
      toast({
        title: `${filteredVehicles.length} ${filteredVehicles.length > 1 
          ? t("search.results_plural") 
          : t("search.results")}`,
        description: t("search.resultsFound"),
      });
    }
  };

  const handleCommandSelect = (value: string) => {
    setQuery(value);
    setOpen(false);
    handleSearch(value);
  };

  const handleFilterSelect = (filter: string) => {
    // Toggle the filter
    const newFilters = activeFilters.includes(filter)
      ? activeFilters.filter(f => f !== filter)
      : [...activeFilters, filter];
      
    setActiveFilters(newFilters);
    
    // If we have a query, re-run the search with new filters
    if (query) {
      const normalizedQuery = normalizeText(query);
      
      let filteredVehicles = vehicles.filter(vehicle => {
        const brandMatch = normalizeText(vehicle.brand).includes(normalizedQuery);
        const modelMatch = normalizeText(vehicle.model).includes(normalizedQuery);
        const yearMatch = normalizeText(vehicle.year).includes(normalizedQuery);
        const colorMatch = normalizeText(vehicle.exteriorColor).includes(normalizedQuery);
        const featureMatch = vehicle.features.some(feature => 
          normalizeText(feature).includes(normalizedQuery)
        );
        const optionMatch = vehicle.options.some(option => 
          normalizeText(option).includes(normalizedQuery)
        );
        
        return brandMatch || modelMatch || yearMatch || colorMatch || featureMatch || optionMatch;
      });
      
      // Apply new filters
      if (newFilters.length > 0) {
        filteredVehicles = filteredVehicles.filter(vehicle => {
          return newFilters.some(filter => {
            const normalizedFilter = normalizeText(filter);
            
            return normalizeText(vehicle.brand).includes(normalizedFilter) ||
              normalizeText(vehicle.model).includes(normalizedFilter) ||
              normalizeText(vehicle.year).includes(normalizedFilter) ||
              vehicle.features.some(f => normalizeText(f).includes(normalizedFilter)) ||
              vehicle.options.some(o => normalizeText(o).includes(normalizedFilter));
          });
        });
      }
      
      setSearchResults(filteredVehicles);
      setHasSearched(true);
    } else if (newFilters.length > 0) {
      // If no query but we have filters, just filter the vehicles
      const filteredVehicles = vehicles.filter(vehicle => {
        return newFilters.some(filter => {
          const normalizedFilter = normalizeText(filter);
          
          return normalizeText(vehicle.brand).includes(normalizedFilter) ||
            normalizeText(vehicle.model).includes(normalizedFilter) ||
            normalizeText(vehicle.year).includes(normalizedFilter) ||
            vehicle.features.some(f => normalizeText(f).includes(normalizedFilter)) ||
            vehicle.options.some(o => normalizeText(o).includes(normalizedFilter));
        });
      });
      
      setSearchResults(filteredVehicles);
      setHasSearched(true);
    } else {
      // No query and no filters, reset results
      setSearchResults([]);
      setHasSearched(false);
    }
  };

  const handleBrandSelect = (brand: string) => {
    handleFilterSelect(brand);
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
            
            {activeFilters.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="font-medium text-muted-foreground">{t("search.activeFilters")}: </span>
                {activeFilters.map(filter => (
                  <span 
                    key={filter}
                    className="bg-autop-red/10 text-autop-red px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-autop-red/20 transition-colors flex items-center"
                    onClick={() => handleFilterSelect(filter)}
                  >
                    {filter}
                    <button className="ml-2">×</button>
                  </span>
                ))}
              </div>
            )}
            
            <div className="grid md:grid-cols-2 gap-6">
              <BrandFilter 
                onBrandSelect={handleBrandSelect}
                vehicles={vehicles}
              />
              
              <FilterTags 
                onFilterSelect={handleFilterSelect}
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
