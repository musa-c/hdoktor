import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity,  FlatList } from "react-native";
// import Constants from 'expo-constants'; //
var _ = require('lodash');
import firebase from 'firebase/compat/app';
import Header from '../../../components/Header/Header';
import IconFeather from 'react-native-vector-icons/Feather';
import { Avatar } from "react-native-elements";

import moment from "moment";
import trLocale from "moment/locale/tr"
import ListEmptyComponent from '../../../components/ListEmptyComponent';
import LoadingButton from '../../../components/Buttons/LoadingButton';

const PatientConfirmation = ({navigation}) => {

    const [users, SetUsers] = useState([]);
    const [DName, setD_Name]= useState("");
    const [DEmail, setD_Email]= useState("");
    const [DId, setD_Id] = useState("");
    const [DAlan, setAlan] = useState("");
    const [DCalisilanYer, setCalisilanYer] = useState("");
    const [DIletisimSaat1, setIletisimSaat1] = useState("");
    const [DIletisimSaat2, setIletisimSaat2] = useState("");
    const [DAvatar, setD_Avatar] = useState("");
    const [refresh, setRefresh] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [loadingPlus, setLoadingPlus] = useState(false)
    const [loadingMinus, setloadingMinus] = useState(false)



    useEffect(()=>{
        let unmounted = false;
        setRefreshing(true)
      firebase.auth().onAuthStateChanged((doctor)=>{
            if  (doctor) {
                firebase.firestore().collection("D_user").doc(doctor?.uid ?? "").collection("GorusmeTalep").onSnapshot((querySnapshot)=>{
                    const users = [];
                    querySnapshot.forEach(documentSnapshot =>{
                      users.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                      })
                    })
                    
                    if (!unmounted) {
                        SetUsers(users);
                        setRefreshing(false)
                    }
                    
                  })

                firebase.firestore().collection("D_user").doc(doctor?.uid ?? "").onSnapshot((snapshot)=>{
                  if (!unmounted) {
                      setD_Name(snapshot.data()?.name ?? "");
                      setD_Email(snapshot.data()?.email ?? "");
                      setD_Id(snapshot.data()?.Id ?? "");
                      setAlan(snapshot.data()?.brans ?? "");
                      setCalisilanYer(snapshot.data()?.CalisilanYer ?? "");
                      setIletisimSaat1(snapshot.data()?.time1 ?? "");
                      setIletisimSaat2(snapshot.data()?.time2 ?? "");
                      setD_Avatar(snapshot.data()?.avatar ?? "https://firebasestorage.googleapis.com/v0/b/hdoktor-1b373.appspot.com/o/avatars%2FDefaultDoctorAvatar.png?alt=media&token=022e0299-4a3f-4127-93bc-dd70dc42f6ea")        
              }
            })


            }                     
         
        })
        return () => {
            unmounted = true;
          };
  
      }, [refresh]);

    
    const HastaKabul =  (name, cinsiyet, KHastalik, DocumentId, H_ID, email, RandevuSaat, RandevuTarih, Havatar) => {
        setLoadingPlus(true)
        firebase.firestore().collection("H_user").doc(H_ID).collection("Doktorlarım").where("Id", "==", DId).get().then((snapshot)=>{
            console.log(snapshot.empty)
            if  (snapshot.empty){
                // doc yoksa
                
             firebase.firestore().collection("H_user").doc(H_ID).collection("Doktorlarım").add({
                    name: DName,
                    email: DEmail,
                    brans: DAlan,
                   // RandevuTarih: [RandevuTarih, RandevuSaat],
                   // RandevuSaat: [RandevuSaat],
                    calisilanYer: DCalisilanYer,
                    iletisimSaat1: DIletisimSaat1,
                    iletisimSaat2: DIletisimSaat2,
                    Id: DId,
            }).then((docRef)=>{
              //  console.log(docRef.id)
            firebase.firestore().collection("H_user").doc(H_ID).collection("Doktorlarım").doc(docRef.id).collection("RandevuTarih").add({
                RandevuSaat: RandevuSaat,
                RandevuTarih: RandevuTarih,
                Id: DId
            }).catch(()=>{
                console.log("hata")
            })

            })
            }else{
                // doc varsa
        
                    snapshot.forEach((querySnapshot)=>{
                        firebase.firestore().collection("H_user").doc(H_ID).collection("Doktorlarım").doc(querySnapshot.id).collection("RandevuTarih").add({
                         //   RandevuTarih: firebase.firestore.FieldValue.arrayUnion(RandevuTarih, RandevuSaat),
                         //   RandevuSaat: firebase.firestore.FieldValue.arrayUnion(RandevuSaat),
                            RandevuTarih:RandevuTarih,
                            RandevuSaat:RandevuSaat,
                            Id: DId
                        })
                    })
            
            }
        })
      

    var now = new Date();

        firebase.firestore().collection("H_user").doc(H_ID).collection("Bildirimlerim").add({
            Doktor: DName,
            RandevuTarih: RandevuTarih,
            RandevuSaat: RandevuSaat,
            saat: now,
            randevu: true
        })

        var user = firebase.auth().currentUser;
        firebase.firestore().collection("D_user").doc(user.uid).collection("Hastalarım").where("Id", "==",  H_ID).get().then((snapshot)=>{
            console.log(snapshot.empty)
            if(snapshot.empty){
                // doc yoksa
                    firebase.firestore().collection("D_user").doc(user.uid).collection("Hastalarım").add({
                        name: name,
                        cinsiyet:cinsiyet,
                        // KHastalik:KHastalik,
                        Id: H_ID,
                        email: email,
                        randevuCount:1,
                        RandevuSaat: RandevuSaat,
                        RandevuTarih: RandevuTarih,
                        avatar: Havatar
                }).then((docRef)=>{
                    firebase.firestore().collection("D_user").doc(user.uid).collection("Hastalarım").doc(docRef.id).collection("RandevuTarih").add({
                        Id: H_ID,
                        RandevuTarih: RandevuTarih,
                        RandevuSaat: RandevuSaat
                    })

                }).catch(()=>{
                    console.log("HATA")
                })
            } else{
                // doc varsa
                if(!snapshot.empty){
                    snapshot.forEach((querySnapshot)=>{
                        firebase.firestore().collection("D_user").doc(user.uid).collection("Hastalarım").doc(querySnapshot.id).collection("RandevuTarih").add({
                            RandevuTarih: RandevuTarih,
                            RandevuSaat: RandevuSaat,
                            Id: H_ID,
                        }).then(()=>{
                           firebase.firestore().collection("D_user").doc(user.uid).collection("Hastalarım").doc(querySnapshot.id).collection("RandevuTarih").onSnapshot((query)=>{
                            firebase.firestore().collection("D_user").doc(user.uid).collection("Hastalarım").doc(querySnapshot.id).update({randevuCount: query.docs.length})
                           })
                        })
                    })
                }
             
            }
        })

                 
            // firebase.firestore().collection("Chats").where("users", "array-contains")
            // VAR İSE CHAT'E EKLEME!
            firebase.firestore().collection("Chats").where("users", "in", [[email, DEmail]]).get().then((snapshot)=>{
             //   console.log(snapshot.empty)
               console.log("chat:", snapshot.empty)
                if(snapshot.empty){
                    // doc yoksa
                    firebase.firestore().collection("Chats").add({
                        users: [email, DEmail],
                        names: [name, DName],
                        messages: [],
                        avatar: [Havatar, DAvatar]
                        
                    }) 
                } 
            })

            setLoadingPlus(false)
                    firebase.firestore().collection("D_user").doc(user?.uid ?? "").collection("GorusmeTalep").doc(DocumentId).delete();
            
        }

        const HastaRed = (DocumentId) => {
            setloadingMinus(true)
            firebase.auth().onAuthStateChanged((doctor)=>{
                if (doctor) {
                    firebase.firestore().collection("D_user").doc(doctor?.uid ?? "").collection("GorusmeTalep").doc(DocumentId).delete();

                    firebase.firestore().collection("H_user").doc(H_ID).collection("Bildirimlerim").doc().set({
                        Doktor: DName,
                        RandevuTarih: RandevuTarih,
                        RandevuSaat: RandevuSaat,
                        saat: now,
                        randevu: false
                    })
                }
            })
            setloadingMinus(false)

        }

    return (
             <View style={styles.ViewStyle}>
                 <Header onPressChats={()=> navigation.navigate("ChatsScreen", {screen:"Chats"})} onPressNotifications={()=> navigation.navigate("Notifications")}/>
                 <FlatList 
                 data = {users}
                 refreshing={refreshing}
                 contentContainerStyle={{flexGrow:1}}
                 onRefresh={()=>{
                    setRefresh(!refresh)
                    setRefreshing(true)
                 }}
                 ListEmptyComponent={<ListEmptyComponent text="Randevu Talebi bulunmamakta." refreshing={refreshing}/> }
                 renderItem = {(element)=>(
                    <View style={{flex:1, backgroundColor:"#fff"}}>        
                    <View style={styles.DenemeCont}>
                    <View style={styles.card}>
                        <View style={styles.cardImage}>
                        {/* <Image style={styles.imageStyle}
                            source={require("../../components/Icons/doctor.png")}></Image>
                        </View> */}

<Avatar
  size={85}
  source={{uri: element.item?.avatar ?? "https://firebasestorage.googleapis.com/v0/b/hdoktor-1b373.appspot.com/o/avatars%2FDefaultHastaAvatar.png?alt=media&token=0e4d1b7c-d8d1-477f-87ea-55768082f81b" }}
  avatarStyle={styles.imageStyle}
  activeOpacity={0.7}
  rounded
/>

                        </View>
                       
                        <View style={styles.CardInfo}>
                        <Text style={{color:"black", fontSize:19, paddingStart:5, fontWeight:"bold",}}>
                            {element.item.name}
                        </Text>
                        {/* <Text style={{color:"black", fontSize:19, paddingStart:5, marginTop:5}}>
                           Cinsiyet: {element.item.cinsiyet}
                        </Text> */}
                        {
                         element.item.KHastalik != "" &&    
                         <Text style={{color:"black", fontSize:19, paddingStart:5, marginTop:5}}>
                         {/* <Icon name="h-square" size={22} color="#B71C1C"  /> */}
                           Kronik Hastalık: &nbsp;&nbsp; {element.item.KHastalik}
                            {/* Kronik Hastalık: &nbsp;&nbsp; {element.item.GorusmeTalep.id} */}
                         </Text>
                        }
                       

                        <Text style={{color:"black", fontSize:19, paddingStart:5, marginTop:5}}>
                           Randevu Tarih/Saat <Text> </Text>
                        </Text>
                        <Text style={{color:"black", fontSize:19, paddingStart:5, marginTop:5}}>
                        {element.item.RandevuTarih}, {element.item.RandevuSaat}
                        </Text>                      

                        </View>
                        <View style={styles.cardIcon}>
                           <LoadingButton 
                           onPress={()=> HastaKabul(
                                element.item.name, 
                                element.item.cinsiyet, 
                                element.item.KHastalik,
                                element.item.key,
                                element.item.id,
                                element.item.email,
                                element.item.RandevuSaat,
                                element.item.RandevuTarih,
                                element.item.avatar
                           )}
                           icon="plus-box"
                           loading={loadingPlus}
                           /> 
                            <LoadingButton 
                            icon ="minus-box" 
                            onPress={()=>  
                            HastaRed(element.item.key)} 
                            loading={loadingMinus}/>
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
            // borderWidth: 0,
            // borderRadius: 10,
            // width: 75,
            // height: 81,
            // marginVertical: 5,
            // marginStart: 5
            
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
         paddingVertical:20,
         paddingHorizontal:5,
      
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
            // borderTopStartRadius:10,
            // borderBottomStartRadius:10,
            marginLeft:5,
            alignItems:"center",
            justifyContent:"center" 
      
        },
        CardInfo:{
            flex:7,
            // backgroundColor:"black",
            padding:10
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

export default PatientConfirmation;
