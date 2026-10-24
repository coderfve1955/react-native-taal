import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, type LayoutChangeEvent, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { LanguageCard } from "@/components/LanguageCard";
import { images } from "@/constants/images";
import { LANGUAGES } from "@/data/languages";
import { useLanguageStore } from "@/store/languageStore";
import { colors, fonts } from "@/theme";
import type { LanguageCode } from "@/types/learning";

// The earth image is square with transparent padding: the globe's flat bottom sits 17% above the
// bottom edge and the tallest tower starts 17% below the top edge.
const EARTH_PADDING = 0.17;

export default function LanguageSelection() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const savedLanguage = useLanguageStore((state) => state.selectedLanguage);
  const selectLanguage = useLanguageStore((state) => state.selectLanguage);
  // The highlighted card is local until the user confirms; only then is it saved in the store.
  const [selectedCode, setSelectedCode] = useState<LanguageCode>(savedLanguage ?? LANGUAGES[0].code);
  const [confirmed, setConfirmed] = useState(false);

  const [earthArea, setEarthArea] = useState({ width: 0, height: 0 });

  // Fit the earth in the space left under the button: full width when there is room, smaller when there is not.
  const earthSize = Math.min(earthArea.width, earthArea.height / (1 - 2 * EARTH_PADDING));

  const onEarthLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setEarthArea({ width, height });
  };

  // First-time users arrive here without a screen to go back to.
  const onBack = () => {
    if (router.canGoBack()) router.back();
  };

  // Saving the language opens the home route in the layout; go there once that has happened.
  useEffect(() => {
    if (confirmed && savedLanguage) {
      router.replace("/");
    }
  }, [confirmed, savedLanguage, router]);

  const onConfirm = () => {
    selectLanguage(selectedCode);
    setConfirmed(true);
  };

  const visibleLanguages = LANGUAGES.filter((language) =>
    language.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    // Bottom edge is left out so the earth illustration reaches the bottom of the screen.
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: colors.neutral.background }}>
      <View className="flex-1">
        <View className="px-6">
          <View className="h-12 flex-row items-center justify-center">
            <TouchableOpacity
              className="absolute left-0 h-10 w-10 justify-center"
              activeOpacity={0.7}
              onPress={onBack}
            >
              {/* Back chevron: two borders of a rotated square */}
              <View className="ml-1 h-3 w-3 -rotate-45 border-b-2 border-l-2 border-text-primary" />
            </TouchableOpacity>
            <Text className="typography--h4 text-[18px]">Choose a language</Text>
          </View>

          <View className="search-field mt-4">
            {/* Search icon: a ring with a short rotated handle */}
            <View className="h-[18px] w-[18px]">
              <View className="h-[14px] w-[14px] rounded-full border-2 border-text-secondary" />
              <View className="absolute bottom-0 right-0 h-[2px] w-[7px] rotate-45 rounded-full bg-text-secondary" />
            </View>
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search languages"
              placeholderTextColor={colors.neutral.textSecondary}
              autoCorrect={false}
              style={{
                flex: 1,
                marginLeft: 12,
                padding: 0,
                fontFamily: fonts.regular,
                fontSize: 16,
                color: colors.neutral.textPrimary,
              }}
            />
          </View>

          <Text className="typography--h4 mb-3 mt-6 text-[18px]">Popular</Text>

          <View className="gap-2">
            {visibleLanguages.map((language) => (
              <LanguageCard
                key={language.code}
                language={language}
                selected={language.code === selectedCode}
                onPress={() => setSelectedCode(language.code)}
              />
            ))}
          </View>

          <TouchableOpacity className="button--primary mt-5" activeOpacity={0.85} onPress={onConfirm}>
            <Text className="button__label">Confirm</Text>
          </TouchableOpacity>
        </View>

        {/* Remaining space under the button; the image is pulled down so the globe sits on the screen edge. */}
        <View className="flex-1 items-center justify-end overflow-hidden" pointerEvents="none" onLayout={onEarthLayout}>
          <Image
            source={images.earth}
            style={{ width: earthSize, height: earthSize, marginBottom: -earthSize * EARTH_PADDING }}
            resizeMode="contain"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
