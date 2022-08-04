import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Rating, Avatar } from "react-native-elements";
import firebase from "firebase/compat/app";
import moment from "moment";
import trLocale from "moment/locale/tr";
import { useRoute } from "@react-navigation/native";

const MoreDoctorInfo = ({ navigation }) => {
  const route = useRoute();
  const DoctorId = route.params.doctorId;
  const [H_name, setH_name] = useState();
  const [H_PhoneNumber, setH_PhoneNumber] = useState();
  const [H_Cinsiyet, setH_Cinsiyet] = useState();
  const [H_email, setH_email] = useState();
  const [H_KHastalik, setH_KHastalik] = useState();
  const [H_Date, set_HDate] = useState();
  const [H_ID, setH_ID] = useState();

  const [D_Name, setD_Name] = useState();
  const [D_CalisilanYer, SetD_CalisilanYer] = useState();
  const [time1, setTime1] = useState("");
  const [time2, setTime2] = useState("");
  const [brans, setBrans] = useState("");
  const [avatar, setAvatar] = useState();

  const arr = [];
  useEffect(() => {
    let unmounted = false;
    // currentUser = firebase.auth().currentUser;
    // console.log(currentUser);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .firestore()
          .collection("H_user")
          .doc(user?.uid.toString() ?? "")
          .onSnapshot((snapshot) => {
            if (!unmounted) {
              setH_name(snapshot.data()?.name ?? "");
              setH_PhoneNumber(snapshot.data()?.PhoneNumber ?? "");
              setH_Cinsiyet(snapshot.data()?.cinsiyet ?? "");
              setH_email(snapshot.data()?.email ?? "");
              set_HDate(snapshot.data()?.date ?? "");
              setH_KHastalik(snapshot.data()?.KHastalık ?? "");
              setH_ID(snapshot.data()?.Id ?? "");
            }
          });

        firebase
          .firestore()
          .doc("D_user" + "/" + DoctorId ?? " ")
          .onSnapshot((snapshot) => {
            if (!unmounted) {
              setD_Name(snapshot.data()?.name ?? "");
              setBrans(snapshot.data().brans);
              SetD_CalisilanYer(snapshot.data()?.CalisilanYer ?? "");
              setTime1(snapshot.data().time1.toDate());
              setTime2(snapshot.data().time2.toDate());
              setAvatar(snapshot.data()?.avatar ?? "");
            }
          });
      }
    });

    return () => {
      unmounted = true;
    };
  }, []);

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const { height } = Dimensions.get("window");

  const [screenHeight, setScreenHeight] = useState(height);

  const onContentSizeChange = (contentWidth, contentHeight) => {
    setScreenHeight(contentHeight);
  };

  const scrollEnabled = screenHeight > height;

  return (
    <View style={{ flex: 1, backgroundColor: "white", flexGrow: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        scrollEnabled={scrollEnabled}
        onContentSizeChange={onContentSizeChange}
      >
        <View style={styles.userImg}>
          <Rating
            type="custom"
            ratingColor="#b71b1f"
            ratingBackgroundColor="#c8c7c8"
            ratingCount={5}
            imageSize={20}
            onFinishRating={(text) => setRaiting(text)}
            startingValue={2}
            tintColor="white"
            // style={{marginBottom:20}}
          />

          {avatar == "" ? (
            <Avatar
              source={require("../../../rec/Avatars//DefaultDoctorAvatar.png")}
              size={100}
              rounded
            ></Avatar>
          ) : (
            <Avatar source={{ uri: avatar }} size={100} rounded></Avatar>
          )}

          <Text style={{ fontWeight: "500", fontSize: 24 }}>{D_Name}</Text>

          <TouchableOpacity>
            <View
              style={{
                padding: 10,
                backgroundColor: "#eceff1",
                marginBottom: 7,
                borderRadius: 15,
                width: 200,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <Text style={{ fontSize: 20 }}>
                Mesaj At &nbsp;&nbsp;&nbsp;
                <Ionicons name="chatbubbles-outline" size={25} />
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.userInfoCont}>
          <View style={styles.userInfo}>
            <Text style={{ marginBottom: 7, marginLeft: 32, color: "grey" }}>
              Çalıştığı kurum
            </Text>

            <View style={{ flexDirection: "row" }}>
              <Ionicons name="business-outline" size={22} />
              <Text
                style={{
                  fontWeight: "400",
                  fontSize: 20,
                  paddingHorizontal: 10,
                  flex: 1,
                }}
              >
                {D_CalisilanYer}
              </Text>
              <Ionicons name="ellipsis-horizontal-outline" size={22} />
            </View>
          </View>
          <View
            style={{
              height: StyleSheet.hairlineWidth,
              marginStart: 45,
              backgroundColor: "red",
            }}
          ></View>

          <View style={styles.userInfo}>
            <Text style={{ marginBottom: 7, marginLeft: 32, color: "grey" }}>
              Branş
            </Text>

            <View style={{ flexDirection: "row" }}>
              <Ionicons name="pulse-outline" size={22} />
              <Text
                style={{
                  fontWeight: "400",
                  fontSize: 20,
                  paddingHorizontal: 10,
                  flex: 1,
                }}
              >
                {brans}
              </Text>
              <Ionicons name="ellipsis-horizontal-outline" size={22} />
            </View>
          </View>
          <View
            style={{
              height: StyleSheet.hairlineWidth,
              marginStart: 45,
              backgroundColor: "red",
            }}
          ></View>

          <View style={styles.userInfo}>
            <Text style={{ marginBottom: 7, marginLeft: 32, color: "grey" }}>
              Hasta iletişim saatleri
            </Text>

            <View style={{ flexDirection: "row" }}>
              <Ionicons name="time-outline" size={22} />
              <Text
                style={{
                  fontWeight: "400",
                  fontSize: 20,
                  paddingHorizontal: 10,
                  flex: 1,
                }}
              >
                {moment(time1).locale("tr", trLocale).format("LT")} -{" "}
                {moment(time2).locale("tr", trLocale).format("LT")}
              </Text>
              <Ionicons name="ellipsis-horizontal-outline" size={22} />
            </View>
          </View>
          <View
            style={{
              height: StyleSheet.hairlineWidth,
              marginStart: 45,
              backgroundColor: "red",
            }}
          ></View>

          <View style={styles.userInfo}>
            <Text style={{ marginBottom: 7, marginLeft: 32, color: "grey" }}>
              Fotoğraflar
            </Text>

            <View style={{ flexDirection: "row" }}>
              <Ionicons name="images-outline" size={22} />
              <Text
                style={{
                  fontWeight: "400",
                  fontSize: 20,
                  paddingHorizontal: 10,
                  flex: 1,
                  color: "grey",
                }}
              >
                Gösterilecek fotoğraf yok
              </Text>
              <Ionicons name="ellipsis-horizontal-outline" size={22} />
            </View>
          </View>
          <View
            style={{
              height: StyleSheet.hairlineWidth,
              marginStart: 45,
              backgroundColor: "red",
            }}
          ></View>
        </View>

        <View style={styles.btnCont}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Appointment", { id: DoctorId })}
            style={{ flex: 1, justifyContent: "center" }}
          >
            <LinearGradient
              // Button Linear Gradient
              colors={["#df3a37", "#df3a37", "#d2302f", "#c42627", "#b71b1f"]}
              start={{ x: 0.8, y: 0.21 }}
              end={{ x: 0.5, y: 0.8 }}
              style={styles.button}
            >
              <Text style={styles.BtnText}>
                Randevu oluştur &nbsp;&nbsp;&nbsp;
                <Ionicons name="calendar-outline" size={25} />
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        {/* eceff1 */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  btnCont: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  button: {
    borderRadius: 20,
  },
  BtnText: {
    padding: 15,
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    paddingVertical: 10,
  },
  monthYear: {
    flexDirection: "row",
    marginTop: 10,
  },
  mentYearText: {
    marginHorizontal: 5,
    fontSize: 25,
    fontWeight: "700",
  },
  montDayCont: {
    flexDirection: "row",
    marginTop: 10,
  },
  monthDayBox: {
    justifyContent: "space-evenly",
    width: 70,
    height: 90,
    backgroundColor: "#64b5f6",
    borderRadius: 10,
    marginStart: 5,
    alignItems: "center",
    marginEnd: 5,
    flexGrow: 5,
  },
  monthDayMonthText: {
    fontSize: 18,
    fontWeight: "700",
  },
  monthDayDayText: {
    fontSize: 15,
    fontWeight: "700",
  },
  RandevuClockCont: {
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  RandevuClockBox: {
    width: Dimensions.get("screen").width / 3.8,
    backgroundColor: "green",
    borderRadius: 5,
    marginStart: 5,
    marginEnd: 5,
    flexDirection: "row",
    justifyContent: "center",
    height: 35,
    alignItems: "center",
    flexGrow: 1,
  },
  RandevuClockText: {
    fontSize: 18,
    fontWeight: "600",
  },
  userImg: {
    justifyContent: "space-evenly",
    alignItems: "center",
    flex: 1,
  },
  userInfoCont: {
    justifyContent: "center",
  },
  userInfo: {
    backgroundColor: "white",
    // margin:10,
    paddingHorizontal: 16,
    padding: 10,
    marginVertical: 5,
  },
});

export default MoreDoctorInfo;
