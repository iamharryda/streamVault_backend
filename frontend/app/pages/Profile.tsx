import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
// https://icons.expo.fyi/Index

const Profile = () => {

    return (
        <View>
            <View style={styles.topProfileRow}>
                <AntDesign name="arrowleft" style={styles.backIcon} />
                <View style={styles.topProfileColumn}>
                    <Image style={styles.pfp}></Image>
                    <Text style={styles.profileName}>Jane Doe</Text>
                    <Text style={styles.userName}>@jane_doe</Text>
                    <View style={styles.profileButtonsFlex}>
                        <TouchableOpacity style={styles.pfButton}>Edit profile</TouchableOpacity>
                        <TouchableOpacity style={styles.pfButton}>Share profile</TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.bottomProfileColumn}>
                <View></View>
            </View>
        </View>
    );
}
export default Profile

const styles = StyleSheet.create ({
    //top part of the profile
    topProfileRow: {
        backgroundColor: '#04171B',
        flex: 1,
        flexDirection: 'row',
        top: 0,
        borderBottomColor: '#132529', borderBottomWidth: 1,
    },
    topProfileColumn: {
        flex: 1, 
        flexDirection: 'column',
        alignItems: 'center',
        left: 0
    },
    profileButtonsFlex: {
        flexDirection: 'row',
    },

    backIcon: {
        color: '#707B7D',
        fontSize: 16,
        marginLeft: 10, marginTop: 37,
        padding: 6,
        position: 'absolute',
    },
    pfp: {
        backgroundColor: 'white',
        height: 60, width: 60,
        borderRadius: 60,
        marginTop: 40, marginBottom: 8,
    },
    profileName:{
        color: '#E6E8E9',
        fontSize: 18,
        fontWeight: 700,
    },
    userName:{
        color: '#7B8588',
        fontSize: 12,
        fontWeight: 400,
        marginBottom: 20,
    },
    pfButton: {
        height: 34,
        width: 124, 
        justifyContent: 'center', //vertical
        alignItems: 'center', //horizontal
        color: '#E6E8E9',
        borderColor: '#B1B8B9',
        borderRadius: 2,
        borderWidth: 1,
        marginLeft: 6, marginRight: 6,
        marginBottom: 26
    },
    
    //bottom part of the profile
    bottomProfileColumn: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#04191E',
    },
    bottomProfilerow: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})
