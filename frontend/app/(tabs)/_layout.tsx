import { Tabs } from "expo-router";
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
import { Ionicons } from "@expo/vector-icons";
import { SpecialTabButton } from "@/src/components/SpecialTabButton";
import type { EventArg } from "@react-navigation/native";

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
    );
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FACC15",
        tabBarInactiveTintColor: "#94A3B8",
        tabBarStyle: { backgroundColor: "#04191E", borderTopColor: "#0E262B" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Discover"
        options={{
          title: "Discover",
          tabBarLabel: "Discover",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="TabBarButton"
        options={{ tabBarButton: SpecialTabButton }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
          },
        }}
      />
      <Tabs.Screen
        name="MyReview"
        options={{
          title: "My Review",
          tabBarLabel: "My Review",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="star" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Account"
        options={{
          title: "Account",
          tabBarLabel: "Account",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen name="SearchScreen" options={{ href: null }} />
    </Tabs>
  );
}
