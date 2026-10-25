import { useUser } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { PlanItem } from "@/components/PlanItem";
import { images } from "@/constants/images";
import { LANGUAGES } from "@/data/languages";
import { LESSONS } from "@/data/lessons";
import { UNITS } from "@/data/units";
import { useLanguageStore } from "@/store/languageStore";
import { colors } from "@/theme";

// Placeholder progress values until XP and streak are stored (a later feature).
const DAILY_GOAL_XP = 20;
const EARNED_XP = 15;
const STREAK_DAYS = 12;
const LEVEL = "A1";

// Stand-in portrait for the AI teacher until the real teacher image exists in assets.
const TEACHER_PHOTO = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces";

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useUser();
  const selectedCode = useLanguageStore((state) => state.selectedLanguage);

  // The current lesson is the first lesson of the first unit of the selected language.
  const language = LANGUAGES.find((item) => item.code === selectedCode);
  const unit = UNITS.filter((item) => item.languageCode === selectedCode).sort((a, b) => a.order - b.order)[0];
  const lesson = LESSONS.find((item) => item.id === unit?.lessonIds[0]);

  if (!language || !unit || !lesson) {
    return null;
  }

  const name = user?.firstName ?? user?.username ?? "there";
  const goalProgress = Math.min(EARNED_XP / DAILY_GOAL_XP, 1);

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: colors.neutral.background }}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header: selected language flag, greeting, streak and notifications */}
        <View className="flex-row items-center">
          <Image source={{ uri: language.flag }} className="h-[34px] w-[34px] rounded-full bg-surface" resizeMode="cover" />
          <Text className="typography--h4 ml-3 flex-1 text-[17px]">
            {language.greeting}, {name}! 👋
          </Text>
          <View className="flex-row items-center">
            <Image source={images.streakFire} className="h-[40px] w-[40px]" resizeMode="contain" />
            <Text className="typography--h4 -ml-1 text-[17px]">{STREAK_DAYS}</Text>
          </View>
          <TouchableOpacity className="ml-5" activeOpacity={0.7} accessibilityLabel="Notifications">
            <Ionicons name="notifications-outline" size={25} color={colors.neutral.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Daily goal */}
        <View className="home-card mt-[26px] h-[120px] bg-[#FFF4EA] px-5 pt-4">
          <Text className="home-card__label text-[#2B3050]">Daily goal</Text>
          <View className="flex-row items-baseline">
            <Text className="typography--h1 text-[32px] leading-[44px]">{EARNED_XP}</Text>
            <Text className="typography--body-large ml-2 text-text-secondary">/ {DAILY_GOAL_XP} XP</Text>
          </View>
          <View className="mt-1 h-2 w-[200px] overflow-hidden rounded-full bg-[#FBE6D3]">
            <View className="h-2 rounded-full bg-[#F39A3B]" style={{ width: `${goalProgress * 100}%` }} />
          </View>
          <Image source={images.treasure} className="absolute right-[9px] top-[8px] h-[110px] w-[110px]" resizeMode="contain" />
        </View>

        {/* Continue learning */}
        <View className="home-card mt-[22px] h-[168px] overflow-hidden bg-lingua-deep-purple px-5 pt-[18px]">
          <Text className="home-card__label text-white/90">Continue learning</Text>
          <Text className="typography--h1 mt-1 text-[28px] leading-[36px] text-white">{language.name}</Text>
          <Text className="typography--body-large text-white/90">
            {LEVEL} • Unit {unit.order}
          </Text>
          <TouchableOpacity
            className="mt-3 h-[38px] w-[98px] items-center justify-center rounded-[14px] bg-white"
            activeOpacity={0.85}
            onPress={() => router.navigate("/learn")}
          >
            <Text className="typography--h4 text-lingua-deep-purple">Continue</Text>
          </TouchableOpacity>
          <Image source={images.palace} className="absolute -right-[9px] top-px h-[190px] w-[190px]" resizeMode="contain" />
        </View>

        {/* Today's plan: built from the current lesson */}
        <View className="mt-[22px] flex-row items-center justify-between">
          <Text className="home-section__title">Today&apos;s plan</Text>
          <TouchableOpacity activeOpacity={0.7} onPress={() => router.navigate("/learn")}>
            <Text className="typography--h4 text-[16px] text-lingua-deep-purple">View all</Text>
          </TouchableOpacity>
        </View>

        <View className="mt-4 gap-[27px]">
          <PlanItem icon="book" iconColor={colors.primary.deepPurple} title="Lesson" subtitle={lesson.title} done />
          <PlanItem
            icon="headset"
            iconColor={colors.primary.deepPurple}
            title="AI Conversation"
            subtitle={`Talk about ${lesson.aiTeacherPrompt.topics[0]}`}
            done={false}
          />
          <PlanItem
            icon="logo-discord"
            iconColor="#F26B6B"
            title="New words"
            subtitle={`${lesson.vocabulary.length} words`}
            done={false}
          />
        </View>

        {/* Next up: AI video call */}
        <View className="home-card mt-[34px] h-[109px] flex-row items-center bg-[#F1F6E4] pl-5 pr-3">
          <View className="flex-1">
            <Text className="typography--body-small text-text-secondary">Next up</Text>
            <Text className="typography--h3 text-[17px]">AI Video Call</Text>
            <Text className="typography--body-medium text-text-secondary">Practice speaking</Text>
          </View>
          <View className="h-[88px] w-[88px] items-center justify-center">
            <View className="absolute h-[116px] w-[116px] rounded-full bg-[#F7FAEF]" />
            <Image source={{ uri: TEACHER_PHOTO }} className="h-[88px] w-[88px] rounded-full bg-surface" resizeMode="cover" />
          </View>
          <TouchableOpacity
            className="ml-[10px] h-10 w-10 items-center justify-center rounded-full bg-[#6BB536]"
            activeOpacity={0.85}
            accessibilityLabel="Start AI video call"
            onPress={() => router.navigate("/ai-teacher")}
          >
            <Ionicons name="videocam" size={22} color={colors.neutral.background} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
});
