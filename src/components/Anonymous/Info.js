import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { color } from "react-native-elements/dist/helpers";
import { useNavigation } from "@react-navigation/native";

const Info = ({ text, w_anonymous }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.cont}>
      <Ionicons name="person-circle-outline" size={150} color="grey" />
      <View style={styles.textCont}>
        <Text style={styles.textStyle}>{text}</Text>
        <TouchableOpacity
          onPress={
            w_anonymous == "h_anonymous"
              ? () => navigation.navigate("UMain", { screen: "SignIn" })
              : () => navigation.navigate("DMain", { screen: "D_SignIn" })
          }
        >
          <Text style={styles.SignInText}>Giriş Yap</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    color: "grey",
    fontSize: 22,
    textAlign: "center",
  },
  textCont: {
    paddingHorizontal: 15,
  },
  SignInText: {
    textAlign: "center",
    marginTop: 30,
    fontWeight: "bold",
    color: "grey",
    textDecorationLine: "underline",
    fontSize: 22,
  },
});

export default Info;
