import { SafeAreaView, View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'


export default function Profil() {
    const navigation = useNavigation()
  return (
    <SafeAreaView style ={{
        backgroundColor: '#fff',
        flex: 1,

    }}>
        <View style={{
            backgroundColor: '#1138B7',
            height:250,
            borderBottomRightRadius: 50,
            elevation: 10,
            flexDirection: 'column',
        }}>
            <Text className="text-white text-start font-bold ml-4 text-4xl" style ={{top:50, bottom:40}}>TrustBuy</Text>

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
                width:200,
            }}>
            <Text className="text-white text-start font-semibold ml-4 text-lg" style ={{top:50, bottom:40}}>Akram</Text>
            <Text className="text-white text-start font-light ml-4 text-lg" style ={{top:50, bottom:40}}>085476233451</Text>
            </View>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Edit')}>
                <Image  source={require('../../assets/edit.png')} style ={{ alignSelf:'flex-end', marginRight:20}}></Image>
            </TouchableOpacity>

        </View>
        <View style={{
            flexDirection: 'col',
            
            
        }} >
           
            <Text className="text-black text-left  font-semibold ml-4 text-base bg-slate-50 w-auto h-16 mx-5 my-1 p-4 " style ={{top:25, bottom:40, elevation:2, width:'auto',}}>Jl. Kaliurang </Text>
            <Text className="text-black text-left font-semibold ml-4 text-base bg-slate-50 w-auto h-16 mx-5 my-1 p-4 " style ={{top:25, bottom:40, elevation:2, width:'auto',}}>Laki-Laki</Text>
            <Text className="text-black text-left font-semibold ml-4 text-base bg-slate-50 w-auto h-16 mx-5 my-1 p-4 " style ={{top:25, bottom:40, elevation:2, width:'auto',}}>02-07-2000</Text>
            <Text className="text-black text-left font-semibold ml-4 text-base bg-slate-50 w-auto h-16 mx-5 my-1 p-4 " style ={{top:25, bottom:40, elevation:2, width:'auto',}}>akram27@gmail.com</Text>
            <View>
            <Text className="text-black text-left font-semibold ml-4 text-base bg-slate-50 w-auto h-16 mx-5 my-1 p-4 " style ={{top:25, bottom:40, elevation:2, width:'auto',}}>Riwayat transaksi</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Riwayat')}>
                <Image  source={require('../../assets/chevron-left.png')} style ={{alignSelf:'flex-end', bottom:20, right:30 }}></Image>
            </TouchableOpacity>
            </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Welcome')}
            className="py-3 bg-white rounded-xl border border-blue-800 " style={{top: 30, margin:30}}>
              <Text 
                  className="text-xl font-bold text-center text-blue-800"
              >
                      Logout
              </Text>
           </TouchableOpacity>

    </SafeAreaView>
  )
}