import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated, Image } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
// https://icons.expo.fyi/Index


interface NavmenuProps {
  slideAnim: Animated.Value;
  closeMenu: () => void;
}


const Navbar = () => {

    const [isVisible, setIsVisible] = useState(false);
    const slideAnim = useRef(new Animated.Value(-300)).current;

    const openMenu = () => {
        setIsVisible(true);
        Animated.timing(slideAnim, {
            toValue: 0, 
            duration: 400,
            useNativeDriver: true,
        }).start();
    };

    const closeMenu = () => {
        Animated.timing(slideAnim, {
            toValue: -300,
            duration: 400,
            useNativeDriver: true,
    }).start(() => setIsVisible(false));
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.navbar}>
                <TouchableOpacity
                onPress={openMenu}
                ><Feather name="menu" style={styles.baricon}/></TouchableOpacity>

                <TouchableOpacity style={styles.search}
                //onPress={search}
                >
                    <AntDesign name="search1" style={styles.searchIcon}/>
                    <Text style={styles.searchText}>Search</Text>
                </TouchableOpacity>

                <TouchableOpacity
                onPress={() => window.location.href = /* Notifications */''}
                ><Feather name="bell" style={styles.baricon}/></TouchableOpacity>
            </View>
            {isVisible && <Navmenu slideAnim={slideAnim} closeMenu={closeMenu} />}
        </View>
    );
};

const Navmenu: React.FC<NavmenuProps> = ({ slideAnim, closeMenu }) => {
    return (
        <View style={StyleSheet.absoluteFill}>
            <TouchableOpacity 
                style={styles.overlay} 
                onPress={closeMenu} 
                activeOpacity={1} 
            />
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
                        <AntDesign name="search1" style={styles.menuicon}/>
                        <Text style={styles.menutext}>Search</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.listFlex}
                    onPress={() => window.location.href = /* watchlist */''}>
                        <AntDesign name="laptop" style={styles.menuicon}/>
                        <Text style={styles.menutext}>Watchlist</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.listFlex}
                    onPress={() => window.location.href = /* recent */''}>
                        <AntDesign name="clockcircleo" style={styles.menuicon}/>
                        <Text style={styles.menutext}>Recently watched</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.listFlex}
                    onPress={() => window.location.href = /* lists */''}>
                        <AntDesign name="bars" style={styles.menuicon}/>
                        <Text style={styles.menutext}>Lists</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.listFlex}
                    onPress={() => window.location.href = /* activity */''}>
                        <Feather name="activity" style={styles.menuicon}/>
                        <Text style={styles.menutext}>Activity</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.listFlex}
                    onPress={() => window.location.href = /* Lang&region */''}>
                        <AntDesign name="find" style={styles.menuicon}/>
                        <Text style={styles.menutext}>Language & Region</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.listFlex}
                    onPress={() => window.location.href = /* Settings */''}>
                        <AntDesign name="setting" style={styles.menuicon}/>
                        <Text style={styles.menutext}>Settings</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.listFlex}
                    onPress={() => window.location.href = /* About */''}>
                        <AntDesign name="infocirlceo" style={styles.menuicon}/>
                        <Text style={styles.menutext}>About StreamVault</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.listFlex}
                    onPress={() => window.location.href = '../pages/Auth/Landing'}>
                        <AntDesign name="logout" style={styles.menuicon}/>
                        <Text style={styles.menutext}>Sign Out</Text>
                    </TouchableOpacity>
                    <View style={styles.navbottom}></View>
                </View>

            </Animated.View>
        </View>
    );
};

export default Navbar

const styles = StyleSheet.create ({
    //Navbar styles
    navbar: {
        top: 0,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#04171B',
        height: 90, 
        borderBottomColor: '#132529', borderBottomWidth: 1,
    },
    baricon: {
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
    },

    //Navmenu styles
    navmenu: {
        position: "absolute",
        top: 0,
        width: 299,
        flexDirection: 'row',
        zIndex: 2,
    },
    container: {
        backgroundColor: '#0D282F',
        width: 299,
        flexDirection: 'column',
        borderRightWidth: 1,
        borderRightColor: '#36474B',
    }, 
    overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // optional: dim the background
    zIndex: 1,
    },
    navbottom: {
        bottom: 0,
        width: 299, height: 200,
        backgroundColor: '#0D282F',
        borderRightWidth: 1,
        borderRightColor: '#36474B',
    },
    
    menuicon: {
        color: '#B1B8B9',
        marginLeft: 16, marginTop: 10, marginBottom: 10,
        fontSize: 19,
    },
    trendingIcon: {
        color: '#FACC15',
        marginLeft: 16, marginTop: 10, marginBottom: 10,
        fontSize: 19,
    },
    menutext: { 
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
        borderRightWidth: 1,
        borderRightColor: '#36474B',
    },
    pfBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#36474B',
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
