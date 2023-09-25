import { View, Text,TouchableOpacity,TextInput, SafeAreaView } from 'react-native'
import React from 'react'
import { themeColors } from '../../theme/index'
import { useNavigation } from '@react-navigation/native'

export default function LoginScreen() {
    const navigation = useNavigation()
  return (
    <View className="flex-1 bg-white " style={{backgroundColor: themeColors.bg}}>
    <SafeAreaView  className="flex justify-around my-10 ">
    <Text className="text-white text-center justify-center font-bold ml-4 text-7xl" style ={{top:150}}>TrustBuy</Text>
    </SafeAreaView>
    <View 
      style={{top: 180, borderTopRightRadius: 100 }} 
      className="flex-1 bg-white px-10 pt-10">
         <View className="form space-y-2">
            <Text className="text-gray-700 ml-4">Email Address</Text>
            <TextInput 
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              placeholder="email"
               
            />
            <Text className="text-gray-700 ml-4">Password</Text>
            <TextInput 
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
              secureTextEntry
              placeholder="password"
               
            />
            <TouchableOpacity className="flex items-center">
              <Text className="text-gray-700 mb-5 ">Forgot Password?</Text>
            </TouchableOpacity>

          <View className="form space-y-2">
          <TouchableOpacity onPress={() => navigation.navigate('FirstScreen')}
            className="py-3 bg-blue-800 rounded-xl">
              <Text 
                  className="text-xl font-bold text-center text-white"
              >
                      Login
              </Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={() => navigation.navigate('SignUp')}
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
    </View>
  
  )
}