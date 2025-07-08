import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface RedirectToLanguageProps {
  targetPath?: string;
}

const RedirectToLanguage = ({ targetPath = "" }: RedirectToLanguageProps) => {
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    // Get preferred language from localStorage or default to French
    const savedLang = localStorage.getItem("autop-language") || "fr";
    
    // Handle dynamic vehicle ID parameter
    let finalPath = targetPath;
    if (targetPath.includes(":id") && params.id) {
      finalPath = targetPath.replace(":id", params.id);
    }
    
    // Navigate to the localized version
    navigate(`/${savedLang}${finalPath}`, { replace: true });
  }, [navigate, targetPath, params]);

  return null;
};

export default RedirectToLanguage;