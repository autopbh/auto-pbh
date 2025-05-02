
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

try {
  const rootElement = document.getElementById("root");
  if (!rootElement) throw new Error("Failed to find the root element");
  createRoot(rootElement).render(<App />);
} catch (error) {
  console.error("Error rendering the application:", error);
  // Try to display an error message in the DOM if possible
  const errorElement = document.createElement('div');
  errorElement.style.padding = '20px';
  errorElement.style.color = 'red';
  errorElement.innerHTML = `<h2>Application Error</h2><p>${error instanceof Error ? error.message : 'Unknown error'}</p>`;
  document.body.appendChild(errorElement);
}
