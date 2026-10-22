import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { SpeechBubble } from "@/components/SpeechBubble";
import { images } from "@/constants/images";
import { colors } from "@/theme";

export default function Onboarding() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.neutral.background }}>
      <View className="flex-1 px-7 pb-4">
        <View className="mt-2 flex-row items-center justify-center">
          <Image source={images.mascotLogo} className="-mr-2 h-[76px] w-[76px]" resizeMode="contain" />
          <Text className="typography--logo">taal-buddy</Text>
        </View>

        <View className="mt-6 gap-3 px-3">
          <Text className="typography--h1">
            Your AI language{"\n"}
            <Text className="text-lingua-deep-purple">teacher</Text>.
          </Text>
          <Text className="typography--body-large max-w-[280px] text-text-secondary">
            Real conversations, personalized lessons, anytime, anywhere.
          </Text>
        </View>

        <View className="flex-1 justify-center">
          {/* Square mascot box sized by the available height; may be wider than the screen (transparent edges) */}
          <View className="aspect-square h-full self-center">
            {/* Soft ground shadow under the mascot */}
            <View className="absolute bottom-[9%] h-4 w-[55%] self-center rounded-full bg-[#EEF0F6]" />
            <Image source={images.mascotWelcome} className="h-full w-full" resizeMode="contain" />
          </View>
          {/* Bubbles are positioned against the screen-wide container so they never get clipped */}
          <SpeechBubble
            text="Hello!"
            tail="right"
            bubbleClassName="bg-[#EAF3FF]"
            textClassName="text-text-primary"
            className="left-0 top-[9%] -rotate-[8deg]"
          />
          <SpeechBubble
            text="¡Hola!"
            tail="left"
            bubbleClassName="bg-[#F1F2FF]"
            textClassName="text-[#3B2BE0]"
            className="right-2 top-0 -rotate-[8deg]"
          />
          <SpeechBubble
            text="你好!"
            tail="left"
            bubbleClassName="bg-[#FDEEEA]"
            textClassName="text-[#E8503A]"
            className="-right-1 top-[27%] -rotate-[6deg]"
          />
        </View>

        <TouchableOpacity
          className="button--primary"
          activeOpacity={0.85}
          onPress={() => router.push("/sign-up")}
        >
          <Text className="button__label flex-1 pl-12 text-center">Get Started</Text>
          {/* Chevron: two borders of a rotated square */}
          <View className="mr-7 h-3 w-3 rotate-45 border-r-2 border-t-2 border-white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
