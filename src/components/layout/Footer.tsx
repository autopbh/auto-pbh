
import { Link } from "react-router-dom";
import { Facebook } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const year = new Date().getFullYear();
  const { t } = useLanguage();

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
              {t("footer.description")}
            </p>
            <div className="text-gray-300">
              <p>{t("footer.address")}</p>
              <p>{t("footer.city")}</p>
              <p>{t("footer.country")}</p>
              <p className="mt-4">+351 961 196 405</p>
              <p>pbhauto@gmail.com</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">{t("footer.mainServices")}</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/catalog" className="text-gray-300 hover:text-white transition-colors">
                  {t("footer.collection")}
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition-colors">
                  {t("footer.services")}
                </Link>
              </li>
              <li>
                <Link to="/financing" className="text-gray-300 hover:text-white transition-colors">
                  {t("footer.financing")}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-white transition-colors">
                  {t("footer.faq")}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  {t("footer.contactPrivilege")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-bold mb-6">{t("footer.customerService")}</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/warranty" className="text-gray-300 hover:text-white transition-colors">
                  {t("footer.warranty")}
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-300 hover:text-white transition-colors">
                  {t("footer.returns")}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white transition-colors">
                  {t("footer.terms")}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  {t("footer.privacy")}
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-300 hover:text-white transition-colors">
                  {t("footer.cookies")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-6">{t("footer.stayInformed")}</h4>
            <p className="text-gray-300 mb-4">
              {t("footer.newsletter")}
            </p>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder={t("footer.emailPlaceholder")}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded focus:outline-none focus:ring-2 focus:ring-autop-red"
              />
              <button type="submit" className="btn-primary">
                {t("footer.joinClub")}
              </button>
            </form>
            <div className="mt-6 flex space-x-4">
              <a href="https://www.facebook.com/share/1Eth6H4Bvg/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-white hover:text-autop-red transition-colors">
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
            {t("footer.copyright").replace("{year}", year.toString())}
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/legal-notice" className="text-sm text-gray-400 hover:text-white">
              {t("footer.legal")}
            </Link>
            <Link to="/privacy" className="text-sm text-gray-400 hover:text-white">
              {t("footer.dataProtection")}
            </Link>
            <Link to="/cookies" className="text-sm text-gray-400 hover:text-white">
              {t("footer.cookies")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
