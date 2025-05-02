
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Configuration pour les tentatives de rendu en cas d'échec
const maxRetries = 3;
const retryDelay = 1000;
let retryCount = 0;

// Fonction principale de rendu de l'application
const renderApp = () => {
  const rootEl = document.getElementById('root');
  
  if (!rootEl) {
    console.error("Élément racine introuvable");
    return;
  }
  
  try {
    const root = createRoot(rootEl);
    root.render(<App />);
    console.log("Application rendue avec succès");
  } catch (error) {
    console.error("Erreur lors du rendu de l'application:", error);
    
    // Afficher un message d'erreur dans l'interface utilisateur
    const errorMessage = document.createElement('div');
    errorMessage.style.padding = '20px';
    errorMessage.style.color = 'red';
    errorMessage.style.textAlign = 'center';
    errorMessage.innerHTML = `
      <h2>Erreur de chargement</h2>
      <p>Une erreur s'est produite lors du chargement de l'application.</p>
      <button onclick="window.location.reload(true)" 
              style="padding: 10px 20px; background: #333; color: white; border: none; cursor: pointer; margin-top: 10px; border-radius: 4px;">
        Rafraîchir la page
      </button>
    `;
    
    // Si nous n'avons pas dépassé le nombre maximum de tentatives, réessayons
    if (retryCount < maxRetries) {
      retryCount++;
      console.log(`Tentative de rendu ${retryCount} sur ${maxRetries}...`);
      setTimeout(renderApp, retryDelay);
    } else {
      // Si nous avons atteint le maximum de tentatives, afficher l'erreur
      rootEl.innerHTML = '';
      rootEl.appendChild(errorMessage);
    }
  }
};

// Fonction pour vider le cache de manière forcée
const clearCache = () => {
  if ('caches' in window) {
    caches.keys().then(names => {
      names.forEach(name => {
        caches.delete(name);
      });
    });
  }
};

// Gestionnaire d'erreurs global pour détecter les problèmes de scripts
window.addEventListener('error', (event) => {
  // Vérifier si l'erreur concerne un script Vite
  if (event.filename && (
      event.filename.includes('.vite/deps/') || 
      event.message === 'Unexpected end of script'
    )) {
    console.error('Erreur de chargement de script détectée:', event);
    
    // Si c'est la première fois que l'erreur se produit, essayer de recharger la page
    if (!sessionStorage.getItem('scriptErrorRetry')) {
      sessionStorage.setItem('scriptErrorRetry', '1');
      clearCache();
      console.log('Tentative de récupération: rechargement de la page...');
      window.location.reload(true);
    } 
    // Si l'erreur persiste après rechargement, essayer un dernier rechargement en ajoutant 
    // un paramètre pour éviter le cache
    else if (sessionStorage.getItem('scriptErrorRetry') === '1') {
      sessionStorage.setItem('scriptErrorRetry', '2');
      console.log('Tentative de récupération finale: rechargement avec contournement du cache...');
      
      const cacheBuster = Date.now();
      if (!window.location.search.includes('no_cache')) {
        window.location.href = window.location.pathname + 
          (window.location.search ? window.location.search + '&' : '?') + 
          'no_cache=' + cacheBuster;
      }
    }
  }
});

// Démarrer le rendu une fois que le DOM est prêt
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  renderApp();
}
