
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Function to handle script loading errors
const handleError = (error) => {
  console.error("Error rendering the application:", error);
  
  // Try to display an error message in the DOM if possible
  const rootElement = document.getElementById("root");
  if (rootElement) {
    const errorElement = document.createElement('div');
    errorElement.style.padding = '20px';
    errorElement.style.color = 'red';
    errorElement.innerHTML = `<h2>Application Error</h2><p>${error instanceof Error ? error.message : 'Unknown error'}</p>`;
    rootElement.innerHTML = '';
    rootElement.appendChild(errorElement);
  }
};

// Create a retry mechanism for script loading issues
let retryCount = 0;
const maxRetries = 3;
const retryDelay = 1500;

function attemptRender() {
  try {
    const rootElement = document.getElementById("root");
    if (!rootElement) throw new Error("Failed to find the root element");
    createRoot(rootElement).render(<App />);
    console.log("Application rendered successfully");
  } catch (error) {
    handleError(error);
    
    // Retry logic for recoverable errors
    if (retryCount < maxRetries) {
      console.log(`Retrying render attempt ${retryCount + 1} of ${maxRetries}...`);
      retryCount++;
      setTimeout(attemptRender, retryDelay);
    } else {
      console.error("Maximum retry attempts reached. Please refresh the page.");
    }
  }
}

// Make sure script loading is complete before rendering
if (document.readyState === "loading") {
  document.addEventListener('DOMContentLoaded', attemptRender);
} else {
  // DOM already loaded, try rendering immediately
  attemptRender();
}

// Add enhanced global error handler
window.addEventListener('error', (event) => {
  // Check for script loading errors specifically
  if (event.error && 
     (event.error.message.includes('Unexpected end of script') || 
      event.filename.includes('.vite/deps/') || 
      event.error.message.includes('Failed to fetch dynamically imported module'))) {
    
    console.error('Script loading error detected:', event.error);
    
    // Force reload the page to attempt recovery with cache busting
    if (!window.location.href.includes('cache_bust')) {
      const cacheBuster = Date.now();
      console.log(`Attempting recovery with cache busting: ${cacheBuster}`);
      const separator = window.location.href.includes('?') ? '&' : '?';
      window.location.href = `${window.location.href}${separator}cache_bust=${cacheBuster}`;
    }
  }
});
