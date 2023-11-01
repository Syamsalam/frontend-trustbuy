import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { useCallback } from 'react';
import { addOrderItems, getBiayaJastip, getOrderItems } from '../../api';
import formatCurrency from '../../tools/currencyFormat';

export default function FormTitipan() {
  const navigation = useNavigation();
  const route = useRoute()
  const [inputFields, setInputFields] = useState([{
    titipanLabel: 'Titipan 1',
    namaBarang: '',
    hargaBarang: ''
  }]);

  const [biayaOngkir, setBiayaOngkir] = useState('');
  const [biayaJasa, setBiayaJasa] = useState('');

  useFocusEffect(useCallback(() => {
    async function fetchData() {
      try {
        const order_id = route.params.order_id
        const result = await getOrderItems(order_id)

        const biaya = await getBiayaJastip(order_id)
        // console.log(biaya?.data?.data?.biaya_jastip)
        if (result.status == 200 && biaya.status == 200) {
          console.log(biaya?.data?.data?.biaya_jastip)
          if(result?.data?.data?.order_items?.length > 0 ) {
            const orderItems = result?.data.data.order_items.map((item, index) => ({
              titipanLabel: `Titipan ${index + 1}`,
              namaBarang: item.product_name,
              hargaBarang: item.subtotal
            }))
  
            setInputFields(orderItems)

            if(biaya.data != null) {
              handleBiayaJasaChange(biaya?.data?.data?.biaya_jastip)
              handleBiayaOngkirChange(biaya?.data?.data?.biaya_ongkir)
            }
          } 
        }
      } catch (err) {
        if (err.response) {
          console.error(err.response.data);
        } else {
          console.error(err);
        }
      }
    }
    fetchData()
  }, []))

  

  const calculateTotal = () => {
    let totalHargaBarang = 0;
    let totalBiayaOngkir = 0;
    let totalBiayaJasa = 0;

    inputFields.forEach((field) => {
      totalHargaBarang += parseInt(field.hargaBarang.replace(/\D/g, ''), 10);
    });

    if (biayaOngkir) {
      totalBiayaOngkir = parseInt(biayaOngkir.replace(/\D/g, ''), 10);
    }

    if (biayaJasa) {
      totalBiayaJasa = parseInt(biayaJasa.replace(/\D/g, ''), 10);
    }

    return totalHargaBarang + totalBiayaOngkir + (totalBiayaJasa * 2);
  };

  const handleTambah = () => {
    const newTitipanLabel = `Titipan ${inputFields.length + 1}`;
    const updatedFields = [
      ...inputFields,
      { titipanLabel: newTitipanLabel, namaBarang: '', hargaBarang: '' },
    ];
    setInputFields(updatedFields);
  };

  const handleChange = async (text, index, field) => {
    let newValue = text;
    if (field === 'hargaBarang') {
      newValue = text.replace(/\D/g, ''); // Hanya mempertahankan digit
      newValue = parseInt(newValue, 10); // Konversi ke integer
      newValue = formatCurrency(newValue);
    }
    const updatedFields = [...inputFields];
    updatedFields[index][field] = newValue;
    setInputFields(updatedFields);
  };

  const handleHapus = () => {
    if (inputFields.length === 1) {
      return;
    }
    const updatedFields = [...inputFields];
    updatedFields.pop();
    setInputFields(updatedFields);
  };

  const handleBiayaOngkirChange = (text) => {


    let newValue = text;
    newValue = text.replace(/\D/g, ''); // Hanya mempertahankan digit
    newValue = parseInt(newValue, 10); // Konversi ke integer
    newValue = formatCurrency(newValue);
    setBiayaOngkir(newValue);
  };

  const handleBiayaJasaChange = (text) => {
    let newValue = text;
    newValue = text.replace(/\D/g, ''); // Hanya mempertahankan digit
    newValue = parseInt(newValue, 10); // Konversi ke integer
    newValue = formatCurrency(newValue);
    setBiayaJasa(newValue);
  };


  const onSave = async () => {
    const orderItems = inputFields.map((field) => ({
      order_id: route.params.order_id,
      quantity: 0,
      product_name: field.namaBarang,
      subtotal: parseInt(field.hargaBarang.replace(/\D/g, ''), 10),
    }));
    
    const formatBiaya = {
      biaya_ongkir: parseInt(biayaOngkir.replace(/\D/g, ''), 10),
      biaya_jastip: parseInt(biayaJasa.replace(/\D/g, ''), 10),
    }
    
    const order = {
      id: route.params.order_id,
      order_items: orderItems,
      payment: formatBiaya
    };
    
    try {
      const response = await addOrderItems(order);
      console.log(response.data);
      if(response.status == 200) {
        await navigation.navigate('Pembayaran Jastip',{order_id: route.params.order_id})
      }
    } catch (err) {
      if (err.response) {
        console.error(err.response.data);
      } else {
        console.error(err);
      }
    }
  }
 
  return (
    <View className="flex-1  bg-gray-200">
      <View className="text-2xl mb-4 bg-white "></View>
      <View style={{
        backgroundColor: "white",
        borderRadius: 20,
        maxWidthwidth: "500px",
        shadowOffset: { width: 0, height: 1, },
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 10,
      }}>
        <ScrollView className="w-full h-3/5 ">
          {inputFields.map((field, index) => (
            <View key={index} className="mb-6  p-4">
              <Text className="mb-2 font-bold text-lg">{field.titipanLabel}</Text>
              <View className="flex flex-col">
                <Text className="mb-2">Nama Barang</Text>
                <TextInput
                  className="border border-gray-400  p-2 bg-gray-50 rounded-full "
                  value={field.namaBarang}
                  onChangeText={(text) => handleChange(text, index, 'namaBarang')}
                />
                <Text className="mb-2">Harga Barang</Text>
                <TextInput
                  className="border border-gray-400  p-2 bg-gray-50 rounded-full "
                  value={field.hargaBarang}
                  onChangeText={(text) => handleChange(text, index, 'hargaBarang')}
                  keyboardType="numeric"
                />
              </View>
            </View>
          ))}
          <View className="flex flex-row justify-end px-5 space-x-5 ">
            <TouchableOpacity onPress={handleHapus}>
              <MaterialCommunityIcons
                name="minus-circle"
                size={32}
                color="#2e64e5"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleTambah}>
              <MaterialCommunityIcons
                name="plus-circle"
                size={32}
                color="#2e64e5"
              />
            </TouchableOpacity>
          </View>
          <View className="mb-6  p-4 pb-5">
            <View className="flex flex-col">
              <Text className="mb-2">Biaya Ongkir</Text>
              <TextInput
                className="border border-gray-400  p-2 bg-gray-50 rounded-full "
                value={biayaOngkir}
                onChangeText={handleBiayaOngkirChange}
                keyboardType="numeric"
              />
              <Text className="mb-2">Biaya Jasa</Text>
              <TextInput
                className="border border-gray-400 p-2 bg-gray-50 rounded-full"
                value={biayaJasa}
                onChangeText={handleBiayaJasaChange}
                keyboardType="numeric"
              />
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={{
        top: 10,
        backgroundColor: "white",
        borderRadius: 20,
        width: "100%",
        shadowOffset: { width: 0, height: 1, },
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 10,
      }}>
        <View className="flex flex-row justify-between px-5 py-5">
          <Text className="font-bold text-lg">Jumlah yang harus dibayar : {formatCurrency(calculateTotal())}</Text>
        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
          marginHorizontal: 1,
          paddingVertical: 5,
          paddingHorizontal: 20,
        }}><TouchableOpacity
          className="py-3 bg-white rounded-xl w-28 border border-blue-800">
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
              Chat Kostumer
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onSave}
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
  );
}
