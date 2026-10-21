import { Link } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/theme";

// Temporary start screen with a link to the onboarding screen.
export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.neutral.background }}>
      <View className="flex-1 items-center justify-center gap-3">
        <Text className="typography--h2 text-lingua-deep-purple">Taal Buddy</Text>
        <Link href="/onboarding" asChild>
          <Text className="typography--body-medium text-lingua-deep-purple underline">
            Open Onboarding
          </Text>
        </Link>
      </View>
    </SafeAreaView>
  );
}
