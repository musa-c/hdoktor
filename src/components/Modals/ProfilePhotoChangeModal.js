import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";

const ProfilePhotoChangeModal = ({
  isModalVisible,
  toggleModal,
  onBackdropPress,
  onSwipeComplete,
}) => {
  return (
    <Modal
      isVisible={isModalVisible}
      style={{ margin: 0, justifyContent: "flex-end" }}
      swipeDirection="down"
      onBackdropPress={onBackdropPress}
      onSwipeComplete={onSwipeComplete}
    >
      <View
        style={{
          height: Dimensions.get("screen").height / 3.5,
          backgroundColor: "#fff",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <View
          style={{
            width: 70,
            height: 6,
            backgroundColor: "grey",
            alignSelf: "center",
            borderRadius: 10,
            marginTop: 12,
            position: "absolute",
          }}
        ></View>
        <Ionicons
          name="close-outline"
          color="grey"
          size={30}
          onPress={toggleModal}
          style={{ alignSelf: "flex-end", marginRight: 5 }}
        />

        <View
          style={{
            justifyContent: "space-evenly",
            flex: 1,
            backgroundColor: "white",
          }}
        >
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              alignSelf: "center",
            }}
          >
            Fotoğraf Değiştir
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: "#d2302f",
              width: 300,
              height: 50,
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 25,
            }}
          >
            <Text style={{ fontSize: 20, color: "white", fontWeight: "600" }}>
              Galerimden seç
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#d2302f",
              width: 300,
              height: 50,
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 25,
            }}
          >
            <Text style={{ fontSize: 20, color: "white", fontWeight: "600" }}>
              Fotoğraf çek
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ProfilePhotoChangeModal;
