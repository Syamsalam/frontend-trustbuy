import { View, Text, Image, TouchableOpacity,TextInput } from 'react-native'
import React , {useState , useEffect} from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'
import CountryPicker from 'react-native-country-picker-modal'
import registerJastpApi from '../../api/index'

export default function SignUpScreen() {
    const navigation = useNavigation()
    const [data, setData] = useState({
        username:"",
        email:"",
        password:"",
        alamat:"",
        nama:"",
        nomor_telepon:""
    })

    const onSubmit = () => {
        try{
            const response = registerJastpApi(data)
            if(response.status == 200){
                navigation.navigate('Login')
            }
        }catch(error){
            <View>
                <Text>{error}</Text>
            </View>
        }
    }
        
  return (
    <View className="flex-1 bg-white " style={{backgroundColor: themeColors.bg}}>
    <SafeAreaView  className="flex justify-around my-10 ">
    <Text className="justify-center ml-4 font-bold text-center text-white text-7xl" style ={{top:100}}>TrustBuy</Text>
    </SafeAreaView>
    <View 
      style={{top: 70, borderTopRightRadius: 100 }} 
      className="flex-1 px-10 pt-10 bg-white">
         <View className="space-y-2 form">
         <Text className="ml-4 text-gray-700">Full Name</Text>
            <TextInput
                onChange={(value) => setData({...data, nama: value})}
                className="p-4 mb-3 text-gray-700 bg-gray-100 rounded-2xl"
                placeholder='Enter Name'
            />
            <Text className="ml-4 text-gray-700">Email Address</Text>
            <TextInput
                onChange={(value) => setData({...data, email: value})} 
              className="p-4 mb-3 text-gray-700 bg-gray-100 rounded-2xl"
              placeholder="Enter email"
    
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

        

          <View className="space-y-2 form">
          <TouchableOpacity onPress={() => onSubmit()}
            className="py-3 bg-blue-800 rounded-xl">
              <Text 
                  className="text-xl font-bold text-center text-white"
              >
                      Register Jastip
              </Text>
           </TouchableOpacity>
           </View>
          
        </View>
        
        
    </View>
    </View>
  )
}