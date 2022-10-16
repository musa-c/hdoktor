import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import firebase from "firebase/compat/app";
import moment from "moment";
import trLocale from "moment/locale/tr";
import { Button } from "react-native-paper";
import { Alert } from "react-native";

const AppointmentModal = ({
  isVisible,
  onBackdropPress,
  date,
  clock,
  doctorId,
  H_id,
  H_name,
  H_Avatar,
  H_Cinsiyet,
  H_email,
  KHastalik,
}) => {
  const dateMonth = new Date().getMonth() + 1;
  const dateDay = new Date().getDate();
  const [loading, setLoading] = useState(false);

  const GorusmeTalep = (currentDate) => {
    setLoading(true);
    const date = moment(currentDate).format("LL");

    firebase
      .firestore()
      .collection("D_user")
      .doc(doctorId)
      .collection("GorusmeTalep")
      .where("email", "==", H_email)
      .where("RandevuTarih", "==", date)
      .where("RandevuSaat", "==", clock)
      .get()
      .then((QuerySnapshot) => {
        if (QuerySnapshot.empty) {
          firebase
            .firestore()
            .collection("D_user")
            .doc(doctorId)
            .collection("GorusmeTalep")
            .where("RandevuTarih", "==", date)
            .where("RandevuSaat", "==", clock)
            .get()
            .then((QuerySnap) => {
              if (QuerySnap.empty) {
                firebase
                  .firestore()
                  .collection("D_user")
                  .doc(doctorId)
                  .collection("GorusmeTalep")
                  .doc()
                  .set({
                    name: H_name,
                    cinsiyet: H_Cinsiyet,
                    // date: H_Date,
                    // KHastalik: H_KHastalik,
                    email: H_email,
                    id: H_id,
                    RandevuTarih: date,
                    RandevuSaat: clock,
                    avatar: H_Avatar,
                    KHastalik: KHastalik,
                  });
                var now = new Date();

                firebase
                  .firestore()
                  .collection("D_user")
                  .doc(doctorId)
                  .collection("Bildirimlerim")
                  .doc()
                  .set({
                    name: H_name,
                    avatar: H_Avatar,
                    RandevuTarih: date,
                    RandevuSaat: clock,
                    saat: now,
                    KHastalik: KHastalik,
                    id: H_id,
                    read: false,
                  });

                alert("BAŞARILI!");
                setLoading(false);
              } else {
                Alert.alert(
                  "UYARI",
                  "İlgili saat ve tarihde randevu talebi bulunmakta. Lütfen başka bir gün veya saat seçiniz.",
                  [
                    {
                      text: "Tamam",
                    },
                  ]
                );
                setLoading(false);
              }
            });
        } else {
          Alert.alert(
            "UYARI",
            "İlgili saat ve tarihde randevu talebiniz bulunmakta. Lütfen başka bir gün veya saat seçiniz.",
            [
              {
                text: "Tamam",
              },
            ]
          );
          setLoading(false);
        }
      });
  };

  const GetMonth = (month) => {
    switch (month) {
      case 1:
        return "Ocak";
      case 2:
        return "Şubat";
      case 3:
        return "Mart";
      case 4:
        return "Nisan";
      case 5:
        return "Mayıs";
      case 6:
        return "Haziran";
      case 7:
        return "Temmuz";
      case 8:
        return "Ağustos";
      case 9:
        return "Eylül";
      case 10:
        return "Ekim";
      case 11:
        return "Kasım";
      case 12:
        return "Aralık";
      default:
        break;
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      style={{ justifyContent: "center", margin: 20 }}
      animationIn="fadeIn"
      animationOut="fadeOut"
      animationInTiming={0}
      animationOutTiming={300}
      //onModalHide={onModalHide}
    >
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 15,
          width: Dimensions.get("screen").width / 1.1,
          height: Dimensions.get("screen").height / 2.5,
        }}
      >
        <Text style={styles.textTitle}>Randevu Tarihi</Text>
        <View style={{ flexDirection: "row", marginLeft: 20 }}>
          <Text style={{ fontSize: 20 }}>{date?.getDate() ?? dateDay} </Text>
          <Text style={{ fontSize: 20 }}>
            {GetMonth(date?.getMonth() + 1) ?? GetMonth(dateMonth)}
          </Text>
        </View>
        <Text style={styles.textTitle}>Randevu Saati</Text>
        <Text style={{ fontSize: 20, marginLeft: 20 }}>{clock}</Text>

        <View style={styles.buttonArea}>
          <Button
            mode="contained"
            loading={loading}
            onPress={() => GorusmeTalep(date)}
            disabled={loading}
            style={{
              borderRadius: 10,
              padding: 5,
              backgroundColor: "#B71C1C",
              marginHorizontal: 20,
            }}
          >
            Randevu Al
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  textTitle: {
    fontSize: 23,
    fontWeight: "bold",
    color: "grey",
    marginVertical: 10,
    marginLeft: 20,
  },
  buttonArea: {
    justifyContent: "center",
    flex: 1,
    //backgroundColor: "blue",
    height: 100,
  },
  button: {
    height: 55,
    width: 350,
    backgroundColor: "#EB1D36",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});

export default AppointmentModal;
