import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper';



const LoadingButton = ({icon ,loading, onPress, text}) => {
  return (
    <View>
      <Button
                 mode="text"
                 loading = {loading}
                 onPress = {onPress}
                 contentStyle={{height:40}}
                 icon = {icon}
                 disabled = {loading}
                 labelStyle={{fontSize:45, color:"#B71C1C"}}
                 >{text}</Button>
    </View>
  )
}

export default LoadingButton