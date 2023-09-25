import { View, Text, Image, TouchableOpacity, FlatList, TextInput, Switch } from 'react-native'
import React from 'react'
import Card from '../../components/card'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'


export default function UbahPost() {
    const navigation = useNavigation()
    const [waktu, setWaktu] = useState('');

    const handleFocus = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');

        const formattedTime = `${hours}:${minutes}`;

        setWaktu(formattedTime);
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
            <View style={{
                backgroundColor: "#C3D5EA",
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                height: 1000,
                paddingHorizontal: 35,
                top: 150,
            }}>
                   <View className="form space-y-3">
                   <Text className="text-black-700 ml-1" style={{marginTop: 35, fontWeight: 'bold'}}>Judul Jastip</Text>
                      <TextInput
                          className="p-2 bg-gray-100 text-gray-700 rounded-2xl mb-1"
                          placeholder='Titip segala jenis buku di Gramedia'
                      />
                      <Text className="text-black-700 ml-1" style={{marginTop: 35, fontWeight: 'bold'}}>Lokasi</Text>
                      <TextInput 
                        className="p-2 bg-gray-100 text-gray-700 rounded-2xl mb-1"
                        placeholder="Gramedia Mall Pannakukang Makassar"
              
                      />
                       <Text className="text-black-700 ml-1" style={{marginTop: 35, fontWeight: 'bold'}}>Waktu</Text>
                      <TextInput 
                        className="p-2 bg-gray-100 text-gray-700 rounded-2xl mb-1"
                        placeholder="Waktu" 
                        keyboardType="numeric"
                        onFocus={handleFocus}
                        value={waktu}
                      />
                      <Text className="text-black-700 ml-1" style={{marginTop: 35, fontWeight: 'bold'}}>Deskripsi Jastip</Text>
                      <TextInput 
                        className="p-7 bg-gray-100 text-gray-200 rounded-2xl mb-1"
                        placeholder="Menerima segala jenis buku dengan maksimal 3 buku"
                      />
                
                <TouchableOpacity onPress={() => navigation.navigate('JastipPost')}
                
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
                
    </View>

    )
}