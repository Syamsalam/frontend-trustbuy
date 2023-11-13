import { View, Text, TouchableOpacity, FlatList, TextInput, Dimensions, ScrollView, RefreshControl} from 'react-native'
import React, { useEffect } from 'react'
import Card from '../../components/card'
import { useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { baseURL, createOrder, postAktif } from '../../api'
import { useCallback } from 'react'
import { Image } from 'expo-image';

const Dimension = Dimensions.get("window")

export default function HomeScreen() {
    const navigation = useNavigation()
    const [data, setData] = useState()
    const [refresh, setRefresh] = useState(false)
    useFocusEffect(useCallback(() => {
        fetchData()
    }, []))

    async function fetchData() {
        try {
            const response = await postAktif()
            // console.log(response.data)
            // console.log(user)
            if (response.status == 200) {
                // console.log(response?.data?.data[0].waktu_mulai)
                setData(response.data.data)
            }
        } catch (err) {
            if (err.response) {
                console.error(err.response.data)
            }
        }
        setRefresh(false)
    }
    const onRefresh = useCallback(() => {
        setRefresh(true);
        fetchData()
      }, []);

    const onTitip = async (id,id_jastip) => {
        try {
            const user = await AsyncStorage.getItem('user')
            let data = JSON.parse(user);
            var date = new Date();

            console.log(date)
            const order ={
                user_id : data.id,
                jastip_id : id_jastip,
                post_id : id,
                order_date: date,
                status_id: 2
            }
            const result = await createOrder({order})

            if(result.status == 200) {
                navigation.navigate("TitipanScreen")
            }
        } catch (err) {
            if (err.response) {
                console.error(err.response.data)
            } else {
                console.log(err)
            }
        }
    }
        
    
    return (
        <View style={{
            backgroundColor: '#fff',
            flex: 1,
        }}>
            <View style={{
                backgroundColor: '#1138B7',
                height: 250,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                //flexDirection: 'row',
            }}>
                <Text className="text-white text-start font-bold ml-4 text-4xl" style={{ top: 50, bottom: 40 }}>TrustBuy</Text>
                <View style={{
                    backgroundColor: '#C3D5EA',
                    height: 60,
                    width: Dimension.width - (30 * 2),
                    borderRadius: 30,
                    marginTop: 80,
                    marginHorizontal: 30,
                    alignItems: 'center',
                    flexDirection: 'row',
                }}>
                    <Image

                        source={require('../../assets/search.png')}
                        style={{
                            width: 20,
                            height: 20,
                            left: 20,
                        }}
                    ></Image>
                    <TextInput
                        className="text-black text-start font-bold ml-4 text-4xl"
                        placeholder="Search"
                        style={{
                            fontWeight: 'semibold',
                            fontSize: 20,
                            width: 260,
                            left: 20,
                        }}
                    ></TextInput>
                </View>

            </View>

            
                <FlatList
                    data={data}
                    refreshControl={
                        <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
                    }
                    contentContainerStyle={{
                        paddingVertical: 20
                    }}
                    
                    renderItem={({ item }) => (
                        <Card>
                            <View style={{ bottom: 20, flexDirection: "row", width :"100%",  }} >
                                <View style={{
                                    width : "30%"
                                }}>
                                    <Image placeholder={require("../../assets/profilpeople.jpg")} source={baseURL+"/gambar/"+item?.users?.image?.image} style={{ width: 80, height: 80, borderRadius: 50, left: 5 }} />
                                    <View className="items-center">
                                        <Text className="text-sm font-bold">{item.users?.user_details?.nama}</Text>
                                        <Text className=" text-blue-500 text-xs font-light">{item.users?.user_details?.nomor_telepon}</Text>
                                    </View>
                                </View> 

                                <View style={{ marginHorizontal : "9%", width : "61%" }}>
                                    <View>

                                    <Text ellipsizeMode='tail'  className="text-sm font-bold pb-3 " style={{
                                        
                                    }} >{item.judul}</Text>
                                    <Text className="text-xs font-semibold pb-3">{item.deskripsi}</Text>
                                    <Text className="text-xs font-semibold">{item.lokasi}</Text>
                                    <Text className="text-sm font-normal">{new Date(item.waktu_mulai).toLocaleTimeString("id-ID", {hour : "2-digit", minute : "2-digit", hour12 : true})}</Text>
                                    <Text className="text-sm font-normal">{new Date(item.waktu_akhir).toLocaleTimeString("id-ID", {hour : "2-digit", minute : "2-digit", hour12 : true})}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => onTitip(item.id,item.user_id)}
                                        className="py-1 w-20  bg-blue-800 rounded-xl" style={{
                                            alignSelf: "flex-end",
                                            marginRight : "5%"

                                        }}>
                                        <Text
                                            className="text-xl font-bold text-center text-white"
                                        >
                                            Titip
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>


                        </Card>

                    )}
                    keyExtractor={(item) => item.id}
                />
            
        </View>

    )
}