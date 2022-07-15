import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";



const LogoLogin = () => {
    return(
        <View  style ={style.container}>
            <Image source={require("./Icons/hdoktor-logo-dikeyImageSize.png")} />
        </View>
    );
}


const style = StyleSheet.create({
    container:{
        flexGrow:1,
        justifyContent: "flex-end",
        alignItems: "center",
        
    },
    logoText:{
        marginVertical:15,
        fontSize:18
    }
    
});

export default LogoLogin;