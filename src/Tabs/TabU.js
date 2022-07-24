import React, {useEffect} from 'react';
import { StyleSheet} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Ionicons} from "@expo/vector-icons";
import Home from '../screens/UserPanel/Main/Home';
import MyDoctor from '../screens/UserPanel/Main/MyDoctor';
import Other from '../screens/UserPanel/Main/Other';
import Search from "../screens/UserPanel/Main/Search";
import Profile from '../screens/UserPanel/Main/Profile';
import {createStackNavigator } from '@react-navigation/stack';
import { HeaderBackButton } from '@react-navigation/elements';
import firebase from 'firebase/compat//app';
import {useNavigation} from '@react-navigation/native';





const Tab = createBottomTabNavigator();

const TabUBottom = () => {
  const navigation = useNavigation();
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) { // kullanıcı oturum açmadıysa
        navigation.navigate("SignIn");
      }
    })  

  
  }, [])

  return(
    // JSX İÇERİSİNE JAVASCPİRT YAZILACAĞI HER ZAMAN {} SÜZLÜ PARANTEZLER KULLANILIR. 
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Home') {
                iconName = focused
                  ? 'home'
                  : "home-outline";
              } else if (route.name === 'MyDoctor') {
                iconName = focused ? 'person' : "person-outline";

              } else if (route.name === 'Search') {
                iconName = focused ? 'search' : "search-outline";

              } else if (route.name === 'Profile') {
                iconName = focused ? 'person-circle' : "person-circle-outline";
              }
                else if (route.name === 'Other') {
                iconName = focused ? 'ellipsis-horizontal' : "ellipsis-horizontal-outline";
              }
              
  
              // 
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#B71C1C',
            // tabBarInactiveTintColor: '#E57373',
          }) 
        }

        TabBar={props => <MyTabBar {...props} />}

        >       
            <Tab.Screen name="Home" component ={Home} options={{headerShown: false , title:"Ana Sayfa"}} />
            <Tab.Screen name="MyDoctor" component ={MyDoctor} options={{headerShown: false , title:"Doktorlarım"}}/>
            <Tab.Screen name="Search" component ={Search} options={{headerShown: false , title:"Arama"} } />
            <Tab.Screen name="Profile" component ={Profile} options={{headerShown: false , title:"Profil"}}/>
            <Tab.Screen name="Other" component ={Other} options={{headerShown: false, title:"Diğer"}}/>
        </Tab.Navigator>
        // title kaldırmak için , tabBarShowLabel:false
);
}

const MainStack = createStackNavigator();
import SignIn from '../screens/UserPanel/SignIn/SignIn';

const ChatStack = createStackNavigator();
import Chat from '../screens/Chat/Chat';
import Chats from '../screens/Chat/Chats';


const ChatsScreen = () => {
  return(
    <ChatStack.Navigator>
    <ChatStack.Screen name = "Chats" component = {Chats} />
    <ChatStack.Screen name = "Chat" component = {Chat} />
  </ChatStack.Navigator>
  )
}

import MoreDoctorInfo from '../screens/UserPanel/Main/MoreDoctorInfo';
import Appointment from "../screens/UserPanel/Main/Appointment"
import SignUp00 from '../screens/UserPanel/SignUp/SignUp0';

import Notifications from '../screens/UserPanel/Main/Notifications';

const TabU = () => {
  const navigation = useNavigation();
  return(
    <MainStack.Navigator>
      <MainStack.Screen name = "SignIn" component={SignIn} options={{title:"Hasta Giriş",
      headerLeft: () => (
        <HeaderBackButton onPress={()=> navigation.navigate("Login")}/>
      )
    }}/>
      <MainStack.Screen name="SignUp00" component={SignUp00} options={{title:"Hasta Kayıt", headerShown:false}}/>
      <MainStack.Screen name="TabU" component={TabUBottom} options={{headerShown:false}}/>
      <MainStack.Screen name="ChatsScreen" component={ChatsScreen} options={{headerShown:false}}/>
      <MainStack.Screen name="MoreDoctorInfo" component={MoreDoctorInfo} options={{title: "Doktor Profili", headerBackTitle:"Geri"}}/>
      <MainStack.Screen name="Appointment" component={Appointment} options={{title: "Randevu", headerBackTitle:"Geri"}}/>
      <MainStack.Screen name="Notifications" component={Notifications} options={{title: "Bildirimler", headerBackTitle:"Geri"}}/>
    </MainStack.Navigator>
  )
}






const style= StyleSheet.create({
    SearchStyle:{
        borderColor:"#fff",
        borderRadius: 10,
        marginEnd: 200
    },
    ViewStyle:{
      backgroundColor: "#fff"
    }
});


export default TabU;



