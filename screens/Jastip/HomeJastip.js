import { View, Text, Image, TouchableOpacity, FlatList, TextInput, Switch } from 'react-native'
import React from 'react'
import Card from '../../components/card'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'


export default function HomeJastip() {
    const navigation = useNavigation()
    const [active, setActive] = useState(false)
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
                        <View style={{
                            flexDirection: "row",
                            justifyContent : "space-between",
                            alignItems : "center"
                        }}>
                            <Text className="text-white text-start font-semibold ml-4 text-lg" style={{ top: 50, bottom: 40 }}>Syamsul Alam</Text>
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
                top: "50%",
            }}>

                <TouchableOpacity onPress={() => navigation.navigate('MulaiJastip')}
                    className="py-3 bg-white rounded-xl border border-blue-800 " style={{ backgroundColor: '#1138B7', top: 80, margin: 20 }}>
                    <Text style={{
                        color: 'white',
                        fontSize: 18,
                        fontWeight: 'bold',
                        textAlign: "center"
                    }}>Mulai Jastip</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}