import { View, Text, Image, TouchableOpacity, FlatList, TextInput, Dimensions } from 'react-native'
import React from 'react'
import Card from '../../components/card'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

const Dimension = Dimensions.get("window")

export default function HomeScreen() {
    const navigation = useNavigation()
    const [data, setData] = useState([
        { key: '1', userName: 'Akram', nomor: '089765432123', title: 'Titip Segala jenis buku di gramedia', deskripsi: 'Menerima segala jenis buku dengan maksimal 3 buku', lokasi: 'Gramedia Mall Panakukang', waktu: '17.48 - 17.59', gambar: require('../../assets/profilpeople.jpg') },
        { key: '2', userName: 'Akram', nomor: '089765432123', title: 'Titip Segala jenis buku di gramedia', deskripsi: 'Menerima segala jenis buku dengan maksimal 3 ', lokasi: 'Toko New Agung Alat Tulis dan kantor', waktu: '17.48 - 17.59', gambar: require('../../assets/profilpeople.jpg') },
        { key: '3', userName: 'Akram', nomor: '089765432123', title: 'Titip Segala jenis buku di gramedia', deskripsi: 'Menerima segala jenis buku dengan maksimal 3 buku', lokasi: 'Gramedia Mall Panakukang', waktu: '17.48 - 17.59', gambar: require('../../assets/profilpeople.jpg') },
        { key: '4', userName: 'Akram', nomor: '089765432123', title: 'Titip Segala jenis buku di gramedia', deskripsi: 'Menerima segala jenis buku dengan maksimal 3 buku', lokasi: 'Gramedia Mall Panakukang', waktu: '17.48 - 17.59', gambar: require('../../assets/profilpeople.jpg') },
        { key: '5', userName: 'Akram', nomor: '089765432123', title: 'Titip Segala jenis buku di gramedia', deskripsi: 'Menerima segala jenis buku dengan maksimal 3 buku', lokasi: 'Gramedia Mall Panakukang', waktu: '17.48 - 17.59', gambar: require('../../assets/profilpeople.jpg') },
    ]);
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

            <View >
                <FlatList
                    data={data}
                    contentContainerStyle={{
                        paddingVertical: 20
                    }}

                    renderItem={({ item }) => (
                        <Card>
                            <View style={{ bottom: 20, flexDirection: "row", width :"100%",  }} >
                                <View style={{
                                    width : "30%"
                                }}>
                                    <Image source={item.gambar} style={{ width: 80, height: 80, borderRadius: 50, left: 5 }} />
                                    <View className="items-center">
                                        <Text className="text-sm font-bold">{item.userName}</Text>
                                        <Text className=" text-blue-500 text-xs font-light">{item.nomor}</Text>
                                    </View>
                                </View>

                                <View style={{ marginHorizontal : "9%", width : "61%" }}>
                                    <View>

                                    <Text ellipsizeMode='tail'  className="text-sm font-bold pb-3 " style={{
                                        
                                    }} >{item.title}</Text>
                                    <Text className="text-xs font-semibold pb-3">{item.deskripsi}</Text>
                                    <Text className="text-xs font-semibold">{item.lokasi}</Text>
                                    <Text className="text-sm font-normal">{item.waktu}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => navigation.navigate('Chat', { userName: item.userName })}
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
                    keyExtractor={(item) => item.key}
                />
            </View>
        </View>

    )
}