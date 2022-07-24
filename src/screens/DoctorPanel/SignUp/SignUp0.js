import React, {useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image, LogBox } from 'react-native'
import {Ionicons} from "@expo/vector-icons";
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { TextInput } from "react-native-paper";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import trLocale from "moment/locale/tr"


const SignUp0 = ({navigation, route}) => {

  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
   ]);

    const CalisilanYer = route.params?.CalisilanYer ?? ""
    const password = route.params?.password ?? ""
    const cinsiyet = route.params?.cinsiyet ?? ""
    const avatar = route.params?.avatar ?? ""
    const againPassword = route.params?.againPassword ?? ""
   // const error = route.params?.error ?? ""
  
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [IletisimSaat, SetIletisimSaat] = useState("");
    const [brans, setBrans] = useState("");
  
  
    //   setError(route.params?.error ?? " ");
      // console.log(error)
      
     
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Acil Tıp', value: '1'},
    {label: 'Adli Tıp', value: '2'},
    {label: 'Ağız, Diş ve Çene Cerrahisi', value: '3'},
    {label: 'Ağız, Diş ve Çene Radyolojisi', value: '4'},
    {label: 'Ağız, Yüz ve Çene Cerrahisi', value: '5'},
    {label: 'Aile Hekimliği', value: '6'},
    {label: 'Alerji Hastalıkları(İç Hast.)', value: '7'},
    {label: 'Algoloji (Anesteziyoloji ve Reanimasyon)', value: '8'},
    {label: 'Algoloji (FTR)', value: '9'},
    {label: 'Algoloji (Nöroloji)', value: '10'},
    {label: 'Anatomi', value: '11'},
    {label: 'Androloji(Üroloji)', value: '12'},
    {label: 'Anesteziyoloji ve Reanimasyon', value: '13'},
    {label: 'Askeri Sahra Hekimliği', value: '14'},
    {label: 'Beyin ve Sinir Cerrahisi', value: '15'},
    {label: 'Cerrahi Onkoloji (Genel Cerrahi)', value: '16'},
    {label: 'Çevre Sağlığı', value: '17'},
    {label: 'Çocuk Acil', value: '18'},
    {label: 'Çocuk Alerjisi', value: '19'},
    {label: 'Çocuk Cerrahisi', value: '20'},
    {label: 'Çocuk Diş Hekimliği', value: '21'},
    {label: 'Çocuk Endokrinolojisi', value: '22'},
    {label: 'Çocuk Endokrinolojisi ve Metabolizma Hastalıkları', value: '23'},
    {label: 'Çocuk Enfeksiyon Hastalıkları', value: '24'},
    {label: 'Çocuk Gastroenterolojisi', value: '25'},
    {label: 'Çocuk Genetik Hastalıkları', value: '26'},
    {label: 'Çocuk Göğüs Hastalıkları', value: '27'},
    {label: 'Çocuk Hematolojisi ', value: '28'},
    {label: 'Çocuk Hematolojisi ve Onkolojisi', value: '29'},
    {label: 'Çocuk İmmünolojisi', value: '30'},
    {label: 'Çocuk İmmünolojisi ve Alerji Hastalıkları', value: '31'},
    {label: 'Çocuk Kalp ve Damar Cerrahisi', value: '32'},
    {label: 'Çocuk Kardiyolojisi', value: '33'},
    {label: 'Çocuk Metabolizma Hastalıkları', value: '34'},
    {label: 'Çocuk Nefrolojisi', value: '35'},
    {label: 'Çocuk Nörolojisi', value: '36'},
    {label: 'Çocuk Onkolojisi', value: '37'},
    {label: 'Çocuk Romatoloji', value: '38'},
    {label: 'Çocuk Sağlığı ve Hastalıkları', value: '39'},
    {label: 'Çocuk Ürolojisi', value: '40'},
    {label: 'Çocuk Ürolojisi (Çocuk Cerrahisi)', value: '41'},
    {label: 'Çocuk Ürolojisi (Üroloji)', value: '42'},
    {label: 'Çocuk ve Ergen Ruh Sağlığı ve Hastalıkları', value: '43'},
    {label: 'Deri ve Zührevi Hastalıkları', value: '44'},
    {label: 'Dermatopatoloji', value: '45'},
    {label: 'Diğer Branş', value: '46a'},
    {label: 'Diş Hastalıkları ve Tedavisi', value: '46'},
    {label: 'El Cerrahisi (Genel Cerrahi)', value: '48'},
    {label: 'El Cerrahisi(Ortopedi ve Travmatoloji)', value: '49'},
    {label: 'El Cerrahisi(Plastik_Rekons.ve Estetik Cerr.)', value: '50'},
    {label: 'Embriyoloji ve Histoloji', value: '51'},
    {label: 'Endodonti', value: '52'},
    {label: 'Endokrinoloji ve Metabolizma Hastalıkları', value: '53'},
    {label: 'Enfeksiyon Hastalıkları (İç Hast.)', value: '54'},
    {label: 'Enfeksiyon Hastalıkları ve Klinik Mikrobiyoloji', value: '55a'},
    {label: 'Fizikoterapi ve İdroterapi', value: '55'},
    {label: 'Fiziksel Tıp ve Rehabilitasyon', value: '56'},
    {label: 'Fizyoloji', value: '57'},
    {label: 'Gastroenteroloji(İç Hast.)', value: '58'},
    {label: 'Gastroentroloji Cerrahisi(Genel Cerr.)', value: '59'},
    {label: 'Gelişimsel Pediatri', value: '60'},
    {label: 'Genel Cerrahi', value: '61'},
    {label: 'Geriatri(İç Hast.)', value: '62'},
    {label: 'Girişimsel Radyoloji(Radyoloji)', value: '63'},
    {label: 'Göğüs Cerrahisi.', value: '64'},
    {label: 'Göğüs Hastalıkları', value: '65'},
    {label: 'Göz Hastalıkları', value: '66'},
    {label: 'Halk Sağlığı', value: '67a'},
    {label: 'Hava ve Uzay Hekimliği', value: '67'},
    {label: 'Hematoloji(İç Hast.)', value: '68'},
    {label: 'Hemodiyaliz Kliniği', value: '69'},
    {label: 'İç Hastalıkları', value: '70'},
    {label: 'İlk ve Acil Yardım', value: '71'},
    {label: 'İmmünoloji(Tıbbi Mikrobiyoloji)', value: '72'},
    {label: 'İmmünoloji ve Alerji Hastalıklar(İç Hastalıkları)', value: '73'},
    {label: 'İmmünoloji ve Alerji Hastalıkları (Deri ve Zührevi Hastalıkları)', value: '74'},
    {label: 'İmmünoloji ve Alerji Hastalıkları(Göğüs Hastalıkları)', value: '75'},
    {label: 'İmmünoloji ve Alerji Hastalıkları (Göğüs Hastalıkları)', value: '76'},
    {label: 'İş ve Meslek Hastalıkları', value: '77'},
    {label: 'İşyeri Hekimliği(Halk Sağlığı)', value: '78'},
    {label: 'Jinekolojik Onkoloji Cerrahisi', value: '79'},
    {label: 'Kadın Hastalıkları ve Doğum', value: '80'},
    {label: 'Kalp ve Damar Cerrahisi', value: '81'},
    {label: 'Kardiyoloji', value: '82'},
    {label: 'Klinik Genetik', value: '83'},
    {label: 'Klinik Genetik', value: '84'},
    {label: 'Klinik Genetik(Tıbbi Genetik)', value: '85'},
    {label: 'Klinik Moleküler Genetik(Tıbbi Genetik)', value: '86'},
    {label: 'Klinik Nörofizyoloji', value: '87'},
    {label: 'Klinik Sitogenetik(Tıbbi Genetik)', value: '88'},
    {label: 'Kulak-Burun-Boğaz Hastalıkları', value: '89'},
    {label: 'Mikoloji(Tıbbi Mikrobiyoloji)', value: '90'},
    {label: 'Nefroloji', value: '91'},
    {label: 'Neonatoloji', value: '92'},
    {label: 'Nöroloji', value: '93'},
    {label: 'Nöropatoloji', value: '94'},
    {label: 'Nöroradyoloji(Radyoloji)', value: '95'},
    {label: 'Nükleer Tıp', value: '96'},
    {label: 'Okul Hekimliği', value: '97'},
    {label: 'Ortodonti', value: '98'},
    {label: 'Ortopedi ve Travmatoloji', value: '99'},
    {label: 'Pediyatrik Radyoloji', value: '100'},
    {label: 'Perinatoloji', value: '101'},
    {label: 'Periodontoloji', value: '102'},
    {label: 'Plastik, Rekonstrüktif ve Estetik Cerrahi', value: '103'},
    {label: 'Pratisyen Hekim', value: '104'},
    {label: 'Protetik Diş Tedavisi', value: '105'},
    {label: 'Radyasyon Onkolojisi', value: '106'},
    {label: 'Radyoloji', value: '107'},
    {label: 'Restoratif Diş Tedavisi', value: '108'},
    {label: 'Romatoloji(Fizik Tedavi)', value: '109'},
    {label: 'Romatoloji(İç Hast.)', value: '110'},
    {label: 'Ruh Sağlığı ve Hastalıkları', value: '111'},
    {label: 'Sitopatoloji(Tıbbi Patoloji)', value: '112'},
    {label: 'Spor Hekimliği', value: '113'},
    {label: 'Sualtı Hekimliği ve Hiperbarik Tıp', value: '114'},
    {label: 'Tıbbi Biyokimya', value: '115'},
    {label: 'Tıbbi Biyoloji', value: '116'},
    {label: 'Tıbbi Biyoloji ve Genetik', value: '117'},
    {label: 'Tıbbi Ekoloji ve Hidroklimatoloji', value: '118'},
    {label: 'Tıbbi Farmakoloji', value: '119'},
    {label: 'Tıbbi Genetik', value: '120'},
    {label: 'Tıbbi Mikrobiyoloji', value: '121'},
    {label: 'Tıbbi Onkoloji(İç Hast.)', value: '122'},
    {label: 'Tıbbi Parazitoloji', value: '123'},
    {label: 'Tıbbi Patoloji', value: '124'},
    {label: 'Toksikoloji(Adli Tıp)', value: '125'},
    {label: 'Toksikoloji(Tıbbi Farmakoloji)', value: '126'},
    {label: 'Tüberküloz, Allerjik Hastalıklar (Göğüs Hastalıkları)', value: '127'},
    {label: 'Üreme Endokrinolojisi ve İnfertilite', value: '128'},
    {label: 'Üroloji', value: '129'},
    {label: 'Viroloji(Tıbbi Mikrobiyoloji)', value: '130'},
    {label: 'Yoğun Bakım (Anesteziyoloji ve Reanimasyon)', value: '131'},
    {label: 'Yoğun Bakım(Çocuk Sağ. ve Hast.)', value: '132'},
    {label: 'Yoğun Bakım (Enfeksiyon Hastalıkları ve Klinik Mikrobiyoloji)', value: '133'},
    {label: 'Yoğun Bakım (Genel Cerrahi)', value: '134'},
    {label: 'Yoğun Bakım(Göğüs Hast.)', value: '135'},
    {label: 'Yoğun Bakım(İç Hast.)', value: '136'},
    {label: 'Yoğun Bakım(Nöroloji)', value: '137'},
  
  ]);
  
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
  const [time1, setTime1] = useState("Başlangıç Saati");
  const [time2, setTime2] = useState("Bitiş Saati");
  
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  
  const showDatePicker2 = () => {
    setDatePickerVisibility2(true);
  };
  
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  
  const hideDatePicker2 = () => {
    setDatePickerVisibility2(false);
  };
  
  const handleConfirm1 = (time1) => {
    setTime1(time1)
    hideDatePicker();
  };
  const handleConfirm2 = (time2) => {
    // console.warn("A date has been picked: ", date);
    setTime2(time2)
    hideDatePicker2();
  };
  const [error, setError] = useState(route.params?.error ?? ""); 


  const NextForm = (name, email, brans, time1, time2) =>{
       
    if(name == "" || email == "" || brans == "" || time1 == "Başlangıç Saati" || time2 == "Bitiş Saati"){
      setError("Formu lütfen doldurunuz.")
    }
   
    
    else{
      var clock1 = moment(time1).locale("tr", trLocale).format('LT')
      var clock2 = moment(time2).locale("tr", trLocale).format('LT')
   
      function parseTime(s) {
        var c = s.split(':');
        return parseInt(c[0]) * 60 + parseInt(c[1]);
     }
     var minutes = parseTime(clock2) - parseTime (clock1);
   

      if(minutes < 60){
      setError("Çalışma saatiniz en az 1 saat olmalıdır.")
      }
      else{
        setError("")
        navigation.navigate("DSignUp1", {name: name, email: email, brans:brans, time1: time1, time2: time2, CalisilanYer: CalisilanYer, password: password,
          cinsiyet: cinsiyet, avatar: avatar,
          againPassword: againPassword
        })
      }
    
    }
  }



  const NameValidate = (name) =>{
    if(name != ""){
      if(name.length > 1){
        return(
          <TextInput.Icon name="check-circle-outline" forceTextInputFocus={false} color={"green"}/>
        )
      }else{
        return(
          <TextInput.Icon name="close-circle-outline" forceTextInputFocus={false} color={"#f44336"}/>
        )
      }
    }
}

