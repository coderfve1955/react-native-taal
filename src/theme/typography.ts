import { fonts } from "./fonts";

// Design tokens: type scale from the design system.
// Keep in sync with the `typography--*` utilities in global.css.
export const typography = {
  h1: { fontFamily: fonts.bold, fontSize: 32, lineHeight: 1.2 },
  h2: { fontFamily: fonts.semiBold, fontSize: 24, lineHeight: 1.3 },
  h3: { fontFamily: fonts.semiBold, fontSize: 20, lineHeight: 1.3 },
  h4: { fontFamily: fonts.medium, fontSize: 16, lineHeight: 1.4 },
  bodyLarge: { fontFamily: fonts.regular, fontSize: 16, lineHeight: 1.6 },
  bodyMedium: { fontFamily: fonts.regular, fontSize: 14, lineHeight: 1.6 },
  bodySmall: { fontFamily: fonts.regular, fontSize: 13, lineHeight: 1.6 },
  caption: { fontFamily: fonts.regular, fontSize: 11, lineHeight: 1.4 },
} as const;
