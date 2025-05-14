import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native";
import openMenu from "./Navbar";
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
// https://icons.expo.fyi/Index

const Navbar = () => {

    return (
        <View style={styles.navbar}>
            <TouchableOpacity
            onPress={openMenu}
            ><Feather name="menu" style={styles.icon}/></TouchableOpacity>

            <TouchableOpacity style={styles.search}
            //onPress={() => search}
            >
                <AntDesign name="search1" style={styles.searchIcon}/>
                <Text style={styles.searchText}>Search</Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={() => window.location.href = /* Notifications */''}
            ><Feather name="bell" style={styles.icon}/></TouchableOpacity>
        </View>
    )
}
export default Navbar

const styles = StyleSheet.create ({
    navbar: {
        top: 0,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#04171B',
        height: 90, 
        borderBottomColor: '#132529', borderBottomWidth: 1,
    },
    icon: {
        color: '#B1B8B9',
        fontSize: 24,
        marginTop: 42,
        marginLeft: 16, marginRight: 16,
    },

    search: {
        backgroundColor: '#0D282F',
        marginTop: 38, marginBottom: 20,
        height: 32, width: 271,
        flex: 1,
        flexDirection: 'row',
        borderRadius: 4,
    },
    searchIcon: {
        color: '#B1B8B9',
        fontSize: 16,
        marginTop: 8, marginBottom: 8,
        marginLeft: 31,
    },
    searchText: {
        color: '#B1B8B9',
        fontSize: 14,
        height: 20, 
        marginTop: 6, marginBottom: 6,
        marginLeft: 13,
    }
})
/*     const openMenu = () => {
        Animated.timing(slideAnim, {
            toValue: 300, 
            duration: 300,
            useNativeDriver: true,
        }).start(() => setIsVisible(true));
    }; */