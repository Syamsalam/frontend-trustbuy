import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';

export default function CekTitipan() {
  const navigation = useNavigation()
  return (
    <SafeAreaView
    style={{
      flex: 1,
      backgroundColor: '#D9D9D9',
    
    }}>
      
      <View style={{
        backgroundColor: '#C3D5EA',
        height: '10%',
        flexDirection: 'column',
        paddingTop: 20,
        
      }}>
        <View style={{
      }}>
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
        height: '60%',
        flexDirection: 'column',
        paddingTop: 40,
      }}>
        <View style={{
          backgroundColor: '#fff',
          height: '30%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: 70,
          width: 370,
          alignSelf: 'center',
          alignItems: 'center',
          elevation: 5,
        }}>
          <Text style={{
            fontSize: 18,
            color: '#000',
           marginLeft: 10,
          }}>Buku Filosofi Teras</Text>
          <Text style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#000',
            marginRight:10,
          }}>Rp 100.000</Text>
        </View>
        <View style={{
          backgroundColor: '#fff',
          height: '30%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: 70,
          width: 370,
          alignSelf: 'center',
          alignItems: 'center',
          elevation: 5,
        }}>
          <Text style={{
            fontSize: 18,
            color: '#000',
           marginLeft: 10,
          }}>Komik One Piece vol 100</Text>
          <Text style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#000',
            marginRight:10,
          }}>Rp 100.000</Text>
        </View>
        <View style={{
          backgroundColor: '#fff',
          height: '30%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: 70,
          width: 370,
          alignSelf: 'center',
          alignItems: 'center',
          elevation: 5,
        }}>
          <Text style={{
            fontSize: 18,
            color: '#000',
           marginLeft: 10,
          }}>Ongkir</Text>
          <Text style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#000',
            marginRight:10,
          }}>Rp 10.000</Text>
        </View>
        <View style={{
          backgroundColor: '#fff',
          height: '30%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: 70,
          width: 370,
          alignSelf: 'center',
          alignItems: 'center',
          elevation: 5,
        }}>
          <Text style={{
            fontSize: 18,
            color: '#000',
           marginLeft: 10,
          }}>Biaya Jasa</Text>
          <Text style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#000',
            marginRight:10,
          }}>Rp 7.000</Text>
        </View>
        <View style={{
        backgroundColor: '#C3D5EA',
        height: '30%',
        flexDirection: 'column',
        paddingTop: 10,
        marginTop:50,
        borderTopLeftRadius:35,
        borderTopRightRadius:35,
        
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
        paddingVertical:5,
        paddingHorizontal:20,
      }}><TouchableOpacity 
            className="py-3 bg-blue-200 rounded-xl w-28 border">
              <Text 
                  className="text-sm font-bold text-center text-blue-800 "
              >
                      Batal
              </Text>
           </TouchableOpacity>
           <TouchableOpacity 
            className="py-3 bg-blue-800 rounded-xl w-28 ">
              <Text 
                  className="text-sm font-bold text-center text-white "
              >
                      Chat Jastiper
              </Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={() => navigation.navigate('Pembayaran')}
            className="py-3 bg-blue-800 rounded-xl w-28 ">
              <Text 
                  className="text-sm font-bold text-center text-white "
              >
                      Konfirmasi
              </Text>
           </TouchableOpacity>
      </View>
      </View>
      </View>
      
    </SafeAreaView>
  )
}