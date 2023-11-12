import { View, Text,TouchableOpacity,TextInput, SafeAreaView } from 'react-native'
import React, { useCallback, useState } from 'react'
import { themeColors } from '../../theme/index'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { loginApi } from '../../api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { socket } from '../../tools/socket'
import { Alert } from 'react-native'
import { useUser } from '../../tools/userContext'

export default function LoginJastip() {
    const navigation = useNavigation()
    const {setUser} = useUser()
    const [data,setData] = useState({
      email: "",
      password: ""
    })

    // useFocusEffect(useCallback(() => {
    //   async function fetchData() {
    //     try {
    //       const token = await AsyncStorage.getItem('token')

          
    //       // if(token != null) {
            
    //       // }
    //     } catch (err) {
    //       if(err.response) {
    //         console.error(err.response.data)
    //       } else {
    //         console.error(err)
    //       } 
    //     }
    //   }
    //   fetchData()
    // },[]))

    const onSubmit = async () => {
      if(socket.connected == false) {
        socket.connect()
        return alert("Anda tidak terhubung ke Internet")
      }
      
      try {
        const result = await loginApi(data)
        if (result.data.data.user.role_id == 2) {
          Alert.alert("Login Sebagai User","Silahkan Login sebagai user")
        } else if (result.status == 204) {
          console.log("Belum Teraktifasi Akun Anda belum diaktifasi oleh admin.")
        } else if(result.status == 200 && result.data.data.user.role_id == 3) {
          const {user,token} =result?.data?.data
          socket.emit("newUser", user.id, (msg) => {
            console.log(msg)
          })
          console.log(user)
          await AsyncStorage.setItem('user',JSON.stringify(user)).then(() => {
            AsyncStorage.setItem('token',token).then(() => {
              console.log('login')
            })
          })
          setUser(user)
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
              onChange={(event) => setData({...data, email:event.nativeEvent.text}) }
               
            />
            <Text className="text-gray-700 ml-4">Password</Text>
            <TextInput 
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
              secureTextEntry
              placeholder="password"
              onChange={(event) => setData({...data, password:event.nativeEvent.text})}
               
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
           <TouchableOpacity onPress={() => navigation.navigate('SignupJastip')}
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