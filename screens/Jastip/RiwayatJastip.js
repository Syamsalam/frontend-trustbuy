import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, SafeAreaView } from 'react-native';

export default function RiwayatJastip() {
  const data = [
    { key: '1', judulpost: 'Titip Segala Jenis buku', tanggal: '13 Maret 2023', biaya: 'Rp 100.000' },
    { key: '2', judulpost: 'Titip Barang di Atk Agung', tanggal: '13 Maret 2023', biaya: 'Rp 80.000' },
    { key: '3', judulpost: 'Titip Perkakas di Ace', tanggal: '13 Maret 2023', biaya: 'Rp 140.000' },
  ];

  // Initialize total to 0
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Calculate the total by iterating through the data
    let calculatedTotal = 0;
    data.forEach(item => {
      // Extract the numerical part of the 'biaya' field and add it to the total
      const biayaValue = parseInt(item.biaya.replace(/\D/g, ''), 10); // Remove non-digit characters
      calculatedTotal += biayaValue;
    });

    // Set the calculated total to the state
    setTotal(calculatedTotal);
  }, []);

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
