"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { DateRange } from "react-day-picker";

//============== TYPES============
type Range = DateRange;

interface ReservationContextType {
  range: Range;
  setRange: Dispatch<SetStateAction<Range>>;
  resetRange: () => void;
}

interface ReservationProviderParams {
  children: React.ReactNode;
}

//============= CONTEXT===========
const ReservationContext = createContext<ReservationContextType | undefined>(
  undefined,
);

const initialState = { from: undefined, to: undefined };

function ReservationProvider({ children }: ReservationProviderParams) {
  const [range, setRange] = useState<Range>(initialState);
  const resetRange = () => setRange(initialState);

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);

  if (context === undefined)
    throw new Error("Context was used outside provider");

  return context;
}

export { ReservationProvider, useReservation };
