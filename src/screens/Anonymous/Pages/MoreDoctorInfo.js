import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import { Rating, Avatar } from "react-native-elements";
import { useRoute } from "@react-navigation/native";
import InfoCardMoreDoctorPatients from "../../../components/Card/InfoCardMoreDoctorPatients";
import moment from "moment";
import trLocale from "moment/locale/tr";
import LoadingButton from "../../../components/Buttons/LoadingButton";
import Modal from "react-native-modal";

const MoreDoctorInfo = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [ModalMessage, setModalMessage] = useState("");
  const route = useRoute();
  const DoctorId = route.params.doctorId;
  const D_Name = route.params.name;
  const D_CalisilanYer = route.params.CalisilanYer;
  const time1 = route.params.time1;
  const time2 = route.params.time2;
  const brans = route.params.brans;
  const avatar = route.params.avatar;
  const email = route.params.email;
  const gender = route.params.gender;
  const ratingF = route.params?.rating ?? 0;
  const w_anonymous = route.params.w_anonymous;

  const ToggleButton = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white", flexGrow: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingVertical: 15,
          paddingHorizontal: 10,
          paddingEnd: 10,
          backgroundColor: "white",
        }}
      >
        <Modal
          isVisible={isModalVisible}
          style={{ margin: 0, justifyContent: "center", alignItems: "center" }}
          onBackdropPress={ToggleButton}
          backdropOpacity={0.8}
        >
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 15,
              width: Dimensions.get("screen").width / 1.2,
              alignItems: "center",
              paddingHorizontal: 10,
            }}
          >
            <Text
              style={{
                fontSize: 25,
                fontWeight: "bold",
                color: "#FF2442",
                textAlign: "center",
                marginBottom: 10,
                marginTop: 10,
              }}
            >
              Uyarı!
            </Text>
            <Text style={{ fontSize: 20, marginBottom: 5 }}>
              {ModalMessage}
            </Text>
            <TouchableOpacity
              onPress={
                w_anonymous == "h_anonymous"
                  ? () => navigation.navigate("UMain", { screen: "SignIn" })
                  : null
              }
            >
              <Text
                style={{
                  fontSize: 20,
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "grey",
                  textDecorationLine: "underline",
                  marginBottom: 10,
                }}
              >
                Giriş yap
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Rating
          type="custom"
          ratingColor="#FF2442"
          ratingBackgroundColor="#c8c7c8"
          imageSize={22}
          startingValue={ratingF}
          readonly
          tintColor="white"
        />

        <View style={styles.userImg}>
          {avatar == "" ? (
            <Avatar
              source={require("../../../rec/Avatars/DefaultDoctorAvatar.png")}
              size={130}
              rounded
            ></Avatar>
          ) : (
            <Avatar source={{ uri: avatar }} size={130} rounded></Avatar>
          )}
        </View>

        {w_anonymous == "h_anonymous" ? (
          <View
            style={{
              flexDirection: "row",
              marginTop: 15,
              marginBottom: 10,
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <LoadingButton
              onPress={() => {
                ToggleButton(),
                  setModalMessage(
                    "Mesaj atabilmeniz için kullanıcı girişi yapmalısınız."
                  );
              }}
              text={"Mesaj At"}
              FontStyle={{ fontSize: 16, color: "white" }}
              mode="contained"
              style={{ borderRadius: 15 }}
              color="#FF2442"
            />
            <LoadingButton
              onPress={() => {
                ToggleButton(),
                  setModalMessage(
                    "Randevu oluşturabilmeniz için kullanıcı girişi yapmalısınız."
                  );
              }}
              text={"Randevu Oluştur"}
              FontStyle={{ fontSize: 16, color: "white" }}
              mode="contained"
              style={{ borderRadius: 15 }}
              color="#FF2442"
              // onPress={() => navigation.navigate("Appointment", { id: DoctorId })}
            />
          </View>
        ) : null}

        <InfoCardMoreDoctorPatients
          topInfo="İsim"
          value={D_Name}
          icon={"user"}
        />
        <InfoCardMoreDoctorPatients
          topInfo="Branş"
          value={brans}
          icon="stethoscope"
        />
        <InfoCardMoreDoctorPatients
          topInfo={"Cinsiyet"}
          value={gender}
          icon={"venus-mars"}
        />
        <InfoCardMoreDoctorPatients
          topInfo={"Çalışılan Yer"}
          value={
            D_CalisilanYer == ""
              ? "Çalışılan yer belirtilmemiş."
              : D_CalisilanYer
          }
          icon="h-square"
        />
        <InfoCardMoreDoctorPatients
          topInfo={"E-mail"}
          value={email}
          icon={"at"}
        />
        <InfoCardMoreDoctorPatients
          topInfo={"Çalışma Saat Aralığı"}
          value={
            moment(time1).locale("tr", trLocale).format("LT") +
            " - " +
            moment(time2).locale("tr", trLocale).format("LT")
          }
          icon="clock"
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  monthYear: {
    flexDirection: "row",
    marginTop: 10,
  },
  mentYearText: {
    marginHorizontal: 5,
    fontSize: 25,
    fontWeight: "700",
  },
  montDayCont: {
    flexDirection: "row",
    marginTop: 10,
  },
  monthDayBox: {
    justifyContent: "space-evenly",
    width: 70,
    height: 90,
    backgroundColor: "#64b5f6",
    borderRadius: 10,
    marginStart: 5,
    alignItems: "center",
    marginEnd: 5,
    flexGrow: 5,
  },
  monthDayMonthText: {
    fontSize: 18,
    fontWeight: "700",
  },
  monthDayDayText: {
    fontSize: 15,
    fontWeight: "700",
  },
  RandevuClockCont: {
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  RandevuClockBox: {
    width: Dimensions.get("screen").width / 3.8,
    backgroundColor: "green",
    borderRadius: 5,
    marginStart: 5,
    marginEnd: 5,
    flexDirection: "row",
    justifyContent: "center",
    height: 35,
    alignItems: "center",
    flexGrow: 1,
  },
  RandevuClockText: {
    fontSize: 18,
    fontWeight: "600",
  },
  userImg: {
    justifyContent: "space-evenly",
    alignItems: "center",
    flex: 1,
    marginTop: 15,
  },
  userInfoCont: {
    justifyContent: "center",
  },
  userInfo: {
    backgroundColor: "white",
    // margin:10,
    paddingHorizontal: 16,
    padding: 10,
    marginVertical: 5,
  },
});

export default MoreDoctorInfo;
