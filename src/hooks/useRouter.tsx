import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Language } from "@/types";

export const useRouter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const getCurrentLanguage = (): Language => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const langCode = pathSegments[0];
    
    const supportedLanguages: Language[] = ['fr', 'en', 'pt', 'es', 'de', 'it', 'nl'];
    
    if (supportedLanguages.includes(langCode as Language)) {
      return langCode as Language;
    }
    
    return 'fr'; // Default language
  };

  const navigateToRoute = (path: string, lang?: Language) => {
    const currentLang = lang || getCurrentLanguage();
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    navigate(`/${currentLang}/${cleanPath}`);
  };

  const getLocalizedPath = (path: string, lang?: Language) => {
    const currentLang = lang || getCurrentLanguage();
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `/${currentLang}/${cleanPath}`;
  };

  return {
    navigate: navigateToRoute,
    getCurrentLanguage,
    getLocalizedPath,
    location,
    params
  };
};