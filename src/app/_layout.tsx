import "../../global.css";

import { ClerkProvider, useAuth } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { useLanguageStore } from "@/store/languageStore";
import { fontSources } from "@/theme";

SplashScreen.preventAutoHideAsync();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error("Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file");
}

// Signed-out users only reach onboarding + auth screens. Signed-in users reach the language selection,
// and the home screen only once a language is chosen.
// Expo Router redirects automatically when the session or language changes (sign out -> onboarding).
function RootNavigator() {
  const [fontsLoaded, fontError] = useFonts(fontSources);
  const { isLoaded, isSignedIn } = useAuth();
  const hasLanguage = useLanguageStore((state) => state.selectedLanguage !== null);
  const languageHydrated = useLanguageStore((state) => state.hydrated);

  const ready = (fontsLoaded || fontError) && isLoaded && languageHydrated;

  // Keep the splash screen up until fonts are loaded, Clerk has restored the session and the saved language is read.
  useEffect(() => {
    if (ready) {
      SplashScreen.hideAsync();
    }
  }, [ready]);

  if (!ready) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!isSignedIn}>
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(auth)/sign-up" />
        <Stack.Screen name="(auth)/sign-in" />
      </Stack.Protected>
      <Stack.Protected guard={!!isSignedIn}>
        {/* Listed first so a signed-in user without a language lands here instead of "/" */}
        <Stack.Screen name="language-selection" />
        <Stack.Protected guard={hasLanguage}>
          <Stack.Screen name="(tabs)" />
        </Stack.Protected>
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <RootNavigator />
    </ClerkProvider>
  );
}
