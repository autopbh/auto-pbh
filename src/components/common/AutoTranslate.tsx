import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

const AutoTranslate = () => {
  const { currentLanguage } = useLanguage();

  useEffect(() => {
    // Ajouter les styles CSS pour masquer l'interface Google Translate
    const style = document.createElement('style');
    style.textContent = `
      /* Masquer complètement l'interface Google Translate */
      .goog-te-gadget {
        display: none !important;
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
      
      #google_translate_element {
        display: none !important;
      }
      
      /* Éviter les problèmes de layout */
      .skiptranslate {
        margin: 0 !important;
        padding: 0 !important;
      }
    `;
    
    if (!document.querySelector('#auto-translate-styles')) {
      style.id = 'auto-translate-styles';
      document.head.appendChild(style);
    }

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
            pageLanguage: 'fr', // langue source par défaut
            includedLanguages: 'fr,en,es,pt,de,it,nl,pl,fi,el',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
            multilanguagePage: true
          },
          'hidden_google_translate_element'
        );
      }
    };

    // Vérifier si le script est déjà chargé
    if (!document.querySelector('script[src*="translate.google.com"]')) {
      addScript();
    } else if (window.google && window.google.translate) {
      window.googleTranslateElementInit();
    }
  }, []);

  // Déclencher la traduction automatique basée sur la langue sélectionnée
  useEffect(() => {
    const translatePage = () => {
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
        
        // Si la langue n'est pas le français, déclencher la traduction
        if (targetLang && targetLang !== 'fr') {
          setTimeout(() => {
            try {
              // Méthode directe pour déclencher la traduction
              const translateElement = new window.google.translate.TranslateElement({
                pageLanguage: 'fr',
                includedLanguages: 'fr,en,es,pt,de,it,nl,pl,fi,el',
                layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false
              });

              // Déclencher la traduction programmatiquement
              window.google.translate.TranslateElement.prototype.translate('fr', targetLang);
            } catch (error) {
              console.log('Traduction Google en cours...');
            }
          }, 1500);
        } else if (targetLang === 'fr') {
          // Restaurer la version française originale
          setTimeout(() => {
            try {
              window.google.translate.TranslateElement.prototype.translate(currentLanguage, 'fr');
            } catch (error) {
              // Recharger la page pour revenir au français si nécessaire
              if (document.querySelector('.goog-te-combo')) {
                const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
                if (selectElement && selectElement.value !== 'fr') {
                  selectElement.value = 'fr';
                  selectElement.dispatchEvent(new Event('change'));
                }
              }
            }
          }, 500);
        }
      }
    };

    // Attendre que Google Translate soit chargé
    const checkGoogleTranslate = setInterval(() => {
      if (window.google && window.google.translate) {
        translatePage();
        clearInterval(checkGoogleTranslate);
      }
    }, 500);

    // Nettoyer l'interval après 10 secondes
    setTimeout(() => clearInterval(checkGoogleTranslate), 10000);

  }, [currentLanguage]);

  return (
    <>
      {/* Élément masqué pour Google Translate */}
      <div 
        id="hidden_google_translate_element" 
        style={{ 
          position: 'absolute',
          left: '-9999px',
          top: '-9999px',
          visibility: 'hidden',
          height: '1px',
          width: '1px',
          overflow: 'hidden'
        }}
      />
    </>
  );
};

export default AutoTranslate;