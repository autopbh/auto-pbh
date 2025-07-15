import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

const GoogleTranslate = () => {
  const { currentLanguage } = useLanguage();

  useEffect(() => {
    // Charger le script Google Translate
    const addScript = () => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.body.appendChild(script);
    };

    // Fonction d'initialisation
    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate && window.google.translate.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'fr', // langue source
            includedLanguages: 'fr,en,es,pt,de,it,nl,pl,fi,el', // langues supportées
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
            multilanguagePage: true
          },
          'google_translate_element'
        );
      }
    };

    // Vérifier si le script est déjà chargé
    if (!document.querySelector('script[src*="translate.google.com"]')) {
      addScript();
    } else if (window.google && window.google.translate) {
      window.googleTranslateElementInit();
    }

    return () => {
      // Cleanup si nécessaire
      const translateElement = document.getElementById('google_translate_element');
      if (translateElement) {
        translateElement.innerHTML = '';
      }
    };
  }, []);

  // Synchroniser avec la langue sélectionnée
  useEffect(() => {
    // Ajouter les styles CSS personnalisés
    const style = document.createElement('style');
    style.textContent = `
      .google-translate-widget .goog-te-gadget {
        display: none !important;
      }
      
      .google-translate-widget .goog-te-combo {
        background: transparent !important;
        border: 1px solid rgba(255, 255, 255, 0.3) !important;
        border-radius: 6px !important;
        padding: 4px 8px !important;
        font-size: 12px !important;
        color: inherit !important;
        max-width: 120px !important;
      }
      
      .goog-te-banner-frame.skiptranslate {
        display: none !important;
      }
      
      body {
        top: 0 !important;
      }
      
      .goog-te-balloon-frame {
        display: none !important;
      }
      
      .goog-te-ftab {
        display: none !important;
      }
      
      .google-translate-widget iframe {
        height: 20px !important;
        border: none !important;
      }
    `;
    
    if (!document.querySelector('#google-translate-styles')) {
      style.id = 'google-translate-styles';
      document.head.appendChild(style);
    }
  }, []);

  // Synchroniser avec la langue sélectionnée  
  useEffect(() => {
    if (window.google && window.google.translate) {
      const langMapping: { [key: string]: string } = {
        'fr': 'fr',
        'en': 'en', 
        'es': 'es',
        'pt': 'pt',
        'de': 'de',
        'it': 'it',
        'nl': 'nl',
        'pl': 'pl',
        'fi': 'fi',
        'el': 'el'
      };

      const targetLang = langMapping[currentLanguage];
      if (targetLang && targetLang !== 'fr') {
        // Déclencher la traduction automatique vers la langue sélectionnée
        setTimeout(() => {
          const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
          if (selectElement) {
            selectElement.value = targetLang;
            selectElement.dispatchEvent(new Event('change'));
          }
        }, 1000);
      }
    }
  }, [currentLanguage]);

  return (
    <div className="flex items-center">
      {/* Conteneur pour le widget Google Translate */}
      <div 
        id="google_translate_element" 
        className="google-translate-widget"
        style={{ 
          transform: 'scale(0.8)', 
          transformOrigin: 'left center',
          opacity: 0.7 
        }}
      />
    </div>
  );
};

export default GoogleTranslate;