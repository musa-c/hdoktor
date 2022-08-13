import {
  View,
  TouchableOpacity,
  Dimensions,
  Text,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { Avatar } from "react-native-elements";
import InfoCard from "./InfoCard";
import ProfilePhotoChangeModal from "../../../../components/Modals/ProfilePhotoChangeModal";
import ProfileUpdateModal from "../../../../components/Modals/ProfileUpdateModal";

const ProfileComponent = ({
  name,
  avatar,
  email,
  phoneNumber,
  age,
  gender,
  id,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModalAvatar = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.cont}>
      <View style={styles.userImg}>
        <Avatar
          source={{ uri: avatar }}
          size={110}
          rounded
          onPress={toggleModalAvatar}
        >
          <Avatar.Accessory size={27} onPress={toggleModalAvatar} />
        </Avatar>
        {/* --- Modal --- */}

        <ProfilePhotoChangeModal
          isModalVisible={isModalVisible}
          onBackdropPress={() => setModalVisible(false)}
          onSwipeComplete={() => setModalVisible(false)}
          toggleModal={toggleModalAvatar}
        />

        {/* --- Modal --- */}

        {/* <Text style={{ fontWeight: "500", fontSize: 24, marginTop: 20 }}>
          {name}
        </Text> */}
      </View>

      <View style={styles.userInfoCont}>
        <InfoCard
          icon={"user"}
          topInfo="İsim"
          value={name}
          infoTitleModal="ismini düzenlemek için yeni isim giriniz."
          placeHolderModal="Yeni isim"
          id={id}
        />

        <InfoCard
          icon={"at"}
          topInfo="E-mail"
          value={email}
          infoTitleModal="email'ini düzenlemek için yeni email giriniz."
          placeHolderModal="Yeni email"
          id={id}
        />

        <InfoCard
          icon={"phone"}
          topInfo="Telefon Numarası"
          infoTitleModal="telefon numarasını düzenlemek için yeni telefon numarası giriniz."
          placeHolderModal="5XXXXXXXXX"
          value={phoneNumber}
          id={id}
        />
        <InfoCard
          icon={"calendar-day"}
          topInfo="Yaş"
          value={age}
          infoTitleModal="Yaşını düzenlemek için yeni doğum tarihini giriniz."
          placeHolderModal="yeni yaş"
          id={id}
        />
        <InfoCard
          icon={"venus-mars"}
          topInfo="Cinsiyet"
          value={gender}
          infoTitleModal="Cinsiyeti düzenlemek için seçenklere tıklayınız."
          id={id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cont: {
    // marginTop:Constants.statusBarHeight,
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
  },
  userImg: {
    justifyContent: "space-evenly",
    alignItems: "center",
    //    marginBottom: 0,
    // backgroundColor: "red",
    marginBottom: 15,
  },
  userInfoCont: {
    // flex:2.3,
    // backgroundColor:"red",
    justifyContent: "center",
  },
  userInfo: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    padding: 10,
    marginVertical: 5,
  },
  text: {
    padding: 15,
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    paddingVertical: 10,
  },
});

export default ProfileComponent;
