"use client";

import { useEffect, useState } from "react";
import { NextIntlClientProvider, useMessages } from "next-intl";
import zhMessages from "../messages/zh.json";
import enMessages from "../messages/en.json";

const THEME_KEY = "lh-deal-theme";
const LANGUAGE_KEY = "lh-deal-language";

const messages: Record<string, typeof zhMessages> = {
  zh: zhMessages,
  en: enMessages,
};

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(LANGUAGE_KEY) || "zh";
    }
    return "zh";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem(THEME_KEY);
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === THEME_KEY) {
        if (e.newValue === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      } else if (e.key === LANGUAGE_KEY) {
        if (e.newValue) {
          setLocale(e.newValue);
        }
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <NextIntlClientProvider locale={locale} messages={messages[locale]}>
      {children}
    </NextIntlClientProvider>
  );
}