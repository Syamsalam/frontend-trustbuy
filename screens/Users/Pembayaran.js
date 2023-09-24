import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';

export default function Pembayaran() {
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
          }}>Jumlah Yang harus dibayar</Text>
          <Text style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#000',
            marginRight:10,
          }}>Rp 217.000</Text>
      </View>
      <View style={{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:20,
        marginBottom:20,
        marginHorizontal:1,
        paddingVertical:10,
        paddingHorizontal:50,
      }}>
           <TouchableOpacity 
            className="py-3 bg-blue-800 rounded-xl w-32 ">
              <Text 
                  className="text-sm font-bold text-center text-white "
              >
                      Chat Jastiper
              </Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={() => navigation.navigate('Proses')}
            className="py-3 bg-blue-800 rounded-xl w-32 ">
              <Text 
                  className="text-sm font-bold text-center text-white "
              >
                      Bayar
              </Text>
           </TouchableOpacity>
      </View>
      </View>
      </View>
      
    </SafeAreaView>
  )
}