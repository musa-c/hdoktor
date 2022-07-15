import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import firebase from "firebase/compat/app"

const Chat = ({route}) => {
    const [messages, setMessages] = useState([]);
//   console.log(route.params.id)

    const [uid , setUID] = useState(""); 

    useEffect(()=>{
        let unmounted = false;
        firebase.auth().onAuthStateChanged(user => {
            if (!unmounted) {
                setUID(user?.uid); 
            }
        })
        return () => {
            unmounted = true;
          };
    }, [])

  useEffect(() => {
    let unmounted = false;
      // backticks nedir? araştir.
    firebase.firestore().doc("Chats/" + route.params.id).onSnapshot(doc=> {
        if (!unmounted) {
            setMessages(doc.data()?.messages ?? [])
        }
    })
    return () => {
        unmounted = true;
      };
  }, [route.params.id])

  const onSend = useCallback((m = []) => {
    let unmounted = false;
    if (!unmounted) {
        firebase.firestore()
    .doc("Chats/" + route.params.id)
    .set({ messages: GiftedChat.append(messages, m)}, {merge:true})
    }
    // append içindeki 1. parametre mevcut mesajlar, 2. parametre gönder butonuna basıldıktan sonraki mesajlar
    // bu iki mesajları birleştiriyoruz. 
    return () => {
        unmounted = true;
      };
  }, [route.params.id, messages])

  return (
    <GiftedChat
      messages={messages.map((x)=>({
          ...x,
          createdAt: x.createdAt?.toDate(),
      }))}
      onSend={messages => onSend(messages)}
      user={{
        _id: uid,
      }}
    />
  )
}

export default Chat;
