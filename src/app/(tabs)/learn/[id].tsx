import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CallButton } from "@/components/CallButton";
import { images } from "@/constants/images";
import { LESSONS } from "@/data/lessons";
import { colors } from "@/theme";

// Mock feedback until the AI teacher scores the session.
const FEEDBACK = [
  { label: "Speaking", value: "Excellent", valueClassName: "text-success" },
  { label: "Pronunciation", value: "Great", valueClassName: "text-lingua-blue" },
  { label: "Grammar", value: "Good", valueClassName: "text-lingua-deep-purple" },
];

// Audio-only lesson with the AI teacher. The mic and subtitle buttons only change local UI state for now;
// the real audio session is connected in a later step.
export default function LessonScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const lesson = LESSONS.find((item) => item.id === id);

  // Camera is only a visual control: the lesson is audio-only, so it never starts any video.
  const [cameraOn, setCameraOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [subtitlesOn, setSubtitlesOn] = useState(true);
  // The phrase the teacher is "saying" in the bubble. null = the teacher's intro message.
  // Tapping the bubble steps through the lesson's phrases and then back to the intro.
  const [phraseIndex, setPhraseIndex] = useState<number | null>(null);

  const goBack = () => (router.canGoBack() ? router.back() : router.navigate("/learn"));

  if (!lesson) {
    return (
      <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: colors.neutral.background }}>
        <TouchableOpacity className="m-4 h-10 w-10 justify-center" activeOpacity={0.7} accessibilityLabel="Go back" onPress={goBack}>
          <Ionicons name="chevron-back" size={28} color={colors.neutral.textPrimary} />
        </TouchableOpacity>
        <View className="flex-1 items-center justify-center px-8">
          <Text className="typography--h3 text-center">Lesson not found</Text>
          <Text className="typography--body-medium mt-2 text-center text-text-secondary">
            This lesson does not exist. Go back and pick another one.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const nextPhrase = () => {
    const next = phraseIndex === null ? 0 : phraseIndex + 1;
    setPhraseIndex(next < lesson.phrases.length ? next : null);
  };

  const phrase = phraseIndex === null ? null : lesson.phrases[phraseIndex];

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: colors.neutral.background }}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header: back, teacher name + session status, XP and notifications */}
        <View className="h-[72px] flex-row items-center px-4">
          <TouchableOpacity className="h-10 w-10 justify-center" activeOpacity={0.7} accessibilityLabel="Go back" onPress={goBack}>
            <Ionicons name="chevron-back" size={28} color={colors.neutral.textPrimary} />
          </TouchableOpacity>
          <View className="ml-2 flex-1">
            <Text className="typography--h3 text-[20px] leading-[26px]">AI Teacher</Text>
            <View className="flex-row items-center">
              <View className="mr-2 h-[10px] w-[10px] rounded-full bg-success" />
              <Text className="typography--body-medium text-[14px] leading-[20px] text-text-secondary">Online</Text>
            </View>
          </View>
          <View className="audio-lesson__icon-button mr-2" accessibilityLabel="Video">
            <Ionicons name="videocam" size={20} color={colors.neutral.textPrimary} />
          </View>
          <View className="audio-lesson__icon-button mr-2 w-auto min-w-[40px] px-3" accessibilityLabel={`${lesson.xpReward} XP`}>
            <Text className="typography--h4 text-[15px]">{lesson.xpReward}</Text>
          </View>
          <View className="audio-lesson__icon-button" accessibilityLabel="Notifications">
            <Ionicons name="notifications-outline" size={20} color={colors.neutral.textPrimary} />
          </View>
        </View>

        {/* Stage: the teacher on the same soft purple as the lessons hero, which fades out behind the response bubble and call controls */}
        <View className="flex-1 px-[14px]">
          <View className="audio-lesson__stage flex-1">
            <View className="aspect-[614/560]">
              <Image source={images.mascotAuth} className="h-full w-full" resizeMode="contain" />
              {/* Camera preview placeholder, like the user's preview in the design. No video is shown. */}
              <View className="audio-lesson__preview absolute right-[14px] top-[15px]" accessibilityLabel="Camera preview">
                <Ionicons name="person" size={44} color={colors.primary.purple} />
              </View>
            </View>

            <View className="flex-1 pb-6">
              {/* Purple that fades to white, so the background carries on behind the bubble, controls and feedback, all the way down to the tab bar */}
              <Image source={images.audioLessonFade} className="absolute inset-0 h-full w-full" resizeMode="stretch" />

              {/* Teacher response bubble, overlapping the bottom of the picture. The tail points down to the right. */}
              <View className="-mt-[34px] ml-[44px] mr-[48px]">
                <TouchableOpacity className="teacher-bubble" style={styles.shadow} activeOpacity={0.9} onPress={nextPhrase}>
                  <View className="flex-1">
                    <Text className="teacher-bubble__text">{phrase ? phrase.text : lesson.aiTeacherPrompt.introMessage}</Text>
                    {phrase && subtitlesOn && (
                      <>
                        <Text className="typography--body-small mt-1 text-text-secondary">{phrase.translation}</Text>
                        <Text className="typography--caption mt-1 italic">{phrase.pronunciation}</Text>
                      </>
                    )}
                  </View>
                  <Ionicons name="volume-high" size={28} color={colors.primary.deepPurple} style={{ marginLeft: 12 }} />
                </TouchableOpacity>
                <View className="absolute -bottom-[6px] right-[36px] h-4 w-4 rotate-45 rounded-sm bg-background" />
              </View>

              {/* Call controls, spaced like the design (85px apart) */}
              <View className="mt-6 flex-row justify-center gap-[9px]">
                <CallButton icon="videocam" label="Camera" off={!cameraOn} onPress={() => setCameraOn(!cameraOn)} />
                <CallButton icon={micOn ? "mic" : "mic-off"} label="Mic" onPress={() => setMicOn(!micOn)} />
                <CallButton icon="language" label="Subtitles" off={!subtitlesOn} onPress={() => setSubtitlesOn(!subtitlesOn)} />
                <CallButton label="End Call" end onPress={goBack} />
              </View>

              {/* Lesson feedback */}
              <View className="mt-5 px-[6px]">
                <View className="feedback-card" style={styles.shadow}>
                  {FEEDBACK.map((item, index) => (
                    <View key={item.label} className={`feedback-card__item ${index > 0 ? "feedback-card__item--divider" : ""}`}>
                      <Text className="feedback-card__label">{item.label}</Text>
                      <Text className={`feedback-card__value ${item.valueClassName}`}>{item.value}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingBottom: 8,
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: "#0D132B",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 16,
      },
      default: { elevation: 4 },
    }),
  },
});
