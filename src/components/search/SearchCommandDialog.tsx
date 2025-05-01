
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Car } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Vehicle } from "@/types";

interface SearchCommandDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  query: string;
  setQuery: (query: string) => void;
  onSelect: (value: string) => void;
  vehicles: Vehicle[];
}

const SearchCommandDialog = ({ 
  open, 
  setOpen, 
  query, 
  setQuery, 
  onSelect,
  vehicles 
}: SearchCommandDialogProps) => {
  const { t } = useLanguage();

  const generateSuggestions = () => {
    const suggestions = [
      "Mercedes", 
      "Audi", 
      "BMW", 
      "Porsche",
      "Jaguar",
      "Toit panoramique",
      "SUV",
      "2023",
      "hybride",
      "automatique"
    ];
    
    const vehicleModels = vehicles.map(v => `${v.brand} ${v.model}`).slice(0, 5);
    return [...suggestions, ...vehicleModels];
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput 
        placeholder={t("search.placeholder")} 
        value={query} 
        onValueChange={setQuery} 
      />
      <CommandList>
        <CommandEmpty>{t("search.noResults")}</CommandEmpty>
        <CommandGroup heading="Suggestions">
          {generateSuggestions().map((suggestion) => (
            <CommandItem 
              key={suggestion} 
              value={suggestion}
              onSelect={onSelect}
            >
              <Car className="mr-2 h-4 w-4" />
              <span>{suggestion}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default SearchCommandDialog;
