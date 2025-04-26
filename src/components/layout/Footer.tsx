
import { Link } from "react-router-dom";

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
              Votre partenaire de confiance pour des véhicules d'occasion premium et luxueux.
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
            <h4 className="text-lg font-bold mb-6">Liens Rapides</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/catalog" className="text-gray-300 hover:text-white transition-colors">
                  Catalogue de véhicules
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition-colors">
                  Nos services
                </Link>
              </li>
              <li>
                <Link to="/financing" className="text-gray-300 hover:text-white transition-colors">
                  Options de financement
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contactez-nous
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-bold mb-6">Service Client</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/delivery-tracking" className="text-gray-300 hover:text-white transition-colors">
                  Suivi de livraison
                </Link>
              </li>
              <li>
                <Link to="/warranty" className="text-gray-300 hover:text-white transition-colors">
                  Garanties
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-300 hover:text-white transition-colors">
                  Politique de retour
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white transition-colors">
                  Conditions générales
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-6">Restez Informé</h4>
            <p className="text-gray-300 mb-4">
              Inscrivez-vous à notre newsletter pour recevoir les dernières offres et actualités.
            </p>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Votre email"
                className="px-4 py-2 bg-white/10 border border-white/20 rounded focus:outline-none focus:ring-2 focus:ring-autop-red"
              />
              <button type="submit" className="btn-primary">
                S'inscrire
              </button>
            </form>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-white hover:text-autop-red transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-autop-red transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-autop-red transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-autop-red transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-youtube">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © {year} AUTO PBH. Tous droits réservés.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/terms" className="text-sm text-gray-400 hover:text-white">
              Conditions générales
            </Link>
            <Link to="/privacy" className="text-sm text-gray-400 hover:text-white">
              Politique de confidentialité
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
