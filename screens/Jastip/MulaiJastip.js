import { View, Text, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useCallback } from 'react'
import { useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { createPost, getCommonProfile } from '../../api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker'



export default function MulaiJastip() {
    const navigation = useNavigation()
<<<<<<< HEAD

    const [jastip,setJastip] = useState()
    const [data,setData] = useState({
=======
    const [data, setData] = useState({
>>>>>>> 400fa8190feea5e380c3e71a0ca946e492458e1f
        judul: "Tidak ada",
        deskripsi: "Tidak ada",
        lokasi: "Tidak ada",
        waktu_mulai: "",
        waktu_akhir: ""
    })

    useFocusEffect(useCallback(() => {
        async function fetchData() {
            try{
                const user = JSON.parse(await AsyncStorage('user'))
                const response = await getCommonProfile(user)
                if(response.status == 200) {
                    setJastip(response.data.data)
                }
            }catch (err) {
                if(err.response) {
                    console.error(err.response.data)
                }
            }
        }

        fetchData()
    },[]))

    const onSubmit = async () => {
        try {
            const result = await createPost(data)
            if (result.status == 200) {
                console.log(result.message)
                navigation.navigate('HomeJastip')
            } else {
                console.log(result.message)
            }
        } catch (err) {
            if (err.response) {
                console.error(err.response.data)
            }
        }
    }

    const [awalTime, setAwalTime] = useState(new Date());
    const [akhirTime, setAkhirTime] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const toggleDatePicker = () => {
        setShowPicker(!showPicker);
    };






    return (
        <View style={{
            backgroundColor: '#fff',
            flex: 1,
        }}>
            <View style={{
                backgroundColor: '#1138B7',
                height: 250,
                borderBottomRightRadius: 50,
                elevation: 10,
                flexDirection: 'column',
            }}>
                <Text className="text-white text-start font-bold ml-4 text-4xl" style={{ top: 50, bottom: 40 }}>TrustBuy</Text>
                <View style={{
                    flexDirection: 'row',
                }}>
                    <Image

                        source={require('../../assets/profilpeople.jpg')}
                        style={{
                            width: 100,
                            height: 100,
                            left: 20,
                            top: 60,
                            borderRadius: 50,
                        }}
                    ></Image>
                    <View style={{
                        flexDirection: 'column',
                        top: 20,
                        left: 30,
                        width: 200,
                    }}>
                        <Text className="text-white text-start font-semibold ml-4 text-lg" style={{ top: 50, bottom: 40 }}>{jastip?.user_profile?.nama}</Text>
                        <Text className="text-white text-start font-light ml-4 text-lg" style={{ top: 50, bottom: 40 }}>{jastip?.user_profile?.nomor_telepon}</Text>
                    </View>
                </View>
                <View style={{
                    flexDirection: 'column',
                    top: 10,
                    left: 20,
                }}>
                    <Text className="text-white text-start font-semibold ml-4 text-lg" style={{ top: 50, bottom: 40 }}>Jastiper</Text>
                </View>
            </View>
            <ScrollView contentContainerStyle={{
                paddingTop: 120,

            }} >
                <View style={{
                    backgroundColor: "#C3D5EA",
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,

                    paddingHorizontal: 35,

                }}>


                    <View className="form space-y-3">
                        <Text className="text-black-700 ml-1" style={{ marginTop: 35, fontWeight: 'bold' }}>Judul Jastip</Text>
                        <TextInput
                            className="p-2 bg-gray-100 text-gray-700 rounded-2xl mb-1"
                            placeholder='Masukan Judul Titipan'
                            onChange={(value) => setData({ ...data, judul: value.nativeEvent.text })}

                        />
                        <Text className="text-black-700 ml-1" style={{ marginTop: 35, fontWeight: 'bold' }}>Lokasi</Text>
                        <TextInput
                            className="p-2 bg-gray-100 text-gray-700 rounded-2xl mb-1"
                            placeholder="Lokasi Pemesanan"
                            onChange={(event) => setData({ ...data, lokasi: event.nativeEvent.text })}

                        />
                        {/* {showPicker && (
                            <DateTimePicker
                                mode='time'
                                display='default'
                                value={date}
                                onChange={(ev, date) => {
                                    setDate(date)
                                }}
                                locale='id-ID'
                            />
                        )} */}
                        <Text className="text-black-700 ml-1" style={{ marginTop: 35, fontWeight: 'bold' }}>Waktu Mulai</Text>
                        <TouchableOpacity className="p-2 bg-white rounded-2xl mb-1"
                            style={{
                                backgroundColor : '#f5f5f5'
                            }}
                            onPress={() => {
                                DateTimePickerAndroid.open({
                                    value: awalTime,
                                    onChange : (ev, date) => {
                                        setAwalTime(date)
                                    },
                                    mode: "time",
                                    is24Hour: true,
                                  });
                            }}
                        >
                            <Text  style={{
                                color :"gray"
                            }}>{awalTime.toLocaleTimeString("id-ID", {
                                hour12 : true,
                                hour : "2-digit",
                                minute : "2-digit"
                            })}</Text>
                        </TouchableOpacity>
                        <Text className="text-black-700 ml-1" style={{ marginTop: 35, fontWeight: 'bold' }}>Waktu Selesai</Text>
                        <TouchableOpacity className="p-2 bg-white rounded-2xl mb-1"
                            style={{
                                backgroundColor : '#f5f5f5'
                            }}
                            onPress={() => {
                                DateTimePickerAndroid.open({
                                    value: akhirTime,
                                    onChange : (ev, date) => {
                                        setAkhirTime(date)
                                    },
                                    mode: "time",
                                    is24Hour: true,
                                  });
                            }}
                        >
                            <Text  style={{
                                color :"gray"
                            }}>{akhirTime.toLocaleTimeString("id-ID", {
                                hour12 : true,
                                hour : "2-digit",
                                minute : "2-digit"
                            })}</Text>
                        </TouchableOpacity>

                        <Text className="text-black-700 ml-1" style={{ marginTop: 35, fontWeight: 'bold' }}>Deskripsi Jastip</Text>
                        <View style={{
                            backgroundColor: "#f5f5f5",
                            width: '100%',
                            height: '15%',
                            borderRadius: 20,
                            alignItems: 'flex-start'
                        }}>
                            <TextInput
                                className="p-1 text-black-200 rounded-2xl mb-1 h-24 "
                                multiline
                                placeholder="Tambahkan deskripsi jenis titipan yang diterima"
                                onChange={(event) => setData({ ...data, deskripsi: event.nativeEvent.text })}
                            />
                        </View>

                        <TouchableOpacity onPress={onSubmit}

                            className="py-3 bg-white rounded-xl border border-blue-800 " style={{ backgroundColor: '#1138B7', top: 4, margin: 20 }}>
                            <Text style={{
                                color: 'white',
                                fontSize: 18,
                                fontWeight: 'bold',
                                textAlign: "center"
                            }}>Tambah Jastip</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </ScrollView>

        </View>

    )
}