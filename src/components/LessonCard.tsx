import { Ionicons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { colors } from "@/theme";
import type { Lesson, LessonStatus } from "@/types/learning";

type LessonCardProps = {
  lesson: Lesson;
  number: number;
  status: LessonStatus;
  onPress: () => void;
};

// One row of the lesson list. The status decides the look:
// completed = green check, in progress = purple card with the lesson image, not started = lock icon.
export function LessonCard({ lesson, number, status, onPress }: LessonCardProps) {
  const inProgress = status === "in-progress";

  return (
    <TouchableOpacity
      className={`lesson-card ${inProgress ? "lesson-card--in-progress" : ""}`}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View className="flex-1">
        <Text className={`lesson-card__number ${inProgress ? "text-lingua-deep-purple" : ""}`}>Lesson {number}</Text>
        <Text className="lesson-card__title mt-1">{lesson.title}</Text>
        {inProgress && <Text className="lesson-card__meta mt-1 text-[13px] text-lingua-deep-purple">In progress</Text>}
        {status === "not-started" && (
          <Text className="lesson-card__meta mt-1">0 / {lesson.activities.length} activities</Text>
        )}
      </View>

      {status === "completed" && (
        <View className="h-6 w-6 items-center justify-center rounded-full bg-success">
          <Ionicons name="checkmark" size={16} color={colors.neutral.background} />
        </View>
      )}
      {inProgress && (
        // Stand-in picture until every lesson has its own illustration in assets.
        <Image
          source={{ uri: `https://picsum.photos/seed/${lesson.id}/120/120` }}
          className="h-[44px] w-[44px] rounded-xl bg-surface"
          resizeMode="cover"
        />
      )}
      {status === "not-started" && <Ionicons name="lock-closed-outline" size={24} color="#2B3050" />}
    </TouchableOpacity>
  );
}
