import { View, Text, Dimensions, ScrollView, FlatList } from 'react-native'
import React, {useEffect, useState} from 'react'
import Modal from "react-native-modal";

const ModalCard = ({isVisible, onBackdropPress, id, RandevuDate, username}) => {
const [randevu, setRandevu] = useState([]);
useEffect(()=>{
  let unmounted = false;
  const randevu = []
  RandevuDate.map(element => {
    if(element.Id == id){
      randevu.push(element)
    }
  });

  if (!unmounted) {
    setRandevu(randevu)
  }

  return () => {
    unmounted = true;
  };


}, [isVisible])

//console.log("randevu", Hid)

  return (
 
      <Modal 
      isVisible={isVisible} 
      onBackdropPress={onBackdropPress}
      style={{ justifyContent:"center", margin:20}}
    animationIn="fadeIn"
    animationOut="fadeOut"
    animationInTiming={0}
    animationOutTiming={300}
      >
        <View style={{backgroundColor:"#fff", borderRadius:15, width: Dimensions.get("screen").width/1.1, height: Dimensions.get("screen").height / 2.3}}>
           <FlatList 
    data={randevu}
    renderItem={(element) => 
    (
        <View style={{margin:10, alignItems:"center" }}>
          <Text>{username}</Text>
                  <Text>Randevu Tarihi: {element.item.RandevuSaat}</Text>
                  <Text>Randevu Saati: {element.item.RandevuTarih}</Text>
        </View>
    )}
    />
    </View>
    {/* <View style={{width: Dimensions.get("screen").width/1.1, backgroundColor:"blue", justifyContent:"center", alignItems:"center", flex:1}}>
        <ScrollView style={{flex:1 ,backgroundColor:"white"}}>

    {
      randevu.map((element)=>
      (
        <React.Fragment key={element.RandevuSaat}>
        <View style={{backgroundColor:"#fff", borderRadius:10,  alignItems:"center", justifyContent:"center" }}>
             
        <Text>Randevu Tarihi: {element.RandevuSaat}</Text>
        <Text>Randevu Saati: {element.RandevuTarih}</Text>

   
</View>
</React.Fragment>
      ))
    }
      </ScrollView>
      </View> */}


{/* <View style={{backgroundColor:"#fff", borderRadius:10, width: Dimensions.get("screen").width/1.1, alignItems:"center", justifyContent:"center" }}>
             
        <Text>Randevu Tarihi: 2222</Text>
        <Text>Randevu Saati: </Text>
        </View> */}
      </Modal>
 
  )
}

export default ModalCard