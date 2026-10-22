import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { VerificationModal } from "@/components/VerificationModal";
import { images } from "@/constants/images";
import { colors, fonts } from "@/theme";

type AuthMode = "sign-up" | "sign-in";

// Sign Up and Sign In share one layout; only the copy and the password field differ.
const copy = {
  "sign-up": {
    title: "Create your account",
    subtitle: "Start your language journey today ✨",
    button: "Sign Up",
    footerText: "Already have an account?",
    footerLink: "Log in",
    footerHref: "/sign-in",
  },
  "sign-in": {
    title: "Welcome back",
    subtitle: "Pick up where you left off ✨",
    button: "Sign In",
    footerText: "Don't have an account?",
    footerLink: "Sign up",
    footerHref: "/sign-up",
  },
} as const;

const socialProviders = [
  { name: "Google", icon: images.googleLogo },
  { name: "Facebook", icon: images.facebookLogo },
  { name: "Apple", icon: images.appleLogo },
] as const;

const inputStyle = {
  marginTop: 2,
  padding: 0,
  fontFamily: fonts.regular,
  fontSize: 17,
  color: colors.neutral.textPrimary,
};

export function AuthScreen({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const { title, subtitle, button, footerText, footerLink, footerHref } = copy[mode];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [verifying, setVerifying] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.neutral.background }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 px-7 pb-6">
          <TouchableOpacity
            className="-ml-3 mt-2 h-11 w-11 items-center justify-center"
            activeOpacity={0.6}
            onPress={() => router.back()}
          >
            {/* Back chevron: two borders of a rotated square */}
            <View className="h-3.5 w-3.5 rotate-45 border-b-2 border-l-2 border-text-primary" />
          </TouchableOpacity>

          <View className="mt-5 gap-2">
            <Text className="typography--h2 text-[26px]">{title}</Text>
            <Text className="typography--body-medium text-[15px] text-text-secondary">{subtitle}</Text>
          </View>

          {/* Mascot is mirrored so it waves from the left, and cropped just below the cheeks */}
          <View className="h-[132px] w-full">
            <View className="h-full w-full items-center overflow-hidden">
              <Image
                source={images.mascotAuth}
                className="-mt-[43px] h-[240px] w-[240px] -scale-x-100"
                resizeMode="contain"
              />
            </View>
            <Text className="absolute left-[20%] top-[18%] text-[18px] text-[#F5A623]">✦</Text>
            <Text className="absolute right-[16%] top-[24%] text-[16px] text-[#5B9BFF]">✦</Text>
            <Text className="absolute right-[21%] top-[52%] text-[18px] text-[#FFD54F]">✦</Text>
          </View>

          <View className="gap-3.5">
            <View className="auth-field">
              <Text className="auth-field__label">Email</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="alex@gmail.com"
                placeholderTextColor="#B4B9C6"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect={false}
                style={inputStyle}
              />
            </View>

            {mode === "sign-up" && (
              <View className="auth-field">
                <Text className="auth-field__label">Password</Text>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="••••••••"
                  placeholderTextColor="#B4B9C6"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoComplete="new-password"
                  autoCorrect={false}
                  style={inputStyle}
                />
                <TouchableOpacity
                  className="absolute right-5 top-0 h-full justify-center"
                  activeOpacity={0.6}
                  onPress={() => setShowPassword((visible) => !visible)}
                >
                  <Image
                    source={showPassword ? images.eyeOff : images.eye}
                    className="h-6 w-6"
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>

          <TouchableOpacity
            className="button--primary mt-5"
            activeOpacity={0.85}
            onPress={() => setVerifying(true)}
          >
            <Text className="button__label">{button}</Text>
          </TouchableOpacity>

          <View className="mt-5 flex-row items-center gap-4">
            <View className="h-px flex-1 bg-border" />
            <Text className="typography--body-medium text-text-secondary">or continue with</Text>
            <View className="h-px flex-1 bg-border" />
          </View>

          <View className="mt-4 gap-2.5">
            {socialProviders.map(({ name, icon }) => (
              <TouchableOpacity key={name} className="social-button" activeOpacity={0.7}>
                <Image source={icon} className="h-7 w-7" resizeMode="contain" />
                <Text className="social-button__label">Continue with {name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View className="flex-1 justify-end pt-8">
            <Text className="typography--body-medium text-center text-[15px] text-text-secondary">
              {footerText}{" "}
              <Link href={footerHref} replace className="font-poppins-medium text-lingua-deep-purple">
                {footerLink}
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>

      <VerificationModal
        visible={verifying}
        email={email}
        onClose={() => setVerifying(false)}
        onVerified={() => router.replace("/")}
      />
    </SafeAreaView>
  );
}
