import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet,TouchableOpacity, Dimensions } from 'react-native'
import {Ionicons} from "@expo/vector-icons"
import {Avatar } from 'react-native-elements';
import Modal from "react-native-modal";
import firebase from 'firebase/compat/app';

const ProfilU0 = () => {
    // const [raiting, setRaiting] = useState();
    const [isModalVisible, setModalVisible] = useState(false);
    const [avatar, setAvatar] = useState();
    const [name, setName] = useState("");
    const [cinsiyet, setCinsiyet] = useState("");
    const [KHastalik, setKHastalik] = useState("");
    const [email, setEmail] = useState("");

    useEffect(()=> {
        let unmounted = false;

        const user = firebase.auth().currentUser;
        if (!unmounted) {
        firebase.firestore().collection("H_user").doc(user.uid).onSnapshot((snapshot)=>{
            setName(snapshot.data()?.name ?? "");
            setEmail(snapshot.data()?.email ?? "");
            setCinsiyet(snapshot.data()?.cinsiyet ?? "");
            setKHastalik(snapshot.data()?.KHastalık ?? "");
            setAvatar(snapshot.data()?.avatar ?? "https://firebasestorage.googleapis.com/v0/b/hdoktor-1b373.appspot.com/o/avatars%2FDefaultHastaAvatar.png?alt=media&token=0e4d1b7c-d8d1-477f-87ea-55768082f81b")
            // TEL NO
            // YAŞ
            // 
            
        })
    }
    
    return () => {
        unmounted = true;
      };
    
    }, [])

    const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
    
    return (
        <View style={styles.cont}>
            <View style={styles.userImg}>
            <Avatar
                source={{uri: avatar}}
                size={110}
                rounded
                onPress={toggleModal}
                title={name}
            >
            <Avatar.Accessory  size={27} onPress={toggleModal} />
            </Avatar>
            {/* --- Modal --- */}
            <Modal isVisible={isModalVisible}
      style={{margin:0, justifyContent:"flex-end"}}
      swipeDirection="down"
    onBackdropPress = { ( )  =>  setModalVisible ( false ) } 
      onSwipeComplete = { ( )  =>  setModalVisible ( false ) }
    //   swipeDirection="down"
    //   swipeDirection="left"
      >
        <View style={{height: Dimensions.get('screen').height / 3.5, backgroundColor:"#fff", borderTopLeftRadius:20, borderTopRightRadius:20}}>
        
            <View style={{width:70, height:6, backgroundColor:"grey", alignSelf:"center", borderRadius:10, marginTop:12, position:"absolute"}}></View>
            <Ionicons name="close-outline" color="grey" size={30} onPress={toggleModal} style={{alignSelf:"flex-end", marginRight:5}}/>
           
            <View style={{ justifyContent:"space-evenly", flex:1, backgroundColor:"white"}}>
          <Text style={{fontSize:25, fontWeight:"bold", alignSelf:"center"}}>Fotoğraf Değiştir</Text>
            <TouchableOpacity
            style={{backgroundColor:"#d2302f", width:300, height:50, alignSelf:"center", alignItems:"center", justifyContent:"center", borderRadius:25}}
            >
                <Text style={{fontSize:20,color:"white", fontWeight:"600"}}>Galerimden seç</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={{backgroundColor:"#d2302f", width:300, height:50, alignSelf:"center", alignItems:"center", justifyContent:"center", borderRadius:25}}
            >
                <Text style={{fontSize:20, color:"white", fontWeight:"600"}}>Fotoğraf çek</Text>
            </TouchableOpacity>
            </View>
        </View>
      </Modal>
                  {/* --- Modal --- */}

                  <Text style={{fontWeight:"500", fontSize:24}}>{name}</Text>
       
            </View>
            
            <View style={styles.userInfoCont}>

       <View style={styles.userInfo}>
       <Text style={{marginBottom:7, marginLeft:32, color:"grey"}}>E-Mail</Text>

                <View style={{flexDirection:"row"}}>
                <Ionicons name="mail-outline" size={22} />
                <Text style={{fontWeight:"400", fontSize:20, paddingHorizontal:10, flex:1}}>{email}</Text>
          <Ionicons name="ellipsis-horizontal-outline" size={22} />
                </View>                
            </View>
            <View style={{height:StyleSheet.hairlineWidth, marginStart:45, backgroundColor:"red"}}></View>

            <View style={styles.userInfo}>
       <Text style={{marginBottom:7, marginLeft:32, color:"grey"}}>Telefon Numarası</Text>

                <View style={{flexDirection:"row"}}>
                <Ionicons name="call-outline" size={22} />
                <Text style={{fontWeight:"400", fontSize:20, paddingHorizontal:10, flex:1}}>Tel no.</Text>
          <Ionicons name="ellipsis-horizontal-outline" size={22} />
                </View>                
            </View>
            <View style={{height:StyleSheet.hairlineWidth, marginStart:45, backgroundColor:"red"}}></View>


            <View style={styles.userInfo}>
       <Text style={{marginBottom:7, marginLeft:32, color:"grey"}}>Yaş</Text>

                <View style={{flexDirection:"row"}}>
                <Ionicons name="time-outline" size={22} />
                <Text style={{fontWeight:"400", fontSize:20, paddingHorizontal:10, flex:1}}>yaş</Text>
          <Ionicons name="ellipsis-horizontal-outline" size={22} />
                </View>                
            </View>
            <View style={{height:StyleSheet.hairlineWidth, marginStart:45, backgroundColor:"red"}}></View>

            <View style={styles.userInfo}>
       <Text style={{marginBottom:7, marginLeft:32, color:"grey"}}>Cinsiyet</Text>

                <View style={{flexDirection:"row"}}>
                <Ionicons name="images-outline" size={22} />
                <Text style={{fontWeight:"400", fontSize:20, paddingHorizontal:10, flex:1}}>
                    
                 {cinsiyet}
                    </Text>
          <Ionicons name="ellipsis-horizontal-outline" size={22} />
                </View>                
            </View>
            <View style={{height:StyleSheet.hairlineWidth, marginStart:45, backgroundColor:"red"}}></View>

            <View style={styles.userInfo}>
       <Text style={{marginBottom:7, marginLeft:32, color:"grey"}}>Fotoğraflar</Text>

                <View style={{flexDirection:"row"}}>
                <Ionicons name="images-outline" size={22} />
                <Text style={{fontWeight:"400", fontSize:20, paddingHorizontal:10, flex:1, color:"grey"}}>
                    
                 Gösterilecek fotoğraf yok
                    </Text>
          <Ionicons name="ellipsis-horizontal-outline" size={22} />
                </View>                
            </View>
            <View style={{height:StyleSheet.hairlineWidth, marginStart:45, backgroundColor:"red"}}></View>

            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    cont:{
        // marginTop:Constants.statusBarHeight,
        backgroundColor:"white",
        flex:1
        
    },
    userImg:{
        justifyContent:"space-evenly",
        alignItems:"center", 
        flex:0.9, 
        // backgroundColor:"red"
  
    },
    userInfoCont:{
        // flex:2.3,
        // backgroundColor:"red",
        justifyContent:"center"
   
    },
    userInfo:{
        backgroundColor:"white",
        paddingHorizontal:16,
        padding:10,
        marginVertical:5,
        
        
    },
    text:{
        padding:15, 
        fontSize:20,
        color:"white",  
        fontWeight:"bold", 
        paddingVertical:10,
    },
    
})

export default ProfilU0
