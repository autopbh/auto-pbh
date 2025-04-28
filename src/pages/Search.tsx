
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

const Search = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

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
                  />
                </div>
                <Button className="md:w-auto">
                  <SearchIcon className="mr-2 h-4 w-4" />
                  Rechercher
                </Button>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/70 rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <Car className="h-6 w-6 text-autop-red" />
                  <h3 className="text-xl font-semibold">Recherche par Modèle</h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center justify-between hover:bg-muted/50 p-2 rounded cursor-pointer transition-colors">
                    <span>BMW</span>
                    <span className="text-muted-foreground">12 modèles</span>
                  </li>
                  <li className="flex items-center justify-between hover:bg-muted/50 p-2 rounded cursor-pointer transition-colors">
                    <span>Mercedes-Benz</span>
                    <span className="text-muted-foreground">9 modèles</span>
                  </li>
                  <li className="flex items-center justify-between hover:bg-muted/50 p-2 rounded cursor-pointer transition-colors">
                    <span>Audi</span>
                    <span className="text-muted-foreground">7 modèles</span>
                  </li>
                  <li className="flex items-center justify-between hover:bg-muted/50 p-2 rounded cursor-pointer transition-colors">
                    <span>Porsche</span>
                    <span className="text-muted-foreground">5 modèles</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white/70 rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <Filter className="h-6 w-6 text-autop-red" />
                  <h3 className="text-xl font-semibold">Filtres Populaires</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-muted px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-muted/80 transition-colors">
                    SUV Premium
                  </span>
                  <span className="bg-muted px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-muted/80 transition-colors">
                    Moins de 50 000 km
                  </span>
                  <span className="bg-muted px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-muted/80 transition-colors">
                    Toit panoramique
                  </span>
                  <span className="bg-muted px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-muted/80 transition-colors">
                    Année 2022+
                  </span>
                  <span className="bg-muted px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-muted/80 transition-colors">
                    GPS intégré
                  </span>
                  <span className="bg-muted px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-muted/80 transition-colors">
                    Berlines
                  </span>
                </div>
              </div>
            </div>
          </section>
          
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
        <CommandInput placeholder="Recherchez un véhicule..." />
        <CommandList>
          <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <Car className="mr-2 h-4 w-4" />
              <span>BMW Série 5 2023</span>
            </CommandItem>
            <CommandItem>
              <Car className="mr-2 h-4 w-4" />
              <span>Mercedes Classe S 2022</span>
            </CommandItem>
            <CommandItem>
              <Car className="mr-2 h-4 w-4" />
              <span>Porsche Cayenne 2023 en bleu nuit</span>
            </CommandItem>
            <CommandItem>
              <Car className="mr-2 h-4 w-4" />
              <span>Audi Q7 avec toit panoramique</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </Layout>
  );
};

export default Search;
