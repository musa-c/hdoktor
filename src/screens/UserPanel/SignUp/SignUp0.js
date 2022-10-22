import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image,
  Platform,
  Dimensions,
  Pressable,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Avatar } from "react-native-elements";
import { CheckBox } from "react-native-elements";
import { TextInput, HelperText } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Modal from "react-native-modal";
import * as ImagePicker from "expo-image-picker";
import firebase from "firebase/compat/app";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import moment from "moment";
import trLocale from "moment/locale/tr";
import AnimatedLottieView from "lottie-react-native";

const SingUpStack = createNativeStackNavigator();

const SignUp00 = ({ navigation }) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateAccount, setIsCreateAccount] = useState(false);
  const [CreateAccountUnEnabled, SetCreateAccountUnEnabled] = useState(false);

  function calculateAge(date) {
    const birthDate = new Date(
      date.split(".")[2],
      date.split(".")[1],
      date.split(".")[0]
    );
    const otherDate = new Date();
    var years = otherDate.getFullYear() - birthDate.getFullYear();

    if (
      otherDate.getMonth() < birthDate.getMonth() ||
      (otherDate.getMonth() == birthDate.getMonth() &&
        otherDate.getDate() < birthDate.getDate())
    ) {
      years--;
    }
    return years;
  }

  const isCreateAccountInfo = () => {
    setIsCreateAccount(true);
    console.log("fonksiyonda succes başladı.");
    setTimeout(() => {
      setIsCreateAccount(false);
      SetCreateAccountUnEnabled(false);
      navigation.navigate("SignIn");
    }, 3000);
  };

  const createAccount = async (
    name,
    email,
    password,
    cinsiyet,
    avatarFirebase,
    phoneNumber,
    date,
    KHastalik,
    avatarLocal
  ) => {
    //console.log("avatarFirebase:", avatarFirebase)
    setIsLoading(true);
    SetCreateAccountUnEnabled(true);

    const errorMessage = (error) => {
      navigation.navigate("SignUp0", {
        name: name,
        email: email,
        password: password,
        cinsiyet: cinsiyet,
        avatarLocal: avatarLocal,
        avatarFirebase: avatarFirebase,
        phoneNumber: phoneNumber,
        dogumTarih: date,
        KHastalik: KHastalik,
        againPassword: password,
        isSozlesmeOnay: true,
      });
      setError(error);
    };

    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        await firebase
          .firestore()
          .collection("H_user")
          .doc(userCredential.user.uid)
          .set({
            name: name,
            email: email.toLowerCase(),
            cinsiyet: cinsiyet,
            Id: userCredential.user.uid,
            //avatar: avatarUrl,
            date: date,
            phoneNumber: phoneNumber,
            KHastalik: KHastalik,
          })
          .catch({
            // kaydedilen kullanıcı firestore'ya kaydedilmediği için sil kullanıcıyı.
          })
          .then(() => {
            userCredential.user.updateProfile({
              displayName: name,
            });
          })
          .then(() => {
            setIsLoading(false);
            isCreateAccountInfo();
          })
          .catch(setIsLoading(false));
        //  console.log("userCredential: ", userCredential)
        //const UserUpdate = async () => {
        console.log("geldi");
        //await
        //photoURL:avatarUrl,
        // }
        // );
        // };
      })
      .catch((error) => {
        setIsLoading(false);
        SetCreateAccountUnEnabled(false);
        console.log("error:", error);
        const errorCode = error.code;
        switch (errorCode.substr(5)) {
          case "ERROR_EMAIL_ALREADY_IN_USE":
          case "account-exists-with-different-credential":
          case "email-already-in-use":
            // alert('Bu E-mail kullanılıyor.');
            // alert("Bu E-mail kullanılıyor.")
            errorMessage("Bu E-mail kullanılıyor.");
            break;
          case "ERROR_WRONG_PASSWORD":
          case "wrong-password":
            //   alert('Yanlış e-posta/şifre kombinasyonu.');
            // alert("Yanlış e-posta/şifre kombinasyonu.")
            errorMessage("Yanlış e-posta/şifre kombinasyonu.");

            break;
          case "ERROR_OPERATION_NOT_ALLOWED":
          case "operation-not-allowed":
            alert("Sunucu hatası, lütfen daha sonra tekrar deneyin.");
            break;
          case "ERROR_INVALID_EMAIL":
          case "invalid-email":
            // alert("Email adresi geçersiz.")
            errorMessage("Email adresi geçersiz.");

            //   alert('Email adresi geçersiz.');
            break;
          default:
            alert("Kayıt başarısız. Lütfen tekrar deneyin.");
            break;
        }
      });
  };

  const SignUp0 = ({ navigation, route }) => {
    const password = route.params?.password;
    const againPassword = route.params?.againPassword;
    const cinsiyet = route.params?.cinsiyet ?? "";
    const isSozlesmeOnay = route.params?.isSozlesmeOnay;
    const KHastalik = route.params?.KHastalik ?? "";
    const avatarLocal = route.params?.avatarLocal ?? "";
    const avatarFirebase = route.params?.avatarFirebase ?? "";
    const [HelperTextVisible, setHelperTextVisible] = useState(false);

    const NextForm = (name, email, dogumTarih, PhoneNumber) => {
      if (
        name == "" ||
        email == "" ||
        dogumTarih == "GÜN.AY.YIL" ||
        PhoneNumber == "" ||
        !isEmailValidation ||
        !isNameValidation ||
        !isPhoneNumberValidation
      ) {
        setError("Formu lütfen doldurunuz.");
      } else {
        if (calculateAge(dogumTarih) < 13) {
          setHelperTextVisible(true);
        } else {
          navigation.navigate("SignUp1", {
            name: name,
            email: email,
            avatarLocal: avatarLocal,
            avatarFirebase: avatarFirebase,
            dogumTarih: dogumTarih,
            phoneNumber: PhoneNumber,
            password: password,
            againPassword: againPassword,
            cinsiyet: cinsiyet,
            isSozlesmeOnay: isSozlesmeOnay,
            KHastalik: KHastalik,
          });
        }
      }
    };

    let isNameValidation = false;
    const NameValidate = (name) => {
      if (name != "") {
        if (name.length > 1) {
          isNameValidation = true;
          return (
            <TextInput.Icon
              icon="check-circle-outline"
              forceTextInputFocus={false}
              iconColor={"green"}
            />
          );
        } else {
          return (
            <TextInput.Icon
              icon="close-circle-outline"
              forceTextInputFocus={false}
              iconColor={"#f44336"}
            />
          );
        }
      }
    };

    var isEmailValidation = false;

    const emailValidate = (email) => {
      // const [isEmail, setIsEmail] = useState(false);

      if (email != "") {
        if (
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
            email.toLowerCase()
          )
        ) {
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
          isEmailValidation = true;
          return (
            <TextInput.Icon
              icon="check-circle-outline"
              forceTextInputFocus={false}
              iconColor={"green"}
            />
          );
        } else {
          return (
            <TextInput.Icon
              icon="close-circle-outline"
              forceTextInputFocus={false}
              iconColor={"#f44336"}
            />
          );
        }
      }
    };

    let isPhoneNumberValidation = false;
    const PhoneNumberValidate = (phoneNumber) => {
      // refex if els
      if (phoneNumber != "") {
        if (
          /(^[0\s]?[\s]?)([(]?)([5])([0-9]{2})([)]?)([\s]?)([0-9]{3})([\s]?)([0-9]{2})([\s]?)([0-9]{2})$/g.test(
            phoneNumber
          )
        ) {
          isPhoneNumberValidation = true;
          return (
            <TextInput.Icon
              icon="check-circle-outline"
              forceTextInputFocus={false}
              iconColor={"green"}
            />
          );
        } else {
          return (
            <TextInput.Icon
              icon="close-circle-outline"
              forceTextInputFocus={false}
              iconColor={"#f44336"}
            />
          );
        }
      }
    };

    const PhoneLeftComponent = () => {
      return <TextInput.Affix text="+90 " textStyle={{ fontSize: 20 }} />;
    };

    const DateValidate = () => {
      // refex if else

      <TextInput.Icon
        icon="close-circle-outline"
        forceTextInputFocus={false}
        iconColor={"#f44336"}
      />;
    };

    const [email, setEmail] = useState(route.params?.email ?? "");
    const [name, setName] = useState(route.params?.name ?? "");
    const [PhoneNumber, SetPhoneNumber] = useState(
      route.params?.phoneNumber ?? ""
    );
    const [dogumTarih, setdogumTarih] = useState(
      route.params?.dogumTarih ?? "GÜN.AY.YIL"
    );

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };

    const handleConfirm = (dogumTarih) => {
      setdogumTarih(moment(dogumTarih).locale("tr", trLocale).format("l"));
      hideDatePicker();
    };

    return (
      <KeyboardAwareScrollView
        behavior="padding"
        style={styles.container}
        contentContainerStyle={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingTop: 15,
            paddingEnd: 10,
          }}
          style={{ backgroundColor: "white" }}
        >
          <View style={styles.box}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <View style={styles.InputCard}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <Image
                  source={require("../../../rec/Logos/hdoktor-logo-dikeyImageSize.png")}
                />
              </View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "red",
                  alignSelf: "center",
                }}
              >
                {error}
              </Text>
              <View style={{ flex: 2 }}>
                <TextInput
                  style={styles.input}
                  label="İsim"
                  placeholderTextColor="grey"
                  value={name}
                  onChangeText={(text) => setName(text)}
                  underlineColor="#f44336"
                  activeUnderlineColor="#f44336"
                  outlineColor="white"
                  activeOutlineColor="red"
                  right={NameValidate(name)}
                />

                <TextInput
                  style={styles.input}
                  placeholder="E-mail"
                  label="E-mail"
                  placeholderTextColor="grey"
                  underlineColor="#f44336"
                  activeUnderlineColor="#f44336"
                  outlineColor="white"
                  keyboardType="email-address"
                  right={emailValidate(email)}
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />

                <TextInput
                  style={styles.input}
                  label="5XX XXX XX XX"
                  placeholderTextColor="grey"
                  underlineColor="#f44336"
                  activeUnderlineColor="#f44336"
                  outlineColor="white"
                  keyboardType="number-pad"
                  right={PhoneNumberValidate(PhoneNumber)}
                  left={PhoneLeftComponent()}
                  value={PhoneNumber}
                  onChangeText={(text) => SetPhoneNumber(text)}
                />

                <Text
                  style={{
                    fontSize: 18,
                    color: "grey",
                    marginLeft: 25,
                    borderColor: "red",
                    borderLeftWidth: 5,
                    paddingLeft: 10,
                    marginTop: 10,
                  }}
                >
                  Doğum Tarihi
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    marginTop: 7,
                  }}
                >
                  <TouchableOpacity onPress={showDatePicker}>
                    <View
                      style={{
                        flexDirection: "row",
                        borderBottomColor: "red",
                        borderBottomWidth: 0.8,
                        height: 50,
                        paddingHorizontal: 10,
                        alignItems: "center",
                      }}
                    >
                      <Text>{dogumTarih}</Text>
                      <Ionicons
                        name="chevron-down-outline"
                        size={18}
                        style={{ marginLeft: 10 }}
                      />
                    </View>
                  </TouchableOpacity>

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

                {HelperTextVisible ? (
                  <HelperText
                    type="info"
                    visible={HelperTextVisible}
                    style={{
                      color: "#f44336",
                      textAlign: "center",
                      alignSelf: "center",
                      fontSize: 18,
                      marginTop: 5,
                    }}
                  >
                    <Ionicons name="alert-circle-outline" size={18} />
                    &nbsp; 13 yaşından küçük kullanıcılar kayıt olamaz.
                  </HelperText>
                ) : null}

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 5,
                    flex: 1,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => navigation.navigate("SignIn")}
                  >
                    <Text
                      style={{
                        borderRadius: 20,
                        paddingHorizontal: 20,
                        fontSize: 20,
                        color: "#ba000d",
                        paddingVertical: 8,
                        alignSelf: "flex-end",
                        textAlign: "center",
                        marginTop: 5,
                      }}
                    >
                      <Ionicons
                        name="chevron-back-outline"
                        size={20}
                        color="#ba000d"
                      />
                      GERİ
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      setError("");
                      NextForm(name, email, dogumTarih, PhoneNumber);
                    }}
                  >
                    <Text
                      style={{
                        borderRadius: 20,
                        paddingHorizontal: 20,
                        fontSize: 20,
                        color: "#ba000d",
                        paddingVertical: 8,
                        alignSelf: "flex-end",
                        textAlign: "center",
                        marginTop: 10,
                      }}
                    >
                      İLERİ
                      <Ionicons name="chevron-forward-outline" size={20} />
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    );
  };

  const SignUp1 = ({ navigation }) => {
    const route = useRoute();
    const name = route.params.name;
    const email = route.params.email;
    const dogumTarih = route.params.dogumTarih;
    const phoneNumber = route.params.phoneNumber;

    const [KHastalik, SetKHastalik] = useState(route.params?.KHastalik ?? "");
    const [password, setPassword] = useState(route.params?.password ?? "");
    const [againPassword, setAgainPassword] = useState(
      route.params?.againPassword ?? ""
    );

    let isPasswordValidation = false;
    const passwordValidate = () => {
      if (password != "") {
        if (
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,}$/.test(password)
        ) {
          isPasswordValidation = true;
          return (
            <TextInput.Icon icon="check-circle-outline" iconColor={"green"} />
          );
        } else {
          return (
            <TextInput.Icon icon="close-circle-outline" iconColor={"#f44336"} />
          );
        }
      }
    };

    const [ispasswordSee, setispasswordSee] = useState(true);
    const [isAgainPasswordSee, setAgainPasswordSee] = useState(true);

    const passwordSee = () => {
      if (!ispasswordSee) {
        return (
          <TextInput.Icon
            icon="eye-outline"
            forceTextInputFocus={false}
            onPress={() => setispasswordSee(!ispasswordSee)}
          />
        );
      } else {
        return (
          <TextInput.Icon
            icon="eye-off-outline"
            forceTextInputFocus={false}
            onPress={() => setispasswordSee(!ispasswordSee)}
          />
        );
      }
    };

    const againPasswordSee = () => {
      if (!isAgainPasswordSee) {
        return (
          <TextInput.Icon
            icon="eye-outline"
            forceTextInputFocus={false}
            onPress={() => setAgainPasswordSee(!isAgainPasswordSee)}
          />
        );
      } else {
        return (
          <TextInput.Icon
            icon="eye-off-outline"
            forceTextInputFocus={false}
            onPress={() => setAgainPasswordSee(!isAgainPasswordSee)}
          />
        );
      }
    };

    let isAgainPasswordValidation = false;
    const againPasswordValidate = () => {
      if (againPassword != "") {
        if (
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,}$/.test(password)
        ) {
          if (password == againPassword) {
            isAgainPasswordValidation = true;
            return (
              <TextInput.Icon
                icon="check-circle-outline"
                forceTextInputFocus={false}
                iconColor={"green"}
              />
            );
          } else {
            return (
              <TextInput.Icon
                icon="close-circle-outline"
                forceTextInputFocus={false}
                iconColor={"#f44336"}
              />
            );
          }
        } else {
          return (
            <TextInput.Icon
              icon="close-circle-outline"
              forceTextInputFocus={false}
              iconColor={"#f44336"}
            />
          );
        }
      }
    };

    const [avatarLocal, setAvatarLocal] = useState(
      route.params?.avatarLocal ?? ""
    );
    const [avatarFirebase, setAvatarFirebase] = useState(
      route.params?.avatarFirebase ?? ""
    );

    // This function is triggered when the "Select an image" button pressed

    const [checkedE, setCheckedE] = useState(
      route.params?.cinsiyet == "Erkek" ? true : false
    );
    const [checkedK, setCheckedK] = useState(
      route.params?.cinsiyet == "Kadın" ? true : false
    );
    const [cinsiyet, setCinsiyet] = useState(route.params?.cinsiyet ?? "");
    const isCheckedErkek = () => {
      if (checkedE == true) {
        setCheckedE(false);
        setCinsiyet("");
      } else {
        setCheckedE(true);
        setCinsiyet("Erkek");
        setCheckedK(false);
      }
    };

    const isCheckedKadın = () => {
      if (checkedK == true) {
        setCheckedK(false);
        setCinsiyet("");
      } else {
        setCheckedK(true);
        setCinsiyet("Kadın");
        setCheckedE(false);
      }
    };

    const [isModalVisible, setModalVisible] = useState(false);

    const [isSozlesmeOnay, setIsSozlesmeOnay] = useState(
      route.params?.isSozlesmeOnay ?? false
    );
    const [SozlesmeModal, setSozlesmeModal] = useState(false);

    const [isKronik, setIsKronik] = useState(false);

    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };

    return (
      <KeyboardAwareScrollView
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
        style={styles.container}
        contentContainerStyle={{ flex: 1 }}
        // contentContainerStyle={{justifyContent:"center", alignItems:"center"}}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingTop: 15,
            paddingEnd: 10,
          }}
          style={{ backgroundColor: "white" }}
        >
          <View style={styles.box}>
            <Modal
              isVisible={isLoading}
              style={{ justifyContent: "flex-start" }}
              animationIn="fadeIn"
              animationOut="fadeOut"
              animationInTiming={0}
              animationOutTiming={0}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <AnimatedLottieView
                  source={require("../../../rec/Animations/loading.json")}
                  autoPlay={true}
                />
                {/* <Button title="kapat" onPress={toggleModal1} /> */}
              </View>
            </Modal>

            <Modal
              isVisible={isCreateAccount}
              style={{ justifyContent: "flex-start" }}
              hasBackdrop={false}
              //   animationIn="fadeInRight"
              animationIn="fadeIn"
              animationOut="fadeOut"
              animationInTiming={0}
              animationOutTiming={0}
              // swipeDirection="up"
              //onSwipeComplete = {() =>   isCreateAccount(false) }
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <View
                  style={{
                    width: "85%",
                    backgroundColor: "#f5f5f5",
                    borderRadius: 8,
                    justifyContent: "flex-start",
                    alignItems: "center",
                    padding: 20,
                    flexDirection: "row",
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 5,
                  }}
                >
                  <View style={{ padding: 18 }}>
                    <AnimatedLottieView
                      source={require("../../../rec/Animations/createAccount-success.json")}
                      autoPlay={true}
                      loop={false}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 22,
                      color: "black",
                      fontWeight: "700",
                      marginLeft: 9,
                    }}
                  >
                    Hesap oluşturuldu!
                  </Text>
                </View>
                {/* <Button title="Hide modal" onPress={toggleModal} /> */}
              </View>
            </Modal>

            <View style={{ alignItems: "center" }}>
              <View style={styles.InputCard}>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1.09,
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      flex: 1,
                    }}
                  >
                    <Image
                      source={require("../../../rec/Logos/hdoktor-logo-dikeyImageSize.png")}
                    />
                  </View>
                </View>

                <View style={{ flex: 2 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <CheckBox
                      center
                      title="Erkek"
                      checkedIcon="dot-circle-o"
                      uncheckedIcon="circle-o"
                      containerStyle={{
                        alignSelf: "baseline",
                        backgroundColor: "rgba(52, 52, 52, 0.0)",
                        borderWidth: 0,
                        borderRadius: 0,
                        borderBottomWidth: 0.8,
                        borderColor: "#f44336",
                      }}
                      checked={checkedE}
                      checkedColor="#ba000d"
                      onPress={() => isCheckedErkek(true)}
                    />
                    <CheckBox
                      center
                      title="Kadın"
                      checkedIcon="dot-circle-o"
                      uncheckedIcon="circle-o"
                      containerStyle={{
                        alignSelf: "baseline",
                        backgroundColor: "rgba(52, 52, 52, 0.0)",
                        borderWidth: 0,
                        borderRadius: 0,
                        borderBottomWidth: 0.8,
                        borderColor: "#f44336",
                      }}
                      checked={checkedK}
                      checkedColor="#ba000d"
                      onPress={() => isCheckedKadın(true)}
                    />
                  </View>

                  <View
                    style={{
                      marginTop: 15,
                      paddingLeft: 10,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CheckBox
                      // center
                      // iconType='square-o'
                      title="Herhangi bir kronik hastalığınız var mı?"
                      containerStyle={{
                        backgroundColor: "white",
                        borderWidth: 0,
                        width: 300,
                      }}
                      checked={isKronik}
                      // textStyle={{fontSize:18}}
                      textStyle={{
                        fontSize: 17,
                        fontStyle: "normal",
                        fontWeight: "normal",
                      }}
                      checkedColor="#ba000d"
                      // checkedIcon="fa-square-check"
                      onPress={() => setIsKronik(!isKronik)}
                    />
                  </View>

                  {isKronik && (
                    <View style={{ minHeight: 120 }}>
                      <TextInput
                        style={{
                          width: 300,
                          // height:50,
                          flex: 1,
                          margin: 15,
                          borderWidth: 1,
                          borderRadius: 10,
                          backgroundColor: "white",
                          fontSize: 18,
                        }}
                        mode="outlined"
                        placeholder="Lütfen belirtin"
                        theme={"dark"}
                        placeholderTextColor="grey"
                        value={KHastalik}
                        // underlineColor="#f44336"
                        activeUnderlineColor="white"
                        selectionColor="blue"
                        activeOutlineColor="white"
                        outlineColor="white"
                        numberOfLines={5}
                        textAlignVertical="top"
                        multiline
                        onChangeText={(text) => SetKHastalik(text)}
                      />
                    </View>
                  )}

                  <TextInput
                    style={{
                      width: 300,
                      height: 60,
                      // margin:15,
                      backgroundColor: "white",
                      marginTop: 0,
                      marginBottom: 15,
                      marginLeft: 15,
                      marginRight: 15,
                      //   borderColor:"#f44336",
                      // borderBottomWidth:2,
                      borderRadius: 0,
                      fontSize: 18,
                    }}
                    label="Şifre"
                    placeholderTextColor="grey"
                    secureTextEntry={ispasswordSee}
                    underlineColor="#f44336"
                    activeUnderlineColor="#f44336"
                    outlineColor="white"
                    left={passwordSee()}
                    right={passwordValidate(password)}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                  />
                  {password == ""
                    ? false
                    : !isPasswordValidation && (
                        <HelperText
                          type="info"
                          visible={
                            password == "" ? false : !isPasswordValidation
                          }
                          style={{
                            color: "#f44336",
                            textAlign: "justify",
                            //backgroundColor: "red",
                            width: 300,
                            alignSelf: "center",
                          }}
                        >
                          <Ionicons name="alert-circle-outline" />
                          &nbsp; Şifre, en az 8 en çok 32 karakter olmalıdır. En
                          az; 1 harf, 1 rakam içermelidir. Boşluk içermemeli.
                          Özel karakterler kullanılabilir: @$!%*#?&^_-
                        </HelperText>
                      )}

                  <TextInput
                    style={styles.input}
                    mode="Flat"
                    label="Tekrar Şifre"
                    placeholderTextColor="grey"
                    secureTextEntry={isAgainPasswordSee}
                    left={againPasswordSee()}
                    value={againPassword}
                    onChangeText={(text) => setAgainPassword(text)}
                    underlineColor="#f44336"
                    activeUnderlineColor="#f44336"
                    outlineColor="white"
                    right={againPasswordValidate(againPassword)}
                  />

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 300,
                      marginLeft: 30,
                      marginTop: 10,
                      flexGrow: 1,
                    }}
                  >
                    {/* {console.log(SozlesmeText())} */}
                    <CheckBox
                      containerStyle={{
                        backgroundColor: "white",
                        borderWidth: 0,
                        margin: 0,
                        padding: 0,
                      }}
                      checked={isSozlesmeOnay}
                      checkedColor="#ba000d"
                      size={20}
                      onPress={() => setIsSozlesmeOnay(!isSozlesmeOnay)}
                    />
                    <Pressable onPress={() => setSozlesmeModal(true)}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          width: 300,
                          alignItems: "center",
                        }}
                      >
                        <Text style={{ fontSize: 15, color: "grey" }}>
                          <Text
                            style={{
                              fontSize: 15,
                              borderBottomWidth: 1,
                              color: "black",
                              borderBottomColor: "black",
                              textDecorationLine: "underline",
                            }}
                          >
                            Kullanıcı Sözleşmesini{" "}
                          </Text>
                          Okudum ve onaylıyorum.
                        </Text>
                      </View>
                    </Pressable>
                  </View>

                  <Modal
                    isVisible={SozlesmeModal}
                    style={{ justifyContent: "center" }}
                    // swipeDirection="down"
                    onBackdropPress={() => setSozlesmeModal(false)}
                    // onSwipeComplete = { ( )  =>  setModalVisible ( false ) }
                    //   swipeDirection="down"
                    //   swipeDirection="left"
                  >
                    <View
                      style={{
                        height: Dimensions.get("screen").height / 1.6,
                        backgroundColor: "white",
                        borderRadius: 20,
                      }}
                    >
                      <Ionicons
                        name="close-outline"
                        color="grey"
                        size={30}
                        onPress={() => setSozlesmeModal(false)}
                        style={{ alignSelf: "flex-end", marginRight: 5 }}
                      />
                      <Text
                        style={{
                          fontSize: 25,
                          fontWeight: "700",
                          paddingLeft: 15,
                          paddingBottom: 10,
                        }}
                      >
                        Kullanıcı Sözleşmesi
                      </Text>
                      <ScrollView>
                        <Text
                          style={{
                            paddingHorizontal: 10,
                            textAlign: "justify",
                          }}
                        >
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Sed est ligula, faucibus in urna eu, aliquam
                          tincidunt ante. Nam nec convallis libero, placerat
                          ultricies risus. Donec felis justo, hendrerit nec arcu
                          vitae, ultricies placerat mi. Ut in augue malesuada,
                          pretium nunc imperdiet, finibus lorem. Morbi suscipit
                          purus consequat commodo consequat. Morbi at blandit
                          augue. Ut eget semper sapien. Nulla felis leo,
                          condimentum eget quam et, ullamcorper convallis risus.
                          Proin a ligula in tortor imperdiet lacinia. Etiam
                          metus dolor, pulvinar vitae est et, venenatis maximus
                          velit. Integer eu diam vel turpis vestibulum
                          vulputate. Morbi fringilla elit sed orci tincidunt
                          dictum. Etiam interdum odio et justo condimentum, sit
                          amet fringilla magna feugiat. Donec in gravida eros.
                          Duis feugiat, quam et malesuada tempus, diam mi porta
                          urna, non pharetra leo diam non mauris. Donec ut velit
                          ornare, consectetur erat ut, porttitor felis. Quisque
                          mattis cursus justo vitae eleifend. Cras sem neque,
                          facilisis in lacus ut, sodales laoreet leo. Curabitur
                          ut diam semper, tempus lorem eget, porttitor odio.
                          Mauris congue mi ut metus vulputate iaculis non
                          sollicitudin libero. Aenean facilisis tincidunt
                          venenatis. Etiam tempus, est ac condimentum tincidunt,
                          orci dolor pellentesque risus, ut sollicitudin odio
                          metus sit amet risus. Vestibulum vitae congue ante, id
                          accumsan tellus. Suspendisse at odio at erat tristique
                          consectetur nec et arcu. Aenean accumsan dignissim
                          libero non placerat. Nulla nunc augue, efficitur
                          blandit nisi ut, rutrum lobortis purus. Maecenas
                          semper porta justo, quis bibendum dui bibendum ac. Ut
                          vel turpis aliquam, rhoncus leo a, rutrum turpis.
                          Quisque porttitor tristique nunc ut commodo. Phasellus
                          in egestas eros. Etiam condimentum et ex eget dapibus.
                          Proin fringilla commodo neque auctor faucibus. Integer
                          vitae molestie nunc, sed vehicula felis. Nullam neque
                          eros, porttitor quis libero quis, dapibus ultricies
                          purus. Nulla quis nisi eget enim tempor euismod sed
                          maximus velit. Nunc neque risus, posuere ac rutrum
                          fringilla, commodo ut lorem. Nam nec lorem ac felis
                          viverra tincidunt. Cras quis quam eu orci tempus
                          viverra. Phasellus nec rhoncus urna. Sed id ex congue
                          orci feugiat maximus. Nam scelerisque euismod magna.
                          Duis bibendum mi et luctus mattis. Interdum et
                          malesuada fames ac ante ipsum primis in faucibus.
                          Pellentesque ut nisl eu quam aliquet vehicula. Cras
                          placerat interdum dapibus. Etiam lorem diam, varius ut
                          turpis condimentum, aliquet aliquam urna. Maecenas in
                          urna non quam vestibulum venenatis. Aliquam posuere,
                          ligula quis consequat semper, neque nulla pharetra
                          ligula, sit amet tempor leo elit sit amet nulla. Sed
                          viverra, justo vitae dignissim mollis, dui orci
                          ultrices dolor, ac faucibus augue eros eu nibh.
                          Integer non porttitor neque. Maecenas ut dolor sem. Ut
                          mollis quis arcu accumsan sollicitudin. Vivamus in
                          aliquam elit. Maecenas hendrerit dui et lectus pretium
                          ultrices.
                        </Text>
                      </ScrollView>
                      <Pressable
                        onPress={() => {
                          setIsSozlesmeOnay(true);
                          setSozlesmeModal(false);
                        }}
                      >
                        <Text
                          style={{
                            alignSelf: "flex-end",
                            marginRight: 10,
                            color: "blue",
                            fontSize: 18,
                            margin: 15,
                          }}
                        >
                          ONAYLA
                        </Text>
                      </Pressable>
                    </View>
                  </Modal>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      backgroundColor: "white",
                      flex: 1,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("SignUp0", {
                          name: name,
                          email: email,
                          avatarLocal: avatarLocal,
                          avatarFirebase: avatarFirebase,
                          phoneNumber: phoneNumber,
                          dogumTarih: dogumTarih,
                          password: password,
                          againPassword: againPassword,
                          cinsiyet: cinsiyet,
                          isSozlesmeOnay: isSozlesmeOnay,
                          KHastalik: KHastalik,
                        })
                      }
                    >
                      <Text
                        style={{
                          borderRadius: 20,
                          paddingHorizontal: 2,
                          fontSize: 20,
                          color: "#ba000d",
                          paddingVertical: 8,
                          alignSelf: "flex-end",
                          textAlign: "center",
                          margin: 10,
                        }}
                      >
                        <Ionicons
                          name="chevron-back-outline"
                          size={20}
                          color="#ba000d"
                        />
                        GERİ
                      </Text>
                    </TouchableOpacity>

                    {!CreateAccountUnEnabled && (
                      <TouchableOpacity
                        onPress={() => {
                          if (
                            (cinsiyet != "") &
                            isPasswordValidation &
                            isAgainPasswordValidation &
                            isSozlesmeOnay
                          ) {
                            createAccount(
                              name,
                              email,
                              password,
                              cinsiyet,
                              avatarFirebase,
                              phoneNumber,
                              dogumTarih,
                              KHastalik,
                              avatarLocal
                            );
                          } else {
                            Alert.alert("Hata❗", "Lütfen formu doldurunuz.", [
                              { style: "cancel", text: "Tamam" },
                            ]);
                          }
                        }}
                      >
                        <Text
                          style={{
                            borderRadius: 20,
                            paddingHorizontal: 20,
                            fontSize: 20,
                            color: "#ba000d",
                            paddingVertical: 8,
                            alignSelf: "flex-end",
                            textAlign: "center",
                            margin: 10,
                            backgroundColor: "#fff",
                            fontWeight: "bold",
                          }}
                        >
                          KAYIT OL
                        </Text>
                      </TouchableOpacity>
                    )}
                    {CreateAccountUnEnabled && (
                      <View>
                        <Text
                          style={{
                            borderRadius: 20,
                            paddingHorizontal: 20,
                            fontSize: 20,
                            color: "grey",
                            paddingVertical: 8,
                            alignSelf: "flex-end",
                            textAlign: "center",
                            margin: 10,
                            backgroundColor: "#fff",
                            fontWeight: "bold",
                          }}
                        >
                          KAYIT OL
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    );
  };
  return (
    <SingUpStack.Navigator>
      <SingUpStack.Screen
        name="SignUp0"
        component={SignUp0}
        options={{ animation: "slide_from_left", title: "Hasta Kayıt" }}
      />
      <SingUpStack.Screen
        name="SignUp1"
        component={SignUp1}
        options={{
          animation: "slide_from_right",
          title: "Hasta Kayıt",
          headerBackVisible: false,
        }}
      />
    </SingUpStack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  box: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  InputCard: {
    backgroundColor: "white",
  },
  input: {
    width: 300,
    height: 60,
    margin: 15,
    marginTop: 20,
    //flexGrow:0.07,
    // borderColor:"#f44336",
    // borderBottomWidth:2,
    // borderRadius:0,
    // paddingLeft:10,
    fontSize: 18,
    backgroundColor: "white",
    // backgroundColor: "red",
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: "cover",
    borderRadius: 10,
    marginLeft: 15,
    // borderRadius:100
  },
  picker: {
    width: 300,
    height: 50,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: "#f44336",
    borderBottomWidth: 2,
    borderRadius: 0,
    paddingLeft: 10,
    fontSize: 18,
    marginVertical: 15,
    // backgroundColor:"yellow"
    // backgroundColor:"red"
  },
});

export default SignUp00;
