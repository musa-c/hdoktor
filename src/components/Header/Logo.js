import React from "react";
import { StyleSheet, View, Image } from "react-native";

const Logo = (props) => {
  return (
    <View style={style.styles}>
      <Image source={require("../../rec/Logos/logoHeader.png")}></Image>
    </View>
  );
};

const style = StyleSheet.create({});
export default Logo;
