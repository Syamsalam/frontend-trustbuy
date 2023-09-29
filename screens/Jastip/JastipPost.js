import { View, Text, Image, TouchableOpacity, FlatList, TextInput, Switch } from 'react-native'
import React from 'react'
import Card from '../../components/card'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'


export default function JastipPost() {
    const navigation = useNavigation()
    const [data, setData] = useState();

    const handleDelete = (key) => {
        // Filter item yang memiliki key yang tidak sama dengan key yang dihapus
        const updatedData = data.filter(item => item.key !== key);
        // Update daftar data
        setData(updatedData);
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
                        <Text className="text-white text-start font-semibold ml-4 text-lg" style={{ top: 50, bottom: 40 }}>Syamsul Alam</Text>
                        <Text className="text-white text-start font-light ml-4 text-lg" style={{ top: 50, bottom: 40 }}>75315946</Text>
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

             <View >
                <FlatList
                    data={data}
                    contentContainerStyle={{
                        paddingVertical: 20
                    }}

                    renderItem={({ item }) => (
                        <Card>
                            <View style={{ bottom: 20, flexDirection: "row", width :"100%",  }} >
                                

                                <View style={{ paddingLeft:20, width : "100%" }}>
                                    <View>

                                    <Text ellipsizeMode='tail'  className="text-sm font-bold pb-3 " style={{
                                        
                                    }} >{item.title}</Text>
                                    <Text className="text-xs font-semibold pb-3">{item.deskripsi}</Text>
                                    <Text className="text-xs font-semibold">{item.lokasi}</Text>
                                    <Text className="text-sm font-normal">{item.waktu}</Text>
                                    </View>
                                    <View className ="space-x-5 " style={{
                                        flexDirection:'row',
                                        alignItems:'center',
                                        marginTop:20,
                                        
                                    }}>
                                        <TouchableOpacity onPress={() => handleDelete(item.key)}
                                        
                                            className="py-3 bg-blue-800 rounded-xl w-32 ">
                                            <Text 
                                                className="text-sm font-bold text-center text-white "
                                            >
                                                    Hapus
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => navigation.navigate('UbahPost')}
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
                    keyExtractor={(item) => item.key}
                />
                <View style={{
                top: "80%",
            }}>
                
                <TouchableOpacity onPress={() => navigation.navigate('Welcome')}
                
                    className="py-3 bg-white rounded-xl border border-blue-800 " style={{ backgroundColor: '#1138B7', top: 5, margin: 20 }}>
                    <Text style={{
                        color: 'white',
                        fontSize: 18,
                        fontWeight: 'bold',
                        textAlign: "center"
                    }}>Lihat Titipan</Text>
                </TouchableOpacity>
            </View>
    </View>
    </View>

    )
}