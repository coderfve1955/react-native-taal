import { useAuth } from "@clerk/expo";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/theme";

// Placeholder profile until this tab is built. For now it only offers sign out.
export default function ProfileScreen() {
  const { signOut } = useAuth();

  // The route guards in the root layout send a signed-out user back to onboarding.
  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: colors.neutral.background }}>
      <View className="flex-1 items-center justify-center px-7">
        <Text className="typography--h2">Profile</Text>
      </View>
      <View className="px-7 pb-4">
        <TouchableOpacity className="button--primary" activeOpacity={0.8} accessibilityRole="button" onPress={() => signOut()}>
          <Text className="button__label">Sign out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
