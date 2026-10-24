import { Ionicons } from "@expo/vector-icons";
import type { BottomTabBarProps } from "expo-router/js-tabs";
import { useEffect, useState } from "react";
import { type LayoutChangeEvent, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import { colors } from "@/theme";

const BAR_HEIGHT = 72;
const CIRCLE_SIZE = 56;

type IconName = keyof typeof Ionicons.glyphMap;

// One entry per tab route: label plus the outline icon (inactive) and filled icon (active).
const TABS: Record<string, { label: string; icon: IconName; activeIcon: IconName }> = {
  index: { label: "Home", icon: "home-outline", activeIcon: "home" },
  learn: { label: "Learn", icon: "book-outline", activeIcon: "book" },
  "ai-teacher": { label: "AI Teacher", icon: "happy-outline", activeIcon: "happy" },
  chat: { label: "Chat", icon: "chatbubble-outline", activeIcon: "chatbubble" },
  profile: { label: "Profile", icon: "person-outline", activeIcon: "person" },
};

// Floating tab bar. The selected tab sits in a purple circle (icon only) that slides between tabs;
// the other tabs show their icon and label. The slide is a plain linear timing animation (no spring bounce).
export function TabBar({ state, navigation, insets }: BottomTabBarProps) {
  const [rowWidth, setRowWidth] = useState(0);
  const tabWidth = rowWidth / state.routes.length;
  const circleX = useSharedValue(0);

  const getCircleX = (index: number, width: number) => index * width + (width - CIRCLE_SIZE) / 2;

  // Slide the circle to the selected tab.
  useEffect(() => {
    if (tabWidth > 0) {
      circleX.set(withTiming(getCircleX(state.index, tabWidth), { duration: 250, easing: Easing.linear }));
    }
  }, [state.index, tabWidth, circleX]);

  // On first measure the circle is placed directly, so it does not slide in from the left edge.
  const onRowLayout = (event: LayoutChangeEvent) => {
    const width = event.nativeEvent.layout.width;
    circleX.set(getCircleX(state.index, width / state.routes.length));
    setRowWidth(width);
  };

  const circleStyle = useAnimatedStyle(() => ({
    opacity: rowWidth > 0 ? 1 : 0,
    transform: [{ translateX: circleX.get() }],
  }));

  const onPress = (routeKey: string, routeName: string, isFocused: boolean) => {
    const event = navigation.emit({ type: "tabPress", target: routeKey, canPreventDefault: true });
    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(routeName);
    }
  };

  return (
    <View style={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: Math.max(insets.bottom, 12) }}>
      <View className="tab-bar" style={styles.bar}>
        <View style={styles.row} onLayout={onRowLayout}>
          <Animated.View style={[styles.circle, circleStyle]} />

          {state.routes.map((route, index) => {
            const tab = TABS[route.name];
            const isFocused = state.index === index;

            return (
              <TouchableOpacity
                key={route.key}
                className="tab-bar__item"
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityState={{ selected: isFocused }}
                accessibilityLabel={tab.label}
                onPress={() => onPress(route.key, route.name, isFocused)}
              >
                {isFocused ? (
                  <Ionicons name={tab.activeIcon} size={26} color={colors.neutral.background} />
                ) : (
                  <>
                    <Ionicons name={tab.icon} size={24} color={colors.neutral.textSecondary} />
                    <Text className="tab-bar__label">{tab.label}</Text>
                  </>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    ...Platform.select({
      ios: {
        shadowColor: "#0D132B",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 16,
      },
      default: { elevation: 8 },
    }),
  },
  row: {
    height: BAR_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    position: "absolute",
    top: (BAR_HEIGHT - CIRCLE_SIZE) / 2,
    left: 0,
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: colors.primary.deepPurple,
  },
});
