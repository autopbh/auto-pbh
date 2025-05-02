
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Maximum number of retry attempts
const MAX_RETRIES = 3;
let retryCount = 0;

/**
 * Attempts to render the React application
 * Will retry up to MAX_RETRIES times in case of errors
 */
function renderApp() {
  try {
    const rootElement = document.getElementById("root");
    if (!rootElement) throw new Error("Failed to find the root element");
    
    // Create and render the React root
    createRoot(rootElement).render(<App />);
    
    // Clear any previous error messages if rendering succeeds
    const errorContainer = document.getElementById("error-container");
    if (errorContainer) {
      errorContainer.style.display = "none";
    }
    
    // Hide loading indicator when app loads successfully
    const loadingIndicator = document.getElementById("loading-indicator");
    if (loadingIndicator) {
      loadingIndicator.style.display = "none";
    }
    
    console.log("Application rendered successfully");
  } catch (error) {
    console.error("Error rendering the application:", error);
    
    // Try to display an error message in the DOM
    showErrorMessage(error);
    
    // Attempt to retry rendering if under the maximum retry count
    if (retryCount < MAX_RETRIES) {
      retryCount++;
      console.log(`Retrying render attempt ${retryCount}/${MAX_RETRIES}...`);
      
      // Wait a bit before retrying to allow resources to potentially load
      setTimeout(renderApp, 1000);
    }
  }
}

/**
 * Displays an error message in the DOM
 */
function showErrorMessage(error: unknown) {
  // Try to find an existing error container or create one
  let errorContainer = document.getElementById("error-container");
  
  if (!errorContainer) {
    errorContainer = document.createElement('div');
    errorContainer.id = "error-container";
    errorContainer.style.position = "fixed";
    errorContainer.style.top = "0";
    errorContainer.style.left = "0";
    errorContainer.style.width = "100%";
    errorContainer.style.height = "100%";
    errorContainer.style.backgroundColor = "white";
    errorContainer.style.zIndex = "9999";
    errorContainer.style.display = "flex";
    errorContainer.style.flexDirection = "column";
    errorContainer.style.alignItems = "center";
    errorContainer.style.justifyContent = "center";
    errorContainer.style.padding = "20px";
    errorContainer.style.textAlign = "center";
    document.body.appendChild(errorContainer);
  } else {
    errorContainer.style.display = "flex";
  }
  
  errorContainer.innerHTML = `
    <h2 style="color: #e63946; margin-bottom: 20px;">Erreur de chargement</h2>
    <p>Nous rencontrons un problème pour charger l'application.</p>
    <p style="margin-bottom: 10px;">Le problème peut être lié au chargement des dépendances.</p>
    <p style="margin-bottom: 30px; font-family: monospace; background: #f8f8f8; padding: 10px; border-radius: 4px; max-width: 80%; overflow-wrap: break-word;">
      ${error instanceof Error ? error.message : 'Erreur inconnue'}
    </p>
    <button id="refresh-button" style="background-color: #e63946; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; font-weight: bold;">
      Rafraîchir la page
    </button>
    <button id="clear-cache-button" style="margin-top: 10px; background-color: #333; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer;">
      Réinitialiser et rafraîchir
    </button>
  `;
  
  // Add click handler to the refresh button
  const refreshButton = document.getElementById("refresh-button");
  if (refreshButton) {
    refreshButton.addEventListener("click", () => {
      window.location.reload();
    });
  }
  
  // Add click handler to clear cache and reload
  const clearCacheButton = document.getElementById("clear-cache-button");
  if (clearCacheButton) {
    clearCacheButton.addEventListener("click", () => {
      // Clear localStorage cache
      localStorage.clear();
      
      // Attempt to clear browser cache through Service Worker
      if ('caches' in window) {
        caches.keys().then(names => {
          names.forEach(name => {
            caches.delete(name);
          });
        });
      }
      
      // Force reload without cache
      window.location.href = window.location.href + "?nocache=" + Date.now();
    });
  }
}

// Add global error handler for uncaught errors
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
  showErrorMessage(event.error);
  event.preventDefault();
});

// Add global error handler for unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  showErrorMessage(event.reason);
  event.preventDefault();
});

// Start rendering the app
renderApp();
