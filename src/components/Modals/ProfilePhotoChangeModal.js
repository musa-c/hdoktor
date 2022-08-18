import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import { Avatar } from "react-native-elements";
import LoadingButton from "../Buttons/LoadingButton";

const ProfilePhotoChangeModal = ({
  isModalVisible,
  toggleModal,
  onBackdropPress,
  onSwipeComplete,
  avatar,
  showImagePicker,
  AvatarUpdate,
  loadingButton,
}) => {
  return (
    <Modal
      isVisible={isModalVisible}
      style={{
        margin: 0,
        justifyContent: "center",
        alignItems: "center",
      }}
      //swipeDirection="down"
      onBackdropPress={onBackdropPress}
      //onSwipeComplete={onSwipeComplete}
    >
      <View
        style={{
          // backgroundColor: "rgba(52, 52, 52, alpha)",
          backgroundColor: "#EEEEEE",
          borderRadius: 15,
          width: Dimensions.get("screen").width / 1.1,
          paddingVertical: 15,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <Ionicons
          name="close-outline"
          color="black"
          size={30}
          onPress={toggleModal}
          style={{ alignSelf: "flex-end", marginRight: 15 }}
        /> */}
        <Avatar
          source={{ uri: avatar }}
          size={160}
          rounded
          onPress={showImagePicker}
        >
          <Avatar.Accessory size={27} onPress={showImagePicker} />
        </Avatar>

        <LoadingButton
          mode="contained"
          style={{
            // backgroundColor: "#B71C1C",
            marginTop: 20,
            borderRadius: 20,
          }}
          color="#B71C1C"
          FontStyle={{ color: "#F6F6F6", fontSize: 20 }}
          text={"Kaydet"}
          onPress={AvatarUpdate}
          loading={loadingButton}
          disabled={loadingButton}
        />
      </View>
    </Modal>
  );
};

export default ProfilePhotoChangeModal;
