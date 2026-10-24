import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

import { colors } from "@/theme";

type PlanItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  title: string;
  subtitle: string;
  done: boolean;
};

// One row of today's plan: colored icon tile, title + subtitle, and a check (done) or empty circle (to do).
export function PlanItem({ icon, iconColor, title, subtitle, done }: PlanItemProps) {
  return (
    <View className="plan-item">
      <View className="plan-item__icon" style={{ backgroundColor: iconColor }}>
        <Ionicons name={icon} size={22} color={colors.neutral.background} />
      </View>

      <View className="ml-4 flex-1">
        <Text className="plan-item__title">{title}</Text>
        <Text className="plan-item__subtitle">{subtitle}</Text>
      </View>

      {done ? (
        <View className="h-6 w-6 items-center justify-center rounded-full bg-lingua-deep-purple">
          <Ionicons name="checkmark" size={15} color={colors.neutral.background} />
        </View>
      ) : (
        <View className="h-6 w-6 rounded-full border-2 border-[#9097AB]" />
      )}
    </View>
  );
}
