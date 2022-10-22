import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import Separator from "./Separator";
import ProfileUpdateModal from "../../../../components/Modals/ProfileUpdateModal";

const InfoCard = ({
  topInfo,
  value,
  icon,
  infoTitleModal,
  placeHolderModal,
  id,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

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

  return (
    <>
      <ProfileUpdateModal
        value={
          value == "Kronik hastalığınızı belirtmediniz."
            ? "Kronik hastalığınızı"
            : value
        }
        id={id}
        infoTitle={infoTitleModal}
        toggleModal={toggleModal}
        placeHolderModal={placeHolderModal}
        topInfo={topInfo}
        isInfoModalVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        w_user="H_user"
        w_user_other="D_user"
        w_user_collection="Doktorlarım"
        w_user_other_collection="Hastalarım"
      />

      <View style={styles.userInfo}>
        <Text style={styles.topInfoStyle}>{topInfo}</Text>
        <View style={{ flexDirection: "row" }}>
          <FontAwesome5 name={icon} size={22} />
          <Text
            style={[
              styles.ValueStyle,
              value == "Kronik hastalığınızı belirtmediniz."
                ? { fontStyle: "italic", color: "grey" }
                : { fontStyle: "normal" },
            ]}
          >
            {topInfo == "Yaş" ? calculateAge(value) : value}
          </Text>
          <Ionicons
            name="ellipsis-horizontal-circle"
            size={22}
            onPress={toggleModal}
          />
        </View>
      </View>
      <Separator />
    </>
  );
};

const styles = StyleSheet.create({
  userInfo: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    padding: 10,
    marginVertical: 5,
  },
  ValueStyle: {
    fontWeight: "400",
    fontSize: 20,
    paddingHorizontal: 10,
    flex: 1,
  },
  topInfoStyle: {
    marginBottom: 7,
    marginLeft: 32,
    color: "grey",
  },
});

export default InfoCard;
