import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from "react-native";
import firebase from 'firebase/compat/app'
import IconFeather from 'react-native-vector-icons/Feather';
import Header from '../../../components/Header/Header';

import { useNavigation } from '@react-navigation/native';

const MyDoctor = ({route}) => {
    const [DrUsers, setDrUsers] = useState([]);
    useEffect(()=>{
        let unmounted = false;
        firebase.auth().onAuthStateChanged((user)=>{
            if (user) {
                // alert("Null Değilim")
                firebase.firestore().collection("H_user").doc(user?.uid ?? "").collection("Doktorlarım").onSnapshot((querySnapshot)=>{
                    const DrUsers = [];
                    querySnapshot.forEach(documentSnapshot =>{
                        DrUsers.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                      })
                    })
                    if (!unmounted) {
                        setDrUsers(DrUsers);
                    }
      
                    
                  })
            } 
            // else {
            //     alert("NULL'IM 2");
            // }
        })

        return () => {
            unmounted = true;
          };
  
      }, []);


      const navigation = useNavigation();




    return (
        
        <View style={styles.ViewStyle}>
            <Header onPressChats={()=> navigation.navigate("ChatsScreen", {screen:"Chats"})} onPressNotifications={()=> navigation.navigate("Notifications")}/>
            <FlatList 
            data = {DrUsers}
            renderItem = {(element)=>
                // console.log(element)
                (
                
               <View style={{flex:1, backgroundColor:"#fff"}}>        
               <View style={styles.DenemeCont}>
               <View style={styles.card}>
                   <View style={styles.cardImage}>
                   <Image style={styles.imageStyle}
                       source={{uri: element.item?.avatar ?? "https://firebasestorage.googleapis.com/v0/b/hdoktor-1b373.appspot.com/o/avatars%2FD_avatars%2FDefaultDoctorAvatar.png?alt=media&token=64165142-27b8-486b-9a58-5cab9baf340a"}}></Image>
                   </View>
                   <View style={styles.CardInfo}>
                   <Text style={{color:"black", fontSize:17, paddingStart:5, fontWeight:"bold",}}>
                      {element.item.name}
                   </Text>
                   <Text style={{color:"black", fontSize:19, paddingStart:5,}}>
                      {element.item.email}
                   </Text>
                   </View>
                   <View style={styles.cardIcon}>
                       <TouchableOpacity>
                      <IconFeather name="video" size={25} color="#B71C1C" /> 
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=> 
                        navigation.navigate("ChatsScreen", {
                            screen: "Chat",
                            params: 
                            {
                                DId: element.item.Id,
                                DocId: element.item.key,
                            }
                        
                        })
                         }>
                       <IconFeather name="mail" size={25} color="#B71C1C"/> 
                       </TouchableOpacity>
                   </View>
              </View>
               </View>
           </View>
            )} 
            /> 
   </View>
);
}

const styles = StyleSheet.create({
    ViewStyle:{
              backgroundColor:"#fff",
              flex:1
          },
          imageStyle:{
              borderColor: "#fff",
              borderWidth: 0,
              borderRadius: 10,
              width: 75,
              height: 81,
              marginVertical: 5,
              marginStart: 5
              
          },
          Card:{
              backgroundColor: "#fff",
              margin: 10,
              marginVertical:7,
              borderRadius: 10,
              shadowColor: "#000",
              shadowOffset: {
                  width: 0,
                  height: 4,
              },
              shadowOpacity: 0.1,
              shadowRadius: 5,
      
              elevation: 5,
              
          },
          cardList:{
              shadowColor:"#000",
              shadowOffset: 0.1,
              shadowRadius: 24,
              shadowOffset:{
                  width:0,
                  height:4
              },
              
          },
          DoctorInfoCont:{
              fontWeight: "bold",
              flexDirection:"column",
              
      
          },
          DoctorHospital:{
              alignItems: "flex-end",
              justifyContent: "flex-end",
              
          },
          DoctorName:{
              fontSize:20,
              marginHorizontal:10,
              fontWeight:"600",
              
              
          },
          DoctorTitle:{
              fontSize: 18,
              marginHorizontal:10,
              fontWeight:"400"
          },
          DoctorMoreInfo:{
              fontSize:18,
              marginHorizontal:10,
              marginVertical: 8,
              alignSelf:"flex-end",
              fontStyle: "normal",
              fontWeight:"200",
              color:"grey"
          },
          CallMessageIcon:{
              
              
              
          },
      
      
          DenemeCont:{
              flex:1,
              // justifyContent:"flex-start", // varsayılan(flex-direction: column) olarak dikey hizalama
              // alignItems:"center", // varsayılan olarak yatay hizalama 
          },
          card:{
           flexDirection:"row",
           marginTop:10,
           backgroundColor:"#fff",
        
           marginVertical:7,
           borderRadius: 10,
           shadowColor: "#000",
           shadowOffset: {
             width: 0,
             height: 4,
           },
           shadowOpacity: 0.1,
           shadowRadius: 25,
        
           elevation: 5,
           marginHorizontal:10
         
          
          },
          cardImage:{
              flex:3,
              // backgroundColor:"blue",
              borderTopStartRadius:10,
              borderBottomStartRadius:10,
              marginLeft:5,
              alignItems:"center",
              justifyContent:"center" 
        
          },
          CardInfo:{
              flex:7,
              // backgroundColor:"black",
          },
          cardIcon:{
              flex:1.5,
              // backgroundColor:"yellow",
              borderTopEndRadius:10,
              borderBottomEndRadius:10,
              justifyContent:"space-around",
              alignItems:"center"
        
          },
   
  });
  
export default MyDoctor
