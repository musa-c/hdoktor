import React from "react";
import {TouchableOpacity, View, Text, StyleSheet, } from "react-native"
import {Ionicons} from "@expo/vector-icons";
// import { colors } from "../config/constants";
import Separator from "./Separator";

const Cell = ({title, icon, tintColor, onPress, style}) => {
    return(
       <View>
        <TouchableOpacity
    style={[styles.cell, style]}
        onPress={onPress}
    >
        <View style={[styles.iconContainer, {backgroundColor:tintColor}]}>
        <Ionicons 
        name={icon} 
        size={24}
        color="white"
        style={{textAlign:"center", alignSelf:"center"}}
         />
        </View>
    <Text style={styles.title}>{title}</Text>
    <Ionicons 
        name="chevron-forward-outline" 
        size={20}
         />
    </TouchableOpacity>
    <Separator marginStart={64}/>
    </View>
    )
}

const styles = StyleSheet.create({
    cell:{
        paddingHorizontal:16,
        paddingVertical:12,
        backgroundColor:"white",
        flexDirection:"row",
        alignItems:"center",
        // borderBottomWidth: StyleSheet.hairlineWidth,
        // borderColor: "grey"

    },
    title:{
        fontSize:18,
        marginStart: 16,
        flex:1,
    },
    iconContainer:{
        height:32,
        width:32,
        borderRadius:6,
        alignItems:"center",
        justifyContent:"center",
        
    }
})

export default Cell;

