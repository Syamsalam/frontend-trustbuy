import React, { useState } from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback } from 'react';
import { Image as Img } from 'expo-image';
import { baseURL, detailProfile } from '../../api';
import { useUser } from '../../tools/userContext';

export default function Profil() {
  const navigation = useNavigation();
  const [data, setData] = useState();
  const {setUser} = useUser()
  useFocusEffect(useCallback(() => {
    async function fetchData() {
      try {
        const user = JSON.parse(await AsyncStorage.getItem('user'))
        const request = await detailProfile(user)
        if(request.status == 200) {
          // console.log(request.data.data)
          setData(request.data.data)
        }
      } catch (err) {
        if(err.request) {
          console.error(err.request)
        }
      }
    }

    fetchData()
  },[]))

  const onLogout = () => {
    AsyncStorage.removeItem('token').then(() => {
      console.log("logout ")
      setUser(null)
    
    });
  }

  return (
    
    <SafeAreaView
      style={{
        backgroundColor: '#fff',
        flex: 1,
      }}
    >
      <View
        style={{
          backgroundColor: '#1138B7',
          height: 250,
          borderBottomRightRadius: 50,
          elevation: 10,
          flexDirection: 'column',
        }}
      >
        <Text
          className="text-white text-start font-bold ml-4 text-4xl"
          style={{ top: 50, bottom: 40 }}
        >
          TrustBuy
        </Text>

        <View style={{ flexDirection: 'row' }}>
          <Img
            source={baseURL+"/gambar/"+data?.image?.image }
            placeholder={require('../../assets/profilpeople.jpg')}
            style={{
              width: 100,
              height: 100,
              left: 20,
              top: 60,
              borderRadius: 50,
            }}
          ></Img>
          <View
            style={{
              flexDirection: 'column',
              top: 20,
              left: 30,
              width: 200,
            }}
          >
            <Text
              className="text-white text-start font-semibold ml-4 text-lg"
              style={{ top: 50, bottom: 40 }}
            >
              {data?.user_details?.nama}
            </Text>
            <Text
              className="text-white text-start font-light ml-4 text-lg"
              style={{ top: 50, bottom: 40 }}
            >
              {data?.user_details?.nomor_telepon}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Edit')}>
          <Image
            source={require('../../assets/edit.png')}
            style={{ alignSelf: 'flex-end', marginRight: 20 }}
          ></Image>
        </TouchableOpacity>
      </View>
      {data && (
      <View style={{ flexDirection: 'column' }}>
        <RenderItem label="Alamat" value={data?.user_details?.alamat} />
        <RenderItem label="Email" value={data?.email} />
        <RenderItemWithArrow
          label="Riwayat transaksi"
          onPress={() => navigation.navigate('Riwayat', {id:data?.id})}
        />
      </View>
      )}
      <TouchableOpacity
        onPress={onLogout}
        className="py-3 bg-white rounded-xl border border-blue-800 "
        style={{ top: 30, margin: 30 }}
      >
        <Text className="text-xl font-bold text-center text-blue-800">Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

function RenderItem({ label, value }) {
  return (
    <Text
      className="text-black text-left font-semibold ml-4 text-base bg-slate-50 w-auto h-16 mx-5 my-1 p-4 "
      style={{ top: 25, bottom: 40, elevation: 2, width: 'auto' }}
    >
      {value}
    </Text>
  );
}

function RenderItemWithArrow({ onPress }) {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
      <Text className="text-black text-left font-semibold ml-4 text-base bg-slate-50 w-auto h-16 mx-5 my-1 p-4 "
      style={{ top: 25, bottom: 40, elevation: 2, width: 'auto' }}>Riwayat</Text>
        <Image
          source={require('../../assets/chevron-left.png')}
          style={{ alignSelf: 'flex-end', bottom: 20, right: 30 }}
        ></Image>
      </TouchableOpacity>
    </View>
  );
}
