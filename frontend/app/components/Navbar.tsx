import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

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
            <TouchableOpacity style={styles.listFlex}>
                <image href="" style={styles.icon}></image>
                <Text style = {styles.trending}>Trending</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.listFlex}>
                <image href="" style={styles.icon}></image>
                <Text style={styles.text}>Search</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.listFlex}>
                <image href="" style={styles.icon}></image>
                <Text style={styles.text}>Watchlist</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.listFlex}>
                <image href="" style={styles.icon}></image>
                <Text style={styles.text}>Recently watched</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.listFlex}>
                <image href="" style={styles.icon}></image>
                <Text style={styles.text}>Lists</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.listFlex}>
                <image href="" style={styles.icon}></image>
                <Text style={styles.text}>Activity</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.listFlex}>
                <image href="" style={styles.icon}></image>
                <Text style={styles.text}>Language & Region</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.listFlex}>
                <image href="" style={styles.icon}></image>
                <Text style={styles.text}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.listFlex}>
                <image href="" style={styles.icon}></image>
                <Text style={styles.text}>About StreamVault</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.listFlex}>
                <image href="" style={styles.icon}></image>
                <Text style={styles.text}>Sign Out</Text>
            </TouchableOpacity>
        </View>
      );
}
export default Navbar

const styles = StyleSheet.create ({
    container: {
        backgroundColor: '#0D282F',
        width: 299,
        flex: 1,
        flexDirection: 'column',
    }, 
    icon: {
        height: 19, width: 19,
    },
    text: {
        color: '#B1B8B9',
        height: 44,
        fontWeight: '500',
        fontSize: 14,
    },
    trending: {
        color: '#FACC15',
        height: 44,
        fontWeight: '500',
        fontSize: 14,
    },
    listFlex: {
        flex: 1,
        flexDirection: 'row',
    },

    pfFlex: {
        flex: 1,
        flexDirection: 'column',
    },
    profile: {        
        flex: 1,
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
    },
    name: {
        color: '#E6E8E9',
        fontWeight: '700',
        fontSize: 18,
    },
    place: {
        color: '#8C9598',
        fontWeight: '400',
        fontSize: 12,
    },
})