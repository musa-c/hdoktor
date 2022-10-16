import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import AppointmentClockCard from "./Components/AppointmentClockCard";
import AppointmentDayMonthCard from "./Components/AppointmentDayMonthCard";
import firebase from "firebase/compat/app";
import moment from "moment";
import trLocale from "moment/locale/tr";
import LoadigIndicator from "../../../components/LoadigIndicator";

const Appointment = ({ route }) => {
  const doctorId = route.params.id;
  const [DateArray, setDateArray] = useState([]);
  const [DataClock, setDataClock] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setselectedDate] = useState();

  const [H_id, setH_Id] = useState();
  const [H_name, setH_Name] = useState();
  const [H_Avatar, setH_Avatar] = useState();
  const [H_Cinsiyet, setH_Cinsiyet] = useState();
  const [H_email, setH_email] = useState();
  const [KHastalik, setKHastalik] = useState();

  const [DoluZamanlar, setDoluZamanlar] = useState([]);

  //console.log("DoluZamanlarDizi:", DoluZamanlar);

  useEffect(() => {
    let unmounted = false;
    const DoluZamanlarDizi = [];
    firebase
      .firestore()
      .collection("D_user")
      .doc(doctorId)
      .collection("Hastalarım")
      .onSnapshot((QuerySnapshot) => {
        QuerySnapshot.forEach((Snapshot) => {
          firebase
            .firestore()
            .collection("D_user")
            .doc(doctorId)
            .collection("Hastalarım")
            .doc(Snapshot.id)
            .collection("RandevuTarih")
            .get()
            .then((snaps) => {
              snaps.forEach((snapsFor) => {
                DoluZamanlarDizi.push({
                  saat: snapsFor.data().RandevuSaat,
                  tarih: snapsFor.data().RandevuTarih,
                });
              });
              setDoluZamanlar(DoluZamanlarDizi.concat(DoluZamanlarDizi));
            });
        });
      });

    const user = firebase.auth().currentUser;
    firebase
      .firestore()
      .collection("H_user")
      .doc(user.uid)
      .get()
      .then((snapshot) => {
        if (!unmounted) {
          setH_Name(snapshot.data().name);
          setH_Avatar(snapshot.data()?.avatar ?? "");
          setH_Cinsiyet(snapshot.data().cinsiyet);
          setH_Id(snapshot.data().Id);
          setH_email(snapshot.data().email);
          setKHastalik(snapshot.data().KHastalik);
        }
      });

    if (!unmounted) {
      setLoading(true);
    }
    const CurrentgetFullYear = new Date().getFullYear();
    const CurrentgetMonth = new Date().getMonth();
    const CuurentDayNumber = new Date().getDate();
    const CurrentDate = new Date(
      CurrentgetFullYear,
      CurrentgetMonth + 1,
      0
    ).getDate();
    const DateArray = [];

    for (let i = CuurentDayNumber; i <= CurrentDate; i++) {
      const Dates = new Date(CurrentgetFullYear, CurrentgetMonth, i);
      DateArray.push({
        date: Dates,
        index: i - 1,
      });
    }

    if (CurrentgetMonth != 12) {
      const NextMonthDay = new Date(
        CurrentgetFullYear,
        CurrentgetMonth + 1,
        0
      ).getDate();

      for (let i = 1; i <= NextMonthDay; i++) {
        const Dates = new Date(CurrentgetFullYear, CurrentgetMonth + 1, i);
        DateArray.push({
          date: Dates,
          index: i - 1,
        });
      }
    } else if (CurrentgetMonth == 12) {
      const NextMonthDay = new Date(CurrentgetFullYear + 1, 0, 0).getDate();
      for (let i = 1; i <= NextMonthDay; i++) {
        const Dates = new Date(CurrentgetFullYear + 1, 0, i);
        DateArray({
          date: Dates,
          index: i - 1,
        });
      }
    }
    setDateArray({
      selectedIndex: 0,
      data: DateArray,
    });

    return () => {
      unmounted = true;
    };
  }, []);

  useEffect(() => {
    var clock = [];
    let unmounted = false;
    firebase
      .firestore()
      .collection("D_user")
      .doc(doctorId)
      .get()
      .then((snapshot) => {
        var Cstart = moment(snapshot.data().time1.toDate())
          .locale("tr", trLocale)
          .format("LT")
          .split(":");
        var CFinish = moment(snapshot.data().time2.toDate())
          .locale("tr", trLocale)
          .format("LT")
          .split(":");

        for (var c = Number(Cstart[0]); c <= Number(CFinish[0]); c++) {
          if (Number(Cstart[1]) == 0 && Number(CFinish[1]) == 0) {
            clock.push(c + ":" + "00");
            if (!(c == Number(CFinish[0]))) {
              clock.push(c + ":" + "30");
            }
          } else if (Cstart[1] == 30 && CFinish[1] == 30) {
            if (c == Cstart[0]) {
              clock.push(c + ":" + "30");
            } else {
              clock.push(c + ":" + "00");
              clock.push(c + ":" + "30");
            }
          } else if (
            Cstart[1] > 0 &&
            Cstart[1] < 30 &&
            CFinish[1] > 0 &&
            CFinish[1] < 30
          ) {
            if (c == Cstart[0]) {
              clock.push(c + ":" + "30");
            } else if (c == CFinish[0]) {
              clock.push(c + ":" + "00");
            } else {
              clock.push(c + ":" + "00");
              clock.push(c + ":" + "30");
            }
          } else if (
            Cstart[1] > 30 &&
            Cstart[1] < 60 &&
            CFinish[1] > 30 &&
            CFinish[1] < 60
          ) {
            if (c + 1 == Cstart[0]) {
              clock.push(c + 1 + ":" + "00");
              clock.push(c + 1 + ":" + "30");
            } else if (c == CFinish[0]) {
              clock.push(c + ":" + "00");
              clock.push(c + ":" + "30");
            } else {
              clock.push(c + 1 + ":" + "00");
              clock.push(c + 1 + ":" + "30");
            }
          } else if (Cstart[1] == 0 && CFinish[1] > 30 && CFinish[1] < 60) {
            clock.push(c + ":" + "00");
            clock.push(c + ":" + "30");
          } else if (Cstart[1] > 30 && Cstart[1] < 60 && CFinish[1] == 0) {
            if (c + 1 == Cstart[0]) {
              clock.push(c + 1 + ":" + "00");
            } else if (c == CFinish[0]) {
              clock.push(c + ":" + "00");
            } else {
              clock.push(c + 1 + ":" + "00");
              clock.push(c + 1 + ":" + "30");
            }
          } else if (
            Cstart[1] > 30 &&
            Cstart[1] < 60 &&
            CFinish[1] > 0 &&
            CFinish[1] < 30
          ) {
            if (c == Cstart[0]) {
              clock.push(c + 1 + ":" + "00");
              clock.push(c + 1 + ":" + "30");
            } else if (c == CFinish[0]) {
              clock.push(c + ":" + "00");
            } else {
              clock.push(c + 1 + ":" + "00");
              clock.push(c + 1 + ":" + "30");
            }
          } else if (
            Cstart[1] > 0 &&
            Cstart[1] < 30 &&
            CFinish[1] > 30 &&
            CFinish[1] < 60
          ) {
            if (c == Cstart[0]) {
              clock.push(c + ":" + "30");
            } else {
              clock.push(c + ":" + "00");
              clock.push(c + ":" + "30");
            }
          } else if (Cstart[1] > 0 && Cstart[1] < 30 && CFinish[1] == 30) {
            if (c == Cstart[0]) {
              clock.push(c + ":" + "30");
            } else {
              clock.push(c + ":" + "00");
              clock.push(c + ":" + "30");
            }
          } else if (Cstart[1] == 30 && CFinish[1] > 0 && CFinish[1] < 30) {
            if (c == Cstart[0]) {
              clock.push(c + ":" + "30");
            } else if (c == CFinish[0]) {
              clock.push(c + ":" + "00");
            } else {
              clock.push(c + ":" + "00");
              clock.push(c + ":" + "30");
            }
          } else if (Cstart[1] == 0 && CFinish[1] == 30) {
            clock.push(c + ":" + "00");
            clock.push(c + ":" + "30");
          } else if (Cstart[1] == 30 && CFinish[1] == 0) {
            if (c == Cstart[0]) {
              clock.push(c + ":" + "30");
            } else if (c == CFinish[0]) {
              clock.push(c + ":" + "00");
            } else {
              clock.push(c + ":" + "00");
              clock.push(c + ":" + "30");
            }
          }
        }
        if (!unmounted) {
          setDataClock(clock);
          setLoading(false);
        }
      });
  }, [DateArray.selectedIndex]);

  const onPress = (index, selectedDate) => {
    setDateArray({ ...DateArray, selectedIndex: index });
    setselectedDate(selectedDate);
  };

  return (
    <View style={styles.cont}>
      <Text style={styles.titleCategory}>Randevu Günleri</Text>
      <View style={{ height: 80, marginTop: 20, marginBottom: 10 }}>
        <FlatList
          horizontal
          data={DateArray.data}
          extraData={DateArray}
          renderItem={({ item, index }) => {
            return (
              <AppointmentDayMonthCard
                month={item.date.getMonth() + 1}
                day={item.date.getDate()}
                isSelected={DateArray.selectedIndex == index}
                onPress={() => {
                  onPress(index, item.date);
                }}
              />
            );
          }}
        ></FlatList>
      </View>

      <View style={{ flex: 3.5, marginBottom: 10 }}>
        <Text
          style={[styles.titleCategory, { fontSize: 15, marginBottom: 10 }]}
        >
          Randevu Saatleri
        </Text>

        <FlatList
          style={{ flexGrow: 1 }}
          data={DataClock}
          ListHeaderComponent={<LoadigIndicator loading={loading} />}
          renderItem={({ item }) => {
            return (
              <AppointmentClockCard
                H_id={H_id}
                H_name={H_name}
                H_Avatar={H_Avatar}
                H_Cinsiyet={H_Cinsiyet}
                H_email={H_email}
                KHastalik={KHastalik}
                clock={item}
                data={DateArray}
                selectedDate={selectedDate}
                DoctorId={doctorId}
              />
            );
          }}
        ></FlatList>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 30,
    backgroundColor: "#fff",
    paddingTop: 20,
  },

  scrollView: {},
  titleCategory: {
    fontWeight: "bold",
    color: "#7D8392",
    fontSize: 20,
  },
});

export default Appointment;
