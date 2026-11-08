import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.hanziquest.app",
  appName: "HanziPeak",
  webDir: "out",
  android: {
    backgroundColor: "#F7F2E7",
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 500,
      backgroundColor: "#F7F2E7",
      showSpinner: false,
    },
  },
};

export default config;
