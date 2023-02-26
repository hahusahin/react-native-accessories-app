export default {
  expo: {
    name: "11_RN_TechAccesories",
    slug: "tech-accessories-e-commerce-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      buildNumber: "1.0.0",
      supportsTablet: true,
    },
    android: {
      package: "com.hhs.react_tech_accessories",
      versionCode: 1,
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      FIREBASE_API_URL: process.env.FIREBASE_API_URL,
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      eas: {
        projectId: "8333d113-5df5-417a-b44f-c52acbd81af7",
      },
    },
    owner: "husahin",
  },
};
