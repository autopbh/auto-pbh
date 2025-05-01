
import { Link } from "react-router-dom";
import { Facebook } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-autop-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <img
              src="/lovable-uploads/1bb4ee3a-2a2a-405c-855f-32b060970cb1.png"
              alt="AUTO PBH"
              className="h-12 mb-6"
            />
            <p className="text-gray-300 mb-4">
              AUTO PBH - L'excellence automobile à votre service. Découvrez notre sélection exclusive de véhicules premium et profitez d'une expérience d'achat personnalisée.
            </p>
            <div className="text-gray-300">
              <p>Autolettestraat 10,</p>
              <p>3063 NP Rotterdam,</p>
              <p>Pays-Bas</p>
              <p className="mt-4">+351 961 196 405</p>
              <p>pbhauto@gmail.com</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Services Principaux</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/catalog" className="text-gray-300 hover:text-white transition-colors">
                  Notre Collection Premium
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition-colors">
                  Services d'Exception
                </Link>
              </li>
              <li>
                <Link to="/financing" className="text-gray-300 hover:text-white transition-colors">
                  Solutions de Financement Personnalisées
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-white transition-colors">
                  Questions Fréquentes
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact Privilégié
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-bold mb-6">Service Client Premium</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/delivery-tracking" className="text-gray-300 hover:text-white transition-colors">
                  Suivi de Livraison Personnalisé
                </Link>
              </li>
              <li>
                <Link to="/warranty" className="text-gray-300 hover:text-white transition-colors">
                  Garanties Premium
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-300 hover:text-white transition-colors">
                  Politique de Satisfaction
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white transition-colors">
                  Conditions de Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  Confidentialité
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-300 hover:text-white transition-colors">
                  Gestion des Cookies
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-6">Restez Informé</h4>
            <p className="text-gray-300 mb-4">
              Abonnez-vous à notre newsletter exclusive pour recevoir en avant-première nos dernières acquisitions et offres privilégiées.
            </p>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Votre email"
                className="px-4 py-2 bg-white/10 border border-white/20 rounded focus:outline-none focus:ring-2 focus:ring-autop-red"
              />
              <button type="submit" className="btn-primary">
                Rejoindre le Club AUTO PBH
              </button>
            </form>
            <div className="mt-6 flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=100077014066042" target="_blank" rel="noopener noreferrer" className="text-white hover:text-autop-red transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://wa.me/+351961196405" target="_blank" rel="noopener noreferrer" className="text-white hover:text-autop-red transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                  <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                  <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © {year} AUTO PBH. L'Excellence Automobile.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/legal-notice" className="text-sm text-gray-400 hover:text-white">
              Mentions Légales
            </Link>
            <Link to="/privacy" className="text-sm text-gray-400 hover:text-white">
              Protection des Données
            </Link>
            <Link to="/cookies" className="text-sm text-gray-400 hover:text-white">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
