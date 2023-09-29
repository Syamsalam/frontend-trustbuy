import { View, Text, SafeAreaView,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { baseURL, getPhoto } from '../../api';
import { useState } from 'react';
import { Image as Img } from 'expo-image';
import AsyncStorage from '@react-native-async-storage/async-storage';

const arr = [
    {
        image: require("../../assets/Mask.png"),
        name: "Cek Titipan"
    },
    {
        image: require("../../assets/Wallet1.png"),
        name: "Pembayaran"
    },
    {
        image: require("../../assets/shopping-bag.png"),
        name: "Proses"
    },
    {
        image: require("../../assets/car.png"),
        name: "Pengantaran"
    },
]

export default function TitipanScreen() {
    const navigation = useNavigation()
    const [profile,setProfile] = useState()
    const [data,useData] = useState()
    const handleItemPress = (name) => {
        switch (name) {
            case "Cek Titipan":
                navigation.navigate("CekTitipan")
                break;
            case "Pembayaran":
                navigation.navigate("Pembayaran")
                break;
            case "Proses":
                navigation.navigate("Proses")
                break;
            case "Pengantaran":
                navigation.navigate("Pengantaran")
                break;
            default:
                break;
        }
    }

    useFocusEffect(useCallback(() => {
        async function fetchData() {
            try {
                const user = JSON.parse(await AsyncStorage.getItem('user'))
                const request = await getPhoto(user)
                if(request.status == 200) {
                    // console.log(request?.data?.data)
                    setProfile(request.data)
                }
            } catch (err) {
                if(err.response) {
                    console.log(err.response.data)
                }
            }
        }

        fetchData()
    },[]))
    
    return (
        <SafeAreaView style={{
            backgroundColor: '#fff',
            flex: 1,
        }}>
            {profile && (
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
                    <Img
                        placeholder={require('../../assets/profilpeople.jpg')}
                        source={ baseURL+"/gambar/"+profile?.users.image?.image}
                        style={{
                            width: 100,
                            height: 100,
                            left: 20,
                            top: 60,
                            borderRadius: 50,
                        }}
                    ></Img>
                    <View style={{
                        flexDirection: 'column',
                        top: 20,
                        left: 30,
                    }}>
                        <Text className="text-white text-start font-semibold ml-4 text-lg" style={{ top: 50, bottom: 40 }}>{profile.nama}</Text>
                        <Text className="text-white text-start font-light ml-4 text-lg" style={{ top: 50, bottom: 40 }}>{profile.nomor_telepon}</Text>
                    </View>
                </View>

            </View>
            )}
            <View>

                <View className="rounded-xl bg-white  mx-5 my-2 w-500 h-44 " style={{
                    elevation: 10,
                    flexDirection: '',
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent : "space-around",
                        columnGap : 20
                    }}>
                        <View style={{
                            marginHorizontal: 20,
                            marginVertical: 20
                        }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Image placeholder={require('../../assets/cube.png')} />
                                <Text className="text-lg font-semibold">Titipan Saya</Text>
                            </View>
                            <View style={{
                                marginTop: 20,
                                flexDirection: "row"
                            }}>
                                
                                {
                                    arr.map((el, ind) => <TouchableOpacity  key={el.name+"ind-"+ind} style={{
                                        alignItems: "center",
                                        marginHorizontal : 4
                                    }}
                                    onPress={() => handleItemPress(el.name)}>
                                        <Image source={el.image}  />
                                        <Text className="text-blue-800 text-sm">{el.name}</Text>
                                    </TouchableOpacity>)
                                }

                            </View>


                        </View>

                    </View>


                </View>
            </View>
        </SafeAreaView>
    )
}