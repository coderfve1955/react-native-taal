import { Stack } from "expo-router";

// The lessons list and the lesson screen share the Learn tab, so the tab bar stays visible in a lesson.
export default function LearnLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
