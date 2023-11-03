import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function CekTitipan() {
  const navigation = useNavigation();
  const [data, setData] = useState([
    {
      key: '1',
      titipan: [
        { judul: 'Buku Filosofi Teras', harga: 100000 },
        { judul: 'Buku Filosofi Teras', harga: 100000 },
        { judul: 'Buku Filosofi Teras', harga: 100000 },
        { judul: 'Buku Filosofi Teras', harga: 100000 },
        { judul: 'Komik', harga: 120000 },
        { judul: 'Novel', harga: 90000 },
      ],
      Ongkir: 100000,
      BiayaJasa: 7000,
    },
  ]);
  const [totalHarga, setTotalHarga] = useState(0);

  useEffect(() => {
    // Menghitung total harga
    let total = 0;
    data.forEach((item) => {
      item.titipan.forEach((titipan) => {
        total += titipan.harga;
      });
      total += item.Ongkir;
      total += item.BiayaJasa;
    });
    setTotalHarga(total);
  }, [data]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#D9D9D9' }}>
      <View style={{ backgroundColor: '#C3D5EA', height: 80, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000' }}>Titipanku</Text>
      </View>

      <ScrollView style={{ flex: 1 }}>
        {data.map((item) => (
          <View key={item.key}>
            {item.titipan.map((titipan, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: '#fff',
                  height: 70,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  margin: 5,
                  elevation: 5,
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontSize: 18, color: '#000', marginLeft: 10 }}>{titipan.judul}</Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000', marginRight: 10 }}>
                  Rp {titipan.harga.toLocaleString()}
                </Text>
              </View>
            ))}
            <View
              style={{
                backgroundColor: '#fff',
                height: 70,
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 5,
                elevation: 5,
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 18, color: '#000', marginLeft: 10 }}>Ongkir</Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000', marginRight: 10 }}>
                Rp {item.Ongkir.toLocaleString()}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#fff',
                height: 70,
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 5,
                elevation: 5,
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 18, color: '#000', marginLeft: 10 }}>Biaya Jasa</Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000', marginRight: 10 }}>
                Rp {item.BiayaJasa.toLocaleString()}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={{ backgroundColor: '#C3D5EA', height: 120, borderTopLeftRadius: 35, borderTopRightRadius: 35 }}>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row', margin: 10 }}>
          <Text style={{ fontSize: 18, color: '#000', marginLeft: 10 }}>Jumlah Yang harus dibayar</Text>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000', marginRight: 10 }}>
            Rp {totalHarga.toLocaleString()}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 10 }}>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: '#C3D5EA',
              margin: 5,
              padding: 15,
              borderRadius: 10,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#00008b',
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#00008b' }}>Batal</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ flex: 1, backgroundColor: '#00008b', margin: 5, padding: 15, borderRadius: 10, alignItems: 'center' }}
          >
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#FFFFFF' }}>Chat Jastiper</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ flex: 1, backgroundColor: '#00008b', margin: 5, padding: 15, borderRadius: 10, alignItems: 'center' }}
            onPress={() => navigation.navigate('Pembayaran')}
          >
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#FFFFFF' }}>Konfirmasi</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
