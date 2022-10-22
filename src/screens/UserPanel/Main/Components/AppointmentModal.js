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
import CreateAccountSucces from "../../../../components/Animations/CreateAccountSucces";

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
  const [isSucces, setIsSucces] = useState(false);

  // console.log("selectedDate:", date);
  // console.log("selectedClock:", clock);
  // console.log("dateDay:", dateDay);
  // console.log("dateMonth:", dateMonth);
  const CurrentClcok = moment(new Date()).locale("tr", trLocale).format("LT");

  const GorusmeTalepx = (currentDate) => {
    const date =
      moment(currentDate)?.format("LL") ?? moment(new Date()).format("LL");
    var now = new Date();

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
                  })
                  .then(() => {
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
                  })
                  .then(() => {
                    setLoading(false);
                    setIsSucces(true);
                    setTimeout(() => {
                      setIsSucces(false);
                    }, 3000);
                  });
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

  const MonthToNumber = (month) => {
    switch (month) {
      case "Ocak":
        return 1;
      case "Şubat":
        return 2;
      case "Mart":
        return 3;
      case "Nisan":
        return 4;
      case "Mayıs":
        return 5;
      case "Haziran":
        return 6;
      case "Temmuz":
        return 7;
      case "Ağustos":
        return 8;
      case "Eylül":
        return 9;
      case "Ekim":
        return 10;
      case "Kasım":
        return 11;
      case "Aralık":
        return 12;
      default:
        break;
    }
  };

  console.log(
    MonthToNumber(
      moment(date)?.format("LL").split(" ")[1] ??
        moment(new Date()).format("LL").split(" ")[1]
    )
  );

  const GorusmeTalep = (currentDate) => {
    setLoading(true);
    const date =
      moment(currentDate)?.format("LL") ?? moment(new Date()).format("LL");
    if (
      MonthToNumber(date.split(" ")[1]) == dateMonth &&
      currentDate.getDate() == dateDay
    ) {
      if (
        parseInt(parseInt(clock.split(":")[0])) <
        parseInt(parseInt(CurrentClcok.split(":")[0]))
      ) {
        Alert.alert(
          "UYARI",
          "Geçmiş tarihin randevusunu alamazsınız. Lütfen ileri bir tarih veya saat seçiniz.",
          [{ text: "Tamam", onPress: onBackdropPress }]
        );
        setLoading(false);
      } else if (
        parseInt(clock.split(":")[0]) == parseInt(CurrentClcok.split(":")[0])
      ) {
        if (
          parseInt(parseInt(clock.split(":")[1])) <
          parseInt(parseInt(CurrentClcok.split(":")[1]))
        ) {
          Alert.alert(
            "UYARI",
            "Geçmiş tarihin randevusunu alamazsınız. Lütfen ileri bir tarih veya saat seçiniz.",
            [{ text: "Tamam", onPress: onBackdropPress }]
          );
          setLoading(false);
        } else {
          GorusmeTalepx(currentDate);
        }
      } else {
        GorusmeTalepx(currentDate);
      }
    } else {
      GorusmeTalepx(currentDate);
    }
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
        <CreateAccountSucces
          isCreateAccount={isSucces}
          title={"Randevu Talebi başarıyla oluşturuldu."}
        />

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
            onPress={() => GorusmeTalep(date ?? new Date())}
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
