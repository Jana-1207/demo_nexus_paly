"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { siteConfig } from "@/lib/site.config";
import { storage } from "@/lib/utils";

export type DemoBooking = {
  id: string;
  experienceId: string;
  experienceTitle: string;
  /** ISO yyyy-mm-dd */
  date: string;
  time: string;
  players: number;
  name: string;
  phone: string;
  email: string;
  unitPrice: number;
  total: number;
  createdAt: string;
};

type BookingContextValue = {
  isOpen: boolean;
  /** Experience pre-selected when the modal was opened, if any. */
  preselected: string | null;
  open: (experienceId?: string) => void;
  close: () => void;
  lastBooking: DemoBooking | null;
  saveBooking: (booking: DemoBooking) => void;
  clearBooking: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [preselected, setPreselected] = useState<string | null>(null);
  const [lastBooking, setLastBooking] = useState<DemoBooking | null>(null);

  useEffect(() => {
    setLastBooking(storage.get<DemoBooking | null>(siteConfig.booking.storageKey, null));
  }, []);

  const open = useCallback((experienceId?: string) => {
    setPreselected(experienceId ?? null);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const saveBooking = useCallback((booking: DemoBooking) => {
    setLastBooking(booking);
    storage.set(siteConfig.booking.storageKey, booking);
  }, []);

  const clearBooking = useCallback(() => {
    setLastBooking(null);
    storage.remove(siteConfig.booking.storageKey);
  }, []);

  const value = useMemo(
    () => ({ isOpen, preselected, open, close, lastBooking, saveBooking, clearBooking }),
    [isOpen, preselected, open, close, lastBooking, saveBooking, clearBooking]
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking(): BookingContextValue {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside BookingProvider");
  return ctx;
}

/** NP + two-digit day + two-digit month + 2 random digits, e.g. NP240923 style. */
export function makeBookingId(): string {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const rand = String(Math.floor(Math.random() * 90) + 10);
  return `${siteConfig.booking.idPrefix}${dd}${mm}${rand}`;
}
