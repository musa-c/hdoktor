import { View, Text } from 'react-native'
import React from 'react'

const ListEmptyComponent = ({text, refreshing}) => {
  return (
    <>
      {!refreshing &&
        <View style={{ flex:1, justifyContent:"center", alignItems:"center"}}>
        <Text style={{fontSize:20, color:"grey"}}>
          {text}
        </Text>
      </View> }
      </>
      
      
  )
}

export default ListEmptyComponent