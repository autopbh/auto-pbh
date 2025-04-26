
import { Link } from "react-router-dom";
import { User, Search, ShoppingCart, Home, Car, HelpCircle, Phone, Info } from "lucide-react";

const MobileMenu = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="pt-6 pb-8">
        <h2 className="text-xl font-bold mb-6 px-4">Menu</h2>
        <nav className="flex flex-col space-y-4">
          <Link
            to="/"
            className="flex items-center px-4 py-2 hover:bg-muted transition-colors"
          >
            <Home className="w-5 h-5 mr-3" />
            <span>Accueil</span>
          </Link>
          <Link
            to="/catalog"
            className="flex items-center px-4 py-2 hover:bg-muted transition-colors"
          >
            <Car className="w-5 h-5 mr-3" />
            <span>Catalogue</span>
          </Link>
          <Link
            to="/search"
            className="flex items-center px-4 py-2 hover:bg-muted transition-colors"
          >
            <Search className="w-5 h-5 mr-3" />
            <span>Recherche</span>
          </Link>
          <Link
            to="/cart"
            className="flex items-center px-4 py-2 hover:bg-muted transition-colors"
          >
            <ShoppingCart className="w-5 h-5 mr-3" />
            <span>Panier</span>
          </Link>
          <Link
            to="/account"
            className="flex items-center px-4 py-2 hover:bg-muted transition-colors"
          >
            <User className="w-5 h-5 mr-3" />
            <span>Compte</span>
          </Link>
          <Link
            to="/about"
            className="flex items-center px-4 py-2 hover:bg-muted transition-colors"
          >
            <Info className="w-5 h-5 mr-3" />
            <span>À propos</span>
          </Link>
          <Link
            to="/contact"
            className="flex items-center px-4 py-2 hover:bg-muted transition-colors"
          >
            <Phone className="w-5 h-5 mr-3" />
            <span>Contact</span>
          </Link>
          <Link
            to="/faq"
            className="flex items-center px-4 py-2 hover:bg-muted transition-colors"
          >
            <HelpCircle className="w-5 h-5 mr-3" />
            <span>FAQ</span>
          </Link>
        </nav>
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
