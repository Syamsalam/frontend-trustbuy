import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Card from '../../components/card';
import { baseURL, getPhoto, getOrderStatus, updateOrderStatus } from '../../api';
import { Image as Img } from 'expo-image'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TitipanJastip() {
  const navigation = useNavigation();
  const [profile, setProfile] = useState()
  let id_status = 2
  const arr = [
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
  const [data, setData] = useState();
  
  // showButtons: false 

  useFocusEffect(useCallback(() => {
    async function useEffect() {
      try {
        const user = JSON.parse(await AsyncStorage.getItem('user'))
        const result = await getPhoto(user)

        const titipPost = await getOrderStatus(user)
        if (result.status == 200 && titipPost.status == 200) {
          // console.log(titipPost?.data?.data)
          const formattedData = titipPost?.data?.data.map((item) => ({
            ...item,
            showButtons: false,
          }));
          setProfile(result.data)
          setData(formattedData)
        }
      } catch (err) {
        if (err.response) {
          console.log(err.response.data)
        } else {
          console.log(err.message)
        }
      }
    }
    useEffect()
  }, []))

  const changeStatus = async (targetitemId) => {
    const changeStatus = data.find((item) => item.id === targetitemId)
    
    if(changeStatus) {
      changeStatus.status_id = 3;
    }

    await updateOrderStatus(changeStatus)
  
  }

  const handleItemPress = (item, name) => {
    switch (name) {
      case "Pembayaran":
        navigation.navigate("PembayaranJastip");
        break;
      case "Proses":
        navigation.navigate("ProsesJastip");
        break;
      case "Pengantaran":
        navigation.navigate("PengantaranJastip");
        break;
      case "Tolak":
        // Remove the card when "Tolak" is pressed
        const updatedData = data.filter((dataItem) => dataItem.id !== item.id);
        setData(updatedData);

        changeStatus(item.id)

        break;
      default:
        // Toggle the showButtons property when "Terima" or other actions are pressed
        setData((prevData) =>
          prevData.map((prevItem) =>
            prevItem.id === item.id ? { ...prevItem, showButtons: !prevItem.showButtons } : prevItem
          )
        );
        break;
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
          <Img

            source={baseURL + "/gambar/" + profile?.users?.image?.image}
            placeholder={require('../../assets/profilpeople.jpg')}
            style={{
              width: 100,
              height: 100,
              left: 20,
              top: 60,
              borderRadius: 50,
            }}
          ></Img>
          <View style={{
            flexDirection: 'column',
            top: 20,
            left: 30,
          }}>
            <Text className="text-white text-start font-semibold ml-4 text-lg" style={{ top: 50, bottom: 40 }}>{profile?.nama}</Text>
            <Text className="text-white text-start font-light ml-4 text-lg" style={{ top: 50, bottom: 40 }}>{profile?.nomor_telepon}</Text>
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
            justifyContent: "space-around",
            columnGap: 20
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
                  arr.map((el, ind) => (
                    <TouchableOpacity
                      key={el.name + "ind-" + ind}
                      style={{
                        alignItems: "center",
                        marginHorizontal: 4,
                        top: -7,
                      }}
                      onPress={() => handleItemPress(el, el.name)}
                    >
                      <Image source={el.image} />
                      <Text className="text-blue-800 text-sm">{el.name}</Text>
                    </TouchableOpacity>
                  ))
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
                width: "30%"
              }}>
                <Img source={baseURL + "/gambar/" + item?.users?.image?.image}
                  placeholder={require('../../assets/profilpeople.jpg')}
                  style={{ width: 80, height: 80, borderRadius: 50, left: 5 }} 
                />
                <View className="items-center">
                  <Text className="text-sm font-bold">{item?.users?.user_details?.nama}</Text>
                  <Text className=" text-blue-500 text-xs font-light">{item?.users?.user_details?.nomor_telepon}</Text>
                </View>
              </View>

              <View style={{ marginHorizontal: "9%", width: "61%" }}>
                <View>
                  <Text ellipsizeMode='tail' className="text-sm font-bold pb-3 " style={{
                  }} >{item?.jastiper_post?.judul}</Text>
                  <Text className="text-xs font-semibold pb-3">{item?.jastiper_post?.deskripsi}</Text>
                  <Text className="text-xs font-semibold">{item?.jastiper_post?.lokasi}</Text>
                  <Text className="text-sm font-normal">{item?.jastiper_post?.waktu_mulai}</Text>
                  <Text className="text-sm font-normal">{item?.jastiper_post?.waktu_akhir}</Text>
                </View>

                {item.showButtons ? (
                  <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 }}>
                    <TouchableOpacity
                      onPress={() => handleItemPress(item, "Tolak")} // Pass "Tolak" as the name
                      style={{ alignSelf: "flex-end", marginRight: "5%" }}>
                      <Text className="text-xl font-bold text-center text-white bg-blue-800 rounded-full" 
                      style={{ paddingVertical: 5, paddingHorizontal: 10 }}>Tolak</Text>
                      
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('ChatJastip', { userName: item.userName })}
                      style={{ alignSelf: "flex-end", marginRight: "5%" }}>
                      <Text className="text-xl font-bold text-center text-white bg-blue-800 rounded-full" 
                      style={{ paddingVertical: 5, paddingHorizontal: 10 }}>Chat</Text>

                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('FormTitipan', { userName: item.userName })}
                      style={{ alignSelf: "flex-end", marginRight: "5%" }}>
                      <Text className="text-xl font-bold text-center text-white bg-blue-800 rounded-full" 
                      style={{ paddingVertical: 5, paddingHorizontal: 10 }}>Buat Form</Text>

                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 }}>
                    <TouchableOpacity
                      onPress={() => handleItemPress(item, "Tolak")} // Pass "Tolak" as the name
                      style={{ alignSelf: "flex-end", marginRight: "5%" }}>
                      <Text className="text-xl font-bold text-center text-white bg-blue-800 rounded-full" 
                      style={{ paddingVertical: 5, paddingHorizontal: 10 }}>Tolak</Text>

                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleItemPress(item, "Terima")} // Pass "Terima" as the name
                      style={{ alignSelf: "flex-end", marginRight: "5%" }}>
                      <Text className="text-xl font-bold text-center text-white bg-blue-800 rounded-full " 
                      style={{ paddingVertical: 5, paddingHorizontal: 10 }}>Terima</Text>

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
