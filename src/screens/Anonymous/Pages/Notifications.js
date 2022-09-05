import { View, Text } from "react-native";
import React from "react";
import Info from "../../../components/Anonymous/Info";
const Notifications = ({ route }) => {
  const w_anonymous = route.params.w_anonymous;
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Info
        text={"Bildirimlerini görebilmen için giriş yapmalısın."}
        w_anonymous={w_anonymous}
      />
    </View>
  );
};

export default Notifications;
