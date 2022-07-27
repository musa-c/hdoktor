import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import {FontAwesome} from "@expo/vector-icons"
const Login = () => {
    const navigation = useNavigation();
    return (
        <View style={{flex:1, justifyContent:"center", alignItems:"center", backgroundColor:"#fff", flexGrow:1}}>
            <View style={{flex:3, justifyContent:"center"}}>
            <Image source={require("../rec/Logos/hdoktor-logo-dikeyImageSize.png")} />
            </View>
            <View style={{flex:4}}>
            <TouchableOpacity onPress={()=> navigation.navigate("DMain", {screen:"D_SignIn"})}>
            <LinearGradient
        // Button Linear Gradient '#b71b1f'
        colors={['#eb3941', '#f15e64', '#e14e53', '#e2373f']}
        start={{x: 0.4, y: 0.6}}
        end={{x: 0.2, y: 0.8}}
        style={styles.button}
        >
                <View style={styles.cont}>
                <FontAwesome size={35} name='user-md' color="white"/>
            <Text style={styles.text}>Doktor Giriş</Text>
            </View>
            </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity  onPress={()=>navigation.navigate("UMain", {screen: "SignIn"})}>
            <LinearGradient
        // Button Linear Gradient df3a37 
        colors={['#eb3941', '#f15e64', '#e14e53', '#e2373f']}
        start={{x: 0.4, y: 0.6}}
        end={{x: 0.2, y: 0.2}}
        style={styles.button}
        >
            <View style={styles.cont}>

            <FontAwesome size={35} name='user' color="white"/>
            <Text style={styles.text}>Hasta Giriş</Text>
            </View>
            </LinearGradient>

            </TouchableOpacity>
            </View>
        </View>
    )
}

const styles= StyleSheet.create({
    text:{
        fontSize:20,
        padding:5,
        color:"#fff",
        fontWeight:"700"
        
    },
    cont:{
        // backgroundColor:"#B71C1C",
        //flexGrow:1,
        justifyContent:"center",
        borderRadius:25,
        marginVertical:10,
        width: 300,
        alignItems:"center",
        paddingVertical: 5
    },
    button:{
        borderRadius:30,  
       marginTop:20  
          },
        
})

export default Login;
