import { View, Text, Dimensions, TextInput, StyleSheet } from "react-native";
import React from "react";
import Modal from "react-native-modal";

const ProfileUpdateModal = ({
  value,
  isInfoModalVisible,
  onBackdropPress,
  infoTitle,
}) => {
  return (
    <Modal
      isVisible={isInfoModalVisible}
      style={{
        margin: 0,
        justifyContent: "center",
        alignItems: "center",
      }}
      onBackdropPress={onBackdropPress}
      backdropOpacity={0.8}
      //avoidKeyboard
    >
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 15,
          width: Dimensions.get("screen").width / 1.1,
        }}
      >
        <View style={styles.titleCont}>
          <Text style={styles.titleText}>Düzenleme</Text>
        </View>
        <View style={styles.textCont}>
          <Text style={styles.infoTitle}>
            <Text style={styles.valueStyle}>{value} </Text>
            {infoTitle} düzenlemek için yeni isminizi giriniz.
          </Text>
        </View>

        <TextInput
          style={{
            backgroundColor: "#A2B5BB",
            //height: 35,
            borderRadius: 10,
            margin: 20,
            padding: 10,
            fontSize: 18,
          }}
          placeholder="Yeni isim"
        ></TextInput>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 29,
    fontWeight: "bold",
  },
  titleCont: {
    alignItems: "center",
    paddingVertical: 10,
  },
  infoTitle: {
    fontSize: 20,
    color: "#1C3879",
  },
  valueStyle: {
    fontSize: 20,
    color: "#1C3879",
    fontWeight: "bold",
  },
  textCont: {
    flexDirection: "row",
    paddingHorizontal: 10,
  },
});

export default ProfileUpdateModal;
