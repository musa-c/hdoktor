import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Rating, Avatar } from "react-native-elements";
import { useRoute } from "@react-navigation/native";
import InfoCardMoreDoctorPatients from "../../../components/Card/InfoCardMoreDoctorPatients";
import LoadingButton from "../../../components/Buttons/LoadingButton";

const MorePatientInfo = () => {
  const route = useRoute();
  const Id = route.params.Id;
  const name = route.params.name;
  const email = route.params.email;
  const KHastalik = route.params.KHastalik;
  const avatar = route.params.avatar;
  const gender = route.params.gender;

  return (
    <View style={{ flex: 1, backgroundColor: "white", flexGrow: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 10,
          paddingEnd: 10,
          backgroundColor: "white",
          paddingVertical: 20,
        }}
      >
        <View style={styles.userImg}>
          {avatar == "" ? (
            <Avatar
              source={require("../../../rec/Avatars/DefaultHastaAvatar.png")}
              size={130}
              rounded
            ></Avatar>
          ) : (
            <Avatar source={{ uri: avatar }} size={130} rounded></Avatar>
          )}
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <LoadingButton
            text={"Mesaj At"}
            FontStyle={{ fontSize: 16, color: "white" }}
            mode="contained"
            style={{ borderRadius: 15 }}
            color="#FF2442"
          />
        </View>

        <InfoCardMoreDoctorPatients topInfo="İsim" value={name} icon={"user"} />

        <InfoCardMoreDoctorPatients
          topInfo={"Cinsiyet"}
          value={gender}
          icon={"venus-mars"}
        />

        <InfoCardMoreDoctorPatients
          topInfo={"Kronik Hastalık"}
          value={KHastalik == "" ? "Kronik hastalık belirtilmedi." : KHastalik}
          icon={"capsules"}
        />

        <InfoCardMoreDoctorPatients
          topInfo={"E-mail"}
          value={email}
          icon={"at"}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  userImg: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    marginBottom: 30,
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

export default MorePatientInfo;
