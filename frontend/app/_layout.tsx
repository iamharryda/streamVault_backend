import { Stack } from "expo-router";
import { useFonts as loadInterFonts, Inter_700Bold, Inter_600SemiBold, Inter_500Medium } from "@expo-google-fonts/inter";
import { useFonts as loadDmSansFonts, DMSans_500Medium, DMSans_400Regular } from "@expo-google-fonts/dm-sans";
import { ActivityIndicator, View } from "react-native";

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
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#04191E" }}>
                <ActivityIndicator size="large" color={"#FACC15"} />
            </View>
        );
    }

    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        />
    );
}