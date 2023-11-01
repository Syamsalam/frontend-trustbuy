import { View, Text, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useCallback } from 'react'
import { useState } from 'react'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import { baseURL, getJastipById, getProfile,updatePost } from '../../api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Image as Img } from 'expo-image'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'



export default function UbahPost() {
    const navigation = useNavigation()
    const route = useRoute()
    const [data,setData] = useState()
    const [profil,setProfil] = useState()
    const [mulai,setMulai] = useState(new Date())
    const [akhir,setAkhir] = useState(new Date())
    
    useFocusEffect(useCallback(() => {
        async function fetchData() {
            try{
                const user = JSON.parse( await AsyncStorage.getItem('user'));
                const id = route.params.post_id;
                const post = await getJastipById(id);
                const profile = await getProfile(user);
                

                if(profile.status == 200 ||post.status == 200) {
                    setData(post.data.data)
                    setProfil(profile.data)
                    if(post?.data.data.waktu_mulai && post?.data.data.waktu_akhir) {
                        const waktuM = new Date(post?.data.data.waktu_mulai)
                        const waktuA = new Date(post?.data.data.waktu_mulai)

                        setMulai(waktuM)
                        setAkhir(waktuA)
                    }
                }
            } catch(err) {
                if(err.response) {
                    console.log(err.response.data)
                } else {
                    console.log(err)
                }
            }
        }
        fetchData();
    },[]))


    const onSave = async() => {
        try {
            const updatedData = {
                ...data,
                waktu_mulai: mulai,
                waktu_akhir: akhir,
            };

            // console.log(updatedData)
            const result = await updatePost(updatedData)
            if (result.status == 200) {
                console.log(result.message)
                navigation.navigate('HomeJastip')
            } else {
                console.log(result.message)
            }
        } catch (err) {
            if (err.response) {
                console.error(err.response.data)
            } else {
                // console.log(data)
                console.log(err.message)
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

                        source={baseURL + "/gambar/" + profil?.users?.image?.image}
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
                        <Text className="text-white text-start font-semibold ml-4 text-lg" style={{ top: 50, bottom: 40 }}>{profil?.nama}</Text>
                        <Text className="text-white text-start font-light ml-4 text-lg" style={{ top: 50, bottom: 40 }}>{profil?.nomor_telepon}</Text>
                    </View>
                </View>
                <View style={{
                    flexDirection: 'column',
                    top: 10,
                    left: 20,
                }}>
                    <Text className="text-white text-start font-semibold ml-4 text-lg" style={{ top: 50, bottom: 40 }}>{profil?.users?.username}</Text>
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
                   <Text className="text-black-700 ml-1" style={{marginTop: 35, fontWeight: 'bold'}}>Judul Jastip</Text>
                      <TextInput
                            className="p-2 bg-gray-100 text-gray-700 rounded-2xl mb-1"
                            placeholder='Titip segala jenis buku di Gramedia'
                            value={data?.judul}
                            onChangeText={(text) => setData({...data,judul:text})}
                      />
                      <Text className="text-black-700 ml-1" style={{marginTop: 35, fontWeight: 'bold'}}>Lokasi</Text>
                      <TextInput 
                        className="p-2 bg-gray-100 text-gray-700 rounded-2xl mb-1"
                        placeholder="Gramedia Mall Pannakukang Makassar"
                        value={data?.lokasi}
                        onChangeText={(text) => setData({...data,lokasi:text})}
                      />
                      <Text className="text-black-700 ml-1" style={{marginTop: 35, fontWeight: 'bold'}}>Waktu Mulai</Text>
                      <TouchableOpacity className="p-2 bg-white rounded-2xl mb-1"
                            style={{
                                backgroundColor : '#f5f5f5'
                            }}
                            onPress={() => {
                                DateTimePickerAndroid.open({
                                    value: mulai,
                                    onChange : (ev, date) => {
                                        setMulai(date)
                                    },
                                    mode: "time"
                                  });
                            }}

                            
                        >
                            <Text  style={{
                                color :"gray"
                            }}>{mulai.toLocaleTimeString("id-ID", {
                                hour12 : true,
                                hour : "2-digit",
                                minute : "2-digit"
                            })}</Text>
                        </TouchableOpacity>
                    <Text className="text-black-700 ml-1" style={{marginTop: 35, fontWeight: 'bold'}}>Waktu Akhir</Text>
                    <TouchableOpacity className="p-2 bg-white rounded-2xl mb-1"
                            style={{
                                backgroundColor : '#f5f5f5'
                            }}
                            onPress={() => {
                                DateTimePickerAndroid.open({
                                    value: akhir,
                                    onChange : (ev, date) => {
                                        setAkhir(date)
                                    },
                                    mode: "time"
                                  });
                            }}

                            
                        >
                            <Text  style={{
                                color :"gray"
                            }}>{akhir.toLocaleTimeString("id-ID", {
                                hour12 : true,
                                hour : "2-digit",
                                minute : "2-digit"
                            })}</Text>
                        </TouchableOpacity>
                        
                      <Text className="text-black-700 ml-1" style={{marginTop: 35, fontWeight: 'bold'}}>Deskripsi Jastip</Text>
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
                        
                        placeholder="Menerima segala jenis buku dengan maksimal 3 buku"
                        value={data?.deskripsi}
                        onChangeText={(text) => setData({...data,deskripsi:text})}
                      />
                      </View>
                
                <TouchableOpacity onPress={() => onSave()}
                
                    className="py-3 bg-white rounded-xl border border-blue-800 " style={{ backgroundColor: '#1138B7', top: 4, margin: 20 }}>
                    <Text style={{
                        color: 'white',
                        fontSize: 18,
                        fontWeight: 'bold',
                        textAlign: "center"
                    }}>Ubah</Text>
                </TouchableOpacity>

                </View>
                </View>
                </ScrollView>
                
    </View>

    )
}