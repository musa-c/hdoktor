import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, TextInput, Alert, } from 'react-native'
import firebase from "firebase/compat/app";
import Header from "../../../components/Header/Header";
import IconFeather from 'react-native-vector-icons/Feather';
import Modal from "react-native-modal";
import {Ionicons} from "@expo/vector-icons"
import ListEmptyComponent from "../../../components/ListEmptyComponent"
import { Button } from 'react-native-paper';


import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-elements';

const MyPatients = (props) => {
    const navigation = useNavigation();
    const [users, setUsers] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
  
  
    useEffect(()=>{
        let unmounted = false;
        setRefreshing(true)
        firebase.auth().onAuthStateChanged((doctor)=>{
            if(doctor){
                firebase.firestore().collection("D_user").doc(doctor?.uid ?? "").collection("Hastalarım").onSnapshot((querySnapshot)=>{
                    const users = [];
                    querySnapshot.forEach(documentSnapshot =>{
                      users.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                        
                      })
                    })
                    if (!unmounted) {
                        setUsers(users);
                        setRefreshing(false)
                    }
                    
                  })
            }
        })
        return () => {
            unmounted = true;
          };
  
      }, [refresh]);


    //   console.log(users)

      

      const user = firebase.auth().currentUser;
 
    //   user.displayName
    //   const [Chat_Id, SetChatId] = useState();

    const ChatId = (email) =>{
        firebase.firestore().collection("Chats")
        .where("users", "in", [[email, user.email]]).get().then(docs => {
            docs.forEach(doc=> {
                navigation.navigate("ChatsScreen", {
                    screen:"Chat",
                    params:{id: doc.id},
                    })
            })
        })
    }

    const [note, setNote] = useState("");

    const [hastaId, setHastaId] = useState();
    const [changenote, setchangeNote] = useState("");
    const [change, setChange] = useState(false);

    const getNotes = (id) => {
        setHastaId(id);
        firebase.firestore().collection("D_user").doc(user.uid).collection("Hastalarım").doc(id).onSnapshot((snapshot)=>{
            setNote(snapshot?.data()?.note ?? "")
            // console.log(note);
            setModalVisible(!isModalVisible)
        })
            // console.log("note:", note);
    }
    const [loading, setLoading] = useState(false)
    const setNotes = (id) =>{
        if(change == true) {
            setLoading(true)
            // !(/^\s*$/.test(changenote))
            // sadece boşluk olup olmadığı kontrol edildi regexte.
            firebase.firestore().collection("D_user").doc(user.uid).collection("Hastalarım").doc(id).set({
                note: changenote
            }, {merge:true}).then(()=>{
                setModalVisible(!isModalVisible)
                setChange(false)
                setLoading(false)
            }).catch(()=>{
                Alert.alert("Hata❗", "Lütfen tekrar deneyiniz.", [{text:"Tamam", style:"cancel"}])
                setLoading(false)
            })
        }else{
            setModalVisible(!isModalVisible)
        }
    }

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
      };
     
    
    return (
        <View style={styles.ViewStyle}>
            
                                                   {/* --- Modal --- */}
                                                   <Modal isVisible={isModalVisible}
              style={{margin:0, justifyContent:"center", alignItems:"center"}}
              onBackdropPress = {() => setNotes(hastaId)} 
              backdropOpacity={0.8}
              avoidKeyboard
              // hasBackdrop={false}
              // backdropColor="black"
              // onSwipeComplete = {() => setModalVisible(false)}
              
                >
                  <View style={{backgroundColor:"#fff", borderRadius:15, width: Dimensions.get("screen").width/1.1}}>     
                      <Ionicons name="close-outline" color="grey" size={30} onPress={()=> {toggleModal(), setchangeNote(note)}} style={{alignSelf:"flex-end", marginRight:10, marginTop:5}}/>
                     <Text style={{fontSize:30, position:"absolute", fontWeight:"700", marginLeft:10, marginTop:5}}>Notlarım</Text>
                  
                  <View style={{marginHorizontal:10, marginBottom:10,minHeight:200}}>
                 <TextInput
                 placeholder='Hasta ile ilgili not oluştur.'
                 style={{fontSize:18, paddingVertical:10, flex:1}}
                 multiline
                 textAlignVertical='top'
                 //maxLength={500}
              //    value={note}
                 defaultValue={note}
                //  value={changenote}
                 numberOfLines={10}
                 keyboardType='default'
                 onChangeText={(text) => {
                        setchangeNote(text)
                        setChange(true)
                    }}
                 />
                 </View>
                 <View style={{alignItems:"center", marginVertical:20}}>
                 <Button
                 mode="contained"
                 loading = {loading}
                 onPress = {() => setNotes(hastaId)}
                 disabled = {loading}
                 style={{borderRadius:20, padding:5, backgroundColor:"#B71C1C"}}
                 >KAYDET</Button>
                 </View>
                  </View>
                </Modal>
                            {/* --- Modal --- */}

                 <Header onPressChats={()=> navigation.navigate("ChatsScreen", {screen:"Chats"})} onPressNotifications={()=> navigation.navigate("Notifications")}/>
                 {/* <ScrollView> */}
                 <FlatList 
                 data = {users}
                contentContainerStyle={{flexGrow:1}}
                 onRefresh={() => {
                    setRefresh(!refresh)
                    setRefreshing(true)
                  }
                  }
                 refreshing = {refreshing}
                 ListEmptyComponent={<ListEmptyComponent text = "Hastanız bulunmamakta." refreshing={refreshing} />}
                 renderItem = {(element)=> 
                    (  
                 
                    <View style={{flex:1, backgroundColor:"#fff"}}>      
                      
                    <View style={styles.DenemeCont}>
                    <View style={styles.card}>
                        <View style={styles.cardImage}>
                        
                            <Avatar
                            size={85}
                            rounded
                            source={{uri: element.item?.avatar ?? "https://firebasestorage.googleapis.com/v0/b/hdoktor-1b373.appspot.com/o/avatars%2FDefaultHastaAvatar.png?alt=media&token=0e4d1b7c-d8d1-477f-87ea-55768082f81b"}}
/>

                        </View>
                        <View style={styles.CardInfo}>
                        <Text style={{color:"black", fontSize:17, paddingStart:5, fontWeight:"bold",}}>
                            {element.item.name}
                        </Text>
                        {/* <Text style={{color:"black", fontSize:19, paddingStart:5,}}>
                           Cinsiyet: {element.item.cinsiyet}
                        </Text> */}
                          <Text style={{color:"black", fontSize:19, paddingStart:5, marginTop:5}}>
                           Randevu Tarihi / Saati 
                        </Text>
                        <Text style={{color:"black", fontSize:19, paddingStart:5, marginTop:5}}>
                          {element.item.RandevuTarih} / {element.item.RandevuSaat}
                        </Text>

                        {/* <Text style={{color:"black", fontSize:19, paddingStart:5, marginTop:5}}>
                           Kronik Hastalık: &nbsp;&nbsp; {element.item.KHastalik}
                        </Text> */}
                        

                     
                        </View>
                        <View style={styles.cardIcon}>
                            <TouchableOpacity>
                           <IconFeather name="mail" size={35} color="#B71C1C" onPress={()=>
                           ChatId(element.item.email)
                        }
                          /> 
                           </TouchableOpacity>
                           <TouchableOpacity onPress={()=> getNotes(element.item.key)}>
                            <IconFeather name="edit-2" size={35} color="#B71C1C" /> 
                            </TouchableOpacity>
            
        
                        </View>
                            
                   </View>
                    </View>

        
                    
                </View>
            
                 )}
                 />
                 {/* </ScrollView> */}
        </View>
    )
}



const styles = StyleSheet.create({
    ViewStyle:{
        backgroundColor:"#fff",
        flex:1
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
     padding:10,
  
     marginVertical:7,
     borderRadius: 10,
     shadowColor: "#000",
     shadowOffset: {
       width: 0,
       height: 2,
     },
     shadowOpacity: 0.1,
     shadowRadius: 3,
  
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
})

export default MyPatients
