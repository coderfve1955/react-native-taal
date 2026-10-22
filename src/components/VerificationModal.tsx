import { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

import { colors, fonts } from "@/theme";

const CODE_LENGTH = 6;

type VerificationModalProps = {
  visible: boolean;
  email: string;
  onClose: () => void;
  // Called as soon as the last digit is entered.
  onVerified: () => void;
};

export function VerificationModal({ visible, email, onClose, onVerified }: VerificationModalProps) {
  const [code, setCode] = useState("");
  const inputRef = useRef<TextInput>(null);

  const handleChange = (text: string) => {
    const digits = text.replace(/\D/g, "").slice(0, CODE_LENGTH);
    setCode(digits);
    if (digits.length === CODE_LENGTH) {
      onVerified();
    }
  };

  const handleClose = () => {
    setCode("");
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onShow={() => inputRef.current?.focus()}
      onRequestClose={handleClose}
    >
      {/* The sheet sits at the bottom and is pushed up by the keyboard */}
      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(13, 19, 43, 0.5)" }}
      >
        <Pressable style={{ flex: 1 }} onPress={handleClose} />
        <View
          className="items-center gap-3 px-7 pb-8 pt-8"
          style={{
            backgroundColor: colors.neutral.background,
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
          }}
        >
          <View className="h-16 w-16 items-center justify-center rounded-full bg-[#F1F2FF]">
            <Text className="text-[30px]">📩</Text>
          </View>
          <Text className="typography--h2 mt-1 text-center">Check your email</Text>
          <Text className="typography--body-medium text-center text-text-secondary">
            We sent a verification code to{"\n"}
            <Text className="font-poppins-medium text-text-primary">{email || "your email"}</Text>.
            {"\n"}Enter the 6-digit code below.
          </Text>

          <View className="mt-4">
            <View className="flex-row gap-2.5">
              {Array.from({ length: CODE_LENGTH }, (_, index) => (
                <View
                  key={index}
                  className={`code-box ${
                    index === code.length ? "border-lingua-deep-purple" : "border-border"
                  }`}
                >
                  <Text className="typography--h2">{code[index] ?? ""}</Text>
                </View>
              ))}
            </View>
            {/* Invisible input on top of the boxes: it receives the number pad input and taps */}
            <TextInput
              ref={inputRef}
              value={code}
              onChangeText={handleChange}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              autoComplete="one-time-code"
              maxLength={CODE_LENGTH}
              caretHidden
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                opacity: 0,
                fontFamily: fonts.regular,
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
