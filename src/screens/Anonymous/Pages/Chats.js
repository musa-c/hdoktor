import { View, Text } from "react-native";
import React from "react";
import Info from "../../../components/Anonymous/Info";

const Chats = ({ route }) => {
  const w_anonymous = route.params.w_anonymous;
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Info
        text={
          w_anonymous == "h_anonymous"
            ? "Doktorlarına mesaj gönderebilmen için giriş yapmalısın."
            : "Hastalarına mesaj gönderebilmen için giriş yapmalısın."
        }
        w_anonymous={w_anonymous}
      />
    </View>
  );
};

export default Chats;
