import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'


export default function Riwayat() {
  return (
    <SafeAreaView
    style={{
      flex: 1,
      backgroundColor: '#D9D9D9',
    
    }}>
      <View style={{
        flexDirection: 'column',
      }}>
        <View style={{
          backgroundColor: '#fff',
          height: '30%',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: 80,
          width: 370,
          alignSelf: 'center',
          alignItems: 'center',
          elevation: 5,
          padding: 5,
        }}>
          <Text style={{
            fontSize: 15,
            fontWeight: 'bold',
            color: '#000',
           marginLeft: 12,
           alignSelf:'flex-start'
          }}>Titip Segala Jenis buku</Text>
          <Text style={{
            fontSize: 10,
            color: '#000',
            marginLeft:10,
            alignSelf:'flex-start'
          }}>13 Maret 2023</Text>
          <Text style={{
            fontSize: 15,
            fontWeight: 'bold',
            color: '#000',
            marginRight:10,
            alignSelf:'flex-end'
          }}>Rp 100.000</Text>
        </View>
        <View style={{
          backgroundColor: '#fff',
          height: '30%',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: 80,
          width: 370,
          alignSelf: 'center',
          alignItems: 'center',
          elevation: 5,
          padding: 5,
        }}>
          <Text style={{
            fontSize: 15,
            fontWeight: 'bold',
            color: '#000',
           marginLeft: 12,
           alignSelf:'flex-start'
          }}>Titip barang atk di agung</Text>
          <Text style={{
            fontSize: 10,
            color: '#000',
            marginLeft:10,
            alignSelf:'flex-start'
          }}>13 Maret 2023</Text>
          <Text style={{
            fontSize: 15,
            fontWeight: 'bold',
            color: '#000',
            marginRight:10,
            alignSelf:'flex-end'
          }}>Rp 46.000</Text>
        </View>
        <View style={{
          backgroundColor: '#fff',
          height: '30%',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: 80,
          width: 370,
          alignSelf: 'center',
          alignItems: 'center',
          elevation: 5,
          padding: 5,
        }}>
          <Text style={{
            fontSize: 15,
            fontWeight: 'bold',
            color: '#000',
           marginLeft: 12,
           alignSelf:'flex-start'
          }}>Titip perkakas di ace</Text>
          <Text style={{
            fontSize: 10,
            color: '#000',
            marginLeft:10,
            alignSelf:'flex-start'
          }}>13 Maret 2023</Text>
          <Text style={{
            fontSize: 15,
            fontWeight: 'bold',
            color: '#000',
            marginRight:10,
            alignSelf:'flex-end'
          }}>Rp 145.000</Text>
        </View>


        </View>
        
      
    </SafeAreaView>
  )
}