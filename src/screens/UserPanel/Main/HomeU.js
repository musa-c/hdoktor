import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import Header from "../../../components/Header/Header"
import Ad from '../../../components/Ad/Ad';
import firebase from "firebase/compat/app";
import { Avatar } from "react-native-elements";
import Separator from '../../../components/Separator';


function HomeU(props) {
  const [users, setUsers] = useState([]);

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
      if (!unmounted) {
        setUsers(users)
      }
    })
    return () => {
      unmounted = true;
    };
  }, []);

  const navigation = useNavigation();
  return (
    <View style={{flex:1, backgroundColor:"#fff"}}>
    <Header onPressChats={()=> navigation.navigate("ChatsScreen", {screen:"Chats"})} onPressNotifications={()=> navigation.navigate("Notifications")}/>
    <Ad />
    <FlatList
    data={users}
    renderItem={(element) =>
        (
    <View style={styles.DenemeCont}>
    <TouchableOpacity onPress={() =>navigation.navigate("MoreDoctorInfoU", {doctorId: element.item.key})}>
    <View style={styles.card}>
      <View style={styles.cardImage}>

       {
         element.item.avatar == "" ?

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
// rounded
source={{uri: element?.item?.avatar ?? ""}}
avatarStyle={styles.imageStyle}
activeOpacity={0.7}
rounded
/>

       }
     
  </View>
  <View style={styles.CardInfo}>
  <Text style={{color:"black", fontSize:19, paddingStart:5, fontWeight:"bold",}}>
      {element.item.name}
  </Text>
  <Text style={{color:"black", fontSize:17, paddingStart:5, paddingBottom:5, textAlign:"auto",}}>
  <Icon name="stethoscope" size={22} color="#B71C1C"  /> 
      &nbsp;&nbsp;{element.item.brans}
  
  </Text>
  <Text style={{color:"black", fontSize:17, paddingStart:5}}>
  <Icon name="h-square" size={22} color="#B71C1C"  />
     &nbsp;&nbsp;{element.item.CalisilanYer}
  </Text>
  <View style={{marginHorizontal:5, marginTop:5, alignItems:"flex-end"}}>
  <Text style={{color:"grey", fontSize:15, fontStyle:"italic"}}>
    Daha fazla bilgi al
  </Text>
  
  </View>
  </View>
   </View>
  </TouchableOpacity>
   <Separator />
    </View>
       )}
       />
</View>
  );
}



const styles = StyleSheet.create({
    imageStyle:{
        // borderColor: "#fff",
        // borderWidth: 0,
        // borderRadius: 20,
        // width: 75,
        // height: 81,
        // marginVertical: 5,
        // marginStart: 5
        // marginVertical:5,
        // marginHorizontal:2

    },

  card:{
   flexDirection:"row",
   marginTop:10,
   backgroundColor:"#fff",

   marginVertical:7,
   borderRadius: 10,
   marginHorizontal:10
 
  
  },
  cardImage:{
      flex:3,
      // backgroundColor:"blue",
      borderTopStartRadius:10,
      borderBottomStartRadius:10,
      marginLeft:5,
      alignItems:"center",
      justifyContent:"center",
      // backgroundColor:"red",
      paddingVertical:5


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

  },
  button:{
    width: 300,
    backgroundColor: "#B71C1C",
    borderRadius: 25,
    paddingVertical: 12
  },
  buttonText:{
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
    textAlign: "center"  
},



    

});

export default HomeU;

