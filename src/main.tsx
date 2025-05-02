
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

// Make sure script loading is complete before rendering
document.addEventListener('DOMContentLoaded', () => {
  try {
    const rootElement = document.getElementById("root");
    if (!rootElement) throw new Error("Failed to find the root element");
    createRoot(rootElement).render(<App />);
  } catch (error) {
    handleError(error);
  }
});

// Add global error handler
window.addEventListener('error', (event) => {
  if (event.error && event.error.message.includes('Unexpected end of script')) {
    console.error('Script loading error detected:', event.error);
    
    // Force reload the page to attempt recovery
    // Add a timestamp to bypass cache
    if (!window.location.href.includes('cache_bust')) {
      window.location.href = window.location.href + 
        (window.location.href.includes('?') ? '&' : '?') + 
        'cache_bust=' + Date.now();
    }
  }
});
