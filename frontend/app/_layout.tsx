import { Stack } from "expo-router";
import {
  useFonts as loadInterFonts,
  Inter_700Bold,
  Inter_600SemiBold,
  Inter_500Medium,
} from "@expo-google-fonts/inter";
import {
  useFonts as loadDmSansFonts,
  DMSans_500Medium,
  DMSans_400Regular,
} from "@expo-google-fonts/dm-sans";
import { ActivityIndicator, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "@/src/store/store";

export default function Layout() {
  const [interLoaded] = loadInterFonts({
    Inter_700Bold,
    Inter_600SemiBold,
    Inter_500Medium,
  });

  const [dmSansLoaded] = loadDmSansFonts({
    DMSans_400Regular,
    DMSans_500Medium,
  });

  const fontsLoaded = interLoaded && dmSansLoaded;

  if (!fontsLoaded) {
    return (
      <Provider store={store}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#04191E",
          }}
        >
          <ActivityIndicator size="large" color={"#FACC15"} />
        </View>
      </Provider>
    );
  }

  return (
    <Provider store={store}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="/" />
      </Stack>
    </Provider>
  );
}
