import { View, Text, Image, TouchableOpacity, FlatList, TextInput, Switch } from 'react-native'
import React, { useCallback } from 'react'
import Card from '../../components/card'
import { useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { baseURL, getPhoto } from '../../api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Image as Img } from 'expo-image'


export default function HomeJastip() {
    const navigation = useNavigation()
    const [active, setActive] = useState(false)
    const [data,setData] = useState()

    useFocusEffect(useCallback(() => {
        async function fetchData() {
            try {
                const user = JSON.parse(await AsyncStorage.getItem('user'))
                const request = await getPhoto(user)
                if(request.status == 200) {
                    console.log(request?.data)
                    setData(request?.data)
                }
            } catch(err) {
                if(err.response) {
                    console.log(err.response)
                } else {
                    console.error(err)
                }
            }
        }
        fetchData()
    },[]))

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

                    <Img

                        source={baseURL+ "/gambar/"+ data?.users?.image?.image}
                        placeholder={require("../../assets/profilpeople.jpg")}
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
                        width: 200,
                    }}>
                        <View style={{
                            flexDirection: "row",
                            justifyContent : "space-between",
                            alignItems : "center"
                        }}>
                            <Text className="text-white text-start font-semibold ml-4 text-lg" style={{ top: 50, bottom: 40 }}>{data?.nama}</Text>
                            <Switch style={{
                                top : 70,
                                left : 30,
                            }}
                                trackColor={{ false: '#767577', true: '#81b0ff' }}
                                thumbColor={active ? '#C3D5EA' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={() => {
                                    setActive(el => !el)
                                }}
                                value={active}
                            />
                        </View>
                        <Text className="text-white text-start font-light ml-4 text-lg" style={{ top: 50, bottom: 40 }}>{data?.nomor_telepon}</Text>
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
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('MulaiJastip')}
                    style={{
                        backgroundColor: '#1138B7',
                        paddingVertical: 15,
                        paddingHorizontal: 40,
                        borderRadius: 30,
                        borderWidth: 1,
                        borderColor: '#fff',
                        width: '80%',
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                        Mulai Jastip
                    </Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}