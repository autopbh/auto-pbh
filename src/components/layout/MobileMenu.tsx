
import { 
  User, 
  Search, 
  ShoppingCart, 
  Home, 
  Car, 
  HelpCircle, 
  Phone, 
  Info, 
  CreditCard, 
  Shield, 
  Truck, 
  Settings 
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LocalizedLink from "@/components/common/LocalizedLink";

const MobileMenu = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="pt-6">
        <h2 className="text-xl font-bold mb-6 px-4">Menu</h2>
        
        {/* Navigation principale */}
        <nav className="flex flex-col space-y-2 mb-6">
          <LocalizedLink
            to="/"
            className="flex items-center px-4 py-2 hover:bg-muted transition-colors"
          >
            <Home className="w-5 h-5 mr-3" />
            <span>{t("nav.home")}</span>
          </LocalizedLink>
          <LocalizedLink
            to="/catalog"
            className="flex items-center px-4 py-2 hover:bg-muted transition-colors"
          >
            <Car className="w-5 h-5 mr-3" />
            <span>{t("nav.catalog")}</span>
          </LocalizedLink>
          <LocalizedLink
            to="/services"
            className="flex items-center px-4 py-2 hover:bg-muted transition-colors"
          >
            <Settings className="w-5 h-5 mr-3" />
            <span>{t("nav.services")}</span>
          </LocalizedLink>
        </nav>

        {/* Section Services Principaux */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 px-4 text-autop-red">{t("nav.mainServices")}</h3>
          <nav className="flex flex-col space-y-2">
            <LocalizedLink
              to="/financing"
              className="flex items-center px-4 py-2 hover:bg-muted transition-colors"
            >
              <CreditCard className="w-5 h-5 mr-3 text-autop-red" />
              <span>{t("nav.financing")}</span>
            </LocalizedLink>
            <LocalizedLink
              to="/warranty"
              className="flex items-center px-4 py-2 hover:bg-muted transition-colors"
            >
              <Shield className="w-5 h-5 mr-3 text-autop-red" />
              <span>{t("nav.warranty")}</span>
            </LocalizedLink>
            <LocalizedLink
              to="/delivery-tracking"
              className="flex items-center px-4 py-2 hover:bg-muted transition-colors"
            >
              <Truck className="w-5 h-5 mr-3 text-autop-red" />
              <span>{t("nav.delivery")}</span>
            </LocalizedLink>
          </nav>
        </div>

        {/* Autres pages */}
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-3 px-4 text-muted-foreground uppercase tracking-wide">{t("nav.other")}</h3>
          <nav className="flex flex-col space-y-2">
            <LocalizedLink
              to="/search"
              className="flex items-center px-4 py-2 hover:bg-muted transition-colors"
            >
              <Search className="w-5 h-5 mr-3" />
              <span>{t("nav.search")}</span>
            </LocalizedLink>
            <LocalizedLink
              to="/cart"
              className="flex items-center px-4 py-2 hover:bg-muted transition-colors"
            >
              <ShoppingCart className="w-5 h-5 mr-3" />
              <span>{t("nav.cart")}</span>
            </LocalizedLink>
            <LocalizedLink
              to="/account"
              className="flex items-center px-4 py-2 hover:bg-muted transition-colors"
            >
              <User className="w-5 h-5 mr-3" />
              <span>{t("nav.account")}</span>
            </LocalizedLink>
            <LocalizedLink
              to="/about"
              className="flex items-center px-4 py-2 hover:bg-muted transition-colors"
            >
              <Info className="w-5 h-5 mr-3" />
              <span>{t("nav.about")}</span>
            </LocalizedLink>
            <LocalizedLink
              to="/contact"
              className="flex items-center px-4 py-2 hover:bg-muted transition-colors"
            >
              <Phone className="w-5 h-5 mr-3" />
              <span>{t("nav.contact")}</span>
            </LocalizedLink>
            <LocalizedLink
              to="/faq"
              className="flex items-center px-4 py-2 hover:bg-muted transition-colors"
            >
              <HelpCircle className="w-5 h-5 mr-3" />
              <span>{t("nav.faq")}</span>
            </LocalizedLink>
          </nav>
        </div>
      </div>

      <div className="mt-auto pb-6 px-4">
        <div className="flex flex-col space-y-2">
          <p className="text-sm text-muted-foreground">
            AUTO PBH - Autolettestraat 10, 3063 NP Rotterdam
          </p>
          <p className="text-sm text-autop-red">+351 961 196 405</p>
          <p className="text-sm text-muted-foreground">pbhauto@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
