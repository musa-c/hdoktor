import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import LoadingButton from "../Buttons/LoadingButton";
import firebase from "firebase/compat/app";
import SuccesModal from "./SuccesModal";
import AnimatedLottieView from "lottie-react-native";
import { TextInput } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";

const ForgetPasswordModal = ({ isModalVisible, onBackdropPress }) => {
  const [sendEmailSucces, setSendEmailSucces] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMailForgotPassword = async (email) => {
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.toLowerCase())
    ) {
      setLoading(true);
      await firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          setLoading(false);
          setSendEmailSucces(true);
        })
        .catch((error) => {
          const ErrorCode = error.code;
          switch (ErrorCode.substr(5)) {
            case "invalid-email":
              setError("E-posta adresi geçerli değil.");
              setLoading(false);
              break;
            case "missing-android-pkg-name":
              setError("Eksik android paket adı.");
              setLoading(false);
              break;
            // case "missing-continue-uri":
            //   break;
            // case "missing-ios-bundle-id":
            //   break;
            // case "invalid-continue-uri":
            //   break;
            // case "unauthorized-continue-uri":
            //   break;
            case "user-not-found":
              setError("Kullanıcı bulunamadı.");
              setLoading(false);
              break;

            default:
              setError("Mail gönderilemedi. Lütfen tekrar deneyiniz.");
              setLoading(false);
              break;
          }
        });
    } else {
      setError("Hatalı E-posta adresi.");
      setLoading(false);
    }
  };

  return (
    <Modal
      isVisible={isModalVisible}
      style={{
        margin: 0,
        justifyContent: "center",
        alignItems: "center",
      }}
      onBackdropPress={onBackdropPress}
      backdropOpacity={0.8}
      onModalHide={() => {
        setEmail("");
        setError("");
        setSendEmailSucces(false);
        setLoading(false);
      }}
      //   onModalShow={() => {}}
      avoidKeyboard
    >
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 15,
          width: Dimensions.get("screen").width / 1.1,
          paddingVertical: 15,
        }}
      >
        {sendEmailSucces ? (
          <View style={{ alignItems: "center" }}>
            <Ionicons ns name="lock-closed-outline" size={100} color="grey" />
            <AnimatedLottieView
              style={{ height: 250 }}
              source={require("../../rec/Animations/ForgotPasswordEmailSendSucces.json")}
              autoPlay={true}
              loop={false}
            />
            <Text style={styles.testStyle}>
              <Text style={{ fontWeight: "bold" }}>{email} </Text>
              adresine şifrenizi sıfırlayabilmeniz için bağlantı başarıyla
              gönderildi.
            </Text>
          </View>
        ) : (
          <>
            <View style={{ alignItems: "center" }}>
              <Ionicons ns name="lock-closed-outline" size={100} color="grey" />
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Şifreni mi Unuttun?
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  marginHorizontal: 20,
                  marginVertical: 10,
                  fontSize: 18,
                }}
              >
                E-posta adresini gir, şifreni sıfırlayabilmen için sana bir
                bağlantı gönderelim.
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "red",
                  marginBottom: 10,
                }}
              >
                {error}
              </Text>
            </View>
            <TextInput
              style={styles.textInput}
              value={email}
              onChangeText={(text) => setEmail(text)}
              activeOutlineColor="#B71C1C"
              outlineColor="white"
              theme={{ roundness: 10 }}
              mode="outlined"
              label={"E-mail"}
            ></TextInput>

            <LoadingButton
              text="Gönder"
              mode="contained"
              loading={loading}
              disabled={email != "" ? loading : true}
              onPress={() => sendMailForgotPassword(email)}
              color="#B71C1C"
              FontStyle={{ fontSize: 20, color: "white" }}
              style={{
                borderRadius: 15,
                alignSelf: "center",
              }}
            />
          </>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  textInput: {
    marginBottom: 20,
    marginHorizontal: 20,
    fontSize: 20,
    backgroundColor: "#ECECEC",
    //height: 70,
    color: "#fff",
  },
  testStyle: {
    fontSize: 18,
    textAlign: "center",
    width: 300,
  },
});
export default ForgetPasswordModal;
