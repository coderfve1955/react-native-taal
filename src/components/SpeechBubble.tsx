import { Text, View } from "react-native";

type SpeechBubbleProps = {
  text: string;
  // Which bottom corner the tail points from.
  tail: "left" | "right";
  // Tailwind background class, e.g. "bg-[#EAF3FF]". Shared by the bubble and its tail.
  bubbleClassName: string;
  // Tailwind text color class, e.g. "text-text-primary".
  textClassName: string;
  // Tailwind classes for absolute position and rotation.
  className?: string;
};

export function SpeechBubble({
  text,
  tail,
  bubbleClassName,
  textClassName,
  className = "",
}: SpeechBubbleProps) {
  return (
    <View className={`absolute ${className}`}>
      <View className={`items-center justify-center rounded-2xl px-5 py-3.5 ${bubbleClassName}`}>
        <Text className={`font-poppins-medium text-[17px] ${textClassName}`}>{text}</Text>
      </View>
      {/* Tail: a rotated square in the bubble color, tucked under the bottom edge */}
      <View
        className={`absolute -bottom-1 h-3.5 w-3.5 rotate-45 rounded-sm ${bubbleClassName} ${
          tail === "left" ? "left-6" : "right-6"
        }`}
      />
    </View>
  );
}
