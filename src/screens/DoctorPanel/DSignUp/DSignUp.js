import React from 'react'
import { StyleSheet, LogBox} from 'react-native'

import { createNativeStackNavigator } from '@react-navigation/native-stack';


import trLocale from "moment/locale/tr"

const SingUpStack = createNativeStackNavigator();



const DSignUp = ({navigation}) => {;

   LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);
  

    return(
      
            <SingUpStack.Navigator>
                <SingUpStack.Screen name="SignUp0" component={SignUp0} options={{animation:"slide_from_left", title:"Doktor Kayıt", gestureEnabled:true}}/>
                <SingUpStack.Screen name="SignUp1" component={SignUp1} options={{animation:"slide_from_right", title:"Doktor Kayıt", headerBackVisible:false}}/>
            </SingUpStack.Navigator>
       
    )

    


}







const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white",

    },
    box:{
        alignItems: "center",
        backgroundColor:"white",
        justifyContent:"center",
                
       
    },
    scrollView: {
      flex:1,
      // backgroundColor:"blue",
      alignSelf: 'center',
      borderColor: 'black',
      borderWidth:2,
      // justifyContent:"center"
      

    
    },
    contentContainer: {
      justifyContent:"center"
    },
    InputCard:{
        backgroundColor:"white",
    },
    input:{
        width:300,
        height:50,
        margin:15,
        borderColor:"#f44336",
        borderBottomWidth:2,
        borderRadius:0,
        paddingLeft:10,
        fontSize:18,
        // backgroundColor:"red"
    },
      image: {
        width: 50,
        height: 50,
        resizeMode: 'cover',
        borderRadius:10,
        marginLeft:15
        // borderRadius:100
      },
    picker:{
        width:300,
        height:50,
        borderTopWidth:0,
        borderLeftWidth:0,
        borderRightWidth:0,
        borderColor:"#f44336",
        borderBottomWidth:2,
        borderRadius:0,
        paddingLeft:10,
        fontSize:18,
        marginVertical:15,
        // backgroundColor:"yellow"
        // backgroundColor:"red"
    }
    
    

})

export default DSignUp
