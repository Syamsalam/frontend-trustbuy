import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';

export default function Proses() {
  const navigation = useNavigation()
  return (
    <SafeAreaView
    style={{
      flex: 1,
      backgroundColor: '#D9D9D9',
    
    }}>
      
      <View style={{
        backgroundColor: '#fff',
        height: '10%',
        flexDirection: 'column',
        paddingTop: 20,
        paddingHorizontal: 20,
        
      }}>
        <View>
        <Text style={{
          fontSize: 18,
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#000',
        }}>Titipanku</Text>
      </View>
      </View>
      <View style={{
        backgroundColor: '#fff',
        height: '20%',
        flexDirection: 'column',
        paddingTop: 20,
        elevation: 5,
      }}>
        <View style={{
        flexDirection: 'column',
        paddingTop: 10,
      
      }}>
        <View style={{
          justifyContent:'space-between',
          flexDirection:'row'
      }}>
        <Text style={{
            fontSize: 18,
            color: '#000',
           marginLeft: 10,
          }}>Dalam Proses</Text>
      </View>
      <View style={{
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center',
        marginTop:20,
        marginBottom:20,
        marginHorizontal:20
      }}>
           <TouchableOpacity onPress={() => navigation.navigate('Chat')}
            className="py-3 bg-blue-800 rounded-xl w-48 ">
              <Text 
                  className="text-sm font-bold text-center text-white "
              >
                      Chat Jastiper
              </Text>
           </TouchableOpacity>
      </View>
      </View>
      </View>
      
    </SafeAreaView>
  )
}