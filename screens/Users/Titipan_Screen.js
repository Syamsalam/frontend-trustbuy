import { View, Text, SafeAreaView,Image, TouchableOpacity, FlatList, } from 'react-native'
import React from 'react'
import Card from '../../components/card'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { baseURL, getOrderForUser, getProfile } from '../../api';
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
    const [post, setPost] = useState();

    useFocusEffect(useCallback(() => {
        async function fetchData() {
            try {
                const user = JSON.parse(await AsyncStorage.getItem('user'))
                const request = await getProfile(user)

                const titipPost = await getOrderForUser();
                if(request.status == 200 && request.status == 200) {
                    // console.info(titipPost?.data?.data)
                    setProfile(request.data)
                    setPost(titipPost?.data?.data)
                }
            } catch (err) {
                if(err.response) {
                    console.error(err.response.data)
                } else {
                    console.error(err.message)
                }
            }
        }

        fetchData()
    },[]))

    const handleItemPress = (name) => {
        switch (name) {
            case "Cek Titipan":
                
                break;
            case "Pembayaran":
               
                break;
            case "Proses":
                
                break;
            case "Pengantaran":
                
                break;
            default:
                break;
        }
    }
    
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
            <FlatList
                    data={post}
                    contentContainerStyle={{
                        paddingVertical: 20
                    }}

                    renderItem={({ item }) => (
                        <Card>
                            <View style={{ bottom: 20, flexDirection: "row", width :"100%",  }} >
                                

                                <View style={{ paddingLeft:20, width : "100%" }}>
                                    <View>

                                    <Text ellipsizeMode='tail'  className="text-sm font-bold pb-3 " style={{
                                        
                                    }} >{item?.jastiper_post?.judul}</Text>
                                    <Text className="text-xs font-semibold pb-3">{item?.jastiper_post?.deskripsi}</Text>
                                    <Text className="text-xs font-semibold">{item?.jastiper_post?.lokasi}</Text>
                                    <Text className="text-sm font-normal">{new Date(item?.jastiper_post?.waktu_mulai).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", hour12: true })} - {new Date(item?.jastiper_post?.waktu_akhir).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", hour12: true })}</Text>
                                    </View>
                                    <View className ="space-x-5 " style={{
                                        flexDirection:'row',
                                        alignItems:'center',
                                        marginTop:20,
                                        
                                    }}>
                                        <TouchableOpacity onPress={() => navigation.navigate('Messages')}
                                        
                                            className="py-3 bg-blue-800 rounded-xl w-32 ">
                                            <Text 
                                                className="text-sm font-bold text-center text-white "
                                            >
                                                    Chat Jastiper
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => navigation.navigate('CekTitipan',{order_id:item.id})}
                                            className="py-3 bg-blue-800 rounded-xl w-32 ">
                                            <Text 
                                                className="text-sm font-bold text-center text-white "
                                            >
                                                    Cek Titipan
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Card>
                        
                        

                    )}
                    
                    keyExtractor={(item) => item.id}
                    
                />
        </SafeAreaView>
    )
}