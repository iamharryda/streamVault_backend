import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
// https://icons.expo.fyi/Index

const Navbar = () => {

    return (
        <View style= {styles.container}>
            <View style= {styles.pfBorder}>
                <TouchableOpacity style={styles.profile}>
                    <image href="" style={styles.pfp}></image>
                    <View style={styles.pfFlex}>
                        <Text style={styles.name}>John Doe</Text>
                        <Text style={styles.place}>Dublin, Ireland</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.trendingFlex}>
                <Ionicons name="flame" style={styles.trendingIcon}/>
                <Text style = {styles.trending}>Trending</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.listFlex}>
                <AntDesign name="search1" style={styles.icon}/>
                <Text style={styles.text}>Search</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.listFlex}>
                <AntDesign name="laptop" style={styles.icon}/>
                <Text style={styles.text}>Watchlist</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.listFlex}>
                <AntDesign name="clockcircleo" style={styles.icon}/>
                <Text style={styles.text}>Recently watched</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.listFlex}>
                <AntDesign name="bars" style={styles.icon}/>
                <Text style={styles.text}>Lists</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.listFlex}>
                <Feather name="activity" style={styles.icon}/>
                <Text style={styles.text}>Activity</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.listFlex}>
                <AntDesign name="find" style={styles.icon}/>
                <Text style={styles.text}>Language & Region</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.listFlex}>
                <AntDesign name="setting" style={styles.icon}/>
                <Text style={styles.text}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.listFlex}>
                <AntDesign name="infocirlceo" style={styles.icon}/>
                <Text style={styles.text}>About StreamVault</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.listFlex}>
                <AntDesign name="logout" style={styles.icon}/>
                <Text style={styles.text}>Sign Out</Text>
            </TouchableOpacity>
        </View>
      );
}
export default Navbar

const styles = StyleSheet.create ({
    container: {
        backgroundColor: '#0D282F',
        width: 299, minHeight: 700,
        flexDirection: 'column',
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