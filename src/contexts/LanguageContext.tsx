
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Language, LanguageOption } from "@/types";
import { languages } from "@/data/languages";

// Translation data
import { translations } from "@/data/translations";

// Define types for our context
type LanguageContextType = {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  currentLangDetails: LanguageOption;
};

// Create the context
const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: "fr",
  setLanguage: () => {},
  t: (key: string) => key,
  currentLangDetails: languages[2], // Default to French
});

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);

interface LanguageProviderProps {
  children: ReactNode;
}

// Language provider component
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Load saved language from local storage, default to "fr" if not found
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    const savedLang = localStorage.getItem("autop-language");
    return (savedLang as Language) || "fr";
  });

  // Get the current language details
  const currentLangDetails = languages.find(lang => lang.code === currentLanguage) || languages[2];

  // Save language preference to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("autop-language", currentLanguage);
  }, [currentLanguage]);

  // Translation function
  const t = (key: string): string => {
    return translations[currentLanguage]?.[key] || translations["fr"]?.[key] || key;
  };

  // Set language function
  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t, currentLangDetails }}>
      {children}
    </LanguageContext.Provider>
  );
};
