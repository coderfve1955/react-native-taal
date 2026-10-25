const path = require("node:path");
const { getDefaultConfig } = require("expo/metro-config");
const { withNativewind } = require("nativewind/metro");

/** @type {import('expo/metro-config').MetroConfig} */
const config = withNativewind(getDefaultConfig(__dirname));

// Temporary workaround for NativeWind 5 RC + React Native 0.88: NativeWind swaps `react-native` for a
// wrapper that has no `AssetRegistry`, which expo-asset (used for fonts and icons) needs.
// Let expo-asset import the real `react-native`. Remove once react-native-css supports RN 0.88.
const resolveWithNativewind = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === "react-native" && context.originModulePath.includes("/node_modules/expo-asset/")) {
    return { type: "sourceFile", filePath: path.join(path.dirname(require.resolve("react-native/package.json")), "index.js") };
  }
  return resolveWithNativewind(context, moduleName, platform);
};

module.exports = config;
