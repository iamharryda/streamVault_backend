import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated, Image } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
// https://icons.expo.fyi/Index

const Navmenu = () => {

    const [isVisible, setIsVisible] = useState(false);
    const slideAnim = useRef(new Animated.Value(0)).current;

    const openMenu = () => {
        Animated.timing(slideAnim, {
            toValue: 0, 
            duration: 400,
            useNativeDriver: true,
        }).start(() => setIsVisible(true));
    };

    const closeMenu = () => {
        Animated.timing(slideAnim, {
        toValue: -300, // Slide out to the left
        duration: 400,
        useNativeDriver: true,
    }).start(() => setIsVisible(false));
    };
       

    return (
        <Animated.View style={[styles.navmenu, { transform: [{ translateX: slideAnim }] }]}>
            <View style= {styles.container}>
                <View style={styles.pfBorder}>

                    <TouchableOpacity style={styles.profile}
                    onPress={() => window.location.href = /* profile */''}>
                        <Image source={{ uri: "" }} style={styles.pfp}></Image>
                        <View style={styles.pfFlex}>
                            <Text style={styles.name}>John Doe</Text>
                            <Text style={styles.place}>Dublin, Ireland</Text>
                        </View>
                    </TouchableOpacity>

                </View>
                <TouchableOpacity style={styles.trendingFlex}
                onPress={() => window.location.href = /* trending */''}>
                    <Ionicons name="flame" style={styles.trendingIcon}/>
                    <Text style = {styles.trending}>Trending</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.listFlex}
                onPress={() => window.location.href = /* search */''}>
                    <AntDesign name="search1" style={styles.icon}/>
                    <Text style={styles.text}>Search</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.listFlex}
                onPress={() => window.location.href = /* watchlist */''}>
                    <AntDesign name="laptop" style={styles.icon}/>
                    <Text style={styles.text}>Watchlist</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.listFlex}
                onPress={() => window.location.href = /* recent */''}>
                    <AntDesign name="clockcircleo" style={styles.icon}/>
                    <Text style={styles.text}>Recently watched</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.listFlex}
                onPress={() => window.location.href = /* lists */''}>
                    <AntDesign name="bars" style={styles.icon}/>
                    <Text style={styles.text}>Lists</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.listFlex}
                onPress={() => window.location.href = /* activity */''}>
                    <Feather name="activity" style={styles.icon}/>
                    <Text style={styles.text}>Activity</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.listFlex}
                onPress={() => window.location.href = /* Lang&region */''}>
                    <AntDesign name="find" style={styles.icon}/>
                    <Text style={styles.text}>Language & Region</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.listFlex}
                onPress={() => window.location.href = /* Settings */''}>
                    <AntDesign name="setting" style={styles.icon}/>
                    <Text style={styles.text}>Settings</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.listFlex}
                onPress={() => window.location.href = /* About */''}>
                    <AntDesign name="infocirlceo" style={styles.icon}/>
                    <Text style={styles.text}>About StreamVault</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.listFlex}
                onPress={() => window.location.href = '../pages/Auth/Landing'}>
                    <AntDesign name="logout" style={styles.icon}/>
                    <Text style={styles.text}>Sign Out</Text>
                </TouchableOpacity>
                <View style={styles.navbottom}></View>
            </View>

            <TouchableOpacity style= {styles.emptyspace} onPress={closeMenu}>
            </TouchableOpacity>

        </Animated.View>

      );
}
export default Navmenu;

const styles = StyleSheet.create ({
    navmenu: {
        top: 0,
        width: 299,
        flexDirection: 'row',
    },
    container: {
        backgroundColor: '#0D282F',
        width: 299,
        flexDirection: 'column',
    }, 
    emptyspace: {
        backgroundColor: 'transparent',
        width: '200%', height: '100%',
    },
    navbottom: {
        bottom: 0,
        width: 299, height: 200,
        backgroundColor: '#0D282F',
    },
    
    icon: {
        color: '#B1B8B9',
        marginLeft: 16, marginTop: 10, marginBottom: 10,
        fontSize: 19,
    },
    trendingIcon: {
        color: '#FACC15',
        marginLeft: 16, marginTop: 10, marginBottom: 10,
        fontSize: 19,
    },
    text: { 
        color: '#B1B8B9',
        height: 20,
        fontWeight: '500',
        fontSize: 14,
        paddingLeft: 18, paddingTop: 12, paddingBottom: 12,
    },
    trending: { 
        color: '#FACC15',
        height: 20,
        fontWeight: '500',
        fontSize: 14,
        paddingLeft: 18, paddingTop: 12, paddingBottom: 12, 
    },
    trendingFlex: {
        flex: 1,
        flexDirection: 'row',
        height: 44,
        marginBottom: 8, marginTop: 24,
    },
    listFlex: {
        flex: 1,
        flexDirection: 'row',
        height: 44,
        marginBottom: 8,

    },

    pfFlex: {
        flexDirection: 'column',
    },
    profile: {        
        flexDirection: 'row',
    },
    pfBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#36474B',
        opacity: 30,
    },
    pfp: {
        width: 56,
        height: 56,
        backgroundColor: 'white',
        borderRadius: 100,
        marginLeft: 16, marginRight: 16,
        marginTop: 40, marginBottom: 42,
    },
    name: {
        color: '#E6E8E9',
        fontWeight: '700',
        fontSize: 18,
        marginTop: 46,
    },
    place: {
        color: '#8C9598',
        fontWeight: '400',
        fontSize: 12,
    },
})