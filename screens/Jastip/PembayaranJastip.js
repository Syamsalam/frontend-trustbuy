import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { useCallback } from 'react';
import { getBiayaJastip, updateOrderStatus } from '../../api';
import { useState } from 'react';
import formatCurrency from '../../tools/currencyFormat';

export default function PembayaranJastip() {
  const navigation = useNavigation()
  const route = useRoute()
  const [data,setData] = useState()
  const id = route.params.order_id

  useFocusEffect(useCallback(() => {

    async function fetchData() {
      try {
        
        const result = await getBiayaJastip(id)
        // console.log("id order " + id)
        // console.log(result.data)
        if(result.status == 200) {
          // console.log(result?.data)
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

  //kalo dipake ini, card menghilang di titipanJastip.js
  const onBayar = async () => {
    try {
      
      let dataUpdate = {
        id: Number(id),
        status_id: 6
      }
      const result = await updateOrderStatus(dataUpdate)


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
          }}>Jumlah Yang harus dibayar</Text>
          <Text style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#000',
            marginRight:10,
          }}>{formatCurrency(data?.total_pembayaran)}</Text>
      </View>
      <View style={{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:20,
        marginBottom:20,
        marginHorizontal:1,
        paddingVertical:10,
        paddingHorizontal:50,
      }}>
           <TouchableOpacity 
            className="py-3 bg-blue-800 rounded-xl w-32 ">
              <Text 
                  className="text-sm font-bold text-center text-white "
              >
                      Chat Customer
              </Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={() => navigation.navigate('PengantaranJastip',{order_id:id})}
            className="py-3 bg-blue-800 rounded-xl w-32 ">
              <Text 
                  className="text-sm font-bold text-center text-white "
              >
                      Bayar
              </Text>
           </TouchableOpacity>
      </View>
      </View>
      </View>
      
    </SafeAreaView>
  )
}