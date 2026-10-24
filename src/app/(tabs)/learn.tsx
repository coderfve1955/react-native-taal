import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/theme";

// Placeholder until this tab is built.
export default function LearnScreen() {
  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.neutral.background }}>
      <Text className="typography--h2">Learn</Text>
    </SafeAreaView>
  );
}
