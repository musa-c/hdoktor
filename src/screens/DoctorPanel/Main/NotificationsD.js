import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import moment from "moment";
import { Avatar, Badge  } from 'react-native-elements';
import Separator from '../../../components/Separator';

const NotificationsD = () => {
  const user = firebase.auth().currentUser;
  const [data, setData] = useState([]);
  useEffect(()=>{
    let unmounted = false;

    firebase.firestore().collection("D_user").doc(user.uid).collection("Bildirimlerim").onSnapshot((snapshot)=>{
      const data = []
      snapshot.forEach((documentSnapshot)=>{
        data.push({
          ...documentSnapshot.data(),
          id: documentSnapshot.id
        })
      })
      if (!unmounted) {
        setData(data)
      }

    })

    return () => {
      unmounted = true;
    };

  }, [])

  // console.log(data);


  const ListEmptyComponent = () =>{
    return(
      <View style={{ flex:1, justifyContent:"center", alignItems:"center"}}>
        <Text style={{fontSize:20, color:"grey"}}>
          Bildiriminiz bulunmamakta.
        </Text>
      </View>
    )
  }


  return (
    <View style={styles.cont}>
    <FlatList
    data={data}
    contentContainerStyle={{flex:1}}
    ListEmptyComponent={ListEmptyComponent}
    renderItem={({item})=>
      (
        <>
      <View style={{flexDirection:"row",}}>
        <View style={{justifyContent:"center", alignItems:"flex-end", marginLeft:10 }}>
        <Badge status="primary" />
        <Avatar
        size={60}
        rounded
        title="MC"
        containerStyle={{ backgroundColor: '#3d4db7' }}
        />
        </View>
        <View style={styles.cardCont}>
      <Text style={{alignSelf:"flex-end", position:"absolute",color:"grey"}}>{moment(item.saat.toDate()).format('LT')} </Text>
      <Text style={[styles.text, {fontWeight:"500"}]} >{item.name}, randevu talebinde bulundu.</Text>
      <Text style={[styles.text, {fontStyle:"italic"}]}>Randevu Saat: <Text style={{fontWeight:"bold"}}>{item.RandevuSaat}</Text></Text>
      <Text style={[styles.text, {fontStyle:"italic"}]}>Randevu Tarih: <Text style={{fontWeight:"bold"}}>{item.RandevuTarih}</Text></Text>
      {/* <IconFeather name="info" size={30} color="#4fc3f7"/> */}
      </View>
      </View>
      <Separator marginStart={90}/>
     

</>
    )}
    />

    </View>
 
  );
};

const styles = StyleSheet.create({
  cont:{
    flex:1,
    backgroundColor:"white"
  },
  cardCont:{
    flex:1,
    marginVertical:5,
    padding:10,
    paddingLeft:20,
    // backgroundColor:"red",
    borderRadius:10,
    // backgroundColor:"red"
    // marginHorizontal:,
  },
  text:{
    fontSize:17,
    // backgroundColor:"red",
    paddingTop:5
  }
})

export default NotificationsD;
