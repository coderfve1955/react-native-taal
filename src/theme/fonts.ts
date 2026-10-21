// Poppins font files, one per weight (React Native can't switch weights inside one family).
// The keys of `fontSources` are the family names used by the `--font-poppins*` variables in global.css.
export const fonts = {
  regular: "Poppins-Regular",
  medium: "Poppins-Medium",
  semiBold: "Poppins-SemiBold",
  bold: "Poppins-Bold",
} as const;

export const fontSources = {
  [fonts.regular]: require("@/assets/fonts/Poppins-Regular.ttf"),
  [fonts.medium]: require("@/assets/fonts/Poppins-Medium.ttf"),
  [fonts.semiBold]: require("@/assets/fonts/Poppins-SemiBold.ttf"),
  [fonts.bold]: require("@/assets/fonts/Poppins-Bold.ttf"),
};
