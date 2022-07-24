import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Dimensions, Pressable, StyleSheet } from "react-native";
import { Agenda, LocaleConfig } from "react-native-calendars";
import { Card } from "react-native-paper";
import {Ionicons} from "@expo/vector-icons"
import firebase from "firebase/compat/app";
import moment from "moment";
import trLocale from "moment/locale/tr"
import Modal from "react-native-modal";

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split("T")[0];
};

const date = new Date();
var year = new Date(date).getFullYear();
var month = new Date(date).getMonth();


switch (month) {
  case 0:
    month = "02";
    break;
  case 1:
    month = "03";
    break;
  case 2:
    month = "04";
    break;
  case 3:
    month = "05";
    break;
  case 4:
    month = "06";
    break;
  case 5:
    month = "07";
    break;
  case 6:
    month = "08";
    break;
  case 7:
    month = "09";
    break;
  case 8:
    month = "10";
    break;
  case 9:
    month = "11";
    break;
  case 10:
    month = "12";
    break;
  case 11:
    month = "01";
    year += 1;
    break;
  default:
    break;
}


var day = Number(new Date().getDate());


if (day < 10) {
  day = "0" + day.toString()
}

var maxDate = year + "-" + month  + "-" + day.toString();


const Appointment = ({route}) => {
  const id = route.params.id;
  // console.log(id);

  const [isModalVisible, setModalVisible] = useState(false);

  
  const toggleModal = (tarih, clock) => {
    setModalVisible(!isModalVisible);
    setTarih(tarih)
    setClocdk(clock)
  };

  const [ClockStart, setTimeStart] = useState();
  const [ClockFinish, setTimeFinish] = useState();


  const [Clock, setClock] = useState([]);


  var DoluZamanlarDizi = [];

  useEffect(()=>{
    let unmounted = false;

    firebase.firestore().collection("D_user").doc(id).collection("Hastalarım").onSnapshot((QuerySnapshot)=>{
      QuerySnapshot.forEach((randevu)=>{
        DoluZamanlarDizi.push(
          {
            saat: randevu.data().RandevuSaat,
            tarih: randevu.data().RandevuTarih
          }
        )              
      })
    })

    const user = firebase.auth().currentUser;
    firebase.firestore().collection("H_user").doc(user.uid).get().then((snapshot)=>{
      if (!unmounted) {
        setH_Name(snapshot.data().name);
        setH_Avatar(snapshot.data()?.avatar ?? "https://firebasestorage.googleapis.com/v0/b/hdoktor-1b373.appspot.com/o/avatars%2FDefaultHastaAvatar.png?alt=media&token=0e4d1b7c-d8d1-477f-87ea-55768082f81b");
        setH_Cinsiyet(snapshot.data().cinsiyet);
        setH_Id(snapshot.data().Id);
        setH_email(snapshot.data().email);
      }
    })
    return () => {
      unmounted = true;
    };
  }, [])

// console.log(Clock);

  // const ClockStart = moment(TimeStart).locale("tr", trLocale).format('LT');
  // const ClockFinish = moment(TimeFinish).locale("tr", trLocale).format('LT');

  // console.log(TimeStart)
  // if (ClockStart =! "undefined") {
    // console.log(ClockStart)
  // }
  
  // console.log(ClockStart)



// console.log("clock length", Clock.length)


  LocaleConfig.locales["tr"] = {
    monthNames: [
      "Ocak",
      "Şubat",
      "Mart",
      "Nisan",
      "Mayıs",
      "Haziran",
      "Temmuz",
      "Ağustos",
      "Eylül",
      "Ekim",
      "Kasım",
      "Aralık",
    ],
    monthNamesShort: [
      "Oca.",
      "Şub.",
      "Mar.",
      "Nis.",
      "May.",
      "Haz.",
      "Tem.",
      "Ağu.",
      "Eyl.",
      "Eki.",
      "Kas.",
      "Ara.",
    ],
    dayNames: [
      "Pazar",
      "Pazartesi",
      "Salı",
      "Çarşamba",
      "Perşembe",
      "Cuma",
      "Cumartesi",
    ],
    dayNamesShort: ["Paz.", "Pzt.", "Sal.", "Çar.", "Per.", "Cum.", "Cmt."],
    today: "Bugün",
    // today: 'Aujourd\'hui'
  };
  LocaleConfig.defaultLocale = "tr";


  const [items, setItems] = useState({});

  const [DoluTarihler, setDoluTarihler] = useState();
  const [DoluSaatler, setDoluSaatler] = useState();

  const loadItems = (day) => {

    var clock = []



firebase.firestore().collection("D_user").doc(id).get().then((snapshot)=>{
        
  

        var Cstart =  moment(snapshot.data().time1.toDate()).locale("tr", trLocale).format('LT').split(":")
        var CFinish = moment(snapshot.data().time2.toDate()).locale("tr", trLocale).format('LT').split(":")
        
  

    for (var c = Number(Cstart[0]); c <= Number(CFinish[0]); c++){
      if (Number(Cstart[1]) == 0 && Number(CFinish[1]) == 0){
      clock.push(c + ":"+ "00")
      if (!(c == Number(CFinish[0]))) {
      clock.push(c + ":"+ "30")
      } 
  }else if (Cstart[1] == 30 && CFinish[1] == 30){
      if(c == Cstart[0]){
      clock.push(c + ":"+ "30")
      }else{
          clock.push(c + ":"+ "00")
          clock.push(c + ":"+ "30")
      }
  } else if (Cstart[1] > 0 && Cstart[1] < 30 && CFinish[1] > 0 && CFinish[1] < 30){
      if(c == Cstart[0]){
          clock.push(c + ":"+ "30")
          }else if (c == CFinish[0]){
              clock.push(c + ":"+ "00")
          }else{
          clock.push(c + ":"+ "00")
          clock.push(c + ":"+ "30")
          }
  }else if (Cstart[1] > 30 && Cstart[1] < 60 && CFinish[1] > 30 && CFinish[1] < 60){
      if (c+1 == Cstart[0]){
      clock.push(c+1 + ":"+ "00")
      clock.push(c+1 + ":"+ "30")
      }
      else if(c == CFinish[0]){
      clock.push(c + ":"+ "00")
      clock.push(c + ":"+ "30")
      }else{
          clock.push(c+1 + ":"+ "00")
          clock.push(c+1 + ":"+ "30")
      }
  }else if (Cstart[1] == 0 && CFinish[1] > 30 && CFinish[1] < 60) {
          clock.push(c + ":"+ "00")
          clock.push(c + ":"+ "30")
  }else if (Cstart[1] > 30 && Cstart[1] < 60 && CFinish[1] == 0){
      if (c+1 == Cstart[0]){
          clock.push(c+1 + ":" + "00")
      }else if (c == CFinish[0]){
          clock.push(c + ":"+ "00")
      }else{
          clock.push(c+1 + ":"+ "00")
          clock.push(c+1 + ":"+ "30")
      }
  }else if (Cstart[1] > 30 && Cstart[1] < 60 && CFinish[1] > 0 && CFinish[1] < 30) {
      if (c == Cstart[0]){
          clock.push(c+1 + ":"+ "00")
          clock.push(c+1 + ":"+ "30")
      }else if (c == CFinish[0]){
          clock.push(c + ":"+ "00")
      }
      else{
          clock.push(c+1 + ":"+ "00")
          clock.push(c+1 + ":"+ "30")
      }
  }else if (Cstart[1] > 0 && Cstart[1] < 30 && CFinish[1] > 30 && CFinish[1] < 60){
      if(c == Cstart[0]){
          clock.push(c + ":"+ "30")
          }else{
          clock.push(c + ":"+ "00")
          clock.push(c + ":"+ "30")
          }
  } else if (Cstart[1] > 0 && Cstart[1] < 30 && CFinish[1] == 30){
      if(c == Cstart[0]){
          clock.push(c + ":"+ "30")
          }else{
          clock.push(c + ":"+ "00")
          clock.push(c + ":"+ "30")
          }
  }else if (Cstart[1] == 30 && CFinish[1] > 0 && CFinish[1] < 30){
      if(c == Cstart[0]){
          clock.push(c + ":"+ "30")
          } else if (c == CFinish[0]){
          clock.push(c + ":"+ "00")
          }else{
          clock.push(c + ":"+ "00")
          clock.push(c + ":"+ "30")
          }
  }else if(Cstart[1] == 0 && CFinish[1] == 30){
      clock.push(c + ":"+ "00")
      clock.push(c + ":"+ "30")
  }else if(Cstart[1] == 30 && CFinish[1] == 0){
      if(c == Cstart[0]){
          clock.push(c + ":"+ "30")
      }else if (c == CFinish[0]){
          clock.push(c + ":"+ "00")
      }
      else{
          clock.push(c + ":"+ "00")
          clock.push(c + ":"+ "30")
      }
      
  }
  
  }



}).then(()=>{
  // console.log(clock);
  for (let i = -15; i < 85; i++) {
    const time = day.timestamp + i * 24 * 60 * 60 * 1000;
    const strTime = timeToString(time);
    // const strTime = moment(timeToString(time)).locale("tr", trLocale).format('l');
    // console.log(moment(time).locale("tr", trLocale).format('LL'));
    // console.log("deneme:", Clock);
   
    if (!items[strTime]) {
      items[strTime] = [];
      


      // const numItems = Math.floor(Math.random() * 3 + 1);
      const numItems = clock.length;

      setTimeout(()=>{

      // console.log("numItems", Clock.length)
      for (let j = 0; j < numItems; j++) {
          if(DoluZamanlarDizi.find(element => element.tarih == moment(strTime).locale("tr", trLocale).format('LL') && element.saat == clock[j])){
              items[strTime].push({
                // name: "Item for " + strTime + " #" + j,
                tarih:strTime,
                clock: clock[j],
                randevu: true,
                height: Math.max(50, Math.floor(Math.random() * 150)),
              });
          }else{
            items[strTime].push({
              // name: "Item for " + strTime + " #" + j,
              tarih:strTime,
              randevu: false,
              clock: clock[j],
              height: Math.max(50, Math.floor(Math.random() * 150)),
            });
          }
      }
    }, 1000)

    


    }
  }

  const newItems = {};
  Object.keys(items).forEach((key) => {
    newItems[key] = items[key];
  });
  setItems(newItems);

})  
  };

  const [tarih, setTarih] = useState();
  const [clockd, setClocdk] = useState();

  const [H_id , setH_Id] = useState();
  const [H_name , setH_Name] = useState();
  const [H_Avatar , setH_Avatar] = useState();
  const [H_Cinsiyet , setH_Cinsiyet] = useState();
  const [H_email , setH_email] = useState();

  const [refreshUseEffect, setRefreshUseEffect] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const Tarih = (tarih) =>{
  return moment(tarih).locale("tr", trLocale).format('LL');
  }


  const  GorusmeTalep =  () =>{
    const tarihTr = moment(tarih).locale("tr", trLocale).format('LL');

    firebase.firestore().collection("D_user").doc(id).collection("GorusmeTalep").where("email", "==", H_email).where("RandevuTarih", "==", tarihTr).where("RandevuSaat", "==", clockd).get().then((QuerySnapshot)=>{     
      if(QuerySnapshot.empty){
        console.log(tarihTr);
        firebase.firestore().collection("D_user").doc(id).collection("GorusmeTalep").doc().set({
              name: H_name,
              cinsiyet: H_Cinsiyet,
              // date: H_Date,
              // KHastalik: H_KHastalik,
              email: H_email,
              id:H_id,
              RandevuTarih: tarihTr,
              RandevuSaat: clockd,
              avatar: H_Avatar
              
      }
      )
    var now = new Date();

      firebase.firestore().collection("D_user").doc(id).collection("Bildirimlerim").doc().set({
        name: H_name,
        avatar: H_Avatar,
        RandevuTarih: tarihTr,
        RandevuSaat: clockd,
        saat: now
      })
      
      setModalVisible(!isModalVisible)
      alert("BAŞARILI!")
      } else{
        setModalVisible(!isModalVisible)
        alert("İlgili saat ve tarihde randevu talebiniz bulunmakta. ")
      }
    })
  
}

  const renderItem = (item) => {
    return (
    
      <View style={{ marginRight: 10, marginTop: 17 }}>
          <Card style={[{borderRadius:10} ,item.randevu ==  true ? styles.randevuVar : styles.randevuYok]}>
          <Card.Content>
            <View>
             {item.randevu  === true ?
<>
             <View style={{flexDirection:"row", alignItems:"center"}}>
              <Ionicons name="calendar-outline" size={20}  style={{marginRight:6}}/>
              <Text style={{ fontSize: 20, color: "black" }}>{Tarih(item.tarih)}</Text>
              </View>

              <View style={{flexDirection:"row", alignItems:"center", marginTop:10}}>
              <Ionicons name="time-outline" size={20}  style={{marginRight:6,}}/>
              <Text style={{ fontSize: 20, color:"black"}}>{item.clock}</Text>
              <View style={{ flex:1, alignItems:"flex-end"}}>
             {/* <Text style={{fontStyle:"italic"}}>DOLU</Text> */}
          </View>
             
              </View>
</>
             :
              <TouchableOpacity onPress={()=> toggleModal(item.tarih, item.clock)}>
             <View style={{flexDirection:"row", alignItems:"center"}}>
             <Ionicons name="calendar-outline" size={20}  style={{marginRight:6}}/>
             <Text style={{ fontSize: 20, color: "black" }}>{Tarih(item.tarih)}</Text>
             </View>

             <View style={{flexDirection:"row", alignItems:"center", marginTop:10}}>
             <Ionicons name="time-outline" size={20}  style={{marginRight:6,}}/>
             <Text style={{ fontSize: 20, color:"black"}}>{item.clock}</Text>
             <View style={{ flex:1, alignItems:"flex-end"}}>
            <Text style={{fontStyle:"italic"}}>Randevu Al</Text>
         </View>
            
             </View>
             </TouchableOpacity>
             
             }
         
              

              <Modal isVisible={isModalVisible}
      style={{margin:0, justifyContent:"center"}}
      // swipeDirection="down"
    onBackdropPress = {() => setModalVisible (false)} 
      // onSwipeComplete = { ( )  =>  setModalVisible ( false ) }

      >
        <View style={{backgroundColor:"white", width:Dimensions.get("screen").width / 1.2, alignSelf:"center", borderRadius:10, padding:20}}>
        <Text style={{fontSize:25, fontWeight:"bold"}}>Randevu Onayla</Text>
        <Text style={{fontSize:20, marginVertical:5}}>Tarih: {Tarih(tarih)}</Text>
        <Text style={{fontSize:20, marginBottom:5}}>Saat: {clockd}</Text>
        <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:10}}>
       
       <Pressable onPress={()=> setModalVisible(false)}>
        <View style={{backgroundColor:"#fafafa", padding:10, borderRadius:10}}>
          <Text style={{fontWeight:"bold", fontSize:20,}}>KAPAT</Text>
          </View>
          </Pressable>
         
         <Pressable onPress={GorusmeTalep}>
          <View  style={{backgroundColor:"#fafafa", padding:10, borderRadius:10}}>
          <Text style={{fontWeight:"bold", fontSize:20, color:"#0093c4"}}>ONAYLA</Text>
          </View>
          </Pressable>

        </View>
            
        </View>
      </Modal>
                            
            </View>
          </Card.Content>
        </Card>
      </View>
    
    );
  };



  
  return (
    <Agenda
      items={items}
     // removeClippedSubviews = {true}
     // Etkinleştirilerek removeClippedSubviews, bir öğe görünümden kaybolduğunda bellek boşaltılır. Uzun ve karmaşık bir listeniz (yani bir kart listesi) olduğunda, her bir kartın DOM'si oldukça büyüyebilir, bu nedenle görünür olmadığında belleği boşaltmak en iyisidir.
      loadItemsForMonth={loadItems}
      initialNumToRender={3}
      renderItem={renderItem}
      minDate={timeToString(date)}
      // minDate={'2022-05-08'} // YIL - AY - GÜN  -> GÜN VE AY TEK HANELİ İSE BAŞINA 0 KOY. 
      selected={timeToString(date)}
      maxDate={maxDate}
      pastScrollRange={1}
      futureScrollRange={2}
      // refreshing={refresh}
      // rowHasChanged={this.rowHasChanged}


    />
  );
};


const styles = StyleSheet.create({
  randevuVar:{
    backgroundColor:"#e57373"
  },
  randevuYok:{
    backgroundColor:"#4fc3f7"
  } 
})

export default Appointment;
