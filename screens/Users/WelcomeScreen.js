import { View, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import { themeColors } from '../../theme/index'
import { useNavigation } from '@react-navigation/native'

export default function WelcomeScreen() {
    const navigation = useNavigation()
  return (
    <SafeAreaView className="flex-1" style={{backgroundColor: themeColors.bg, justifyContent :"space-between"}}>
      <View  className="flex ">
      <Text className="text-white text-start font-bold ml-4 text-4xl" style ={{top:20, bottom:40}}>TrustBuy</Text>
        <View  className="flex-row justify-center">
          <Image  source={require('../../assets/logo1.png')} 
          style={{width: 250, height: 250,top:100}} />
        </View>
       
        
        <Text className="text-white text-start font-bold ml-4 text-3xl" style ={{top:150, bottom:20}}>Selamat datang di TrustBuy</Text>

      </View>
      <View 
        style={{  
            
            borderTopRightRadius: 100, backgroundColor :"white",
        shadowOffset: { width: 0, height: 1, },
        position :"relative",
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 10,
        zIndex : 1000
    }} 
        className=" px-10 pt-10 pb-30">
          <View className="form space-y-10">
            <Text className="text-black text-center font-semibold ml-4">Aplikasi jasa titip barang yang memudahkan pengguna untuk memesan barang dari toko-toko tertentu dan mengantarkan ke alamat anda</Text>


            <View className="form space-y-2 pb-20">
            <TouchableOpacity onPress={() => navigation.navigate('Login')}
              className="py-3 bg-blue-800 rounded-xl">
                <Text 
                    className="text-xl font-bold text-center text-white"
                >
                        Login
                </Text>
             </TouchableOpacity>
             <TouchableOpacity onPress={() => navigation.navigate('Profil')}
              className="py-3 bg-blue-400 rounded-xl">
                <Text 
                    className="text-xl font-bold text-center text-white"
                >
                        Register
                </Text>
             </TouchableOpacity>
             </View>
            
          </View>
          
          
      </View>
    </SafeAreaView>
  )
}