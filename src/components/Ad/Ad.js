import React from "react";
import { StyleSheet, View, Text } from "react-native";

const Ad = (params) => {    
    return(
        <View style={style.styles}>
            <Text style={style.fontStyle}> Reklam Alanı </Text>
        </View>
    )    
}

const style = StyleSheet.create({
    styles:{
        height: 150,
        backgroundColor: "white",
        margin: 10,
        borderWidth: 1,
        borderRadius: 0,
        borderBottomWidth:1,
        borderTopWidth:1,
        borderLeftWidth:0,
        borderRightWidth:0,
        borderColor: "grey",
        alignItems: "center",
        justifyContent: "center"

    },
    fontStyle:{
        color: "black",
        fontWeight: "bold",
        fontSize: 30,
        alignItems: "center",

    }
})



export default Ad;