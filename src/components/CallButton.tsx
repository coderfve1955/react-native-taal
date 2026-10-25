import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { colors } from "@/theme";

type CallButtonProps = {
  // Not needed for the end button, which always shows the hang-up icon.
  icon?: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  // Shows the icon faded, e.g. while subtitles are off.
  off?: boolean;
  // The red hang-up button.
  end?: boolean;
};

// Round control with a label underneath, used in the audio lesson (mic, subtitles, end call).
export function CallButton({ icon, label, onPress, off = false, end = false }: CallButtonProps) {
  return (
    <TouchableOpacity className="call-button" activeOpacity={0.8} accessibilityRole="button" accessibilityLabel={label} onPress={onPress}>
      <View className={`call-button__circle ${end ? "call-button__circle--end" : ""}`} style={styles.circle}>
        {end || !icon ? (
          <MaterialCommunityIcons name="phone-hangup" size={30} color={colors.neutral.background} />
        ) : (
          <Ionicons name={icon} size={28} color={colors.neutral.textPrimary} style={{ opacity: off ? 0.35 : 1 }} />
        )}
      </View>
      <Text className="call-button__label">{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  circle: {
    ...Platform.select({
      ios: {
        shadowColor: "#0D132B",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
      },
      default: { elevation: 4 },
    }),
  },
});
