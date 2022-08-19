import {
  View,
  TouchableOpacity,
  Dimensions,
  Text,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Avatar, Rating } from "react-native-elements";
import InfoCard from "./InfoCard";
import ProfilePhotoChangeModal from "../../../../components/Modals/ProfilePhotoChangeModal";
import firebase from "firebase/compat/app";
import moment from "moment";
import trLocale from "moment/locale/tr";

const ProfileComponent = ({
  name,
  avatar,
  email,
  gender,
  time1,
  time2,
  CalisilanYer,
  brans,
  id,
}) => {
  return (
    <View style={styles.cont}>
      <View style={styles.userImg}>
        <Rating
          type="custom"
          ratingColor="#b71b1f"
          ratingBackgroundColor="#c8c7c8"
          ratingCount={5}
          imageSize={20}
          //onFinishRating={(text) => setRaiting(text)}
          startingValue={2}
          tintColor="white"
          style={{ marginBottom: 20 }}
        />

        {avatar != "" ? (
          <Avatar
            source={{ uri: avatar }}
            size={130}
            rounded
            // onPress={showImagePicker}
          >
            {/* <Avatar.Accessory size={27} onPress={showImagePicker} /> */}
          </Avatar>
        ) : (
          <Avatar
            source={require("../../../../rec/Avatars/DefaultDoctorAvatar.png")}
            size={130}
            rounded
            // onPress={showImagePicker}
          >
            {/* <Avatar.Accessory size={27} onPress={showImagePicker} /> */}
          </Avatar>
        )}

        {/* --- Modal --- */}

        {/* <ProfilePhotoChangeModal
          isModalVisible={isModalVisible}
          onBackdropPress={() => {
            !loading ? setModalVisible(false) : null;
          }}
          // onSwipeComplete={() => {
          //   !loading ? setModalVisible(false) : null;
          // }}
          toggleModal={toggleModalAvatar}
          avatar={NewAvatarUri}
          showImagePicker={showImagePicker}
          AvatarUpdate={() => AvatarUpdate(NewAvatarUri, ImageName)}
          loadingButton={loading}
        /> */}

        {/* --- Modal --- */}
      </View>

      <View style={styles.userInfoCont}>
        <InfoCard
          icon={"user"}
          topInfo="İsim"
          value={name}
          infoTitleModal="İsmini güncellemek için yeni isim giriniz."
          placeHolderModal="Yeni isim"
          id={id}
        />

        <InfoCard
          icon={"stethoscope"}
          topInfo="Branş"
          infoTitleModal="Branşını güncellemek için yeni branş giriniz."
          value={brans}
          id={id}
        />

        {CalisilanYer != "" ? (
          <InfoCard
            icon={"h-square"}
            topInfo="Çalışılan Yer"
            infoTitleModal="Çalıştığınız yeri güncelleyebilirsiniz."
            value={CalisilanYer}
            id={id}
          />
        ) : (
          <InfoCard
            icon={"h-square"}
            topInfo="Çalışılan Yer"
            infoTitleModal="Çalıştığınız yeri güncelleyebilirsiniz."
            value={"Çalışılan Yer belirtilmedi."}
            id={id}
          />
        )}

        <InfoCard
          icon={"clock"}
          topInfo="Çalışma Saatleri"
          infoTitleModal="Çalışma saatlerini güncellek için yeni saat aralığı seçiniz."
          value={
            moment(time1).locale("tr", trLocale).format("LT") +
            " - " +
            moment(time2).locale("tr", trLocale).format("LT")
          }
          id={id}
        />

        <InfoCard
          icon={"at"}
          topInfo="E-mail"
          value={email}
          infoTitleModal="email'ini güncellemek için yeni email giriniz."
          placeHolderModal="Yeni email"
          id={id}
        />

        <InfoCard
          icon={"venus-mars"}
          topInfo="Cinsiyet"
          value={gender}
          infoTitleModal="Cinsiyetini güncellemek için seçenklere tıklayınız."
          id={id}
        />

        <InfoCard
          icon={"lock"}
          topInfo="Şifre"
          value="********"
          infoTitleModal="Şifreyi güncellemek için yeni şifre giriniz."
          id={id}
          placeHolderModal="Yeni Şifre"
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
