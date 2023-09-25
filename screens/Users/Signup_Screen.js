import { View, Text, TouchableOpacity, TextInput, SafeAreaView } from 'react-native'
import React from 'react'
import { themeColors } from '../../theme/index'
import { useNavigation } from '@react-navigation/native'
import { registerApi } from '../../api'
import { useState } from 'react'

export default function SignUpScreen() {
  const navigation = useNavigation()
  const [data, setData] = useState({
    email: "",
    password: "",
    username: "",
    alamat: "",
    nama: "",
    nomor_telepon: ""
  })

  // const onSubmit = () => {
  //   if (data != null) {
  //     registerApi(data).then((request) => {
  //       if(request.status == 200) {
  //         navigation.navigate("Login")
  //       } else if(request.status == 400) {
  //         <Text>
  //           {request.message}
  //         </Text>
  //       } else {
  //         <Text>
  //           Error
  //         </Text>
  //       }
  //     }).catch((err) => {
  //       <Text>
  //         {err}
  //       </Text>
  //     })
  //   }
  // }


  const onSubmit = async () => {
    let datas = {
      email: "",
      password: "",
      username: "",
      alamat: "",
      nama: "",
      nomor_telepon: ""
    }
  
    datas = data
    try{
        console.log(datas)
        await registerApi(datas).then((response) => {
          if(response.status == 200){
            navigation.navigate('Login')
          }
        })
    }catch(error){
       console.log(error.data)
    }
}



  return (
    <View className="flex-1 bg-white " style={{ backgroundColor: themeColors.bg }}>
      <SafeAreaView className="flex justify-around my-10 ">
        <Text className="text-white text-center justify-center font-bold ml-4 text-7xl" style={{ top: 100 }}>TrustBuy</Text>
      </SafeAreaView>
      <View
        style={{bottom:100, borderTopRightRadius: 100 }}
        className="flex-1 bg-white px-10 pt-10">
        <View className="form space-y-2">
          <Text className="text-gray-700 ml-4">Email Address</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            placeholder='Email'
            onChangeText={(text) => setData({...data,email:text})}
          />
          <Text className="text-gray-700 ml-4">Username</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            placeholder="Username"
            onChangeText={(text) => setData({...data,username:text})}
          />
          <Text className="text-gray-700 ml-4">Alamat</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            placeholder="Alamat"
            onChangeText={(text) => setData({...data,alamat:text})}
          />
          <Text className="text-gray-700 ml-4">Nama</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            placeholder="Nama"
            onChangeText={(text) => setData({...data,nama:text})}
          />
          <Text className="text-gray-700 ml-4">Nomor Telepon</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            placeholder="Nomor Telepon"
            keyboardType="numeric"
            onChangeText={(text) => setData({...data,nomor_telepon:text})}
          />
          <Text className="text-gray-700 ml-4">Password</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-10"
            secureTextEntry
            placeholder="Enter password"
            onChangeText={(text) => setData({...data,password:text})}
          />



          <View className="form space-y-2">
            <TouchableOpacity onPress={onSubmit}
              className="py-3 bg-blue-800 rounded-xl">
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