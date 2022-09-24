import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import firebase from "firebase/compat/app";
import { TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import LoadingAnimation from "../../../components/Animations/LoadingAnimation";
import ForgetPasswordModal from "../../../components/Modals/ForgetPasswordModal";

const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const [errroMessage, setErrorMessage] = useState("");

  const [found, setFound] = useState();
  const [D_userID, setD_userID] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFPModalVisible, setIsFPModalVisible] = useState(false);
  const [isPasswordSee, setispasswordSee] = useState(true);

  const signIn = async () => {
    setLoading(true);
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        const user = firebase.auth().currentUser;
        firebase
          .firestore()
          .collection("D_user")
          .get()
          .then((querySnapshot) => {
            const D_userId = [];
            querySnapshot.forEach((doc) => {
              D_userId.push(doc.id);
              // console.log(doc.id)
            });
            setD_userID(D_userId);
          })
          .then(() => {
            firebase
              .firestore()
              .collection("D_user")
              .where("email", "==", email.toLowerCase())
              .get()
              .then((snapshot) => {
                // console.log(snapshot.);
                if (!snapshot.empty) {
                  setLoading(false);
                  setEmail("");
                  setPassword("");
                  setErrorMessage("");
                  navigation.navigate("TabD");
                } else {
                  firebase
                    .firestore()
                    .collection("D_user")
                    .where("Id", "==", user.uid)
                    .get()
                    .then((snaps) => {
                      if (!snaps.empty) {
                        firebase
                          .firestore()
                          .collection("D_user")
                          .doc(user.uid)
                          .get()
                          .then((thenQery) => {
                            firebase
                              .firestore()
                              .collection("Chats")
                              .where(
                                "users",
                                "array-contains",
                                thenQery.data().email
                              )
                              .get()
                              .then((thenQery2) => {
                                thenQery2.forEach((thenFor) => {
                                  thenFor.ref.update({
                                    users: [
                                      thenFor.data().users[0],
                                      user.email,
                                    ],
                                  });
                                });
                              })
                              .then(() => {
                                thenQery.ref.update({
                                  email: user.email,
                                });
                              });
                          })
                          .then(() => {
                            firebase
                              .firestore()
                              .collection("D_user")
                              .doc(user.uid)
                              .collection("Hastalarım")
                              .onSnapshot((querySnaps) => {
                                querySnaps.forEach((queryFor) => {
                                  firebase
                                    .firestore()
                                    .collection("H_user")
                                    .doc(queryFor.data().Id)
                                    .collection("Doktorlarım")
                                    .where("Id", "==", user.uid)
                                    .get()
                                    .then((snapsThen) => {
                                      snapsThen.forEach((snapsThenFor) => {
                                        snapsThenFor.ref.update({
                                          email: user.email,
                                        });
                                      });
                                    });
                                });
                              });
                          })
                          .then(() => {
                            setLoading(false);
                            setEmail("");
                            setPassword("");
                            setErrorMessage("");
                            navigation.navigate("TabD");
                          });
                        setLoading(false);
                        setErrorMessage("");
                      } else {
                        setLoading(false);
                        setErrorMessage("");
                        Alert.alert(
                          "Hatalı Gİriş",
                          "Hatalı Kullanıcı girişi!",
                          [
                            {
                              text: "Tekrar Dene",
                              style: "destructive",
                            },
                          ]
                        );
                      }
                    });
                }
              });
          });
      })
      .catch((error) => {
        setLoading(false);
        const errorCode = error.code;
        switch (errorCode.substr(5)) {
          case "ERROR_EMAIL_ALREADY_IN_USE":
          case "account-exists-with-different-credential":
          case "email-already-in-use":
            alert("Email already used. Go to login page.");
            break;
          case "ERROR_WRONG_PASSWORD":
          case "wrong-password":
            //   alert('Yanlış e-posta/şifre kombinasyonu.');
            setErrorMessage("Yanlış e-posta/şifre kombinasyonu.");
            break;
          case "ERROR_USER_NOT_FOUND":
          case "user-not-found":
            //   alert('Bu e-posta ile kullanıcı bulunamadı.');
            setErrorMessage("Bu e-posta ile kullanıcı bulunamadı.");
            break;
          case "ERROR_USER_DISABLED":
          case "user-disabled":
            alert("Kullanıcı devre dışı bırakıldı.");
            break;
          case "ERROR_TOO_MANY_REQUESTS":
          case "operation-not-allowed":
            alert("Bu hesaba giriş yapmak için çok fazla istek var.");
            break;
          case "ERROR_OPERATION_NOT_ALLOWED":
          case "operation-not-allowed":
            alert("Sunucu hatası, lütfen daha sonra tekrar deneyin.");
            break;
          case "ERROR_INVALID_EMAIL":
          case "invalid-email":
            setErrorMessage("Email adresi geçersiz.");
            //   alert('Email adresi geçersiz.');
            break;
          default:
            Alert.alert("Hata", "Giriş başarısız. Lütfen tekrar deneyin.", [
              { text: "Tamam" },
            ]);
            break;
        }
      });
  };

  const PasswordSee = () => {
    if (isPasswordSee) {
      return (
        <TextInput.Icon
          icon="eye-off-outline"
          forceTextInputFocus={false}
          iconColor={"#B71C1C"}
          style={{ marginTop: 15 }}
          onPress={() => setispasswordSee(!isPasswordSee)}
        />
      );
    } else {
      return (
        <TextInput.Icon
          icon="eye-outline"
          forceTextInputFocus={false}
          iconColor={"#B71C1C"}
          style={{ marginTop: 15 }}
          onPress={() => setispasswordSee(!isPasswordSee)}
        />
      );
    }
  };

  return (
    <View style={style.container}>
      {errroMessage == "Yanlış e-posta/şifre kombinasyonu." ||
      "Email adresi geçersiz." ||
      "Bu e-posta ile kullanıcı bulunamadı." ? (
        <Text style={{ color: "red", fontSize: 17, fontWeight: "bold" }}>
          {"" + errroMessage}
        </Text>
      ) : (
        ""
      )}

      <ForgetPasswordModal
        isModalVisible={isFPModalVisible}
        onBackdropPress={() => setIsFPModalVisible(false)}
      />

      <LoadingAnimation isLoading={loading} />

      <TextInput
        style={style.inputBox}
        mode="outlined"
        theme={{ roundness: 25 }}
        activeOutlineColor="#B71C1C"
        outlineColor="#ECECEC"
        left={
          <TextInput.Icon
            icon="at"
            forceTextInputFocus={true}
            iconColor={"#B71C1C"}
            style={{ marginTop: 15 }}
          />
        }
        value={email}
        label="E-mail"
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        style={style.inputBox}
        mode="outlined"
        theme={{ roundness: 25 }}
        activeOutlineColor="#B71C1C"
        outlineColor="#ECECEC"
        left={
          <TextInput.Icon
            icon="lock-outline"
            forceTextInputFocus={true}
            iconColor={"#B71C1C"}
            style={{ marginTop: 15 }}
          />
        }
        right={PasswordSee()}
        value={password}
        label="Şifre"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={isPasswordSee}
      />

      <TouchableOpacity style={style.button} onPress={() => signIn()}>
        <Text style={style.buttonText}>Giriş Yap</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginTop: 5, padding: 5 }}
        onPress={() => setIsFPModalVisible(true)}
      >
        <Text style={{ fontSize: 16 }}>Şifreni mi unuttun?</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputBox: {
    width: 300,
    height: 50,
    backgroundColor: "#ECECEC",
    fontSize: 20,
    color: "#fff",
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "500",
    color: "#fff",
    textAlign: "center",
  },
  button: {
    width: 300,
    backgroundColor: "#B71C1C",
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 12,
  },
});

export default Form;
