import React from 'react'
import { View, Text } from 'react-native'
import Cell from '../../../components/Cell'
import Header from '../../../components/Header/Header'
import firebase from 'firebase/compat/app'

const Other0 = ({navigation}) => {
    return (
        <View style={{flex:1, backgroundColor:"white"}}>
            <Header onPressChats={()=> navigation.navigate("ChatsScreen", {screen:"Chats"})} onPressNotifications={()=> navigation.navigate("NotificationsD")}/>
            <Cell 
            title="Hakkımızda"            
            icon="information-outline"  
            tintColor="blue"
            />
            
            <Cell 
            title="Üyelik Sözleşmesi"   
            icon="document-text-outline"
            tintColor="#26a69a"
            />
            
            <Cell 
            title="İletişim"     
            icon="call-outline"
            tintColor="#00ca00"       
            />
            
            <Cell 
            title="Bizi Değerlendirin"            
            icon="star-outline"
            tintColor="#f4e035"
            />
            
            <Cell 
            title="Çıkış"   
            icon="log-out-outline"   
            tintColor="#c62828"  
            onPress={() => firebase.auth().signOut()}    
            />
        </View>
    )
}

export default Other0
