
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { BookingProvider } from './contexts/BookingContext';
import './index.css';

createRoot(document.getElementById("root")!).render(
  <BookingProvider>
    <App />
  </BookingProvider>
);
