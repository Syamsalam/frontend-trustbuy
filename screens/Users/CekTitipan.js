import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { useCallback } from 'react';
import { getDetailOrderUser, getOrderForUser } from '../../api';

export default function CekTitipan() {
  const navigation = useNavigation();
  const route = useRoute()
  const [data, setData] = useState(null)

  useFocusEffect(useCallback(() => {
    async function fetchData() {
      try {
        const id = route?.params?.order_id
        const result = await getDetailOrderUser(id)
        // console.log(result?.data?.data?.payment[0]?.biaya_ongkir)
        if (result.status == 200) {
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
  },[route?.params?.order_id]))

  const onConfirm = async () => {
    try {
      const postStatus = ""
    } catch (err) {
      if (err.response) {
        console.error(err.response.data)
      } else {
        console.error(err)
      }
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#D9D9D9' }}>
      <View style={{ backgroundColor: '#C3D5EA', height: 80, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000' }}>{data?.jastiper_post?.judul}</Text>
      </View>

      <ScrollView style={{ flex: 1 }}>
        {data && (
          <View key={data.id}>
            {data?.order_items.map((titipan, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: '#fff',
                  height: 70,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  margin: 5,
                  elevation: 5,
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontSize: 18, color: '#000', marginLeft: 10 }}>{titipan?.product_name}</Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000', marginRight: 10 }}>
                  Rp {titipan?.subtotal?.toLocaleString()}
                </Text>
              </View>
            ))}
            {data?.payment.map((jenis,index) => (
              <>
            <View
              key={index}
              style={{
                backgroundColor: '#fff',
                height: 70,
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 5,
                elevation: 5,
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 18, color: '#000', marginLeft: 10 }}>Ongkir</Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000', marginRight: 10 }}>
                Rp {jenis?.biaya_ongkir}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#fff',
                height: 70,
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 5,
                elevation: 5,
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 18, color: '#000', marginLeft: 10 }}>Biaya Jasa</Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000', marginRight: 10 }}>
                Rp {jenis?.biaya_jastip?.toLocaleString()}
              </Text>
            </View>
            </>
            ))}
          </View>
        )}
      </ScrollView>

      <View style={{ backgroundColor: '#C3D5EA', height: 120, borderTopLeftRadius: 35, borderTopRightRadius: 35 }}>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row', margin: 10 }}>
          <Text style={{ fontSize: 18, color: '#000', marginLeft: 10 }}>Jumlah Yang harus dibayar</Text>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000', marginRight: 10 }}>
            Rp {data?.payment[0]?.total_pembayaran?.toLocaleString()}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 10 }}>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: '#C3D5EA',
              margin: 5,
              padding: 15,
              borderRadius: 10,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#00008b',
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#00008b' }}>Batal</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ flex: 1, backgroundColor: '#00008b', margin: 5, padding: 15, borderRadius: 10, alignItems: 'center' }}
          >
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#FFFFFF' }}>Chat Jastiper</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ flex: 1, backgroundColor: '#00008b', margin: 5, padding: 15, borderRadius: 10, alignItems: 'center' }}
            onPress={() => navigation.navigate('Pembayaran', {order_id:data?.id})}
          >
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#FFFFFF' }}>Konfirmasi</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
