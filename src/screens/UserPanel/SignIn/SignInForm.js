import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import firebase from "firebase/compat/app";
import { useNavigation } from "@react-navigation/native";
import LoadingAnimation from "../../../components/Animations/LoadingAnimation";
import { TextInput } from "react-native-paper";
import ForgetPasswordModal from "../../../components/Modals/ForgetPasswordModal";

const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [loading, SetLoading] = useState(false);

  const [errroMessage, setErrorMessage] = useState("");
  const [isPasswordSee, setispasswordSee] = useState(true);
  const [H_userID, setH_userId] = useState();
  const [isFPModalVisible, setIsFPModalVisible] = useState(false);

  const signIn = async () => {
    SetLoading(true);
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        const user = firebase.auth().currentUser;
        firebase
          .firestore()
          .collection("H_user")
          .get()
          .then((querySnapshot) => {
            const H_userId = [];
            querySnapshot.forEach((doc) => {
              H_userId.push(doc.id);
            });
            setH_userId(H_userId);
          })
          .then(() => {
            firebase
              .firestore()
              .collection("H_user")
              .where("email", "==", email.toLowerCase())
              .get()
              .then((snapshot) => {
                if (!snapshot.empty) {
                  SetLoading(false);
                  setEmail("");
                  setPassword("");
                  setErrorMessage("");
                  navigation.navigate("TabU");
                } else {
                  firebase
                    .firestore()
                    .collection("H_user")
                    .where("Id", "==", user.uid)
                    .get()
                    .then((snaps) => {
                      if (!snaps.empty) {
                        // Kullanıcı eğer emaili değiştip mail kutusuna gelen linki tıklayıp eski emaili dönerse gerekli veritabanı işlemleri uygulamanacak!
                        console.log(user.uid);

                        firebase
                          .firestore()
                          .collection("H_user")
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
                                      user.email,
                                      thenFor.data().users[1],
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
                              .collection("H_user")
                              .doc(user.uid)
                              .collection("Doktorlarım")
                              .onSnapshot((querySnaps) => {
                                querySnaps.forEach((queryFor) => {
                                  firebase
                                    .firestore()
                                    .collection("D_user")
                                    .doc(queryFor.data().Id)
                                    .collection("Hastalarım")
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
                            SetLoading(false);
                            setEmail("");
                            setPassword("");
                            setErrorMessage("");
                            navigation.navigate("TabU");
                          });

                        SetLoading(false);
                        setErrorMessage("");
                      } else {
                        SetLoading(false);
                        setErrorMessage("");
                        Alert.alert(
                          "Hatalı Giriş",
                          "Hatalı kullanıcı girişi!",
                          [
                            {
                              text: "Tekrar Dene",
                              //   onPress: () => console.log("Cancel Pressed"),
                              style: "destructive",
                            },
                            // { text: "OK", onPress: () => console.log("OK Pressed") }
                          ]
                        );
                      }
                    });
                }
              });
          });
      })
      .catch((error) => {
        SetLoading(false);
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
            alert("Giriş başarısız. Lütfen tekrar deneyin.");
            break;
        }
      });
  };

  const PasswordSee = () => {
    if (isPasswordSee) {
      return (
        <TextInput.Icon
          name="eye-off-outline"
          forceTextInputFocus={false}
          color={"#B71C1C"}
          style={{ marginTop: "50%" }}
          onPress={() => setispasswordSee(!isPasswordSee)}
        />
      );
    } else {
      return (
        <TextInput.Icon
          name="eye-outline"
          forceTextInputFocus={false}
          color={"#B71C1C"}
          style={{ marginTop: "50%" }}
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
            name="at"
            forceTextInputFocus={true}
            color={"#B71C1C"}
            style={{ marginTop: "50%" }}
            onPress={() => {}}
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
            name="lock-outline"
            forceTextInputFocus={true}
            color={"#B71C1C"}
            style={{ marginTop: "50%" }}
            onPress={() => {}}
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
