
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

const SearchBar = ({ onSearch, initialQuery = "" }: SearchBarProps) => {
  const { t } = useLanguage();
  const [query, setQuery] = useState(initialQuery);

  const handleSearch = () => {
    onSearch(query);
  };

  const clearSearch = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1 relative">
        <SearchIcon className="absolute left-4 top-3 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          placeholder={t("search.placeholder")}
          className="w-full rounded-md border pl-11 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-autop-red"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        {query && (
          <button 
            className="absolute right-4 top-3 text-muted-foreground hover:text-foreground"
            onClick={clearSearch}
          >
            ×
          </button>
        )}
      </div>
      <Button className="md:w-auto" onClick={handleSearch}>
        <SearchIcon className="mr-2 h-4 w-4" />
        {t("search.button")}
      </Button>
    </div>
  );
};

export default SearchBar;
