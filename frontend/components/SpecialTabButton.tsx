import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { StyleSheet, Alert, TouchableOpacity } from "react-native";

export const SpecialTabButton = () => {
    const handlePress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        Alert.alert("You have pressed the special tab button.");
    }

    return (
        <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Ionicons name="add" size={25} color="#04191E" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        top: -20,
        left: '50%',
        transform: [{ translateX: -32 }],
        alignItems: 'center',
        justifyContent: 'center',
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#FACC15',
    },
});
