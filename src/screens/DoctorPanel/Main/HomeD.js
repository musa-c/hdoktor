import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import Header from '../../../components/Header/Header';
import Ad from "../../../components/Ad/Ad"
import firebase from "firebase/compat/app";
import { Avatar } from "react-native-elements";
import Separator from '../../../components/Separator';


function HomeD(props) {
  const [users, setUsers] = useState([]);
  // const [Id, setId] = useState("");
  // const user = firebase.auth().currentUser;
  // console.log(user.displayName, user.photoURL)
  const [myId, setMyId] = useState();
  

  useEffect(()=>{
    let unmounted = false;
    firebase.firestore().collection("D_user").onSnapshot((querySnapshot)=>{
      const users = [];
      querySnapshot.forEach(documentSnapshot =>{
        users.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        })
      })
      const myuser = firebase.auth().currentUser;
      if (!unmounted) {
        setUsers(users)
        setMyId(myuser.uid)
    }

    
  const a =  firebase.auth().currentUser.metadata.creationTime

  console.log(a);
      
    })
    return () => {
      unmounted = true;
    };
  }, []);

 


  const navigation = useNavigation();
  return (
    <View style={{flex:1, backgroundColor:"white"}}>
    <Header onPressChats={()=> navigation.navigate("ChatsScreen", {screen:"Chats"})} onPressNotifications={()=> navigation.navigate("NotificationsD")}/>
    <Ad />
    
    <FlatList
    data={users}
    renderItem={(element) => (
       
      <> 
      { (!(element.item.key == myId)) &&
         <TouchableOpacity onPress={() =>navigation.navigate("MoreDoctorInfo", {doctorId: element.item.key})}>
    <View style={styles.cont}>
    <View style={styles.card}>

      <View style={styles.cardImage}>
     
      
      {
         element.item.avatar == "" ?
// ../../components/Icons/DefaultDoctorAvatar.png
         <Avatar
  size={95}
  source={require("../../../components/Icons/DefaultDoctorAvatar.png")}
  avatarStyle={styles.imageStyle}
  activeOpacity={0.7}
  rounded
/>
:

<Avatar
size={95}
rounded
source={{uri: element.item.avatar}}
avatarStyle={styles.imageStyle}
activeOpacity={0.7}
/>

       }


      
  </View>
  <View style={styles.CardInfo}>
  <Text style={{color:"black", fontSize:17, paddingStart:5, fontWeight:"bold",}}>
      {element.item.name}
  </Text>
  <Text style={{color:"black", fontSize:19, paddingStart:5,}}>
  <Icon name="stethoscope" size={22} color="#B71C1C"  /> 
      &nbsp;&nbsp;{element.item.Alan}
  
  </Text>
  <Text style={{color:"black", fontSize:19, paddingStart:5}}>
  <Icon name="h-square" size={22} color="#B71C1C"  />
     &nbsp;&nbsp;{element.item.CalisilanYer}
  </Text>
  <View style={{marginHorizontal:5, marginTop:5}}>
    
  </View>
  <View style={{marginHorizontal:5, marginTop:5, alignItems:"flex-end"}}>
  <Text style={{color:"grey", fontSize:15, fontStyle:"italic"}}>
    Daha fazla bilgi al
  </Text>
  
  
  </View>
  </View>
       
            
   </View>
   <Separator />

    </View>
    </TouchableOpacity>
    }
    </>
       )}
       />

</View>

                
                
        
  );
}




const styles = StyleSheet.create({
    imageStyle:{
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
        shadowRadius: 24,

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


    cont:{
      flex:1,
  },
  card:{
   flexDirection:"row",
   marginTop:10,

   backgroundColor:"white",
  padding:5,
  //  marginVertical:7,
   borderRadius: 10,
   
   borderColor:"#E2E2E2",
   
   

   
 
  
  },
  cardImage:{
      flex:3,
      // backgroundColor:"blue",
      borderTopStartRadius:10,
      borderBottomStartRadius:10,
      marginLeft:5,
      alignItems:"center",
      justifyContent:"center",
  },
  CardInfo:{
      flex:7,
      // backgroundColor:"black",
      
  },
  cardIcon:{
      flex:2,
      backgroundColor:"yellow",
      borderTopEndRadius:10,
      borderBottomEndRadius:10,
      justifyContent:"space-around",
      alignItems:"center"

  }

    

});

export default HomeD;

