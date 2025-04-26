
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import LanguageSelector from "@/components/common/LanguageSelector";
import CartDropdown from "@/components/shop/CartDropdown";
import MobileMenu from "@/components/layout/MobileMenu";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 dark:bg-autop-dark/95 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/" className="flex items-center">
          <img
            src="/lovable-uploads/1bb4ee3a-2a2a-405c-855f-32b060970cb1.png"
            alt="AUTO PBH"
            className="h-12"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/catalog" className="navbar-link">
            Catalogue
          </Link>
          <Link to="/services" className="navbar-link">
            Services
          </Link>
          <Link to="/about" className="navbar-link">
            À propos
          </Link>
          <Link to="/contact" className="navbar-link">
            Contact
          </Link>
          <Link to="/faq" className="navbar-link">
            FAQ
          </Link>
        </nav>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-4">
          <LanguageSelector />
          
          <Button 
            variant="ghost" 
            size="icon"
            className="relative"
            onClick={() => window.location.href="/search"}
          >
            <Search className="h-5 w-5" />
          </Button>
          
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCartOpen(!cartOpen)}
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
            {cartOpen && <CartDropdown />}
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex"
            onClick={() => window.location.href="/account"}
          >
            <User className="h-5 w-5" />
          </Button>
          
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
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
