import { View, Text, TouchableOpacity } from 'react-native'
import React, { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { getDetailOrderUser, updateOrderStatus } from '../../api';

export default function ProsesJastip() {
  const navigation = useNavigation()
  const route = useRoute()
  const id = route?.params?.order_id
  const [data,setData] =useState()

  useFocusEffect(useCallback(() => {
    async function fetchData() {
      try {
        const result = await getDetailOrderUser(id)
        if(result.status == 200) {
          setData(result?.data?.data)
        }
      } catch (err) {
        if(err.request) {
          console.error(err.request.status)
        } else {
          console.log(err)
        }
      }
    }
  },[]))

  const onDelivery = async () => {
    try {
      let dataUpdate = {
        id: Number(id),
        status_id: 7
      }
      const result = await updateOrderStatus(dataUpdate)
      if(result.status == 200) {
        navigation.navigate('PengantaranJastip',{order_id:id})
      }
    } catch(err) {
      if(err.response) {
        console.error(err.response.data)
      } else {
        console.error(err)
      }
    }
  }

  return (
    <SafeAreaView
    style={{
      flex: 1,
      backgroundColor: '#D9D9D9',
    
    }}>
      
      <View style={{
        backgroundColor: '#fff',
        height: '10%',
        flexDirection: 'column',
        paddingTop: 20,
        paddingHorizontal: 20,
        
      }}>
        <View>
        <Text style={{
          fontSize: 18,
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#000',
        }}>Titipanku</Text>
      </View>
      </View>
      <View style={{
        backgroundColor: '#fff',
        height: '20%',
        flexDirection: 'column',
        paddingTop: 20,
        elevation: 5,
      }}>
        <View style={{
        flexDirection: 'column',
        paddingTop: 10,
      
      }}>
        <View style={{
          justifyContent:'space-between',
          flexDirection:'row'
      }}>
        <Text style={{
            fontSize: 18,
            color: '#000',
           marginLeft: 10,
          }}>Dalam Proses</Text>
      </View>
      <View style={{
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center',
        marginTop:20,
        marginBottom:20,
        marginHorizontal:20
      }}>
           <TouchableOpacity onPress={() => navigation.navigate('Chat')}
            className="py-3 bg-blue-800 rounded-xl w-48 ">
              <Text 
                  className="text-sm font-bold text-center text-white "
              >
                      Chat Customer
              </Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={() => onDelivery()}
            className="py-3 bg-blue-800 rounded-xl w-48 ">
              <Text 
                  className="text-sm font-bold text-center text-white "
              >
                      Antar
              </Text>
           </TouchableOpacity>
      </View>
      </View>
      </View>
      
    </SafeAreaView>
  )
}