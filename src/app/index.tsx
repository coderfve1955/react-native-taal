import { useAuth } from "@clerk/expo";
import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/theme";

// Temporary home screen: shows the user is signed in and lets you sign out to test the auth flow again.
export default function Index() {
  const { signOut } = useAuth();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.neutral.background }}>
      <View className="flex-1 items-center justify-center gap-3">
        <Text className="typography--h2 text-lingua-deep-purple">Taal Buddy</Text>
        <Link href="/language-selection" asChild>
          <TouchableOpacity activeOpacity={0.7}>
            <Text className="typography--body-medium text-lingua-deep-purple underline">Choose a language</Text>
          </TouchableOpacity>
        </Link>
        <TouchableOpacity activeOpacity={0.7} onPress={() => signOut()}>
          <Text className="typography--body-medium text-lingua-deep-purple underline">Sign out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