const emailValidate = (email) =>{

  // const [isEmail, setIsEmail] = useState(false);
  
    if(email != ""){
      if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.toLowerCase())){
        // firebase.auth().fetchSignInMethodsForEmail(email.toLowerCase()).then((signInMethods)=>{
        //   // fetchSignInMethodsForEmail : Belirli bir kullanıcıda oturum açmak için kullanılabilecek kimlik doğrulama yöntemlerinin bir listesini döndürür (ana e-posta adresiyle tanımlanır).
        //  setIsEmail(signInMethods.length == 0)
        // })
        // if(isEmail){
        //   return(
        //     <TextInput.Icon name="check-circle-outline" color={"green"}/>
        //   )
        // }else{
        //   return(
        //     <TextInput.Icon name="close-circle-outline" color={"#f44336"}/>
        //   )
        // }
        return(
          <TextInput.Icon name="check-circle-outline" forceTextInputFocus={false} color={"green"}/>
        )
      }else{
        return(
          <TextInput.Icon name="close-circle-outline" forceTextInputFocus={false} color={"#f44336"}/>
        )
      }
    }
  }

  
    return (
      

        <KeyboardAwareScrollView
      behavior="padding"
      style={styles.container}
      contentContainerStyle={{flex:1}}
  >
            
  
        <View style={styles.box}>
            
        <StatusBar 
        barStyle="dark-content"
        backgroundColor="white"
        />
          <View style={styles.InputCard}>
              <View style={{flex:0.7, justifyContent:"center", alignItems:"center"}}>
  <Image source={require("../../../rec/Logos/hdoktor-logo-dikeyImageSize.png")} />
  </View>
  
  <Text style={{fontSize:18, fontWeight:"bold", color:"red", alignSelf:"center"}}>{error}</Text>
        
        <View style={{flex:2}}>
              <TextInput 
              style={styles.input}
              placeholder="İsim"
              placeholderTextColor="grey"
              value={name}
              onChangeText={text => setName(text)}
              underlineColor="#f44336"
              activeUnderlineColor='#f44336'
              outlineColor="white"
              activeOutlineColor="red"
              right={NameValidate(name)}
              />
               <TextInput 
               style={styles.input}
               placeholder="E-mail"
               placeholderTextColor="grey"
               underlineColor="#f44336"
               activeUnderlineColor='#f44336'
               outlineColor="white"
               keyboardType="email-address"
               right={emailValidate(email)}
               value={email}
               onChangeText={text => setEmail(text)}
  
              />
              <DropDownPicker
      open={open}
      value={value}
      onChangeValue={(value) => {
    // value'si seçilen value'ye eşit olan
    for(var i = 0; i< items.length; i++){
      if (value == items[i].value) {
        setBrans(items[i].label)
      }
    }
      }}
  
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      listMode="MODAL"
      placeholder="Branş"
      placeholderStyle={{
        color: "grey",
      }}
      dropDownDirection="TOP"
      style={styles.picker}
      containerStyle={{width:300, justifyContent:"center", alignSelf:"center",}}
      textStyle={{
        fontSize: 18,
      }}
      listItemLabelStyle={{
        color: "#000", 
        
      }}
      itemSeparator={true}
      dropDownContainerStyle={{
        // backgroundColor: "#dfdfdf",
        borderRadius:8,
        borderWidth:1,
        // backgroundColor:"#fafafa"
        borderColor:"#eceff1",
        borderTopWidth:0,
        height:600,
        backgroundColor:"whitesmoke"
  
      }}
      itemSeparatorStyle={{
        backgroundColor: "grey",
        marginLeft:10,
        height:StyleSheet.hairlineWidth
      }}
      searchable={true}
      searchPlaceholder="Ara..."
      searchTextInputStyle={{
        color: "#000",
        // backgroundColor:"red",
        borderWidth:0,
        borderWidth:StyleSheet.hairlineWidth,
        borderColor:"grey",
        flex:1
  
      }}
      language="TR"
      searchContainerStyle={{
        borderWidth:0,
        borderBottomWidth:0
      }}
      selectedItemContainerStyle={{
        backgroundColor: "#f44336"
      }}
  
  
      />
    {/* {console.log(date.getMinutes)} */}
    <Text style={{fontSize:18, color:"grey", marginLeft:18,  paddingLeft:10,}}>Çalışma Saatleri</Text>
  
    <View style={{flexDirection:"row", justifyContent:"space-evenly", flex:0.9,marginTop:10, alignItems:"center"}}> 
        <TouchableOpacity onPress={showDatePicker}>
          <Text style={{marginLeft:10, color:"grey", fontSize:18, marginTop:5}}>Başlangıç</Text>
          <View style={{flexDirection:"row", borderBottomColor:"red", borderBottomWidth:0.8, height:50, paddingHorizontal:10, alignItems:"center"}}>
            {/* <Text>Başlangıç: </Text> */}
         <Text  style={{fontSize:18}}>
         
         {time1 == "Başlangıç Saati" ? 
         time1 : 
         moment(time1).locale("tr", trLocale).format('LT')}


         
         </Text>
          <Ionicons name="chevron-down-outline" size={18} style={{marginLeft:10}}/>
          </View>
          </TouchableOpacity>
          <Ionicons name="remove-outline" size={18} style={{alignSelf:"center"}}/>
          <TouchableOpacity onPress={showDatePicker2}>
          <Text style={{marginLeft:10, color:"grey", fontSize:18, marginTop:5}}>Bitiş</Text>
          <View style={{flexDirection:"row", borderBottomColor:"red",  borderBottomWidth:0.8, height:50,  paddingHorizontal:10, alignItems:"center"}}>
         <Text style={{fontSize:18}}>
          
          
          {time2 == "Bitiş Saati" ? 
          time2 : 
          moment(time2).locale("tr", trLocale).format('LT')}
          
          </Text>
          <Ionicons name="chevron-down-outline" size={18} style={{marginLeft:10}}/>
          </View>
          </TouchableOpacity>
       
          <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        date={time1 == "Başlangıç Saati" ? new Date(2022, 10, 10, 8, 0, 0, 0) : time1}
        onConfirm={handleConfirm1}
        onCancel={hideDatePicker}
        locale="tr-TR"
        confirmTextIOS="Tamam"
        cancelTextIOS="İptal"
        />
           <DateTimePickerModal
        isVisible={isDatePickerVisible2}
        mode="time"
        date={time2 == "Bitiş Saati" ? new Date(2022, 10, 10, 17, 0, 0, 0) : time2}
        onConfirm={handleConfirm2}
        onCancel={hideDatePicker2}
        locale="tr-TR"
        confirmTextIOS="Tamam"
        cancelTextIOS="İptal"
        />
        </View>
  
        <View style={{flexDirection:"row", justifyContent:"space-between",   flex: 1, marginTop:5}}>
  
        <TouchableOpacity onPress={() => navigation.navigate("D_SignIn")}>
             <Text style={{borderRadius:20, paddingHorizontal:20, fontSize:20, color:"#ba000d", paddingVertical:8, alignSelf:"flex-end", textAlign:"center", marginTop:10}}>
             <Ionicons
                     name="chevron-back-outline"
                     size={20}
                     color="#ba000d"
                     />
                 GERİ
                
             </Text>
             </TouchableOpacity>
  
             <TouchableOpacity onPress={()=>{
              NextForm(name, email, brans, time1, time2)
             }}
         >
             
             
             
             <Text style={{borderRadius:20, paddingHorizontal:20, fontSize:20, color:"#ba000d", paddingVertical:8, alignSelf:"flex-end", textAlign:"center", marginTop:10}}>
                 İLERİ
                 <Ionicons
                     name="chevron-forward-outline"
                     size={20}
                     />
             </Text>
             </TouchableOpacity>
  
        </View>
          </View>
          </View>
          </View>
          </KeyboardAwareScrollView>

  
  
    )
  }


  const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white",

    },
    box:{
        alignItems: "center",
        backgroundColor:"white",
        justifyContent:"center",
                
       
    },
    scrollView: {
      flex:1,
      // backgroundColor:"blue",
      alignSelf: 'center',
      borderColor: 'black',
      borderWidth:2,
      // justifyContent:"center"
      

    
    },
    contentContainer: {
      justifyContent:"center"
    },
    InputCard:{
        backgroundColor:"white",
    },
    input:{
        width:300,
        height:50,
        margin:15,
        backgroundColor:"white",
        fontSize:18,
        // backgroundColor:"red"
    },
      image: {
        width: 50,
        height: 50,
        resizeMode: 'cover',
        borderRadius:10,
        marginLeft:15
        // borderRadius:100
      },
    picker:{
        width:300,
        height:50,
        borderTopWidth:0,
        borderLeftWidth:0,
        borderRightWidth:0,
        borderColor:"#f44336",
        borderBottomWidth:0.8,
        borderRadius:0,
        paddingLeft:10,
        fontSize:18,
        marginVertical:15,
        // backgroundColor:"yellow"
        // backgroundColor:"red"
    }
    
    

})


  export default SignUp0;