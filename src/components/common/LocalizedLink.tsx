import { Link, LinkProps } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface LocalizedLinkProps extends Omit<LinkProps, 'to'> {
  to: string;
  lang?: string;
}

const LocalizedLink = ({ to, lang, ...props }: LocalizedLinkProps) => {
  const { currentLanguage } = useLanguage();
  
  const targetLang = lang || currentLanguage;
  const cleanPath = to.startsWith('/') ? to.slice(1) : to;
  const localizedTo = `/${targetLang}/${cleanPath}`;

  return <Link {...props} to={localizedTo} />;
};

export default LocalizedLink;