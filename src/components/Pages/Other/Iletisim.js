import { View, Text, StyleSheet, Platform, Alert } from "react-native";
import React, { useState } from "react";
import * as MailComposer from "expo-mail-composer";
import { TextInput } from "react-native-paper";
import LogoLogin from "../../LogoLogin";
import LoadingButton from "../../Buttons/LoadingButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CreateAccountSucces from "../../Animations/CreateAccountSucces";

const Iletisim = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [succes, setSucces] = useState(false);

  const sendEmail = () => {
    MailComposer.composeAsync({
      //ccRecipients: "musac1903@gmail.com",
      subject: subject,
      body: message,
      isHtml: true,
      recipients: ["info@hdoktor.com"],
    }).then((data) => {
      switch (data.status) {
        case "saved":
          break;
        case "cancelled":
          break;
        case "sent":
          setSucces(true);
          setTimeout(() => {
            setSucces(false);
          }, 3000);
          break;
        case "undetermined":
          Alert.alert("Hata❗", "Belirsiz bir hatadan dolayı gönderilemedi.", [
            { text: "Tamam" },
          ]);
          break;
        default:
          break;
      }
    });
  };
  return (
    <KeyboardAwareScrollView
      behavior="padding"
      style={styles.cont}
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
    >
      <CreateAccountSucces
        isCreateAccount={succes}
        title="E-mail gönderildi."
      />

      <View style={styles.cont}>
        <View style={styles.titleCont}>
          <Text style={styles.titleStyle}>İletişim</Text>
        </View>
        <View style={{ justifyContent: "center", flex: 1 }}>
          <TextInput
            mode="outlined"
            onChangeText={(text) => setSubject(text)}
            style={styles.textInput}
            label="Konu"
            activeOutlineColor="#003865"
            outlineColor="white"
            theme={{ roundness: 5 }}
          />
          <View style={{ minHeight: 150 }}>
            <TextInput
              mode="outlined"
              onChangeText={(text) => setMessage(text)}
              style={[styles.textInput, { flex: 1 }]}
              label="Mesajınız"
              activeOutlineColor="#003865"
              outlineColor="white"
              numberOfLines={10}
              multiline
              theme={{ roundness: 5 }}
            />
          </View>
          <LoadingButton
            FontStyle={{ fontSize: 18, color: "black" }}
            text="Gönder"
            onPress={() => sendEmail()}
            style={{ alignSelf: "center" }}
            mode="contained"
            color={"#eee"}
          />
        </View>
        <LogoLogin />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: "white",
  },
  titleCont: {
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  titleStyle: {
    fontSize: 40,
    fontWeight: "bold",
  },
  textInput: {
    marginBottom: 20,
    marginHorizontal: 20,
    fontSize: 20,
    backgroundColor: "#ECECEC",
    //height: 70,
    color: "#fff",
  },
});

export default Iletisim;
