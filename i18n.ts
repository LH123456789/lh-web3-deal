import { createI18nClient } from "next-intl";

export const i18n = createI18nClient({
  locales: ["zh", "en"],
  defaultLocale: "zh",
});