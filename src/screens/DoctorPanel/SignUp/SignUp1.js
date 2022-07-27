import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, Image,  Platform, Dimensions, Pressable, Alert } from 'react-native'
import {Ionicons} from "@expo/vector-icons";
import { useRoute } from '@react-navigation/native';
import { Avatar } from 'react-native-elements';
import { CheckBox } from 'react-native-elements';
import { TextInput } from "react-native-paper";
import Modal from "react-native-modal";
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase/compat/app';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AnimatedLottieView from "lottie-react-native";


const SignUp1 =  ({navigation}) => {
  const route = useRoute()
  const [cinsiyet, setCinsiyet] = useState(route.params?.cinsiyet ?? "");

 
    const [isLoading, setIsLoading] = useState(false);
  
    const [isCreateAccount, setIsCreateAccount] = useState(false);
    
    const [isSozlesmeOnay, setIsSozlesmeOnay] = useState(route.params?.isSozlesmeOnay ?? false);
    const [SozlesmeModal, setSozlesmeModal] = useState(false);
  
  
    const isCreateAccountInfo = () => {
      setTimeout(()=>setIsCreateAccount(true), Platform.OS === "ios" ? 3000 : 0)
      // setIsCreateAccount(true)
      setTimeout(()=>{
        setIsCreateAccount(false)
      }, Platform.OS === "ios" ? 6000 : 3000)
    } 
   
      // console.log(isCreateAccount)
  
    
    const errorMessage = (error) => {
      navigation.navigate("DSignUp0", {
        CalisilanYer: CalisilanYer,
        password:password, 
        cinsiyet:cinsiyet, 
        avatarLocal:AvatarImagePath, 
        avatarFirebase: avatar,
        error: error,
        againPassword: password,
        isSozlesmeOnay: true
      })
    }
  
    
  
    const createAccount = async (name, email, password, brans, CalisilanYer, time1,time2, cinsiyet, avatar) => {
      
      setIsLoading(true)
  
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password).then((userCredential)=>{
        firebase.storage().ref("avatars/D_avatars/").child(avatar == "" ? "DefaultDoctorAvatar.png" : avatar).getDownloadURL().then((avatarUrl)=>{
           console.log("avatarUrl", avatarUrl)
             firebase.firestore().collection("D_user").doc(userCredential.user.uid).set({
                      name: name,
                      email:email.toLowerCase(),
                      brans:brans,
                      CalisilanYer:CalisilanYer,
                      time1: time1,
                      time2: time2,
                      cinsiyet:cinsiyet,
                      avatar:avatarUrl,
                      Id:userCredential.user.uid,
              })    
  
            // console.log("userCredential: ", userCredential)
            userCredential.user.updateProfile({
              displayName: name,
              photoURL:avatarUrl,
            })
  
            // navigation.navigate("D_SignIn", {isCreateAccount: true})
            
            }).catch(()=>{
              alert("Profil fotoğrafı yüklenemedi. Lütfen daha sonra tekrar deneyin.");
            })   
            setIsLoading(false)
  
            // isCreateAccountInfo()
            isCreateAccountInfo()
            
      }).catch((error)=>{
        setIsLoading(false)
        const errorCode = error.code;
        switch (errorCode.substr(5)) {
          case 'ERROR_EMAIL_ALREADY_IN_USE':
          case 'account-exists-with-different-credential':
          case 'email-already-in-use':
            // alert('Bu E-mail kullanılıyor.');
            errorMessage('Bu E-mail kullanılıyor.')
            
            break;
          case 'ERROR_WRONG_PASSWORD':
          case 'wrong-password':
          //   alert('Yanlış e-posta/şifre kombinasyonu.');
          errorMessage('Yanlış e-posta/şifre kombinasyonu.')
  
          break;
          case 'ERROR_OPERATION_NOT_ALLOWED':
          case 'operation-not-allowed':
            Alert.alert("Hata❗", "Sunucu hatası, lütfen daha sonra tekrar deneyin.", [{text:"Tamam", style:"cancel"}])
            break;                    
          case 'ERROR_INVALID_EMAIL':
          case 'invalid-email':
          errorMessage('Email adresi geçersiz.')
            break;                    
          default:
            // console.log(errorCode) // auth/weak-password' zayıf şifre de var.
            Alert.alert("Hata❗", "Kayıt başarısız. Lütfen tekrar deneyin.", [{text:"Tamam", style:"cancel"}])
            break;
        }
      });
      // firebase önündeki await'i sildin sadece!
  }
  
   
    const name = route.params.name;
    const email = route.params.email;
    const brans = route.params.brans;
    // console.log("name: ",name, " email: ", email);
    const time1 = route.params.time1;
    const time2 = route.params.time2;
   
     //console.log(route.params?.avatar)
  
    const [avatar, setavataruri] = useState(route.params?.avatarFirebase ?? "");
  const [CalisilanYer, SetCalisilanYer] = useState(route.params?.CalisilanYer ?? "");
  const [password, setPassword] = useState(route.params?.password ?? "");
  // console.log(AvatarImagePath)
  
  const [PhotosImagePath, setPhotosImagePath] = useState('');
  const [AvatarImagePath, setAvatarImagePath] = useState(route.params?.avatarLocal ?? "");

  //console.log(route.params.avatar)
 // console.log(AvatarImagePath)
  
  
  // This function is triggered when the "Select an image" button pressed
  const AvatarShowImagePicker = async () => {
    // Ask the user for the permission to access the media library 
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (permissionResult.granted === false) {
      Alert.alert("Uyarı⚠️","Bu uygulamanın fotoğraflarınıza erişmesine izin vermeyi reddettiniz", [{text:"Tamam", style:"cancel"}]);
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({allowsEditing: true, presentationStyle: 0});
  
    if (!result.cancelled) {
      setAvatarImagePath(result.uri);
     
      const filename = result.uri.split('/').pop();
      uploadAvatar(result.uri, filename);
      setavataruri(filename);
    }
  }
  
  // This function is triggered when the "Open camera" button pressed
  const openCameraAvatar = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
  
    if (permissionResult.granted === false) {
      Alert.alert("Uyarı⚠️","Bu uygulamanın kameranıza erişmesine izin vermeyi reddettiniz.", [{text:"Tamam", style:"cancel"}]);

    //   ImagePicker.requestCameraPermissionsAsync();
    return permissionResult;
    }
  
    const result = await ImagePicker.launchCameraAsync({allowsEditing: true, mediaTypes:ImagePicker.MediaTypeOptions.Images, presentationStyle: 0});
    // allowsEditing: kırpma işlemi yapılsın mı?
    // aspect: 
  
    // Explore the result
    // console.log(result);
  
    if (!result.cancelled) {
      setAvatarImagePath(result.uri);
     const filename = result.uri.split('/').pop(); // '/' işareti gördüğünde split metotuya ayırır. Dizi döndürür. // pop() ile ayırdıklarıının en sonunu alır
      // console.log(result.uri.replace('file://', ''));
     // console.log(filename);
      uploadAvatar(result.uri, filename);
      setavataruri(filename);
    }
  
    
  }
  
  
  const PhotosShowImagePicker = async () => {
    // Ask the user for the permission to access the media library 
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (permissionResult.granted === false) {
      Alert.alert("Uyarı⚠️","Bu uygulamanın fotoğraflarınıza erişmesine izin vermeyi reddettiniz", [{text:"Tamam", style:"cancel"}]);
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({allowsEditing: true, presentationStyle: 0});
  
    // Explore the result
    // console.log(result);
  
    if (!result.cancelled) {
      setPhotosImagePath(result.uri);
      uploadPhotos(result.uri, "test-image");
      
      // console.log(result.uri);
    }
  }
  
  const uploadAvatar = async (uri, imageName) => {
    
  
    const response = await fetch(uri);
    const blob = await response.blob();
  
    var ref = await firebase.storage().ref("avatars/D_avatars").child(imageName);
    return ref.put(blob);
  
  }
  
  
  
  const uploadPhotos = async (uri, imageName) => {
  
    const response = await fetch(uri);
    const blob = await response.blob();
  
    var ref = firebase.storage().ref().child("photos/", imageName);
    return ref.put(blob);
  
    const uploadTask = storageRef().put(blob);
  
  }
  
  
  const [checkedE, setCheckedE] = useState(route.params?.cinsiyet == "Erkek" ?  true : false);
  const [checkedK, setCheckedK] = useState(route.params?.cinsiyet == "Kadın" ? true : false);
 
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
  
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  
  
  const { height } = Dimensions.get("window");
  
  //const [screenHeight, setScreenHeight] = useState(height);
  
  // const onContentSizeChange = (contentWidth, contentHeight) => {
  //   setScreenHeight(contentHeight);
  // };

  const [ispasswordSee, setispasswordSee] = useState(true);
  const [isAgainPasswordSee, setAgainPasswordSee] = useState(true);
  const [againPassword, setAgainPassword] = useState(route.params?.againPassword ?? "");

  const passwordSee = () =>{
    if(!ispasswordSee){
      return(
        <TextInput.Icon name="eye-outline" forceTextInputFocus={false} onPress={()=> setispasswordSee(!ispasswordSee)}/>
      )
    }else{
      return(
        <TextInput.Icon name="eye-off-outline" forceTextInputFocus={false} onPress={()=> setispasswordSee(!ispasswordSee)}/>
      )
    }
  }

  const againPasswordSee = () => {
    if(!isAgainPasswordSee){
      return(
        <TextInput.Icon name="eye-outline" forceTextInputFocus={false} onPress={()=> setAgainPasswordSee(!isAgainPasswordSee)}/>
      )
    }else{
      return(
        <TextInput.Icon name="eye-off-outline" forceTextInputFocus={false} onPress={()=> setAgainPasswordSee(!isAgainPasswordSee)}/>
      )
    }
  }
  let isAgainPasswordValidate = false

  const againPasswordValidate = () =>{
    if(againPassword != ""){
      if(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,}$/.test(password)){
        if(password == againPassword){
          isAgainPasswordValidate = true
          return(
            <TextInput.Icon name="check-circle-outline" forceTextInputFocus={false} color={"green"}/>
          )
        }else{
          return(
            <TextInput.Icon name="close-circle-outline" forceTextInputFocus={false} color={"#f44336"}/>
          )
        }
      }else{
        return(
          <TextInput.Icon name="close-circle-outline" forceTextInputFocus={false} color={"#f44336"}/>
        )
      }
     
    }

  }

