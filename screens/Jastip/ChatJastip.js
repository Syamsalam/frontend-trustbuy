import React, {useState, useEffect, useCallback} from 'react';
import {View, ScrollView, Text, Button, StyleSheet} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { getMessage, sendMessage } from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { socket } from '../../tools/socket';

const ChatJastip = () => {
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState(-1)
  const rout = useRoute()
  async function getChat() {
    if(socket.connected == false) return console.log("Tidak Terkonek")
    const user = JSON.parse(await AsyncStorage.getItem("user"))
    setUserId(user.id)
    
    try {
      const response = await getMessage(rout.params.id)
      if(response.status == 200) {
        setMessages(response.data?.data.map(el => {
          return {
            _id : el.id,
            text : el.isi_pesan,
            created_at : el.created_at,
            user : {
              _id : el.sender_id,
              username : el.username,
              avatar : "" 
            }
          }

          
        }))
        
      }
    }catch(err) {
      console.log(err)
    }
  }

  async function onSend(messages) {
    if(messages.length == 0) {
      return 
    }
    try {
      const response = await sendMessage(rout.params.id, messages[0].text)
        if(response.status == 200) {
          getChat()
        }
        socket.emit("send-chat", rout.params.id)
      }catch(err) {
        console.log(err.response)

      }
  }


  function receiveChats(ids) {
    if(ids.id != rout.params.id) return 
    getChat()
    console.log("Hello")
    
  }


  useFocusEffect(useCallback(() => {
    getChat()
    socket.on("receive-chat", receiveChats)

    return () => {
      socket.off("receive-chat", receiveChats)
    }
  }, []))
  
  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{marginBottom: 5, marginRight: 5}}
            size={32}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2e64e5',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return(
      <FontAwesome name='angle-double-down' size={22} color='#333' />
    );
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      messagesContainerStyle={{
        backgroundColor:"#BFDBFF"
      }}
      user={{
        _id: userId,
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
    />
  );
};

export default ChatJastip;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});