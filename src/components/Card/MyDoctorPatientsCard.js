import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import LoadingButton from "../Buttons/LoadingButton";
import { Avatar } from "react-native-elements";
import MultiRandevuButton from "../Buttons/MultiRandevuButton";
import CardText from "./CardText";

const MyDoctorPatientsCard = ({
  avatar,
  name,
  text1,
  text2,
  iconFont1,
  iconFont2,
  randevuCount,
  RandevuSaat,
  RandevuTarih,
  onPressChatId,
  onPressGetNotes,
  onPressRandevuModal,
  user,
}) => {
  return (
    <View style={styles.cont}>
      <View style={styles.card}>
        <View style={styles.cardImage}>
          <Avatar size={85} rounded source={{ uri: avatar }} />
        </View>
        <View style={styles.CardInfo}>
          <Text style={styles.name}>{name}</Text>

          <CardText text={text1} iconFont={iconFont1} size={22} />
          {text2 != "" ? (
            <CardText text={text2} iconFont={iconFont2} size={22} />
          ) : null}

          {randevuCount == 1 ? (
            <View>
              <CardText text="Randevu Tarihi" iconFont={"calendar"} size={22} />
              <CardText
                text={RandevuSaat}
                iconIonic="alarm-sharp"
                style={{ fontWeight: "bold", fontSize: 22 }}
                size={23}
              />

              <CardText
                text={RandevuTarih}
                iconIonic="calendar-sharp"
                style={{ fontWeight: "bold", fontSize: 22 }}
                size={23}
              />
            </View>
          ) : (
            <TouchableOpacity onPress={onPressRandevuModal}>
              <MultiRandevuButton randevuCount={randevuCount} />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.cardIcon}>
          {/* <TouchableOpacity>
           <IconFeather name="mail" size={35} color="#B71C1C" onPress={()=>
           ChatId(element.item.email)}/> 
           </TouchableOpacity> */}
          {user == "hasta" ? (
            <LoadingButton icon="video-outline" size={40} />
          ) : null}

          <LoadingButton
            icon={"message-outline"}
            onPress={onPressChatId}
            size={40}
          />

          {/* <TouchableOpacity onPress={()=> getNotes(element.item.key)}>
            <IconFeather name="edit-2" size={35} color="#B71C1C" /> 
            </TouchableOpacity> */}
          {user != "hasta" ? (
            <LoadingButton
              icon={"pencil-box-outline"}
              onPress={onPressGetNotes}
              size={40}
            />
          ) : null}

          <LoadingButton icon={"minus-box-outline"} size={40} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    // justifyContent:"flex-start", // varsayılan(flex-direction: column) olarak dikey hizalama
    // alignItems:"center", // varsayılan olarak yatay hizalama
  },
  card: {
    flexDirection: "row",
    marginTop: 10,
    backgroundColor: "#fff",
    padding: 10,

    marginVertical: 7,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,

    elevation: 5,
    marginHorizontal: 10,
  },
  cardImage: {
    flex: 3,
    // backgroundColor:"blue",
    borderTopStartRadius: 10,
    borderBottomStartRadius: 10,
    marginLeft: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  CardInfo: {
    flex: 7,
    //backgroundColor:"blue",
    justifyContent: "center",
  },
  cardIcon: {
    flex: 1.5,
    //  backgroundColor: "yellow",
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
    justifyContent: "space-around",
    alignItems: "center",
  },
  name: {
    color: "black",
    fontSize: 22,
    paddingStart: 5,
    fontWeight: "bold",
    marginBottom: 5,
  },
  gender: {
    color: "black",
    fontSize: 19,
    paddingStart: 5,
    marginBottom: 5,
  },
});

export default MyDoctorPatientsCard;
