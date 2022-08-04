import React from "react";
import { View, StyleSheet, Image } from "react-native";

const LogoLogin = () => {
  return (
    <View style={style.container}>
      <Image source={require("../rec/Logos/hdoktor-logo-dikeyImageSize.png")} />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logoText: {
    marginVertical: 15,
    fontSize: 18,
  },
});

export default LogoLogin;
