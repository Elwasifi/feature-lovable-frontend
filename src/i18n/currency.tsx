import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

export type Currency = {
  code: string;
  symbol: string;
  label: string;
  flag: string;
  /** Indicative rate: 1 USD = rate <currency>. Replace with /api/rates when available. */
  perUsd: number;
};

export const CURRENCIES: Currency[] = [
  { code: "USD", symbol: "$", label: "US Dollar", flag: "🇺🇸", perUsd: 1 },
  { code: "EGP", symbol: "E£", label: "Egyptian Pound", flag: "🇪🇬", perUsd: 48.2 },
  { code: "EUR", symbol: "€", label: "Euro", flag: "🇪🇺", perUsd: 0.92 },
  { code: "GBP", symbol: "£", label: "British Pound", flag: "🇬🇧", perUsd: 0.78 },
  { code: "SAR", symbol: "﷼", label: "Saudi Riyal", flag: "🇸🇦", perUsd: 3.75 },
  { code: "AED", symbol: "د.إ", label: "UAE Dirham", flag: "🇦🇪", perUsd: 3.67 },
  { code: "KWD", symbol: "د.ك", label: "Kuwaiti Dinar", flag: "🇰🇼", perUsd: 0.31 },
  { code: "CNY", symbol: "¥", label: "Chinese Yuan", flag: "🇨🇳", perUsd: 7.15 },
  { code: "RUB", symbol: "₽", label: "Russian Ruble", flag: "🇷🇺", perUsd: 92 },
  { code: "JPY", symbol: "¥", label: "Japanese Yen", flag: "🇯🇵", perUsd: 152 },
];

const STORAGE_KEY = "egypt-one:currency";

type CurrencyValue = {
  currency: Currency;
  setCurrency: (code: string) => void;
  /** Convert a USD amount into the selected currency and format it. */
  format: (usd: number) => string;
};

const CurrencyContext = createContext<CurrencyValue | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [code, setCode] = useState("USD");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && CURRENCIES.some((c) => c.code === stored)) setCode(stored);
  }, []);

  const setCurrency = useCallback((next: string) => {
    setCode(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable */
    }
  }, []);

  const currency = CURRENCIES.find((c) => c.code === code) ?? CURRENCIES[0]!;

  const value = useMemo<CurrencyValue>(
    () => ({
      currency,
      setCurrency,
      format: (usd: number) => {
        const amount = usd * currency.perUsd;
        return `${currency.symbol}${amount.toLocaleString(undefined, {
          maximumFractionDigits: amount >= 100 ? 0 : 2,
        })}`;
      },
    }),
    [currency, setCurrency],
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency(): CurrencyValue {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used inside <CurrencyProvider>");
  return ctx;
}
