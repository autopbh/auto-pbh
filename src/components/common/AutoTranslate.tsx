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
      /* Masquer l'interface Google Translate mais garder la fonctionnalité */
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
      
      /* Masquer mais garder accessible pour le JS */
      #google_translate_element {
        position: fixed !important;
        top: -1000px !important;
        left: -1000px !important;
        width: 1px !important;
        height: 1px !important;
        opacity: 0 !important;
        pointer-events: none !important;
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
    const triggerTranslation = () => {
      if (!window.google || !window.google.translate) return;

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
      
      if (!targetLang) return;

      // Trouver le sélecteur Google Translate
      const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      
      if (selectElement) {
        // Changer la valeur et déclencher l'événement
        if (selectElement.value !== targetLang) {
          selectElement.value = targetLang;
          const event = new Event('change', { bubbles: true });
          selectElement.dispatchEvent(event);
        }
      }
    };

    // Attendre que l'élément soit disponible
    const waitForGoogleTranslate = () => {
      const checkElement = () => {
        const selectElement = document.querySelector('.goog-te-combo');
        if (selectElement && window.google && window.google.translate) {
          triggerTranslation();
        } else {
          setTimeout(checkElement, 500);
        }
      };
      checkElement();
    };

    // Délai pour laisser Google Translate s'initialiser
    setTimeout(waitForGoogleTranslate, 1000);

  }, [currentLanguage]);

  return (
    <>
      {/* Élément pour Google Translate - doit être visible pour fonctionner */}
      <div 
        id="hidden_google_translate_element"
      />
      
      {/* ID alternatif au cas où */}
      <div 
        id="google_translate_element"
      />
    </>
  );
};

export default AutoTranslate;