
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import RedirectToLanguage from "./components/common/RedirectToLanguage";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Catalog from "./pages/Catalog";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Faq from "./pages/Faq";
import Search from "./pages/Search";
import Account from "./pages/Account";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import VehicleDetail from "./pages/VehicleDetail";
import Financing from "./pages/Financing";

import Warranty from "./pages/Warranty";
import Returns from "./pages/Returns";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";
import LegalNotice from "./pages/LegalNotice";
import Admin from "./pages/Admin";

// Create a new QueryClient with stable configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      // Add more conservative settings to handle dependency loading issues
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes instead of cacheTime (renamed in v5)
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <LanguageProvider>
          <Toaster />
          <Sonner />
          <Routes>
            {/* Redirect root to French */}
            <Route path="/" element={<RedirectToLanguage />} />
            
            {/* Language-prefixed routes */}
            <Route path="/:lang" element={<Index />} />
            <Route path="/:lang/catalog" element={<Catalog />} />
            <Route path="/:lang/services" element={<Services />} />
            <Route path="/:lang/about" element={<About />} />
            <Route path="/:lang/contact" element={<Contact />} />
            <Route path="/:lang/faq" element={<Faq />} />
            <Route path="/:lang/search" element={<Search />} />
            <Route path="/:lang/account" element={<Account />} />
            <Route path="/:lang/cart" element={<Cart />} />
            <Route path="/:lang/checkout" element={<Checkout />} />
            <Route path="/:lang/vehicle/:id" element={<VehicleDetail />} />
            <Route path="/:lang/financing" element={<Financing />} />
            
            <Route path="/:lang/warranty" element={<Warranty />} />
            <Route path="/:lang/returns" element={<Returns />} />
            <Route path="/:lang/terms" element={<Terms />} />
            <Route path="/:lang/privacy" element={<Privacy />} />
            <Route path="/:lang/cookies" element={<Cookies />} />
            <Route path="/:lang/legal-notice" element={<LegalNotice />} />
            <Route path="/:lang/admin" element={<Admin />} />
            
            {/* Legacy routes without language prefix - redirect to French */}
            <Route path="/catalog" element={<RedirectToLanguage targetPath="/catalog" />} />
            <Route path="/services" element={<RedirectToLanguage targetPath="/services" />} />
            <Route path="/about" element={<RedirectToLanguage targetPath="/about" />} />
            <Route path="/contact" element={<RedirectToLanguage targetPath="/contact" />} />
            <Route path="/faq" element={<RedirectToLanguage targetPath="/faq" />} />
            <Route path="/search" element={<RedirectToLanguage targetPath="/search" />} />
            <Route path="/account" element={<RedirectToLanguage targetPath="/account" />} />
            <Route path="/cart" element={<RedirectToLanguage targetPath="/cart" />} />
            <Route path="/checkout" element={<RedirectToLanguage targetPath="/checkout" />} />
            <Route path="/vehicle/:id" element={<RedirectToLanguage targetPath="/vehicle/:id" />} />
            <Route path="/financing" element={<RedirectToLanguage targetPath="/financing" />} />
            
            <Route path="/warranty" element={<RedirectToLanguage targetPath="/warranty" />} />
            <Route path="/returns" element={<RedirectToLanguage targetPath="/returns" />} />
            <Route path="/terms" element={<RedirectToLanguage targetPath="/terms" />} />
            <Route path="/privacy" element={<RedirectToLanguage targetPath="/privacy" />} />
            <Route path="/cookies" element={<RedirectToLanguage targetPath="/cookies" />} />
            <Route path="/legal-notice" element={<RedirectToLanguage targetPath="/legal-notice" />} />
            <Route path="/admin" element={<RedirectToLanguage targetPath="/admin" />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </LanguageProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
