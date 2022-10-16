import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import LogoLogin from "../../LogoLogin";

const Others = ({ route }) => {
  const title = route.params.title;
  const text = route.params.text;

  return (
    <View style={styles.cont}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 10,
        }}
      >
        <View style={styles.titleCont}>
          <Text style={styles.titleStyle}>{title}</Text>
        </View>
        <View style={styles.textCont}>
          <Text style={styles.textStyle}>{text}</Text>
        </View>
        {/* <View style={styles.HDoktorCont}>
          <Text style={styles.HDoktorTextStyle}>HDOKTOR</Text>
        </View> */}
        <LogoLogin />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: "white",
  },
  titleCont: {
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  titleStyle: {
    fontSize: 40,
    fontWeight: "bold",
  },
  textCont: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  textStyle: {
    textAlign: "justify",
    fontSize: 18,
  },
  HDoktorCont: {
    alignItems: "center",
  },
  HDoktorTextStyle: {
    fontSize: 18,
    color: "grey",
  },
});

export default Others;
