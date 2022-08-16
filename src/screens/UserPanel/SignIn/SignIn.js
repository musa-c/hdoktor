import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import LogoLogin from "../../../components/LogoLogin";
import Icon from "react-native-vector-icons/FontAwesome";
import Form from "./SignInForm";

const SignIn = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 10,
          backgroundColor: "white",
        }}
      >
        <LogoLogin />
        <Form type="Giriş Yap" />

        <TouchableOpacity style={style.continueButton}>
          <Text style={style.continueText}>Giriş yapmadan devam et</Text>
          <Icon name="arrow-circle-right" size={63} color="#B71C1C" />
        </TouchableOpacity>

        <View style={style.signupTextCont}>
          <Text style={style.signupText}>Henüz kaydolmadın mı?</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("SignUp00", { screen: "SignUp0" })
            }
          >
            <Text style={style.signupButton}> Kaydol</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    // alignItems:"center", // yatay eksende hizalama item'ları (center: merkez)
    // justifyContent: "center" // dikey eksende(ana eksen) item'ları hizalamak için
  },
  continueText: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 16,
  },
  continueButton: {
    // backgroundColor: "red",
    //alignSelf: "center",
    marginTop: 20,
    alignItems: "center",
  },
  signupTextCont: {
    flexGrow: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingVertical: 16,
    flexDirection: "row",
  },
  signupText: {
    color: "#212121",
    fontSize: 16,
  },
  signupButton: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SignIn;
