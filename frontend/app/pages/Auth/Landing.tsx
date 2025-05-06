import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Landing = () => {
    return (
        <View style={styles.container}>
            <Text style = {styles.textBig}>Welcome to<br/>Stream Vault</Text>
            <Text style = {styles.text}>Lorem ipsum dolor sit amet consectetur. Pellentesque vitae ac habitasse risus lobortis scelerisque maecenas varius.</Text>
            <TouchableOpacity>
                <Text style = {styles.button}>
                    Get started
                </Text>
            </TouchableOpacity>
        </View>

    )
}
export default Landing

const styles = StyleSheet.create ({
    container: {
        alignItems: 'center',
        backgroundColor: 'black',
        flex: 1,
        justifyContent: 'flex-end',
        padding: 16,
    },  
    button: {
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: '#FACC15',
        fontSize: 15, fontWeight: '600',
        borderBottomLeftRadius: 7, borderBottomRightRadius: 7, borderTopLeftRadius: 7, borderTopRightRadius: 7, // curved edges
        width: 250,
        marginLeft: 10, marginRight: 10, marginTop: 8, marginBottom: 8,
        paddingTop: 10, paddingBottom: 10,
    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontSize: 15,
        marginTop: 8, marginBottom: 8,
    },
    textBig: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30,
        marginTop: 8, marginBottom: 8,
    }
})