import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";


const Navbar = () => {

    const [isPressed, setIsPressed] = useState(false);

    const handlePress = () => { 
        setIsPressed(!isPressed);
    };

    return (
        <View style= {styles.container}>
            <Text style= {styles.text}></Text>
            <Pressable onPress={handlePress}>
                <Text style={[styles.text,  isPressed && styles.textPressed]}>trending</Text>
            </Pressable>
            <Pressable onPress={handlePress}>
                <Text style={[styles.text,  isPressed && styles.textPressed]}>search</Text>
            </Pressable>
            <Pressable onPress={handlePress}>
                <Text style={[styles.text,  isPressed && styles.textPressed]}>wishlist</Text>
            </Pressable>
        </View>
      );
}
export default Navbar

const styles = StyleSheet.create ({
    container: {
        backgroundColor: '#0D282F',
    }, 
    text: {
        color: '#B1B8B9',
        
    },
    textPressed: {
        color: '#FACC15',
    }
})