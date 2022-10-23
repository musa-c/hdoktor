import "./ignoreWarnings";
import React, { Component } from "react";
import { StyleSheet, LogBox, View, StatusBar } from "react-native";
import Constants from "expo-constants";
import { NavigationContainer } from "@react-navigation/native";
import TabD from "./src/Tabs/TabD";
import TabU from "./src/Tabs/TabU";
import TabAnonuymous from "./src/Tabs/AnonymousTabs/Tab";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/screens/Login";
import ImagePickerExample1 from "./ImagePickerExample1";

// firebase
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDJRV7Z3_l2P26brixv2qdUQl5yrqxlhV0",
  authDomain: "hdoktor-1b373.firebaseapp.com",
  databaseURL: "https://hdoktor-1b373-default-rtdb.firebaseio.com",
  projectId: "hdoktor-1b373",
  storageBucket: "hdoktor-1b373.appspot.com",
  messagingSenderId: "585223517484",
  appId: "1:585223517484:web:4e4009db51a5c32436a889",
  measurementId: "G-Y3QMYPRNDN",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createNativeStackNavigator();

export default function App() {
  LogBox.ignoreLogs([
    "Setting a timer for a long period of time",
    "exported from 'deprecated-react-native-prop-types'.",
    "ViewPropTypes will be removed",
    "ColorPropType will be removed",
  ]);
  // LogBox.ignoreLogs(['Warning: Each', 'Warning: Failed']);

  return (
    // <View style={style.HomeStyle}>
    //   <ImagePickerExample1 />
    // </View>
    <View style={style.HomeStyle}>
      <StatusBar backgroundColor={"white"} barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="UMain"
            component={TabU}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="TabAnonuymous"
            component={TabAnonuymous}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="DMain"
            component={TabD}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const style = StyleSheet.create({
  HomeStyle: {
    flex: 1,
  },
});
