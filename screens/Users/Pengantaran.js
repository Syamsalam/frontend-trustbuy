import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getDetailOrderUser, getOrderForUser, updateVerify } from '../../api'
import { useState } from 'react'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import { useCallback } from 'react'

export default function Pengantaran() {
  const navigation = useNavigation()
  const [data, setData] = useState()
  const route = useRoute()
  const id = route?.params?.order_id
  useFocusEffect(useCallback(() => {
    async function fetchData() {
      try {

        const result = await getDetailOrderUser(id)
        // console.log("id order " + id)
        console.log(result.data?.data)
        if (result.status == 200) {
          // console.log(result?.data)
          setData(result?.data?.data)
        }
      } catch (err) {
        if (err.request) {
          console.error(err.request.status)
        } else {
          console.log(err)
        }
      }
    }

    fetchData()
  }, []))

  const receivebutton = async () => {
    try {
      // const id = route.params.order_id
      let updatedData = {
        id: Number(id),
        status_id: 9
      }
      const result = await updateVerify(updatedData)

      if (result.status == 200) {
        navigation.navigate("TitipanJastip")
      }
    } catch (err) {
      if (err.response) {
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
          }}>Titipan</Text>
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
            justifyContent: 'space-between',
            flexDirection: 'row'
          }}>
            <Text style={{
              fontSize: 18,
              color: '#000',
              marginLeft: 20,
            }}>Titipan dalam proses pengantaran</Text>
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 20,
            marginBottom: 20,
            marginHorizontal: 20
          }}>
            <TouchableOpacity
              className="py-3 bg-blue-800 rounded-xl w-40 ">
              <Text
                className="text-sm font-bold text-center text-white "
              >
                Chat Jastiper
              </Text>
            </TouchableOpacity>
            {data?.status_id == 7 && (
              <TouchableOpacity 
              className="py-3  w-40 ">
              <Text
                className="text-sm font-bold text-center "
              >
                Menunggu Diantar
              </Text>
            </TouchableOpacity>
            )}

            {data?.status_id == 8 && (
              <TouchableOpacity onPress={() => receivebutton()}
              className="py-3 bg-blue-800 rounded-xl w-40 ">
              <Text
                className="text-sm font-bold text-center text-white "
              >
                Titipan Diterima
              </Text>
            </TouchableOpacity>
            )}
            
          </View>
        </View>
      </View>

      

    </SafeAreaView>
  )
}