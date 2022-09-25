import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import Modal from "react-native-modal";
import firebase from "firebase/compat/app";

const AppointmentModal = ({ isVisible, onBackdropPress, date, clock }) => {
  const dateMonth = new Date().getMonth() + 1;
  const dateDay = new Date().getDate();

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
            {GetMonth(date?.getMonth()) ?? GetMonth(dateMonth)}
          </Text>
        </View>
        <Text style={styles.textTitle}>Randevu Saati</Text>
        <Text style={{ fontSize: 20, marginLeft: 20 }}>{clock}</Text>

        <View style={styles.buttonArea}>
          <TouchableOpacity style={styles.button}>
            <Text style={{ color: "#fff" }}>Randevu Al</Text>
          </TouchableOpacity>
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
    alignItems: "center",
    alignSelf: "center",
    flex: 1,
    //backgroundColor: "blue",
    height: 100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
