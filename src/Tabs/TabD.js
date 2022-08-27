import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Home from "../screens/DoctorPanel/Main/Home";
import MyPatients from "../screens/DoctorPanel/Main/MyPatients";
import ProfileD0 from "../screens/DoctorPanel/Main/Profile";
import { useNavigation } from "@react-navigation/native";
import firebase from "firebase/compat/app";
import PatientConfirmation from "../screens/DoctorPanel/Main/PatientConfirmation";
import { createStackNavigator } from "@react-navigation/stack";
import { HeaderBackButton } from "@react-navigation/elements";
import Other from "../screens/DoctorPanel/Main/Other";

const Tab = createBottomTabNavigator();

const TabDBottom = () => {
  const navigation = useNavigation();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        // kullanıcı oturum açmadıysa
        navigation.navigate("D_SignIn");
      }
    });
  }, []);

  return (
    // JSX İÇERİSİNE JAVASCPİRT YAZILACAĞI HER ZAMAN {} SÜZLÜ PARANTEZLER KULLANILIR.
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "MyPatients") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "PatientConfirmation") {
            iconName = focused ? "person-add" : "person-add-outline";
          } else if (route.name === "ProfileD0") {
            iconName = focused ? "person-circle" : "person-circle-outline";
          } else if (route.name === "Other") {
            iconName = focused
              ? "ellipsis-horizontal"
              : "ellipsis-horizontal-outline";
          }

          //

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#B71C1C",
        // tabBarInactiveTintColor: '#E57373',
      })}

      // TabBar={props => <MyTabBar {...props} />}
      // tabBar={(props) => <CleanTabBar {...props} darkMode />}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false, title: "Ana Sayfa" }}
      />
      <Tab.Screen
        name="MyPatients"
        component={MyPatients}
        options={{ headerShown: false, title: "Hastalarım" }}
      />
      <Tab.Screen
        name="PatientConfirmation"
        component={PatientConfirmation}
        options={{ headerShown: false, title: "Hasta Onay" }}
      />
      <Tab.Screen
        name="ProfileD0"
        component={ProfileD0}
        options={{ headerShown: false, title: "Profil" }}
      />
      <Tab.Screen
        name="Other"
        component={Other}
        options={{ headerShown: false, title: "Diğer" }}
      />
    </Tab.Navigator>
    // title kaldırmak için , tabBarShowLabel:false
  );
};

const OtherStack = createStackNavigator();
import Hakkimizda from "../components/Pages/Other/Hakkimizda";
import UyelikSozlesmesi from "../components/Pages/Other/UyelikSozlesmesi";
import Iletisim from "../components/Pages/Other/Iletisim";
import Others from "../components/Pages/Other/Others";

import Notifications from "../screens/DoctorPanel/Main/Notifications";

const OtherScreen = () => {
  return (
    <OtherStack.Navigator>
      {/* <OtherStack.Screen name="Hakkımızda" component={Hakkimizda} />
      <OtherStack.Screen name="Sozlesme" component={UyelikSozlesmesi} />
      <OtherStack.Screen name="İletişim" component={Iletisim} /> */}
      <OtherStack.Screen
        name="Others"
        component={Others}
        options={({ route }) => ({
          title: route.params.title,
          headerBackTitleVisible: false,
        })}
      />

      <OtherStack.Screen
        name="Iletisim"
        component={Iletisim}
        options={({ route }) => ({
          title: route.params.title,
          headerBackTitleVisible: false,
        })}
      />
    </OtherStack.Navigator>
  );
};

const ChatStack = createStackNavigator();
import Chat from "../screens/Chat/Chat";
import Chats from "../screens/Chat/Chats";

const ChatsScreen = () => {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen
        name="Chats"
        component={Chats}
        options={{ headerTitle: "Mesajlar", headerLeftLabelVisible: false }}
      />
      <ChatStack.Screen
        name="Chat"
        component={Chat}
        options={({ route }) => ({
          title: route.params.name,
        })}
      />
    </ChatStack.Navigator>
  );
};

const MainStack = createStackNavigator();

import D_SignIn from "../screens/DoctorPanel/SignIn/SignIn";
// import DSignUp from "../screens/SignUp/DSignUp";

import MoreDoctorInfo from "../screens/DoctorPanel/Main/MoreDoctorInfo";

const DSignUpStack = createStackNavigator();
import DSignUp0 from "../screens/DoctorPanel/SignUp/SignUp0";
import DSignUp1 from "../screens/DoctorPanel/SignUp/SignUp1";
import MorePatientInfo from "../screens/DoctorPanel/Main/MorePatientInfo";

const DSignUpScreen = () => {
  return (
    <DSignUpStack.Navigator>
      <DSignUpStack.Screen
        name="DSignUp0"
        component={DSignUp0}
        options={{
          animation: "slide_from_left",
          title: "Doktor Kayıt",
          headerLeft: false,
          headerTitleStyle: { paddingTop: 10 },
        }}
      />
      <DSignUpStack.Screen
        name="DSignUp1"
        component={DSignUp1}
        options={{
          animation: "slide_from_left",
          title: "Doktor Kayıt",
          headerLeft: false,
          headerTitleStyle: { paddingTop: 10 },
        }}
      />
    </DSignUpStack.Navigator>
  );
};

const TabD = () => {
  const navigation = useNavigation();

  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="D_SignIn"
        component={D_SignIn}
        options={{
          headerTitle: "Doktor Giriş",

          headerLeft: () => (
            <HeaderBackButton onPress={() => navigation.navigate("Login")} />
          ),
        }}
      />
      <MainStack.Screen
        name="DSignUpScreen"
        component={DSignUpScreen}
        options={{ title: "Doktor Kayıt", headerShown: false }}
      />
      <MainStack.Screen
        name="TabD"
        component={TabDBottom}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="OtherScreen"
        component={OtherScreen}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="ChatsScreen"
        component={ChatsScreen}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="MoreDoctorInfo"
        component={MoreDoctorInfo}
        options={{
          headerBackTitleVisible: false,
          headerTitle: "Doktor Profil",
          headerShown: true,
        }}
      />
      <MainStack.Screen
        name="MorePatientInfo"
        component={MorePatientInfo}
        options={{
          headerBackTitleVisible: false,
          headerTitle: "Hasta Profil",
          headerShown: true,
        }}
      />
      <MainStack.Screen
        name="Notifications"
        component={Notifications}
        options={{ headerTitle: "Bildirimler", headerBackTitle: "Geri" }}
      />
    </MainStack.Navigator>
  );
};

const style = StyleSheet.create({
  SearchStyle: {
    borderColor: "#fff",
    borderRadius: 10,
    marginEnd: 200,
  },
  ViewStyle: {
    backgroundColor: "#fff",
  },
});

export default TabD;
