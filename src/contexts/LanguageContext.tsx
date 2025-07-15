
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  const location = useLocation();
  const navigate = useNavigate();

  // Extract language from URL path
  const getLanguageFromPath = (): Language => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const langCode = pathSegments[0];
    
    const supportedLanguages: Language[] = ['fr', 'en', 'pt', 'es', 'de', 'it', 'pl', 'gr', 'fi'];
    
    if (supportedLanguages.includes(langCode as Language)) {
      return langCode as Language;
    }
    
    return 'fr'; // Default language
  };

  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    // First check URL, then localStorage, then default to French
    const urlLang = getLanguageFromPath();
    if (urlLang !== 'fr' || location.pathname.startsWith('/fr/')) {
      return urlLang;
    }
    
    const savedLang = localStorage.getItem("autop-language");
    return (savedLang as Language) || "fr";
  });

  // Get the current language details
  const currentLangDetails = languages.find(lang => lang.code === currentLanguage) || languages[2];

  // Update language when URL changes
  useEffect(() => {
    const urlLang = getLanguageFromPath();
    if (urlLang !== currentLanguage) {
      setCurrentLanguage(urlLang);
    }
  }, [location.pathname]);

  // Save language preference to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("autop-language", currentLanguage);
  }, [currentLanguage]);

  // Translation function
  const t = (key: string): string => {
    return translations[currentLanguage]?.[key] || translations["fr"]?.[key] || key;
  };

  // Set language function with URL navigation
  const setLanguage = (lang: Language) => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    
    // Remove current language from path if it exists
    if (['fr', 'en', 'pt', 'es', 'de', 'it', 'pl', 'gr', 'fi'].includes(pathSegments[0])) {
      pathSegments.shift();
    }
    
    // Build new path with selected language
    const newPath = `/${lang}/${pathSegments.join('/')}`;
    navigate(newPath);
    setCurrentLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t, currentLangDetails }}>
      {children}
    </LanguageContext.Provider>
  );
};
