import React, { Component, useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import firebase from "firebase/compat/app";
import { useNavigation, useRoute } from "@react-navigation/native";

const Form = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();
    
    const [errroMessage, setErrorMessage] = useState("");

    const [found, setFound] = useState();
    const [D_userID, setD_userID] = useState([]);

    const signIn = async () => {
           await firebase.auth().signInWithEmailAndPassword(email, password).then(()=>{
                firebase.firestore().collection("D_user").get().then((querySnapshot) => {
                    const D_userId = [];
                    querySnapshot.forEach((doc) => {
                        D_userId.push(doc.id);
                        // console.log(doc.id)
                    });
                    setD_userID(D_userId);
                    
                }).then(()=>{
                    firebase.firestore().collection("D_user").where("email", "==", email.toLowerCase()).get().then((snapshot)=>{
                        // console.log(snapshot.);
                       if(!(snapshot.empty)){
                        navigation.navigate("TabD");
                       }else{
                        Alert.alert(
                            "Hatalı Giriş",
                            "Hatalı kullanıcı girişi!",
                        [
                            {
                              text: "Tekrar Dene",
                            //   onPress: () => console.log("Cancel Pressed"),
                              style: "destructive",
                                
                            },
                            // { text: "OK", onPress: () => console.log("OK Pressed") }
                          ]
                        );
                       }
                    })

                 
                }); 
             
            }).catch((error)=>{
                const errorCode = error.code;
                switch (errorCode.substr(5)) {
                    case 'ERROR_EMAIL_ALREADY_IN_USE':
                    case 'account-exists-with-different-credential':
                    case 'email-already-in-use':
                      alert('Email already used. Go to login page.');
                      break;
                    case 'ERROR_WRONG_PASSWORD':
                    case 'wrong-password':
                    //   alert('Yanlış e-posta/şifre kombinasyonu.');
                      setErrorMessage("Yanlış e-posta/şifre kombinasyonu.")
                      break;
                    case 'ERROR_USER_NOT_FOUND':
                    case 'user-not-found':
                    //   alert('Bu e-posta ile kullanıcı bulunamadı.');
                    setErrorMessage('Bu e-posta ile kullanıcı bulunamadı.')
                      break;
                    case 'ERROR_USER_DISABLED':
                    case 'user-disabled':
                      alert('Kullanıcı devre dışı bırakıldı.');
                      break;
                    case 'ERROR_TOO_MANY_REQUESTS':
                    case 'operation-not-allowed':
                      alert('Bu hesaba giriş yapmak için çok fazla istek var.');
                      break;
                    case 'ERROR_OPERATION_NOT_ALLOWED':
                    case 'operation-not-allowed':
                      alert('Sunucu hatası, lütfen daha sonra tekrar deneyin.')
                      break;                    
                    case 'ERROR_INVALID_EMAIL':
                    case 'invalid-email':
                      setErrorMessage("Email adresi geçersiz.")
                    //   alert('Email adresi geçersiz.');
                      break;                    
                    default:
                      alert('Giriş başarısız. Lütfen tekrar deneyin.');
                      break;
                  }
            });
                
            

        }; 
      
  
    



    return(
        <View  style ={style.container}>

{errroMessage == "Yanlış e-posta/şifre kombinasyonu." || "Email adresi geçersiz." || 'Bu e-posta ile kullanıcı bulunamadı.' ? 

        <Text style={{color:"red", fontSize:17, fontWeight:"bold"}}>{""+ errroMessage}</Text> 
     : ""}
            <TextInput style={style.inputBox}
                placeholder="E-mail"
                placeholderTextColor="#fff"
                value={email}
                onChangeText={text => setEmail(text)}
                
                />

            <TextInput style={style.inputBox}
                placeholder="Şifre"
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry={true}
                placeholderTextColor="#fff"/>

            <TouchableOpacity style={style.button} onPress={()=> signIn()}>
                <Text style={style.buttonText}>Giriş Yap</Text>
            </TouchableOpacity>

        </View>
    );
}

const style = StyleSheet.create({
    container:{
        flexGrow:1,
        justifyContent: "center",
        alignItems: "center"
    },
    inputBox:{
        width: 300,
        height: 50,
        backgroundColor: "#E57373",
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: "#fff",
        marginVertical: 10
    },
    buttonText:{
        fontSize: 16,
        fontWeight: "500",
        color: "#fff",
        textAlign: "center"
    },
    button:{
        width: 300,
        backgroundColor: "#B71C1C",
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12
    }


});

export default Form;