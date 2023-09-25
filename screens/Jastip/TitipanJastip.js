import React, { useState } from 'react';
import { View, Text, FlatList, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Card from '../../components/card';

export default function TitipanJastip() {
  const navigation = useNavigation();
  const arr = [
    {
        image: require("../../assets/Mask.png"),
        name: "Cek Titipan"
    },
    {
        image: require("../../assets/Wallet1.png"),
        name: "Pembayaran"
    },
    {
        image: require("../../assets/shopping-bag.png"),
        name: "Proses"
    },
    {
        image: require("../../assets/car.png"),
        name: "Pengantaran"
    },
  ]
  const [data, setData] = useState([
    { key: '1', userName: 'Akram', nomor: '089765432123', title: 'Titip Segala jenis buku di gramedia', deskripsi: 'Menerima segala jenis buku dengan maksimal 3 buku', lokasi: 'Gramedia Mall Panakukang', waktu: '17.48 - 17.59', gambar: require('../../assets/profilpeople.jpg'), showButtons: false },
    {key: '2', userName: 'Akram', nomor: '089765432123', title: 'Titip Segala jenis buku di gramedia', deskripsi: 'Menerima segala jenis buku dengan maksimal 3 ', lokasi: 'Toko New Agung Alat Tulis dan kantor', waktu: '17.48 - 17.59', gambar: require('../../assets/profilpeople.jpg'), showButtons: false},
    {key: '3', userName: 'Akram', nomor: '089765432123', title: 'Titip Segala jenis buku di gramedia', deskripsi: 'Menerima segala jenis buku dengan maksimal 3 buku', lokasi: 'Gramedia Mall Panakukang', waktu: '17.48 - 17.59', gambar: require('../../assets/profilpeople.jpg'), showButtons: false},
    // Add more items with showButtons as needed
  ]);

  const handleItemPress = (item,name) => {
    switch (name) {
      case "Cek Titipan":
          navigation.navigate("CekTitipan")
          break;
      case "Pembayaran":
          navigation.navigate("Pembayaran")
          break;
      case "Proses":
          navigation.navigate("Proses")
          break;
      case "Pengantaran":
          navigation.navigate("Pengantaran")
          break;
      default:
          break;
  }
  if (name === "Tolak") {
    // Remove the card when "Tolak" is pressed
    const updatedData = data.filter((dataItem) => dataItem.key !== item.key);
    setData(updatedData);
  } else {
    // Toggle the showButtons property when "Terima" or other actions are pressed
    setData((prevData) =>
      prevData.map((prevItem) =>
        prevItem.key === item.key ? { ...prevItem, showButtons: !prevItem.showButtons } : prevItem
      )
    );
  }
};

  return (
    <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
      <View style={{
          backgroundColor: '#1138B7',
          height: 250,
          borderBottomRightRadius: 50,
          elevation: 10,
          flexDirection: 'column',
      }}>
          <Text className="text-white text-start font-bold ml-4 text-4xl" style={{ top: 50, bottom: 40 }}>TrustBuy</Text>

          <View style={{
              flexDirection: 'row',
          }}>
              <Image

                  source={require('../../assets/profilpeople.jpg')}
                  style={{
                      width: 100,
                      height: 100,
                      left: 20,
                      top: 60,
                      borderRadius: 50,
                  }}
              ></Image>
              <View style={{
                  flexDirection: 'column',
                  top: 20,
                  left: 30,
              }}>
                  <Text className="text-white text-start font-semibold ml-4 text-lg" style={{ top: 50, bottom: 40 }}>Syamsul Alam</Text>
                  <Text className="text-white text-start font-light ml-4 text-lg" style={{ top: 50, bottom: 40 }}>75315946</Text>
              </View>
          </View>

      </View>
      <View>
                <View className="rounded-xl bg-white  mx-5 my-5 w-500 h-35" style={{
                    elevation: 10,
                    flexDirection: '',
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent : "space-around",
                        columnGap : 20
                    }}>
                        <View style={{
                            marginHorizontal: 20,
                            marginVertical: 20
                        }}>
                            <View style={{
                                marginTop: 20,
                                flexDirection: "row"
                            }}>
                                
                                {
                                    arr.map((el, ind) => <TouchableOpacity  key={el.name+"ind-"+ind} style={{
                                        alignItems: "center",
                                        marginHorizontal : 4,
                                        top: -7
                                    }}
                                    onPress={() => handleItemPress(el.name)}>
                                        <Image source={el.image}  />
                                        <Text className="text-blue-800 text-sm">{el.name}</Text>
                                    </TouchableOpacity>)
                                }

                            </View>
                        </View>
                    </View>
                </View>
            </View>
          

      
        <FlatList
          data={data}
          contentContainerStyle={{ paddingVertical: 20 }}
          renderItem={({ item }) => (
            <Card>
              <View style={{ bottom: 20, flexDirection: "row", width: "100%" }}>
              <View style={{
                                    width : "30%"
                                }}>
                                    <Image source={item.gambar} style={{ width: 80, height: 80, borderRadius: 50, left: 5 }} />
                                    <View className="items-center">
                                        <Text className="text-sm font-bold">{item.userName}</Text>
                                        <Text className=" text-blue-500 text-xs font-light">{item.nomor}</Text>
                                    </View>
                                </View>

                                <View style={{ marginHorizontal : "9%", width : "61%" }}>
                                    <View>

                                    <Text ellipsizeMode='tail'  className="text-sm font-bold pb-3 " style={{
                                        
                                    }} >{item.title}</Text>
                                    <Text className="text-xs font-semibold pb-3">{item.deskripsi}</Text>
                                    <Text className="text-xs font-semibold">{item.lokasi}</Text>
                                    <Text className="text-sm font-normal">{item.waktu}</Text>
                                    </View>

                  {item.showButtons ? (
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10}}>
                      <TouchableOpacity
                        onPress={() => handleItemPress(item, "Tolak")} // Pass "Tolak" as the name
                        style={{ alignSelf: "flex-end", marginRight: "5%" }}>
                        <Text className="text-xl font-bold text-center text-white bg-blue-800 rounded-full" style={{ paddingVertical: 5, paddingHorizontal: 10}}>Tolak</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('Chat', { userName: item.userName })}
                        style={{ alignSelf: "flex-end", marginRight: "5%" }}>
                        <Text className="text-xl font-bold text-center text-white bg-blue-800 rounded-full" style={{ paddingVertical: 5, paddingHorizontal: 10}}>Chat</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('FormTitipan', { userName: item.userName })}
                        style={{ alignSelf: "flex-end", marginRight: "5%" }}>
                        <Text className="text-xl font-bold text-center text-white bg-blue-800 rounded-full" style={{paddingVertical: 5, paddingHorizontal: 10}}>Buat Form</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 }}>
                    <TouchableOpacity
                        onPress={() => handleItemPress(item, "Tolak")} // Pass "Tolak" as the name
                        style={{ alignSelf: "flex-end", marginRight: "5%" }}>
                        <Text className="text-xl font-bold text-center text-white bg-blue-800 rounded-full" style={{ paddingVertical: 5, paddingHorizontal: 10}}>Tolak</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleItemPress(item, "Terima")} // Pass "Terima" as the name
                        style={{ alignSelf: "flex-end", marginRight: "5%" }}>
                        <Text className="text-xl font-bold text-center text-white bg-blue-800 rounded-full " style={{ paddingVertical: 5, paddingHorizontal: 10}}>Terima</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
               
              </View>
              
            </Card>
            
          )}
          keyExtractor={(item) => item.key}
        />
      
    </SafeAreaView>
  );
}