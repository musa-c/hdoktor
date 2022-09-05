import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { HeaderBackButton } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";

import Home from "../../screens/Anonymous/Pages/Home";
import MyDoctorMyPatients from "../../screens/Anonymous/Pages/MyDoctorMyPatietns";
import Search from "../../screens/Anonymous/Pages/Search";
import Profile from "../../screens/Anonymous/Pages/Profile";
import Other from "../../screens/Anonymous/Pages/Other";
import PatientConfirmation from "../../screens/Anonymous/Pages/PatientConfirmation";

const Tab = createBottomTabNavigator();

const TabUBottom = ({ route }) => {
  const w_anonymous = route.params.w_anonymous;
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (w_anonymous == "h_anonymous") {
            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "MyDoctorMyPatients") {
              iconName = focused ? "person" : "person-outline";
            } else if (route.name === "Search") {
              iconName = focused ? "search" : "search-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "person-circle" : "person-circle-outline";
            } else if (route.name === "Other") {
              iconName = focused
                ? "ellipsis-horizontal"
                : "ellipsis-horizontal-outline";
            }
          } else if (w_anonymous == "d_anonymous") {
            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "MyDoctorMyPatients") {
              iconName = focused ? "person" : "person-outline";
            } else if (route.name === "PatientConfirmation") {
              iconName = focused ? "person-add" : "person-add-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "person-circle" : "person-circle-outline";
            } else if (route.name === "Other") {
              iconName = focused
                ? "ellipsis-horizontal"
                : "ellipsis-horizontal-outline";
            }
          }
          //
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#B71C1C",
        // tabBarInactiveTintColor: '#E57373',
      })}
      TabBar={(props) => <MyTabBar {...props} />}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        initialParams={{ w_anonymous: w_anonymous }}
        options={{ headerShown: false, title: "Ana Sayfa" }}
      />
      {w_anonymous == "h_anonymous" ? (
        <>
          <Tab.Screen
            name="Search"
            component={Search}
            initialParams={{ w_anonymous: w_anonymous }}
            options={{ headerShown: false, title: "Arama" }}
          />
        </>
      ) : (
        <Tab.Screen
          name="PatientConfirmation"
          component={PatientConfirmation}
          initialParams={{ w_anonymous: w_anonymous }}
          options={{ headerShown: false, title: "Hasta Onay" }}
        />
      )}
      <Tab.Screen
        name="MyDoctorMyPatients"
        component={MyDoctorMyPatients}
        initialParams={{ w_anonymous: w_anonymous }}
        options={
          w_anonymous == "h_anonymous"
            ? { headerShown: false, title: "Doktorlarım" }
            : { headerShown: false, title: "Hastalarım" }
        }
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        initialParams={{ w_anonymous: w_anonymous }}
        options={{ headerShown: false, title: "Profil" }}
      />
      <Tab.Screen
        name="Other"
        component={Other}
        initialParams={{ w_anonymous: w_anonymous }}
        options={{ headerShown: false, title: "Diğer" }}
      />
    </Tab.Navigator>
  );
};

const MainStack = createStackNavigator();

const OtherStack = createStackNavigator();

import Others from "../../components/Pages/Other/Others";
import Iletisim from "../../components/Pages/Other/Iletisim";

const OthersScreen = () => {
  return (
    <OtherStack.Navigator>
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

import Chats from "../../screens/Anonymous/Pages/Chats";
import Notifications from "../../screens/Anonymous/Pages/Notifications";
import MoreDoctorInfo from "../../screens/Anonymous/Pages/MoreDoctorInfo";

const TabU = () => {
  const navigation = useNavigation();
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="TabU"
        component={TabUBottom}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="ChatsScreen"
        component={Chats}
        options={{ title: "Mesajlaşma", headerBackTitleVisible: false }}
      />
      <MainStack.Screen
        name="MoreDoctorInfo"
        component={MoreDoctorInfo}
        options={{ title: "Doktor Profili", headerBackTitle: "Geri" }}
      />

      <MainStack.Screen
        name="OtherScreen"
        component={OthersScreen}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="Notifications"
        component={Notifications}
        options={{ title: "Bildirimler", headerBackTitleVisible: false }}
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

export default TabU;