let isPasswordValidate = false;

  const passwordValidate = () =>{
    if(password != ""){
      if(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,}$/.test(password)){
        isPasswordValidate = true;
        return(
          <TextInput.Icon name="check-circle-outline" color={"green"}/>
        )
      }else{
        return(
          <TextInput.Icon name="close-circle-outline" color={"#f44336"}/>
        )
      }
    }
  }

  //const scrollEnabled = screenHeight > height-40
  
      return (
        
        <ScrollView
        contentContainerStyle={{flexGrow:1, paddingTop:10}}
        style={{flex:1, backgroundColor:"white"}}
        //scrollEnabled={scrollEnabled}
        //onContentSizeChange={onContentSizeChange}
        >

        <KeyboardAwareScrollView
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
        style={styles.container}
        contentContainerStyle={{flex:1}}
      >
      
    

<StatusBar 
        translucent 
        backgroundColor="transparent" />
  
     
     
  
     <View style={styles.box}>
  
     
  
       
     <Modal 
        isVisible={isLoading} 
        style={{ justifyContent:"flex-start"}}
      animationIn="fadeIn"
      animationOut="fadeOut"
      
        >
          <View style={{flex:1,alignItems:"center", justifyContent:"flex-start", }}>
                <AnimatedLottieView source={require("../../../rec/Animations/loading.json")} autoPlay={true}  />
                {/* <Button title="kapat" onPress={toggleModal1} /> */}
          </View>
        </Modal>
        <Modal 
        isVisible={isCreateAccount} 
        style={{ justifyContent:"flex-start"}}
        hasBackdrop={false}
      //   animationIn="fadeInRight"
      animationIn="fadeIn"
      animationOut="fadeOut"
      animationInTiming={600}
      animationOutTiming={600}
        swipeDirection="up"
        onSwipeComplete = {() =>   isCreateAccount(false) }
        >
          <View style={{flex:1,alignItems:"center", justifyContent:"flex-start"}}>
              <View style={{width: '85%', backgroundColor: '#f5f5f5', borderRadius:8, justifyContent:"flex-start",alignItems:"center", padding:20, flexDirection:"row", shadowColor: "#000",
  shadowOffset: {
      width: 0,
      height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  
  elevation: 5,}}>
              <View style={{padding:18}}>
                <AnimatedLottieView source={require("../../../rec/Animations/createAccount-success.json")} autoPlay={true} loop={false} />
                </View>
            <Text style={{fontSize:22, color:"black", fontWeight:"700", marginLeft:9}}>Hesap oluşturuldu!</Text>
            </View>
            {/* <Button title="Hide modal" onPress={toggleModal} /> */}
          </View>
        </Modal>
  
    
  <View style={{alignItems:"center" }}>
    
          <View style={styles.InputCard}>
  
          <View style={{justifyContent:"center", alignItems:"center", flex:1.09,  }}>
  
           
  
  {
  AvatarImagePath == ""   
  
  ? 
  
  <Avatar
  
  size={130}
  rounded
  onPress={toggleModal}
  source= {require("../../../rec/Avatars/DefaultDoctorAvatar.png")}
  > 
  
  <Avatar.Accessory  size={27}   onPress={toggleModal} />
  </Avatar>
  
  :
  <Avatar
  source={{ uri: AvatarImagePath }}
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
            onPress={AvatarShowImagePicker}
            >
                <Text style={{fontSize:20,color:"white", fontWeight:"600"}}>Galerimden seç</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={{backgroundColor:"#d2302f", width:300, height:50, alignSelf:"center", alignItems:"center", justifyContent:"center", borderRadius:25}}
            onPress={openCameraAvatar}
            >
                <Text style={{fontSize:20, color:"white", fontWeight:"600"}}>Fotoğraf çek</Text>
            </TouchableOpacity>
            </View>
        </View>
      </Modal>
                  {/* --- Modal --- */}
  
          
  
  
  
  
                </View>
              
                <View style={{flex:2, }}>
  <View style={{flexDirection:"row", justifyContent:"space-evenly"}}> 
              <CheckBox
  center
  title='Erkek'
  checkedIcon='dot-circle-o'
  uncheckedIcon='circle-o'
  containerStyle={{alignSelf:"baseline", backgroundColor:'rgba(52, 52, 52, 0.0)', borderWidth:0, borderRadius:0, borderBottomWidth:0.8, borderColor:"#f44336"}}
  checked={checkedE}
  checkedColor="#ba000d"
  onPress={()=> isCheckedErkek(true)}
  />
  <CheckBox
  center
  title='Kadın'
  checkedIcon='dot-circle-o'
  uncheckedIcon='circle-o'
  containerStyle={{alignSelf:"baseline", backgroundColor:'rgba(52, 52, 52, 0.0)',borderWidth:0, borderRadius:0, borderBottomWidth:0.8, borderColor:"#f44336"}}
  checked={checkedK}
  checkedColor="#ba000d"
  onPress={() => isCheckedKadın(true)}
  />
  
  </View>
  
               <TextInput 
              style={styles.input}
              placeholder="Çalışılan yer"
              placeholderTextColor="grey"
              value={CalisilanYer}
              onChangeText={text=> SetCalisilanYer(text)}
              underlineColor="#f44336"
              activeUnderlineColor='#f44336'
              outlineColor="white"
              activeOutlineColor="red"
              //right={NameValidate(name)}
              />
  
              
  <TouchableOpacity onPress={PhotosShowImagePicker}>
              <View style={[styles.input, {justifyContent:"space-between", alignItems:"center", flexDirection:"row",
              borderBottomColor:"red", borderBottomWidth:1  
                
                }]}>
                <Text style={{color:"grey", fontSize:18}}>Fotoğraflarını ekle</Text>
                <Ionicons name="images-outline" size={20} />
              </View>
              </TouchableOpacity>
  
              {
  
  PhotosImagePath !== '' && 
          <View style={{width:50, height:50, flexDirection:"row"}}>
          
          <Image
            source={{ uri: PhotosImagePath }}
            style={styles.image}
          />
            
          </View>
  
        }
  
              
  
               
              
 
  <TextInput 
              style={styles.input}
              placeholder="Şifre"
              placeholderTextColor="grey"
              secureTextEntry={ispasswordSee}
              activeUnderlineColor='#f44336'
              outlineColor="white"
              //onBlur={infoPasswordUpdate()} Odaklanma kesilince çağırılan callback
              left={passwordSee()}
              right={passwordValidate(password)}
              value={password}
              onChangeText={text => setPassword(text)}
              />
              
  
  
                <TextInput 
              style={styles.input}
              placeholder="Tekrar Şifre"
              placeholderTextColor="grey"
              secureTextEntry={isAgainPasswordSee}
              left={againPasswordSee()}
              value={againPassword}
              onChangeText={text => setAgainPassword(text)}
              underlineColor="#f44336"
              activeUnderlineColor='#f44336'
              outlineColor="white"
              right={againPasswordValidate(againPassword)}
              />
  
  
  <View style={{flexDirection:"row", alignItems:"center", justifyContent:"center", width:300, marginLeft:30, marginTop:10}}>
  {/* {console.log(SozlesmeText())} */}
  <CheckBox        
        containerStyle={{backgroundColor:"white", borderWidth:0, margin:0, padding:0 }}
        checked={isSozlesmeOnay}
        checkedColor="#ba000d"
        size={20}
        onPress={() => setIsSozlesmeOnay(!isSozlesmeOnay)}
      />
            <Pressable onPress={()=> setSozlesmeModal(true)}>
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
    <Pressable onPress={()=> {
      setIsSozlesmeOnay(true)
      setSozlesmeModal(false)
    }
      }>
    <Text style={{alignSelf:"flex-end", marginRight:10, color:"blue", fontSize:18, margin:15 }}>
      ONAYLA
    </Text>
    </Pressable>
  </View>
  </Modal>
  
  
               <View style= {{flexDirection:"row", justifyContent:"space-between"}}>
               <TouchableOpacity onPress={()=> navigation.navigate(
                   "DSignUp0",
                   {
                        CalisilanYer: CalisilanYer,
                        password:password,
                        againPassword: againPassword,
                        cinsiyet: cinsiyet,
                        avatarLocal: AvatarImagePath,
                        avatarFirebase: avatar,
                        isSozlesmeOnay: isSozlesmeOnay
                   })}>
  
           <Text style={{borderRadius:20, paddingHorizontal:2, fontSize:20, color:"#ba000d", paddingVertical:8, alignSelf:"flex-end", textAlign:"center", margin:10}}>
              
           <Ionicons
                   name="chevron-back-outline"
                   size={20}
                   color="#ba000d"
                   />
               GERİ
  
           </Text>
  
           </TouchableOpacity>
           
  
            <TouchableOpacity onPress={() => 
              {
                if(isAgainPasswordValidate & isPasswordValidate & cinsiyet != "" & isSozlesmeOnay){
                  createAccount(name, email, password, brans, CalisilanYer, time1,time2, cinsiyet, avatar)

                }else{
                  Alert.alert("Hata❗", "Lütfen formu doldurunuz.", [
                    {
                      text: "Tamam",
                      style: "cancel"
                    }
                  ])
                }
              }
              }> 
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

  
          </ScrollView>
  
  
  
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
        borderBottomWidth:2,
        borderRadius:0,
        paddingLeft:10,
        fontSize:18,
        marginVertical:15,
        // backgroundColor:"yellow"
        // backgroundColor:"red"
    }
    
    

})


  export default SignUp1;