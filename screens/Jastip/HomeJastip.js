import { View, Text, Image, TouchableOpacity, FlatList, TextInput, Switch } from 'react-native'
import React, { useCallback } from 'react'
import Card from '../../components/card'
import { useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { baseURL, getProfile, getPostJastip, updateStatus, checkStatus } from '../../api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Image as Img } from 'expo-image'


export default function HomeJastip() {
    const navigation = useNavigation()
    const [active, setActive] = useState(false)
    const [data, setData] = useState()

    const [post, setPost] = useState();

    const handleDelete = (id) => {
        // Filter item yang memiliki id yang tidak sama dengan id yang dihapus
        const updatedData = post.filter(item => item.id !== id);
        // Update daftar data
        setPost(updatedData);
    };
    
    useFocusEffect(useCallback(() => {
        async function fetchData() {
            try {
                const user = JSON.parse(await AsyncStorage.getItem('user'))
                const request = await getProfile(user)
                const post = await getPostJastip()
                const statusPost = await checkStatus()
                // console.log(post.data.data)

                if (request.status == 200 && post.status == 200 && statusPost.status == 200) {
                    // console.log(request?.data)
                    setData(request?.data)
                    setPost(post.data.data)

                    // console.log(statusPost?.data.data[0].aktif)
                    if(statusPost?.data.data[0].aktif === "aktif") {
                        setActive(true)
                    }
                    
                }
            } catch (err) {
                if (err.response) {
                    console.log(err.response.data)
                } else {
                    console.error(err)
                }
            }
        }
        fetchData()
    }, []))

    const toggleStatus = async () => {
        try {
            const user = JSON.parse(await AsyncStorage.getItem('user'))        
            const ActivationPost = await updateStatus(user)
            if(ActivationPost.status == 200) {
                setActive(el => !el)
            }
        } catch (err) {
            if (err.response) {
                console.log(err?.response?.data)
            } else {
                console.error(err)
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
                borderBottomRightRadius: 50,
                elevation: 10,
                flexDirection: 'column',
            }}>
                <Text className="text-white text-start font-bold ml-4 text-4xl" style={{ top: 50, bottom: 40 }}>TrustBuy</Text>
                <View style={{
                    flexDirection: 'row',
                }}>

                    <Img

                        source={baseURL + "/gambar/" + data?.users?.image?.image}
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
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}>
                            <Text className="text-white text-start font-semibold ml-4 text-lg" style={{ top: 50, bottom: 40 }}>{data?.nama}</Text>
                            <Switch style={{
                                top: 70,
                                left: 30,
                            }}
                                trackColor={{ false: '#767577', true: '#81b0ff' }}
                                thumbColor={active ? '#C3D5EA' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={() => {

                                    toggleStatus()
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
            <FlatList
                data={post}
                contentContainerStyle={{
                    paddingVertical: 20
                }}

                renderItem={({ item }) => (
                    <Card>
                        <View style={{ bottom: 20, flexDirection: "row", width: "100%", }} >


                            <View style={{ paddingLeft: 20, width: "100%" }}>
                                <View>

                                    <Text ellipsizeMode='tail' className="text-sm font-bold pb-3 " style={{

                                    }} >{item.judul}</Text>
                                    <Text className="text-xs font-semibold pb-3">{item.deskripsi}</Text>
                                    <Text className="text-xs font-semibold">{item.lokasi}</Text>
                                    <Text className="text-sm font-normal">{new Date(item.waktu_mulai).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", hour12: true })}</Text>
                                    <Text className="text-sm font-normal">{new Date(item.waktu_akhir).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", hour12: true })}</Text>
                                </View>
                                <View className="space-x-5 " style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginTop: 20,

                                }}>
                                    <TouchableOpacity onPress={() => handleDelete(item.id)}

                                        className="py-3 bg-blue-800 rounded-xl w-32 ">
                                        <Text
                                            className="text-sm font-bold text-center text-white "
                                        >
                                            Hapus
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => navigation.navigate('UbahPost',{post_id: item.id})}
                                        className="py-3 bg-blue-800 rounded-xl w-32 ">
                                        <Text
                                            className="text-sm font-bold text-center text-white "
                                        >
                                            Ubah
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Card>



                )}

                keyExtractor={(item) => item.id}

            />

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
                    alignSelf: 'center'
                }}
            >
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                    Mulai Jastip
                </Text>
            </TouchableOpacity>

        </View>

    )
}