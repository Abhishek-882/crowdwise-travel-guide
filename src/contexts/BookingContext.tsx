
import React, { createContext, useContext, useState } from 'react';

interface BookingDetails {
  vehicleType: string;
  vehicleClass: string;
  hotelIncluded: boolean;
  hotelType?: string;
  guidePerson: boolean;
  ticketType: 'normal' | 'vip' | null;
  totalAmount: number;
}

interface BookingContextType {
  bookingDetails: BookingDetails;
  updateBooking: (details: Partial<BookingDetails>) => void;
  resetBooking: () => void;
}

const initialBookingDetails: BookingDetails = {
  vehicleType: '',
  vehicleClass: 'standard',
  hotelIncluded: false,
  guidePerson: false,
  ticketType: null,
  totalAmount: 0
};

const BookingContext = createContext<BookingContextType | null>(null);

export const BookingProvider = ({ children }: { children: React.ReactNode }) => {
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>(initialBookingDetails);

  const updateBooking = (details: Partial<BookingDetails>) => {
    setBookingDetails(prev => ({ ...prev, ...details }));
  };

  const resetBooking = () => {
    setBookingDetails(initialBookingDetails);
  };

  return (
    <BookingContext.Provider value={{ bookingDetails, updateBooking, resetBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
