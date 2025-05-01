
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { languages } from "@/data/languages";
import { Language } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageSelector = () => {
  const { currentLanguage, setLanguage, currentLangDetails } = useLanguage();
  
  const handleLanguageChange = (code: Language) => {
    setLanguage(code);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-1 px-2 py-1">
          <span className="text-lg">{currentLangDetails.flag}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-white dark:bg-autop-dark border border-border">
        {languages.map(language => (
          <DropdownMenuItem
            key={language.code}
            className={`flex items-center px-4 py-2 cursor-pointer ${
              language.code === currentLanguage ? 'bg-muted' : ''
            }`}
            onClick={() => handleLanguageChange(language.code)}
          >
            <span className="text-lg mr-2">{language.flag}</span>
            <span>{language.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
