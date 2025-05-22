import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
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
            <View style={styles.bottomProfile}>
                <View style={styles.bottomProfilerow}>
                    <TouchableOpacity style={styles.topContainers}>
                        <AntDesign name="star" style={styles.topIcons}/>
                        <Text style={styles.topText1}>numb</Text>
                        <Text style={styles.topText2}>Ratings</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.topContainers}>
                        <MaterialCommunityIcons name="note-edit" style={styles.topIcons}/>
                        <Text style={styles.topText1}>numb</Text>
                        <Text style={styles.topText2}>Reviews</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.topContainers}>
                        <Ionicons name="tv" style={styles.topIcons}/>
                        <Text style={styles.topText1}>numb</Text>
                        <Text style={styles.topText2}>Watchlist</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.topContainers}>
                        <AntDesign name="heart" style={styles.topIcons}/>
                        <Text style={styles.topText1}>numb</Text>
                        <Text style={styles.topText2}>Favourites</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bottomProfilecolumn}>
                    <TouchableOpacity style={styles.bottomContainers}>
                        <MaterialCommunityIcons name="note-edit-outline" style={styles.bottomIcons}/>
                        <Text style={styles.bottomText}> My Reviews</Text>
                        <MaterialIcons name="keyboard-arrow-right" style={styles.bottomArrow}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bottomContainers}>
                        <Ionicons name="tv-outline" style={styles.bottomIcons}/>
                        <Text style={styles.bottomText}>Watchlist</Text>
                        <MaterialIcons name="keyboard-arrow-right" style={styles.bottomArrow}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bottomContainers}>
                        <AntDesign name="hearto" style={styles.bottomIcons}/>
                        <Text style={styles.bottomText}>Favourites</Text>
                        <MaterialIcons name="keyboard-arrow-right" style={styles.bottomArrow}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bottomContainers}>
                        <Feather name="users" style={styles.bottomIcons}/>
                        <Text style={styles.bottomText}>Followers & Following</Text>
                        <MaterialIcons name="keyboard-arrow-right" style={styles.bottomArrow}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bottomContainers}>
                        <Ionicons name="ribbon-outline" style={styles.bottomIcons}/>
                        <Text style={styles.bottomText}>Badges & Achievements</Text>
                        <MaterialIcons name="keyboard-arrow-right" style={styles.bottomArrow}/>
                    </TouchableOpacity>
                </View>
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
    bottomProfile: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#04191E',
    },
    bottomProfilerow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bottomProfilecolumn: {
        flexDirection: 'column',
        alignItems: 'center',
    },

    topContainers: {
        backgroundColor: '#0D282F',
        height: 90, width: 78,
        marginLeft: 4, marginRight: 4,
        marginTop: 32, marginBottom: 28,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    topIcons: {
        color: '#FACC15',
        fontSize: 24,
    },
    topText1: {
        color: '#E6E8E9',
        fontSize: 18,
        fontWeight: 700,
    },
    topText2: {
        color: '#576568',
        fontSize: 12,
        fontWeight: 500,
    },

    bottomContainers: {
        backgroundColor: '#0D282F',
        flexDirection: 'row',
        marginTop: 4, marginBottom: 4,
        borderRadius: 8,
        alignItems: 'center',
        padding: 16,
        width: 336
    },
    bottomIcons: {
        color: '#B1B8B9',
        fontWeight: 500,
        fontSize: 24,
    },
    bottomText: {
        color: '#B1B8B9',
        fontWeight: 500,
        fontSize: 14,
        paddingLeft: 18,
    },
    bottomArrow: {
        color: '#B1B8B9',
        fontWeight: 500,
        fontSize: 24,
    }
})
