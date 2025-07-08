
import { useState, useEffect } from "react";
import { Search, ShoppingCart, User, Menu } from "lucide-react";
import LocalizedLink from "@/components/common/LocalizedLink";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import LanguageSelector from "@/components/common/LanguageSelector";
import CartDropdown from "@/components/shop/CartDropdown";
import MobileMenu from "@/components/layout/MobileMenu";
import { useLanguage } from "@/contexts/LanguageContext";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const { t } = useLanguage();

  // Change header style on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Load cart items
  useEffect(() => {
    const loadCart = () => {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    };
    
    loadCart();
    
    // Set up event listener for storage changes (for multi-tab support)
    window.addEventListener("storage", loadCart);
    
    return () => {
      window.removeEventListener("storage", loadCart);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 dark:bg-autop-dark/95 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <LocalizedLink to="/" className="flex items-center">
          <img
            src="/lovable-uploads/1bb4ee3a-2a2a-405c-855f-32b060970cb1.png"
            alt="AUTO PBH"
            className="h-12"
          />
        </LocalizedLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <LocalizedLink to="/catalog" className="navbar-link bg-white/80 dark:bg-black/80 px-4 py-2 rounded-md border border-white/30 dark:border-black/30 shadow-sm">
            {t("nav.catalog")}
          </LocalizedLink>
          <LocalizedLink to="/services" className="navbar-link bg-white/80 dark:bg-black/80 px-4 py-2 rounded-md border border-white/30 dark:border-black/30 shadow-sm">
            {t("nav.services")}
          </LocalizedLink>
          <LocalizedLink to="/about" className="navbar-link bg-white/80 dark:bg-black/80 px-4 py-2 rounded-md border border-white/30 dark:border-black/30 shadow-sm">
            {t("nav.about")}
          </LocalizedLink>
          <LocalizedLink to="/contact" className="navbar-link bg-white/80 dark:bg-black/80 px-4 py-2 rounded-md border border-white/30 dark:border-black/30 shadow-sm">
            {t("nav.contact")}
          </LocalizedLink>
          <LocalizedLink to="/faq" className="navbar-link bg-white/80 dark:bg-black/80 px-4 py-2 rounded-md border border-white/30 dark:border-black/30 shadow-sm">
            {t("nav.faq")}
          </LocalizedLink>
        </nav>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-4">
          <LanguageSelector />
          
          <LocalizedLink to="/search">
            <Button 
              variant="secondary"
              size="icon"
              className="relative bg-white/80 dark:bg-black/80 hover:bg-white/90 dark:hover:bg-black/90 border border-white/30 dark:border-black/30 shadow-sm"
              aria-label={t("nav.search")}
            >
              <Search className="h-5 w-5" />
            </Button>
          </LocalizedLink>
          
          <div className="relative">
            <Button
              variant="secondary"
              size="icon"
              onClick={() => setCartOpen(!cartOpen)}
              className="bg-white/80 dark:bg-black/80 hover:bg-white/90 dark:hover:bg-black/90 border border-white/30 dark:border-black/30 shadow-sm"
              aria-label={t("nav.cart")}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItems.length > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 min-w-[20px] h-5 flex items-center justify-center bg-autop-red text-white text-xs"
                  variant="destructive"
                >
                  {cartItems.length}
                </Badge>
              )}
            </Button>
            {cartOpen && <CartDropdown />}
          </div>
          
          <LocalizedLink to="/account">
            <Button
              variant="secondary"
              size="icon"
              className="hidden md:flex bg-white/80 dark:bg-black/80 hover:bg-white/90 dark:hover:bg-black/90 border border-white/30 dark:border-black/30 shadow-sm"
              aria-label={t("nav.account")}
            >
              <User className="h-5 w-5" />
            </Button>
          </LocalizedLink>
          
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="md:hidden bg-white/80 dark:bg-black/80 hover:bg-white/90 dark:hover:bg-black/90 border border-white/30 dark:border-black/30 shadow-sm"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-white dark:bg-autop-dark">
              <MobileMenu />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
