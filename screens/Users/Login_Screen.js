import { View, Text, TouchableOpacity, TextInput, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useEffect } from 'react'
import { themeColors } from '../../theme/index'
import { useNavigation } from '@react-navigation/native'
import { loginApi } from '../../api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState } from 'react'
import { socket } from '../../tools/socket'
import { Alert } from 'react-native'
import { useUser } from '../../tools/userContext'

export default function LoginScreen() {
  const navigation = useNavigation()
  const {setUser} = useUser()


  const [data, setData] = useState({
    email: "",
    password: ""
  })


  const onSubmit = async () => {
    if(socket.connected == false) {
      socket.connect()
      return alert("Anda tidak terhubung ke Internet")
    }
    try {

      if (data != null) {
        const result = await loginApi(data)
        if (result.status == 200 && result.data.data.user.role_id == 2) {
          const { user, token } = result?.data?.data;

          await AsyncStorage.setItem('user', JSON.stringify(user))
          setUser(user)
          socket.emit("newUser", user.id, (msg) => {
            console.log(msg)
          })

          await AsyncStorage.setItem('token', token).then(() => {
            console.log('login')
            navigation.navigate('Home')
          })

          
        } else if (result.data.data.user.role_id == 3) {
          Alert.alert("Login sebagai jastip","silahkan login sebagai jastip")
          
        }
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status == 400) {
          alert("Silahkan isi email dan password terlebih dahulu")
        }
      } 
    }
  }

  


  return (
    <SafeAreaView className="flex-1 bg-white " style={{ backgroundColor: themeColors.bg }}>
      <View className="flex justify-around my-10 ">
        <Text className="text-white text-center justify-center font-bold ml-4 text-7xl" style={{ top: 150 }}>TrustBuy</Text>
      </View>
      <View
        style={{ top: 180, borderTopRightRadius: 100 }}
        className="flex-1 bg-white px-10 pt-10">

        <ScrollView className=" space-y-2">
          <KeyboardAvoidingView className="form space-y-2 pb-7" 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          
          >

          <Text className="text-gray-700 ml-4">Email Address</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            placeholder="email"
            onChangeText={(text) => setData({ ...data, email: text })}

          />
          <Text className="text-gray-700 ml-4">Password</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
            secureTextEntry
            placeholder="password"
            onChangeText={(text) => setData({ ...data, password: text })}

          />
          <TouchableOpacity className="flex items-center">
            <Text className="text-gray-700 mb-5 ">Forgot Password?</Text>
          </TouchableOpacity>

          <View className="form space-y-2">
            <TouchableOpacity onPress={onSubmit}
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
          </KeyboardAvoidingView>


        </ScrollView>


      </View>
    </SafeAreaView>

  )
}