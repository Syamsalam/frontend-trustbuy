import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { useCallback } from 'react';
import { getDetailOrderUser, updateOrderStatus, updateVerify } from '../../api';
import { useState } from 'react';

export default function Pembayaran() {
  const navigation = useNavigation()
  const route = useRoute()
  const id =  route.params.order_id
  const [data,setData] = useState()

  useFocusEffect(useCallback(() => {
    async function fetchData() {
      try {
        const result = await getDetailOrderUser(id)
        console.log(result?.data?.data)
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
    fetchData()
  },[]))

  const onBayar = async () => {
    try {
      
      let dataUpdate = {
        id: Number(id),
        status_id: 6
      }
      const result = await updateVerify(dataUpdate)
      if(result.status == 200) {
        navigation.navigate('Proses',{order_id:id})
      }

    } catch (err) {
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
        }}>{data?.jastiper_post?.judul}</Text>
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
          }}>Jumlah Yang harus dibayar</Text>
          <Text style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#000',
            marginRight:10,
          }}>Rp {data?.payment[0]?.total_pembayaran}</Text>
      </View>
      <View style={{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:20,
        marginBottom:20,
        marginHorizontal:5,
        paddingVertical:10,
        paddingHorizontal:50,
      }}>
           <TouchableOpacity 
            className="py-3 bg-blue-800 rounded-xl w-32 ">
              <Text 
                  className="text-sm font-bold text-center text-white "
              >
                      Chat Jastiper
              </Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={() => onBayar()}
            className="py-3 bg-blue-800 rounded-xl w-32 ">
              <Text 
                  className="text-sm font-bold text-center text-white "
              >
                      Konfirmasi
              </Text>
           </TouchableOpacity>
      </View>
      </View>
      </View>
      
    </SafeAreaView>
  )
}