import { View, Text, Button, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
} from '../../styles/MessageStyles';
import { useFocusEffect } from '@react-navigation/native';
import { baseURL, getAllMessage } from '../../api';
import { useState } from 'react';
import { useCallback } from 'react';
import { socket } from '../../tools/socket';

export default function MessagesJastip({navigation}) {
  const [data,setData] = useState()
  async function getMessage() {
    try {
      console.log("Lol")
      const response = await getAllMessage()
      if(response.status == 200) {
        console.log(response.data?.data)
        setData(response.data?.data)
        
      }r
    }catch(err) {
      console.log(err)
    }
  }

  function receiveChats(ids) {
    getMessage()
    console.log("Lol")
  }

  useFocusEffect(useCallback(() => {
    getMessage()
    socket.on("receive-chat", receiveChats)
    return () => {
      socket.off("receive-chat", receiveChats)
    }
  }, []))


  return (
    <Container>
        <FlatList 
          data={data}
          keyExtractor={item=>item.id}
          renderItem={({item}) => (
            <Card onPress={() => navigation.navigate('Chat', {id: item.id, username : item.username})}>
              <UserInfo>
                <UserImgWrapper>
                  <UserImg source={baseURL + "/gambar/"+item.image?.image} placeholder={require('../../assets/profilpeople.jpg')}
                                     />
                </UserImgWrapper>
                <TextSection>
                  <UserInfoText>
                    <UserName>{item.username}</UserName>
                    <PostTime>{new Date(item.chat.created_at).toLocaleString("id-ID", {
                       day : "2-digit",
                       month : "short",
                       year : "2-digit",
                       hour : "2-digit",
                       minute :"2-digit"
                    })}</PostTime>
                  </UserInfoText>
                  <MessageText>{item.chat.isi_pesan}</MessageText>
                </TextSection>
              </UserInfo>
            </Card>
          )}
        />
      </Container>
  )
}