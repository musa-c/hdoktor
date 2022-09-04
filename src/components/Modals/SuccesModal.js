import { View, Text } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import AnimatedLottieView from "lottie-react-native";

const SuccesModal = ({ isVisible, text }) => {
  return (
    <Modal
      isVisible={isVisible}
      style={{ justifyContent: "flex-start" }}
      hasBackdrop={false}
      //   animationIn="fadeInRight"
      animationIn="fadeIn"
      animationOut="fadeOut"
      // animationInTiming={0}
      //animationOutTiming={0}
      // swipeDirection="up"
      //onSwipeComplete = {() =>   isCreateAccount(false) }
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <View
          style={{
            // width: "85%",
            backgroundColor: "#f5f5f5",
            borderRadius: 8,
            justifyContent: "flex-start",
            alignItems: "center",
            padding: 20,
            flexDirection: "row",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
          }}
        >
          <View style={{ padding: 18 }}>
            <AnimatedLottieView
              source={require("../../rec/Animations/createAccount-success.json")}
              autoPlay={true}
              loop={false}
            />
          </View>
          <Text
            style={{
              fontSize: 22,
              color: "black",
              fontWeight: "700",
              marginLeft: 9,
            }}
          >
            {text}
          </Text>
        </View>
        {/* <Button title="Hide modal" onPress={toggleModal} /> */}
      </View>
    </Modal>
  );
};

export default SuccesModal;
