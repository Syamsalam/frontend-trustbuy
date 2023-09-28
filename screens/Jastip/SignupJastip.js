import { View, Text, TouchableOpacity,TextInput, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { themeColors } from '../../theme/index'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'

export default function SignupJastip() {
    const navigation = useNavigation()
    const [data, setData] = useState({
        email: "",
        password: "",
        username: "",
        alamat: "",
        nama: "",
        nomor_telepon: ""
      })

      

        
  return (
    <View className="flex-1 bg-white " style={{backgroundColor: themeColors.bg}}>
    <SafeAreaView  className="flex justify-around my-10 ">
    <Text className="text-white text-center justify-center font-bold ml-4 text-7xl" style ={{top:20}}>TrustBuy</Text>
    </SafeAreaView>
    <View 
      style={{borderTopRightRadius: 80 }} 
      className="flex-1 bg-white px-10 pt-10">
        
         <ScrollView className="form space-y-2">
         <Text className="ml-4 text-gray-700">Email Address</Text>
            <TextInput
                onChange={(value) => setData({...data, email: value})} 
              className="p-4 mb-3 text-gray-700 bg-gray-100 rounded-2xl"
              placeholder="Enter email"
    
            />
            <Text className="ml-4 text-gray-700">Username</Text>
            <TextInput
                onChange={(value) => setData({...data, username: value})}
                className="p-4 mb-3 text-gray-700 bg-gray-100 rounded-2xl"
                placeholder='Enter Username'
            />
            <Text className="ml-4 text-gray-700">Alamat</Text>
            <TextInput
                onChange={(value) => setData({...data, alamat: value})}
                className="p-4 mb-3 text-gray-700 bg-gray-100 rounded-2xl"
                placeholder='Enter Name'
            />
            <Text className="ml-4 text-gray-700">Full Name</Text>
            <TextInput
                onChange={(value) => setData({...data, nama: value})}
                className="p-4 mb-3 text-gray-700 bg-gray-100 rounded-2xl"
                placeholder='Enter Name'
            />
             <Text className="ml-4 text-gray-700">Phone Number</Text>
            <TextInput
                onChange={(value) => setData({...data, nomor_telepon: value})} 
              className="p-4 mb-3 text-gray-700 bg-gray-100 rounded-2xl"
              placeholder="Enter phone number"
              keyboardType="numeric"
    
            />
            <Text className="ml-4 text-gray-700">Password</Text>
            <TextInput 
                onChange={(value) => setData({...data, password: value})}
              className="p-4 mb-10 text-gray-700 bg-gray-100 rounded-2xl"
              secureTextEntry
              placeholder="Enter password"
            />
            <TouchableOpacity onPress={() => navigation.navigate('LoginJastip')}
            className="py-3 bg-blue-800 rounded-xl">
              <Text 
                  className="text-xl font-bold text-center text-white"
              >
                      Register
              </Text>
           </TouchableOpacity>
        </ScrollView>
    </View>
    </View>
  )
}