import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { useCallback } from 'react';
import { View, Text, FlatList, SafeAreaView } from 'react-native';
import { getHistoryJastip } from '../../api';

export default function RiwayatJastip() {
  const navigation = useNavigation()
  const route = useRoute()
  const [data,setData] = useState()
  
  useFocusEffect(useCallback(() => {
    async function fetchData() {
      try {
        const history = await getHistoryJastip()
        if(history.status == 200) {
          console.log(history?.data)
          setData(history?.data?.data)
        }

      } catch (err) {
        if(err.request) {
          console.error(err.request.status)
        } else {
          console.log(err)
        }
      }
    }
    fetchData()
  }))

  const renderItem = ({ item }) => (
    <View style={{
      backgroundColor: '#fff',
      top: 10,
      height: 80,
      width: 370,
      alignSelf: 'center',
      alignItems: 'center',
      elevation: 5,
      padding: 5,
      marginBottom: 10,
    }}>
      <Text style={{
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000',
        marginLeft: 12,
        alignSelf: 'flex-start'
      }}>{item.judulpost}</Text>
      <Text style={{
        fontSize: 10,
        color: '#000',
        marginLeft: 10,
        alignSelf: 'flex-start'
      }}>{item.tanggal}</Text>
      <Text style={{
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000',
        marginRight: 10,
        alignSelf: 'flex-end'
      }}>{item.biaya}</Text>
    </View>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#D9D9D9',
        
      }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />
      <View style={{
        backgroundColor: '#1138B7',
        height: 'auto',
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        elevation: 5,
        padding: 20,
        marginBottom: 10,
      }}>
      <Text style={{ alignSelf: 'center', fontSize: 18, fontWeight: 'bold', color: 'white' }}>Total: Rp {total}</Text>
      </View>
    
    </SafeAreaView>
  );
}
