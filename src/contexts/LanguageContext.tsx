
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Language, LanguageOption, TranslationDictionary } from "@/types";
import { languages } from "@/data/languages";

// Import des traductions restructurées
import { translations, translationConfig, getNestedTranslation } from "@/translations";

// Define types for our context
type LanguageContextType = {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string>) => string;
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

  // Translation function with improved handling of missing keys and parameter substitution
  const t = (key: string, params?: Record<string, string>): string => {
    let result = "";
    
    try {
      // Try to get translation from current language
      result = getNestedTranslation(translations[currentLanguage], key);
      
      // If translation not found in current language, try fallback
      if (result === key && currentLanguage !== translationConfig.fallbackLanguage) {
        result = getNestedTranslation(translations[translationConfig.fallbackLanguage], key);
      }
      
      // If still not found and detection is enabled, log it
      if (result === key && translationConfig.detectMissingKeys) {
        if (translationConfig.logMissingKeys) {
          console.warn(`Translation missing for key: ${key} in language: ${currentLanguage}`);
        }
      }
      
      // Replace parameters if any
      if (params && result !== key) {
        Object.entries(params).forEach(([paramKey, value]) => {
          result = result.replace(new RegExp(`{{${paramKey}}}`, 'g'), value);
        });
      }
      
      return result;
    } catch (error) {
      console.error(`Error getting translation for key: ${key}`, error);
      return key;
    }
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
