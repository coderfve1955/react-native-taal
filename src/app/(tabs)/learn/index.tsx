import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { LessonCard } from "@/components/LessonCard";
import { images } from "@/constants/images";
import { LESSONS } from "@/data/lessons";
import { UNITS } from "@/data/units";
import { useLanguageStore } from "@/store/languageStore";
import { colors } from "@/theme";
import type { LessonStatus } from "@/types/learning";

// Mock progress until lesson completion is stored: the first lessons are done, the next one is in progress.
const MOCK_COMPLETED_LESSONS = 2;

type Tab = "lessons" | "practice";

function getStatus(index: number, total: number): LessonStatus {
  const completed = Math.min(MOCK_COMPLETED_LESSONS, total - 1);
  if (index < completed) return "completed";
  if (index === completed) return "in-progress";
  return "not-started";
}

export default function LearnScreen() {
  const router = useRouter();
  const selectedCode = useLanguageStore((state) => state.selectedLanguage);
  const [tab, setTab] = useState<Tab>("lessons");

  // Show the first unit of the selected language with its lessons in order.
  const unit = UNITS.filter((item) => item.languageCode === selectedCode).sort((a, b) => a.order - b.order)[0];
  const lessons = LESSONS.filter((lesson) => unit?.lessonIds.includes(lesson.id)).sort(
    (a, b) => unit.lessonIds.indexOf(a.id) - unit.lessonIds.indexOf(b.id),
  );

  if (!unit) {
    return null;
  }

  const currentLessonNumber = Math.min(MOCK_COMPLETED_LESSONS, lessons.length - 1) + 1;

  const goBack = () => (router.canGoBack() ? router.back() : router.navigate("/"));

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: colors.neutral.background }}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header: back, unit title + progress, bookmark */}
        <View className="h-[72px] flex-row items-center px-4">
          <TouchableOpacity className="h-10 w-10 justify-center" activeOpacity={0.7} accessibilityLabel="Go back" onPress={goBack}>
            <Ionicons name="chevron-back" size={28} color={colors.neutral.textPrimary} />
          </TouchableOpacity>
          <View className="ml-2 flex-1">
            <Text className="typography--h3 text-[20px] leading-[26px]">{unit.title}</Text>
            <Text className="typography--body-medium text-[14px] leading-[20px] text-text-secondary">
              Unit {unit.order} • {currentLessonNumber} / {lessons.length} lessons
            </Text>
          </View>
          <View className="h-[28px] w-[24px]">
            <Ionicons name="bookmark-outline" size={26} color="#2B3050" />
            {/* Orange ribbon at the top of the bookmark */}
            <View className="absolute left-[2px] top-[1px] h-[4px] w-[19px] rounded-t-[2px] bg-[#F5A524]" />
          </View>
        </View>

        {/* Hero: the palace, shown whole. The bottom padding keeps it above the Lessons / Practice switch below. */}
        <View className="aspect-[3/2] w-full bg-[#F6F4FF] pb-[55px]">
          <Image source={images.palace} className="h-full w-full" resizeMode="contain" />
        </View>

        {/* Lessons / Practice switch, overlapping the bottom of the hero */}
        <View className="-mt-[55px] px-[14px]">
          <View className="lesson-tabs">
            <TouchableOpacity
              className={`lesson-tabs__item ${tab === "lessons" ? "lesson-tabs__item--active" : ""}`}
              style={tab === "lessons" ? styles.activeTab : undefined}
              activeOpacity={0.8}
              onPress={() => setTab("lessons")}
            >
              <Text className={`lesson-tabs__label ${tab === "lessons" ? "lesson-tabs__label--active" : ""}`}>Lessons</Text>
              {tab === "lessons" && (
                <View className="absolute bottom-0 left-[8px] right-[8px] h-[3px] rounded-full bg-lingua-deep-purple" />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              className={`lesson-tabs__item ${tab === "practice" ? "lesson-tabs__item--active" : ""}`}
              style={tab === "practice" ? styles.activeTab : undefined}
              activeOpacity={0.8}
              onPress={() => setTab("practice")}
            >
              <Text className={`lesson-tabs__label ${tab === "practice" ? "lesson-tabs__label--active" : ""}`}>Practice</Text>
              {tab === "practice" && (
                <View className="absolute bottom-0 left-[8px] right-[8px] h-[3px] rounded-full bg-lingua-deep-purple" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {tab === "lessons" ? (
          <View className="mt-[14px] gap-2 px-5">
            {lessons.map((lesson, index) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                number={index + 1}
                status={getStatus(index, lessons.length)}
                onPress={() => router.push({ pathname: "/learn/[id]", params: { id: lesson.id } })}
              />
            ))}
          </View>
        ) : (
          // Friendly empty state until practice exercises exist
          <View className="mt-10 items-center px-10">
            <Text className="typography--h3 text-center">Practice is coming soon</Text>
            <Text className="typography--body-medium mt-2 text-center text-text-secondary">
              Finish a few lessons first, then come back to review what you learned.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 24,
  },
  activeTab: {
    ...Platform.select({
      ios: {
        shadowColor: "#5B3BF6",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
      },
      default: { elevation: 4 },
    }),
  },
});
