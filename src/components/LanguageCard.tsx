import { Image, Text, TouchableOpacity, View } from "react-native";

import type { Language } from "@/types/learning";

type LanguageCardProps = {
  language: Language;
  selected: boolean;
  onPress: () => void;
};

// One row of the language list: flag, name, learner count and a check (selected) or chevron.
export function LanguageCard({ language, selected, onPress }: LanguageCardProps) {
  return (
    <TouchableOpacity
      className={`language-card ${selected ? "language-card--selected" : ""}`}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Image source={{ uri: language.flag }} className="language-card__flag" resizeMode="cover" />

      <View className="ml-4 flex-1">
        <Text className="language-card__name">{language.name}</Text>
        <Text className="language-card__learners">{language.learners} learners</Text>
      </View>

      {selected ? (
        <View className="h-9 w-9 items-center justify-center rounded-full bg-lingua-deep-purple">
          {/* Check mark: two borders of a rotated rectangle */}
          <View className="-mt-0.5 h-[7px] w-[12px] -rotate-45 border-b-2 border-l-2 border-white" />
        </View>
      ) : (
        // Chevron: two borders of a rotated square
        <View className="mr-2 h-2.5 w-2.5 rotate-45 border-r-[1.5px] border-t-[1.5px] border-text-secondary" />
      )}
    </TouchableOpacity>
  );
}
