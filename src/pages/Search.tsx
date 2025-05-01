import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, Car, Filter } from "lucide-react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { vehicles } from "@/data/vehicles";
import VehicleCard from "@/components/shop/VehicleCard";
import { useNavigate } from "react-router-dom";
import { Vehicle } from "@/types";

const Search = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Vehicle[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();

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

  const handleSearch = () => {
    if (!query.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    const normalizedQuery = query.trim().toLowerCase();
    
    // Affichons les termes de recherche dans la console pour debug
    console.log('Recherche pour:', normalizedQuery);
    console.log('Véhicules disponibles:', vehicles.map(v => v.brand));
    
    const filteredVehicles = vehicles.filter(vehicle => {
      // Convertir tout en minuscules pour une comparaison insensible à la casse
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
      
      // Debug log pour comprendre les correspondances
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
    handleSearch();
  };

  const generateSuggestions = () => {
    const suggestions = [
      "Mercedes", 
      "Audi", 
      "BMW", 
      "Porsche",
      "Jaguar", // Ajout explicite de Jaguar dans les suggestions
      "Toit panoramique",
      "SUV",
      "2023",
      "hybride",
      "automatique"
    ];
    
    // Add actual vehicle models to suggestions
    const vehicleModels = vehicles.map(v => `${v.brand} ${v.model}`).slice(0, 5);
    return [...suggestions, ...vehicleModels];
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 mt-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-8">Recherche</h1>
          
          <section className="bg-white/50 backdrop-blur-sm p-8 rounded-lg shadow-sm mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-autop-red">Recherche Avancée</h2>
            
            <div className="mb-8">
              <p className="text-lg mb-6">
                Utilisez notre moteur de recherche intelligent pour trouver le véhicule qui correspond parfaitement 
                à vos critères parmi notre sélection exclusive.
              </p>
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <SearchIcon className="absolute left-4 top-3 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder='Tapez "Mercedes Classe S 2023" ou scannez vos critères...'
                    className="w-full rounded-md border pl-11 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-autop-red"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onClick={() => setOpen(true)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch();
                      }
                    }}
                  />
                </div>
                <Button className="md:w-auto" onClick={handleSearch}>
                  <SearchIcon className="mr-2 h-4 w-4" />
                  Rechercher
                </Button>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/70 rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <Car className="h-6 w-6 text-autop-red" />
                  <h3 className="text-xl font-semibold">Recherche par Marque</h3>
                </div>
                <ul className="space-y-2">
                  {["Mercedes-Benz", "BMW", "Audi", "Porsche", "Ford", "Jaguar"].map((brand) => (
                    <li 
                      key={brand}
                      className="flex items-center justify-between hover:bg-muted/50 p-2 rounded cursor-pointer transition-colors"
                      onClick={() => {
                        setQuery(brand);
                        handleSearch();
                      }}
                    >
                      <span>{brand}</span>
                      <span className="text-muted-foreground">
                        {vehicles.filter(v => v.brand === brand).length} modèles
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white/70 rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <Filter className="h-6 w-6 text-autop-red" />
                  <h3 className="text-xl font-semibold">Filtres Populaires</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["SUV Premium", "Moins de 50 000 km", "Toit panoramique", "Année 2022+", "Hybride", "Berlines"].map(filter => (
                    <span 
                      key={filter}
                      className="bg-muted px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-muted/80 transition-colors"
                      onClick={() => {
                        setQuery(filter);
                        handleSearch();
                      }}
                    >
                      {filter}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
          
          {/* Résultats de recherche */}
          {hasSearched && (
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">
                {searchResults.length > 0 
                  ? `${searchResults.length} résultat${searchResults.length > 1 ? 's' : ''} trouvé${searchResults.length > 1 ? 's' : ''}`
                  : "Aucun résultat trouvé"}
              </h2>
              
              {searchResults.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                  {searchResults.map((vehicle) => (
                    <VehicleCard key={vehicle.id} vehicle={vehicle} />
                  ))}
                </div>
              ) : (
                <div className="bg-white/50 backdrop-blur-sm p-8 rounded-lg shadow-sm text-center">
                  <p className="text-lg mb-4">Aucun véhicule ne correspond à votre recherche.</p>
                  <p className="mb-6">Essayez avec d'autres termes ou consultez notre catalogue complet.</p>
                  <Button onClick={() => navigate('/catalog')}>
                    Voir le catalogue complet
                  </Button>
                </div>
              )}
            </section>
          )}
          
          <section className="text-center p-8">
            <p className="text-muted-foreground mb-4">Assistance recherche</p>
            <Button variant="outline" className="gap-2">
              <SearchIcon className="h-4 w-4" />
              Recherche vocale disponible
            </Button>
          </section>
        </div>
      </div>
      
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Recherchez un véhicule..." value={query} onValueChange={setQuery} />
        <CommandList>
          <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {generateSuggestions().map((suggestion) => (
              <CommandItem 
                key={suggestion} 
                value={suggestion}
                onSelect={handleCommandSelect}
              >
                <Car className="mr-2 h-4 w-4" />
                <span>{suggestion}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </Layout>
  );
};

export default Search;
