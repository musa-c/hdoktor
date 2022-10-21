import React, { useState, useEffect } from "react";
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
import { useRoute } from "@react-navigation/native";
import { CheckBox } from "react-native-elements";
import { TextInput, HelperText } from "react-native-paper";
import Modal from "react-native-modal";
import firebase from "firebase/compat/app";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AnimatedLottieView from "lottie-react-native";
import LoadingAnimation from "../../../components/Animations/LoadingAnimation";
import CreateAccountSucces from "../../../components/Animations/CreateAccountSucces";

const SignUp1 = ({ navigation }) => {
  const route = useRoute();
  const [cinsiyet, setCinsiyet] = useState(route.params?.cinsiyet ?? "");
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateAccount, setIsCreateAccount] = useState(false);
  const [isSozlesmeOnay, setIsSozlesmeOnay] = useState(
    route.params?.isSozlesmeOnay ?? false
  );
  const [SozlesmeModal, setSozlesmeModal] = useState(false);

  const isCreateAccountInfo = () => {
    setIsCreateAccount(true);
    setTimeout(() => {
      setIsCreateAccount(false);
      SetCreateAccountUnEnabled(false);
      navigation.navigate("D_SignIn");
    }, 3000);
  };

  const errorMessage = (error) => {
    navigation.navigate("DSignUp0", {
      CalisilanYer: CalisilanYer,
      password: password,
      cinsiyet: cinsiyet,
      error: error,
      againPassword: password,
      isSozlesmeOnay: true,
    });
  };

  const [CreateAccountUnEnabled, SetCreateAccountUnEnabled] = useState(false);

  const createAccount = async (
    name,
    email,
    password,
    brans,
    CalisilanYer,
    time1,
    time2,
    cinsiyet
  ) => {
    setIsLoading(true);
    SetCreateAccountUnEnabled(true);

    var NameArray = [];
    for (let i = 1; i < name.toLowerCase().length + 1; i++) {
      NameArray.push(name.substring(0, i).toLowerCase());
    }

    var BransArray = [];
    for (let i = 1; i < brans.toLowerCase().length + 1; i++) {
      BransArray.push(brans.substring(0, i).toLowerCase());
    }

    var CalisilanYerArray = [];
    for (let i = 1; i < CalisilanYer.toLowerCase().length + 1; i++) {
      CalisilanYerArray.push(CalisilanYer.substring(0, i).toLowerCase());
    }

    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        await firebase
          .firestore()
          .collection("D_user")
          .doc(userCredential.user.uid)
          .set({
            name: name,
            email: email.toLowerCase(),
            brans: brans,
            CalisilanYer: CalisilanYer,
            time1: time1,
            time2: time2,
            cinsiyet: cinsiyet,
            Id: userCredential.user.uid,
            avatar: "",
            nameSearch: NameArray,
            rating: 0,
            bransSearch: BransArray,
            calislanYerSearch: CalisilanYerArray,
          })
          .catch({
            // kaydedilen kullanıcı firestore'ya kaydedilmediği için sil kullanıcıyı.
          })
          .then(UserUpdate)
          .then(() => {
            setIsLoading(false);
            isCreateAccountInfo();
          })
          .catch(
            setIsLoading(false)
            // userUpdate kaydedilmediği için sil kullanıcıyı.
          );

        const UserUpdate = async () => {
          await userCredential.user.updateProfile({
            displayName: name,
          });
        };
      })
      .catch((error) => {
        setIsLoading(false);
        const errorCode = error.code;
        switch (errorCode.substr(5)) {
          case "ERROR_EMAIL_ALREADY_IN_USE":
          case "account-exists-with-different-credential":
          case "email-already-in-use":
            errorMessage("Bu E-mail kullanılıyor.");

            break;
          case "ERROR_WRONG_PASSWORD":
          case "wrong-password":
            errorMessage("Yanlış e-posta/şifre kombinasyonu.");

            break;
          case "ERROR_OPERATION_NOT_ALLOWED":
          case "operation-not-allowed":
            Alert.alert(
              "Hata❗",
              "Sunucu hatası, lütfen daha sonra tekrar deneyin.",
              [{ text: "Tamam", style: "cancel" }]
            );
            break;
          case "ERROR_INVALID_EMAIL":
          case "invalid-email":
            errorMessage("Email adresi geçersiz.");
            break;
          default:
            SetCreateAccountUnEnabled(false);
            Alert.alert("Hata❗", "Kayıt başarısız. Lütfen tekrar deneyin.", [
              { text: "Tamam", style: "cancel" },
            ]);
            break;
        }
      });
  };

  const name = route.params.name;
  const email = route.params.email;
  const brans = route.params.brans;
  const time1 = route.params.time1;
  const time2 = route.params.time2;

  const [CalisilanYer, SetCalisilanYer] = useState(
    route.params?.CalisilanYer ?? ""
  );
  const [password, setPassword] = useState(route.params?.password ?? "");

  const [checkedE, setCheckedE] = useState(
    route.params?.cinsiyet == "Erkek" ? true : false
  );
  const [checkedK, setCheckedK] = useState(
    route.params?.cinsiyet == "Kadın" ? true : false
  );

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
  const [againPassword, setAgainPassword] = useState(
    route.params?.againPassword ?? ""
  );

  const passwordSee = () => {
    if (!ispasswordSee) {
      return (
        <TextInput.Icon
          icon="eye-outline"
          iconColor="#B71C1C"
          forceTextInputFocus={false}
          onPress={() => setispasswordSee(!ispasswordSee)}
        />
      );
    } else {
      return (
        <TextInput.Icon
          icon="eye-off-outline"
          iconColor="#B71C1C"
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
          iconColor="#B71C1C"
          forceTextInputFocus={false}
          onPress={() => setAgainPasswordSee(!isAgainPasswordSee)}
        />
      );
    } else {
      return (
        <TextInput.Icon
          icon="eye-off-outline"
          iconColor="#B71C1C"
          forceTextInputFocus={false}
          onPress={() => setAgainPasswordSee(!isAgainPasswordSee)}
        />
      );
    }
  };
  let isAgainPasswordValidate = false;

  const againPasswordValidate = () => {
    if (againPassword != "") {
      if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,}$/.test(password)) {
        if (password == againPassword) {
          isAgainPasswordValidate = true;
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

  let isPasswordValidate = false;

  const passwordValidate = () => {
    if (password != "") {
      if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,}$/.test(password)) {
        isPasswordValidate = true;
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

  //const scrollEnabled = screenHeight > height-40

  return (
    <KeyboardAwareScrollView
      behavior={Platform.OS === "ios" ? "padding" : "padding"}
      style={styles.container}
      contentContainerStyle={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: 15,
          paddingEnd: 15,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
        style={{ backgroundColor: "white" }}
        //scrollEnabled={scrollEnabled}
        //onContentSizeChange={onContentSizeChange}
      >
        <StatusBar translucent backgroundColor="transparent" />

        <View style={styles.box}>
          {/* ANİMATİON */}

          <LoadingAnimation isLoading={isLoading} />
          <CreateAccountSucces
            isCreateAccount={isCreateAccount}
            title="Hesap oluşturuldu!"
          />

          <View style={{ alignItems: "center" }}>
            <View style={styles.InputCard}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1.09,
                }}
              >
                {
                  <Image
                    source={require("../../../rec/Logos/hdoktor-logo-dikeyImageSize.png")}
                  />
                }
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

                <TextInput
                  style={styles.input}
                  label="Çalışılan Yer"
                  placeholderTextColor="grey"
                  value={CalisilanYer}
                  onChangeText={(text) => SetCalisilanYer(text)}
                  underlineColor="#f44336"
                  activeUnderlineColor="#f44336"
                  outlineColor="white"
                  activeOutlineColor="red"
                  //right={NameValidate(name)}
                />

                <TextInput
                  style={styles.input}
                  label="Şifre"
                  placeholderTextColor="grey"
                  secureTextEntry={ispasswordSee}
                  activeUnderlineColor="#f44336"
                  outlineColor="white"
                  underlineColor="#f44336"
                  //onBlur={infoPasswordUpdate()} Odaklanma kesilince çağırılan callback
                  left={passwordSee()}
                  right={passwordValidate(password)}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                />

                {password == ""
                  ? false
                  : !isPasswordValidate && (
                      <HelperText
                        type="info"
                        visible={password == "" ? false : !isPasswordValidate}
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
                        az; 1 harf, 1 rakam içermelidir. Boşluk içermemeli. Özel
                        karakterler kullanılabilir: @$!%*#?&^_-
                      </HelperText>
                    )}

                <TextInput
                  style={styles.input}
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
                        style={{ paddingHorizontal: 10, textAlign: "justify" }}
                      >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed est ligula, faucibus in urna eu, aliquam tincidunt
                        ante. Nam nec convallis libero, placerat ultricies
                        risus. Donec felis justo, hendrerit nec arcu vitae,
                        ultricies placerat mi. Ut in augue malesuada, pretium
                        nunc imperdiet, finibus lorem. Morbi suscipit purus
                        consequat commodo consequat. Morbi at blandit augue. Ut
                        eget semper sapien. Nulla felis leo, condimentum eget
                        quam et, ullamcorper convallis risus. Proin a ligula in
                        tortor imperdiet lacinia. Etiam metus dolor, pulvinar
                        vitae est et, venenatis maximus velit. Integer eu diam
                        vel turpis vestibulum vulputate. Morbi fringilla elit
                        sed orci tincidunt dictum. Etiam interdum odio et justo
                        condimentum, sit amet fringilla magna feugiat. Donec in
                        gravida eros. Duis feugiat, quam et malesuada tempus,
                        diam mi porta urna, non pharetra leo diam non mauris.
                        Donec ut velit ornare, consectetur erat ut, porttitor
                        felis. Quisque mattis cursus justo vitae eleifend. Cras
                        sem neque, facilisis in lacus ut, sodales laoreet leo.
                        Curabitur ut diam semper, tempus lorem eget, porttitor
                        odio. Mauris congue mi ut metus vulputate iaculis non
                        sollicitudin libero. Aenean facilisis tincidunt
                        venenatis. Etiam tempus, est ac condimentum tincidunt,
                        orci dolor pellentesque risus, ut sollicitudin odio
                        metus sit amet risus. Vestibulum vitae congue ante, id
                        accumsan tellus. Suspendisse at odio at erat tristique
                        consectetur nec et arcu. Aenean accumsan dignissim
                        libero non placerat. Nulla nunc augue, efficitur blandit
                        nisi ut, rutrum lobortis purus. Maecenas semper porta
                        justo, quis bibendum dui bibendum ac. Ut vel turpis
                        aliquam, rhoncus leo a, rutrum turpis. Quisque porttitor
                        tristique nunc ut commodo. Phasellus in egestas eros.
                        Etiam condimentum et ex eget dapibus. Proin fringilla
                        commodo neque auctor faucibus. Integer vitae molestie
                        nunc, sed vehicula felis. Nullam neque eros, porttitor
                        quis libero quis, dapibus ultricies purus. Nulla quis
                        nisi eget enim tempor euismod sed maximus velit. Nunc
                        neque risus, posuere ac rutrum fringilla, commodo ut
                        lorem. Nam nec lorem ac felis viverra tincidunt. Cras
                        quis quam eu orci tempus viverra. Phasellus nec rhoncus
                        urna. Sed id ex congue orci feugiat maximus. Nam
                        scelerisque euismod magna. Duis bibendum mi et luctus
                        mattis. Interdum et malesuada fames ac ante ipsum primis
                        in faucibus. Pellentesque ut nisl eu quam aliquet
                        vehicula. Cras placerat interdum dapibus. Etiam lorem
                        diam, varius ut turpis condimentum, aliquet aliquam
                        urna. Maecenas in urna non quam vestibulum venenatis.
                        Aliquam posuere, ligula quis consequat semper, neque
                        nulla pharetra ligula, sit amet tempor leo elit sit amet
                        nulla. Sed viverra, justo vitae dignissim mollis, dui
                        orci ultrices dolor, ac faucibus augue eros eu nibh.
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
                    marginTop: 20,
                    flex: 1,
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("DSignUp0", {
                        CalisilanYer: CalisilanYer,
                        password: password,
                        againPassword: againPassword,
                        cinsiyet: cinsiyet,
                        isSozlesmeOnay: isSozlesmeOnay,
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
                          isAgainPasswordValidate &
                          isPasswordValidate &
                          (cinsiyet != "") &
                          isSozlesmeOnay
                        ) {
                          createAccount(
                            name,
                            email,
                            password,
                            brans,
                            CalisilanYer,
                            time1,
                            time2,
                            cinsiyet
                          );
                        } else {
                          Alert.alert("Hata❗", "Lütfen formu doldurunuz.", [
                            {
                              text: "Tamam",
                              style: "cancel",
                            },
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  box: {
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
  },
  scrollView: {
    flex: 1,
    // backgroundColor:"blue",
    alignSelf: "center",
    borderColor: "black",
    borderWidth: 2,
    // justifyContent:"center"
  },
  contentContainer: {
    justifyContent: "center",
  },
  InputCard: {
    backgroundColor: "white",
  },
  input: {
    width: 300,
    height: 60,
    margin: 15,
    backgroundColor: "white",
    fontSize: 18,
    // backgroundColor:"red"
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

export default SignUp1;
