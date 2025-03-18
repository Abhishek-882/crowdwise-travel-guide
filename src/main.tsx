
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { BookingProvider } from './contexts/BookingContext';
import './index.css';

// Wrap with StrictMode to help catch issues early
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

createRoot(rootElement).render(
  <BookingProvider>
    <App />
  </BookingProvider>
);
