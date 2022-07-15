import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar, ScrollView, Image, Platform, Dimensions, Pressable } from 'react-native'
import {Ionicons} from "@expo/vector-icons";
import { useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Avatar } from 'react-native-elements';
import { CheckBox } from 'react-native-elements'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Modal from "react-native-modal";
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase/compat/app';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';



const SingUpStack = createNativeStackNavigator();


const SignUp00 = ({navigation}) => {

  const [error, setError] = useState(); 
  
  const errorMessage = (error) =>{
    navigation.navigate("SignUp0");
    setError(error)
  }

  const createAccount = async (name, email, password, cinsiyet, avatar) => {
    
        firebase
        .auth()
        .createUserWithEmailAndPassword(email, password).then((userCredential)=>{
            firebase.storage().ref("avatars/H_avatars/").child(avatar).getDownloadURL().then((avatarUrl)=> {
              firebase.firestore().collection("H_user").doc(userCredential.user.uid).set({
                       name: name,
                       email:email.toLowerCase(),
                       cinsiyet:cinsiyet,
                       Id:userCredential.user.uid,
                       avatar: avatarUrl
               })
              //  console.log("userCredential: ", userCredential)
               userCredential.user.updateProfile({
                 displayName: name,
                 photoURL:avatarUrl,
               })
              })
        }).catch((error)=>{
          console.log("error:", error)
          const errorCode = error.code;
          switch (errorCode.substr(5)) {
            case 'ERROR_EMAIL_ALREADY_IN_USE':
            case 'account-exists-with-different-credential':
            case 'email-already-in-use':
              // alert('Bu E-mail kullanılıyor.');
              // alert("Bu E-mail kullanılıyor.")
              errorMessage('Bu E-mail kullanılıyor.')
              break;
            case 'ERROR_WRONG_PASSWORD':
            case 'wrong-password':
            //   alert('Yanlış e-posta/şifre kombinasyonu.');
            // alert("Yanlış e-posta/şifre kombinasyonu.")
            errorMessage('Yanlış e-posta/şifre kombinasyonu.')

              break;
            case 'ERROR_OPERATION_NOT_ALLOWED':
            case 'operation-not-allowed':
              alert('Sunucu hatası, lütfen daha sonra tekrar deneyin.')
              break;                    
            case 'ERROR_INVALID_EMAIL':
            case 'invalid-email':
              // alert("Email adresi geçersiz.")
            errorMessage('Email adresi geçersiz.')

            //   alert('Email adresi geçersiz.');
              break;                    
            default:
              alert('Kayıt başarısız. Lütfen tekrar deneyin.');
              break;
          }
        })


}

const SignUp0 = ({navigation}) => {

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [PhoneNumber, SetPhoneNumber] = useState("");
  const [dogumTarih, setdogumTarih] = useState(new Date());






const [open, setOpen] = useState(false);
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

const showDatePicker = () => {
  setDatePickerVisibility(true);
};


const hideDatePicker = () => {
  setDatePickerVisibility(false);
};

const handleConfirm = (dogumTarih) => {
  setdogumTarih(dogumTarih)
  hideDatePicker();
};


const timeNow = new Date();
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
            <View style={{justifyContent:"center", alignItems:"center", flex:1}}>
<Image source={require("../../../components/Icons/hdoktor-logo-dikeyImageSize.png")} />
</View>
      <Text style={{fontSize:18, fontWeight:"bold", color:"red", alignSelf:"center"}}>{error}</Text>
      <View style={{flex:2}}>
            <TextInput 
            style={styles.input}
            placeholder="İsim"
            placeholderTextColor="grey"
            value={name}
            onChangeText={text => setName(text)}
            />
             <TextInput 
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="grey"
            value={email}
            onChangeText={text => setEmail(text)}

            />

            
<TextInput 
            style={styles.input}
            placeholder="Telefon Numarası"
            placeholderTextColor="grey"
            value={PhoneNumber}
            onChangeText={text=> SetPhoneNumber(text)}
            />

  <Text style={{fontSize:18, color:"grey", marginLeft:25, borderColor:"red", borderLeftWidth:5, paddingLeft:10}}>Doğum Tarihi</Text>
  <View style={{flexDirection:"row", justifyContent:"space-evenly"}}> 

      <TouchableOpacity onPress={showDatePicker}>
        <View style={{flexDirection:"row", borderBottomColor:"red", borderBottomWidth:2, height:50, paddingHorizontal:10, alignItems:"center"}}>
          {/* <Text>Başlangıç: </Text> */}
        <Ionicons name="chevron-down-outline" size={18} style={{marginLeft:10}}/>
        </View>
        </TouchableOpacity>
        <Ionicons name="remove-outline" size={18} style={{alignSelf:"center"}}/>
       
     
        <DateTimePickerModal
      isVisible={isDatePickerVisible}
      mode="date"
      onConfirm={handleConfirm}
      onCancel={hideDatePicker}
      locale="tr-TR"
      confirmTextIOS="Tamam"
      cancelTextIOS="İptal"
      />
         
      </View>

           

      
      <View style={{flexDirection:"row", justifyContent:"space-between"}}>

      <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
           <Text style={{borderRadius:20, paddingHorizontal:20, fontSize:20, color:"#ba000d", paddingVertical:8, alignSelf:"flex-end", textAlign:"center", marginTop:10}}>
           <Ionicons
                 name="chevron-back-outline"
                 size={20}
                 color="#ba000d"
                 />
             GERİ
           </Text>
           </TouchableOpacity>

           <TouchableOpacity onPress={() => navigation.navigate("SignUp1", {name: name, email: email})}>
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

const SignUp1 =  ({navigation}) => {
  const route = useRoute();
  const name = route.params.name;
  const email = route.params.email;
  // // console.log("name: ",name, " email: ", email);
  // const IletisimSaat = route.params.IletisimSaat;
  const [CalisilanYer, SetCalisilanYer] = useState("");
  const [password, setPassword] = useState("");
  

const [avatarLocal, setAvatarLocal] = useState('');
const [avatarFirebase, setAvatarFirebase] = useState('');


// This function is triggered when the "Select an image" button pressed
const showImagePicker = async () => {
  // Ask the user for the permission to access the media library 
  const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (permissionResult.granted === false) {
    alert("Bu uygulamanın fotoğraflarınıza erişmesine izin vermeyi reddettiniz!");
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({allowsEditing: true, presentationStyle: 0});

  // Explore the result
  console.log(result);

  if (!result.cancelled) {
    setAvatarLocal(result.uri);
    const filename = result.uri.split("/").pop();
    console.log(filename);
    uploadAvatar(result.uri, filename);
    setAvatarFirebase(filename);
  }
}

// This function is triggered when the "Open camera" button pressed
const openCamera = async () => {
  // Ask the user for the permission to access the camera
  const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
  

  if (permissionResult.granted === false) {
    alert("Bu uygulamanın kameranıza erişmesine izin vermeyi reddettiniz!");
  //   ImagePicker.requestCameraPermissionsAsync();
  return permissionResult;
  }

  const result = await ImagePicker.launchCameraAsync({allowsEditing: true, presentationStyle: 0});
  // allowsEditing: kırpma işlemi yapılsın mı?
  // aspect: 

  // Explore the result
  console.log(result);

  if (!result.cancelled) {
    setAvatarLocal(result.uri);
    const filename = result.uri.split("/").pop();
    console.log(filename);
    uploadAvatar(result.uri, filename);
    setAvatarFirebase(filename);
  }
}

const uploadAvatar = async (uri, imageName)  => {
  const response = await fetch(uri);
  const blob = await response.blob();

  var ref = await firebase.storage().ref("avatars/").child(imageName);
  return ref.put(blob);
}

const [checkedE, setCheckedE] = useState(false);
const [checkedK, setCheckedK] = useState(false);
const [cinsiyet, setCinsiyet] = useState("");
const isCheckedErkek = () => {
  if (checkedE == true) {
    setCheckedE(false)
    setCinsiyet("")
  }else{
    setCheckedE(true)
    setCinsiyet("Erkek")
    setCheckedK(false)
  }
}

const isCheckedKadın = () => {
  if (checkedK == true) {
    setCheckedK(false)
    setCinsiyet("")
  }else{
    setCheckedK(true)
    setCinsiyet("Kadın")
    setCheckedE(false)
  }
}

const [isModalVisible, setModalVisible] = useState(false);

const [isSozlesmeOnay, setIsSozlesmeOnay] = useState(false);
const [SozlesmeModal, setSozlesmeModal] = useState(false);

const [checkFirst, setcheckFirst] = useState(false);

const Sozlesme = (param) =>{
  if(param == "onayla"){
  setSozlesmeModal(!SozlesmeModal)
  setIsSozlesmeOnay(true)
  }else if (param == "check"){
    if(!(checkFirst)){
      setSozlesmeModal(!SozlesmeModal)
    }else{
      setIsSozlesmeOnay(!isSozlesmeOnay)
    }
    setcheckFirst(true);
  }else{
    setcheckFirst(true)
    setSozlesmeModal(true)
  }
}

const [isKronik, setIsKronik] = useState(false);

const toggleModal = () => {
  setModalVisible(!isModalVisible);
};

    return (
      <KeyboardAwareScrollView
      behavior={Platform.OS === "ios" ? "padding" : "padding"}
      style={styles.container}
      contentContainerStyle={{flex:1}}
      // contentContainerStyle={{justifyContent:"center", alignItems:"center"}}
    >
      <View style={styles.box}>
      
       
<View style={{alignItems:"center"}}>
  
        <View style={styles.InputCard}>

        <View style={{justifyContent:"center", alignItems:"center", flex:1.09}}>
        
         

{
avatarLocal == '' 

? 

<Avatar

size={130}
rounded
onPress={toggleModal}
source= {require("../../../components/Icons/DefaultHastaAvatar.png")}
> 

<Avatar.Accessory  size={27}   onPress={toggleModal} />
</Avatar>

:
<Avatar
source={{ uri: avatarLocal }}
size={130}
rounded
onPress={toggleModal}
>
  <Avatar.Accessory  size={27}   onPress={toggleModal} />
</Avatar>

}


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
        <Text style={{fontSize:25, fontWeight:"bold", alignSelf:"center"}}>Fotoğraf Yükle</Text>
          <TouchableOpacity
          style={{backgroundColor:"#d2302f", width:300, height:50, alignSelf:"center", alignItems:"center", justifyContent:"center", borderRadius:25}}
          onPress={showImagePicker}
          >
              <Text style={{fontSize:20,color:"white", fontWeight:"600"}}>Galerimden seç</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={{backgroundColor:"#d2302f", width:300, height:50, alignSelf:"center", alignItems:"center", justifyContent:"center", borderRadius:25}}
          onPress={openCamera}
          >
              <Text style={{fontSize:20, color:"white", fontWeight:"600"}}>Fotoğraf çek</Text>
          </TouchableOpacity>
          </View>
      </View>
    </Modal>
                {/* --- Modal --- */}

          
{/* 
<Image 
                  style={{width:100, height:100, borderRadius:100, backgroundColor:"red", zIndex:1}}
                  source={require("./src/photo.jpg")} 
                  />
                  <Avatar.Accessory size={25} style={{zIndex:2}}/> */}






              </View>
            
              <View style={{flex:2}}>
<View style={{flexDirection:"row", justifyContent:"space-evenly", }}> 
            <CheckBox
center
title='Erkek'
checkedIcon='dot-circle-o'
uncheckedIcon='circle-o'
containerStyle={{alignSelf:"baseline", backgroundColor:'rgba(52, 52, 52, 0.0)', borderWidth:0, borderRadius:0, borderBottomWidth:2, borderColor:"#f44336"}}
checked={checkedE}
checkedColor="#ba000d"
onPress={()=> isCheckedErkek(true)}
/>
<CheckBox
center
title='Kadın'
checkedIcon='dot-circle-o'
uncheckedIcon='circle-o'
containerStyle={{alignSelf:"baseline", backgroundColor:'rgba(52, 52, 52, 0.0)',borderWidth:0, borderRadius:0, borderBottomWidth:2, borderColor:"#f44336"}}
checked={checkedK}
checkedColor="#ba000d"
onPress={() => isCheckedKadın(true)}
/>

</View>

<View style={{marginTop:15, paddingLeft:10, justifyContent:"center", alignItems:"center"}}>
<CheckBox
      // center
      // iconType='square-o'
      title="Herhangi bir kronik hastalığınız var mı?"
      containerStyle={{backgroundColor:"white", borderWidth:0, width:300 }}
      checked={isKronik}
      // textStyle={{fontSize:18}}
      textStyle={{fontSize:17, fontStyle:"normal", fontWeight:"normal"}}
      checkedColor="#ba000d"
      // checkedIcon="fa-square-check"
      onPress={() => setIsKronik(!isKronik)}
    />

</View>


{isKronik &&

<View style={{minHeight:120}}>
<TextInput 
            style={{  width:300,
              // height:50,
              flex:1,
              margin:15,
              borderColor:"grey",
              borderWidth:1,
              borderRadius:10,
    
              paddingHorizontal:10,
              fontSize:18,
            paddingTop:4,
            
            }}
            placeholder="Lütfen belirtin"
            placeholderTextColor="grey"
            value={CalisilanYer}
            numberOfLines={5}
            textAlignVertical='top'
            multiline
            onChangeText={text=> SetCalisilanYer(text)}
            />

</View>

}



<TextInput 
            style={{
              width:300,
              height:50,
              // margin:15,
              marginTop:0,
              marginBottom:15,
              marginLeft:15,
              marginRight:15,
              borderColor:"#f44336",
              borderBottomWidth:2,
              borderRadius:0,
              paddingLeft:10,
              fontSize:18,
            }}
            placeholder="Şifre"
            placeholderTextColor="grey"
            secureTextEntry={true}
            value={password}
            onChangeText={text => setPassword(text)}
            />


              <TextInput 
            style={styles.input}
            placeholder="Tekrar Şifre"
            placeholderTextColor="grey"
            secureTextEntry={true}
            />

<View style={{flexDirection:"row", alignItems:"center", justifyContent:"center", width:300, marginLeft:30, marginTop:10}}>
{/* {console.log(SozlesmeText())} */}
<CheckBox        
      containerStyle={{backgroundColor:"white", borderWidth:0, margin:0, padding:0 }}
      checked={isSozlesmeOnay}
      checkedColor="#ba000d"
      size={20}
      onPress={() => Sozlesme("check")}
    />
          <Pressable onPress={()=> Sozlesme("abc")}>
    <View style={{flex:1, flexDirection:"row", width:300, alignItems:"center"}}>
    <Text style={{fontSize:15, color:"grey"}}> 
    <Text style={{fontSize:15, borderBottomWidth:1, color:"black", borderBottomColor:"black", textDecorationLine:"underline" }}>Kullanıcı Sözleşmesini </Text>
     Okudum ve onaylıyorum.</Text>
    </View>
    </Pressable>
</View>


<Modal isVisible={SozlesmeModal}
style={{justifyContent:"center"}}
// swipeDirection="down"
onBackdropPress = { ( )  =>  setSozlesmeModal ( false ) } 
// onSwipeComplete = { ( )  =>  setModalVisible ( false ) }
//   swipeDirection="down"
//   swipeDirection="left"
>
<View style={{height: Dimensions.get('screen').height / 1.6, backgroundColor:"white", borderRadius:20}}>

    <Ionicons name="close-outline" color="grey" size={30} onPress={() => setSozlesmeModal(false)} style={{alignSelf:"flex-end", marginRight:5}}/>
   <Text style={{fontSize:25, fontWeight:'700', paddingLeft:15, paddingBottom:10}}>Kullanıcı Sözleşmesi</Text>
   <ScrollView>
  <Text 
  style={{paddingHorizontal:10, textAlign:"justify",}}
  >
    
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed est ligula, faucibus in urna eu, aliquam tincidunt ante. Nam nec convallis libero, placerat ultricies risus. Donec felis justo, hendrerit nec arcu vitae, ultricies placerat mi. Ut in augue malesuada, pretium nunc imperdiet, finibus lorem. Morbi suscipit purus consequat commodo consequat. Morbi at blandit augue. Ut eget semper sapien. Nulla felis leo, condimentum eget quam et, ullamcorper convallis risus. Proin a ligula in tortor imperdiet lacinia. Etiam metus dolor, pulvinar vitae est et, venenatis maximus velit. Integer eu diam vel turpis vestibulum vulputate. Morbi fringilla elit sed orci tincidunt dictum.

Etiam interdum odio et justo condimentum, sit amet fringilla magna feugiat. Donec in gravida eros. Duis feugiat, quam et malesuada tempus, diam mi porta urna, non pharetra leo diam non mauris. Donec ut velit ornare, consectetur erat ut, porttitor felis. Quisque mattis cursus justo vitae eleifend. Cras sem neque, facilisis in lacus ut, sodales laoreet leo. Curabitur ut diam semper, tempus lorem eget, porttitor odio. Mauris congue mi ut metus vulputate iaculis non sollicitudin libero.

Aenean facilisis tincidunt venenatis. Etiam tempus, est ac condimentum tincidunt, orci dolor pellentesque risus, ut sollicitudin odio metus sit amet risus. Vestibulum vitae congue ante, id accumsan tellus. Suspendisse at odio at erat tristique consectetur nec et arcu. Aenean accumsan dignissim libero non placerat. Nulla nunc augue, efficitur blandit nisi ut, rutrum lobortis purus. Maecenas semper porta justo, quis bibendum dui bibendum ac.

Ut vel turpis aliquam, rhoncus leo a, rutrum turpis. Quisque porttitor tristique nunc ut commodo. Phasellus in egestas eros. Etiam condimentum et ex eget dapibus. Proin fringilla commodo neque auctor faucibus. Integer vitae molestie nunc, sed vehicula felis. Nullam neque eros, porttitor quis libero quis, dapibus ultricies purus. Nulla quis nisi eget enim tempor euismod sed maximus velit. Nunc neque risus, posuere ac rutrum fringilla, commodo ut lorem. Nam nec lorem ac felis viverra tincidunt. Cras quis quam eu orci tempus viverra.

Phasellus nec rhoncus urna. Sed id ex congue orci feugiat maximus. Nam scelerisque euismod magna. Duis bibendum mi et luctus mattis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque ut nisl eu quam aliquet vehicula. Cras placerat interdum dapibus. Etiam lorem diam, varius ut turpis condimentum, aliquet aliquam urna. Maecenas in urna non quam vestibulum venenatis. Aliquam posuere, ligula quis consequat semper, neque nulla pharetra ligula, sit amet tempor leo elit sit amet nulla. Sed viverra, justo vitae dignissim mollis, dui orci ultrices dolor, ac faucibus augue eros eu nibh. Integer non porttitor neque. Maecenas ut dolor sem. Ut mollis quis arcu accumsan sollicitudin. Vivamus in aliquam elit. Maecenas hendrerit dui et lectus pretium ultrices.


  </Text>

  </ScrollView>
  <Pressable onPress={()=> Sozlesme("onayla")}>
  <Text style={{alignSelf:"flex-end", marginRight:10, color:"blue", fontSize:18, margin:15 }}>
    ONAYLA
  </Text>
  </Pressable>
</View>
</Modal>



      
      
             <View style= {{flexDirection:"row", justifyContent:"space-between"}}>
             <TouchableOpacity onPress={()=> navigation.navigate("SignUp0")}>

         <Text style={{borderRadius:20, paddingHorizontal:2, fontSize:20, color:"#ba000d", paddingVertical:8, alignSelf:"flex-end", textAlign:"center", margin:10}}>
            
         <Ionicons
                 name="chevron-back-outline"
                 size={20}
                 color="#ba000d"
                 />
             GERİ

         </Text>

         </TouchableOpacity>
         

          <TouchableOpacity onPress={() => createAccount(name, email, password, cinsiyet, avatarFirebase)}> 
         <Text style={{borderRadius:20, paddingHorizontal:20, fontSize:20, color:"#ba000d", paddingVertical:8, alignSelf:"flex-end", textAlign:"center", margin:10, backgroundColor:"#fff", fontWeight:"bold"}}>
             KAYIT OL
          
         </Text>
         </TouchableOpacity>
         </View>

        </View>

        </View>

        </View>
       
        </View>
        </KeyboardAwareScrollView>


  )
}




    return(
      
            <SingUpStack.Navigator>
                <SingUpStack.Screen name="SignUp0" component={SignUp0} options={{animation:"slide_from_left", title:"Hasta Kayıt"}}/>
                <SingUpStack.Screen name="SignUp1" component={SignUp1} options={{animation:"slide_from_right", title:"Hasta Kayıt", headerBackVisible:false}}/>
            </SingUpStack.Navigator>
       
    )
}












const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white",
    },
    box:{
        alignItems: "center",
        justifyContent:"center",
        backgroundColor:"white",
    },
    InputCard:{
        backgroundColor:"white",
        

    },
    input:{
        width:300,
        height:50,
        margin:15,
        borderColor:"#f44336",
        borderBottomWidth:2,
        borderRadius:0,
        paddingLeft:10,
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
        borderBottomWidth:2,
        borderRadius:0,
        paddingLeft:10,
        fontSize:18,
        marginVertical:15,
        // backgroundColor:"yellow"
        // backgroundColor:"red"
    }
    
    

})

export default SignUp00
