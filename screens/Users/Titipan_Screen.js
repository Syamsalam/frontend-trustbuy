import { View, Text, Image, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

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
    return (
        <SafeAreaView style={{
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
                    }}>
                        <Text className="text-white text-start font-semibold ml-4 text-lg" style={{ top: 50, bottom: 40 }}>Akram</Text>
                        <Text className="text-white text-start font-light ml-4 text-lg" style={{ top: 50, bottom: 40 }}>085476233451</Text>
                    </View>
                </View>

            </View>
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
                                <Image source={require('../../assets/cube.png')} />
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