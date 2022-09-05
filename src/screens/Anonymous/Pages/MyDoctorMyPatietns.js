import { View, Text } from "react-native";
import React from "react";
import Header from "../../../components/Anonymous/Header";
import Info from "../../../components/Anonymous/Info";

const MyDoctorMyPatietns = ({ navigation, route }) => {
  const w_anonymous = route.params.w_anonymous;
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Header
        onPressChats={() =>
          navigation.navigate("ChatsScreen", {
            w_anonymous: w_anonymous,
          })
        }
        onPressNotifications={() =>
          navigation.navigate("Notifications", { w_anonymous: w_anonymous })
        }
      />
      <Info
        text={
          w_anonymous == "h_anonymous"
            ? "Doktorlarını görebilmen için giriş yapmalısın."
            : "Hastalarını görebilmen için giriş yapmalısın."
        }
        w_anonymous={w_anonymous}
      />
    </View>
  );
};

export default MyDoctorMyPatietns;
