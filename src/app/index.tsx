import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";
import { colors } from "@/theme";

const typeScale = [
  { name: "H1", usage: "Page / Screen Title", className: "typography--h1" },
  { name: "H2", usage: "Section Title", className: "typography--h2" },
  { name: "H3", usage: "Card / Module Title", className: "typography--h3" },
  { name: "H4", usage: "Subheading", className: "typography--h4" },
  { name: "Body Large", usage: "Important content", className: "typography--body-large" },
  { name: "Body Medium", usage: "Body text", className: "typography--body-medium" },
  { name: "Body Small", usage: "Supporting text", className: "typography--body-small" },
  { name: "Caption", usage: "Labels, meta text", className: "typography--caption" },
];

const colorGroups = [
  {
    title: "Primary",
    swatches: [
      { name: "Lingua Purple", hex: colors.primary.purple, className: "bg-lingua-purple" },
      { name: "Lingua Deep Purple", hex: colors.primary.deepPurple, className: "bg-lingua-deep-purple" },
      { name: "Lingua Blue", hex: colors.primary.blue, className: "bg-lingua-blue" },
      { name: "Lingua Green", hex: colors.primary.green, className: "bg-lingua-green" },
    ],
  },
  {
    title: "Semantic",
    swatches: [
      { name: "Success", hex: colors.semantic.success, className: "bg-success" },
      { name: "Warning", hex: colors.semantic.warning, className: "bg-warning" },
      { name: "Streak", hex: colors.semantic.streak, className: "bg-streak" },
      { name: "Error", hex: colors.semantic.error, className: "bg-error" },
      { name: "Info", hex: colors.semantic.info, className: "bg-info" },
    ],
  },
  {
    title: "Neutrals",
    swatches: [
      { name: "Text / Primary", hex: colors.neutral.textPrimary, className: "bg-text-primary" },
      { name: "Text / Secondary", hex: colors.neutral.textSecondary, className: "bg-text-secondary" },
      { name: "Border", hex: colors.neutral.border, className: "bg-border" },
      { name: "Surface", hex: colors.neutral.surface, className: "bg-surface" },
      { name: "Background", hex: colors.neutral.background, className: "bg-background border border-border" },
    ],
  },
];

// Temporary design-system preview. Replaced when the onboarding screen is built.
export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.neutral.surface }}>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        <View className="card items-center">
          <Image source={images.mascotLogo} className="h-32 w-32" resizeMode="contain" />
          <Text className="typography--h1 text-lingua-purple">lingua</Text>
        </View>

        <View className="card gap-6">
          <Text className="typography--h3 text-lingua-purple">Colors</Text>
          {colorGroups.map((group) => (
            <View key={group.title} className="gap-3">
              <Text className="typography--caption uppercase">{group.title}</Text>
              <View className="flex-row flex-wrap gap-4">
                {group.swatches.map((swatch) => (
                  <View key={swatch.name} className="w-24 gap-1">
                    <View className={`swatch ${swatch.className}`} />
                    <Text className="typography--caption uppercase">{swatch.name}</Text>
                    <Text className="typography--caption">{swatch.hex}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        <View className="card gap-6">
          <Text className="typography--h3 text-lingua-purple">Typography</Text>
          <View className="gap-2">
            <Text className="typography--caption uppercase">Font family</Text>
            <Text className="typography--h1">Poppins</Text>
            <Text className="typography--body-medium text-text-secondary">
              Poppins is a modern, geometric sans-serif typeface that provides excellent readability and a friendly personality.
            </Text>
          </View>
          {typeScale.map((item) => (
            <View key={item.name} className="gap-1">
              <Text className={item.className}>{item.name}</Text>
              <Text className="typography--caption">{item.usage}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
