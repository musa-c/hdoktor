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
                 contentStyle = {{justifyContent:"center", alignItems:"center", marginVertical:2}}
                 icon = {icon}
                 color = {"white"}
                 disabled = {loading}
                 labelStyle={{fontSize:40, color:"#B71C1C", alignItems:"baseline"}}
                 >{text}</Button>
    </View>
  )
}

export default LoadingButton