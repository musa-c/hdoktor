import { View, Text } from 'react-native'
import React from 'react'
import AnimatedLottieView from "lottie-react-native";
import Modal from "react-native-modal";


const LoadingAnimation = ({isLoading}) => {
  return (
    <Modal 
    isVisible={isLoading} 
    style={{ justifyContent:"flex-start"}}
  animationIn="fadeIn"
  animationOut="fadeOut"
    >
      <View style={{flex:1,alignItems:"center", justifyContent:"flex-start", }}>
            <AnimatedLottieView source={require("../../rec/Animations/loading.json")} autoPlay={true}  />
      </View>
    </Modal>
  )
}

export default LoadingAnimation