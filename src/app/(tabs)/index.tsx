import { useAuth } from "@clerk/expo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { LANGUAGES } from "@/data/languages";
import { useLanguageStore } from "@/store/languageStore";
import { colors } from "@/theme";

// Temporary home screen: shows the user is signed in and lets you sign out or reset storage to test the flows again.
export default function Index() {
  const { signOut } = useAuth();
  const selectedCode = useLanguageStore((state) => state.selectedLanguage);
  const language = LANGUAGES.find((item) => item.code === selectedCode);

  // Wipes everything saved on the device and the in-memory language, so the route guard sends you back to language selection.
  const clearStorage = async () => {
    await AsyncStorage.clear();
    useLanguageStore.setState({ selectedLanguage: null });
  };

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: colors.neutral.background }}>
      <View className="flex-1 items-center justify-center gap-3">
        <Text className="typography--h2 text-lingua-deep-purple">Taal Buddy</Text>
        {language && (
          <View className="items-center gap-1">
            <Image source={{ uri: language.flag }} className="h-16 w-16 rounded-full border border-[#eef0f6] bg-surface" resizeMode="cover" />
            <Text className="typography--h4">{language.name}</Text>
            <Text className="typography--body-small text-text-secondary">{language.nativeName}</Text>
          </View>
        )}
        <Link href="/language-selection" asChild>
          <TouchableOpacity activeOpacity={0.7}>
            <Text className="typography--body-medium text-lingua-deep-purple underline">Choose a language</Text>
          </TouchableOpacity>
        </Link>
        <TouchableOpacity activeOpacity={0.7} onPress={clearStorage}>
          <Text className="typography--body-medium text-lingua-deep-purple underline">Clear storage</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} onPress={() => signOut()}>
          <Text className="typography--body-medium text-lingua-deep-purple underline">Sign out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
