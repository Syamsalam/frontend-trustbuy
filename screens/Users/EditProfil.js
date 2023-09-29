import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ImageBackground, TextInput, Platform, Image } from 'react-native';
import { BottomSheet } from 'react-native-btr';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { detailProfile, getPhoto, updateUser} from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Edit = () => {
  const navigator = useNavigation()
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState();

  useFocusEffect(useCallback(() => {

    async function fetchData() {
      try {
        const user = JSON.parse(await AsyncStorage.getItem('user'))
        const request = await detailProfile(user)
      //  console.log(request?.data?.data?.image) 
        if(request.status == 200) {
          setData(request.data.data)
          setImage(request?.data?.data?.image)
        }

      } catch (err) {
        if(err.request) {
          console.error(err.request)
        }
      }
    }

    async function requestCam() {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    }

    fetchData()
    requestCam()
  }, []))


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    })
    if (result.canceled) {
      alert("silahkan pilih gambar terlebih dahulu")
      return;
    }
    return  setData({
      ...data, 
      image: {
        ...data.image,
        image: result.assets[0].uri 
      }
    });
  }


  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    })

    if (result.canceled) {
      alert("silahkan ambil gambar terlebih dahulu")
      return
    }
  
      return   setData({
        ...data, 
        image: {
          ...data.image,
          image: result.assets[0].uri 
        }
      });

  }


  const onSave = async () => {
    try{
      const result = await updateUser(data)
      if(result.status == 200) {
        alert("berhasil update")
        navigator.navigate("Home")
      }
    } catch (err) {
      if(err.response) {
        console.error(err.response.data)
      } else {
        console.log(err)
      }
    }
  }


  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };


  return (
    <SafeAreaView>
      <View style={{ flex: 1 }}>
        <View style={{ margin: 20, top: 50 }}>
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity onPress={toggleBottomNavigationView}>
              <View className="py-3 bg-white rounded-xl border border-blue-800 " style={{
                height: 100, width: 100, borderRadius: 15, justifyContent: 'center', alignItems: 'center',
                borderColor: 'gray'
              }}>
                {data?.image?.image && <Image source={{ uri: data?.image?.image  }} style={{ width: 100, height: 100, borderRadius: 15 }} />}
                {!data?.image?.image && (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Icon name="camera" size={30} color="#d3d3d3" style={{ opacity: 0.7 }}>
                    </Icon>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{ marginHorizontal: 20, top: 200 }}>
        <View style={{ marginTop: 32 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Nama</Text>
          <TextInput style={{ marginTop: 16, borderBottomColor: '#dddddd', borderBottomWidth: 1, paddingBottom: 8 }} 
          value={data?.user_details?.nama || ''}
          onChangeText={(text) => setData({...data,user_details: {...data.user_details,nama:text}})}
          
          />
        </View>
        <View style={{ marginTop: 32 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>No. HP</Text>
          <TextInput style={{ marginTop: 16, borderBottomColor: '#dddddd', borderBottomWidth: 1, paddingBottom: 8 }}
           value={data?.user_details?.nomor_telepon || ''}
           keyboardType='numeric'
           onChangeText={(text) => setData({...data,user_details: {...data.user_details,nomor_telepon:text}})}
           />
        </View>
        <View style={{ marginTop: 32 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Alamat</Text>
          <TextInput style={{ marginTop: 16, borderBottomColor: '#dddddd', borderBottomWidth: 1, paddingBottom: 8 }} 
          value={data?.user_details?.alamat || ''}
          onChangeText={(text) => setData({...data,user_details: {...data.user_details,alamat:text}})}
          />
        </View>
        <TouchableOpacity style={{
          marginTop: 25,
          backgroundColor: '#1138B7',
          height: 50,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center'
          }}
          
          onPress={onSave}
        >
          <Text style={{
            color: 'white',
            fontSize: 18,
            fontWeight: 'bold',
          }}>Save</Text>
        </TouchableOpacity>
      </View>

      <BottomSheet
        visible={visible}
        //setting the visibility state of the bottom shee
        onBackButtonPress={toggleBottomNavigationView}
        //Toggling the visibility state on the click of the back botton
        onBackdropPress={toggleBottomNavigationView}
      //Toggling the visibility state on the clicking out side of the sheet
      >
        {/*Bottom Sheet inner View*/}
        <View style={{
          backgroundColor: '#fff',
          width: '100%',
          height: 250,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                textAlign: 'center',
                padding: 20,
                fontSize: 20,
              }}>
              Upload Photo
            </Text>
            <View style={{ flex: 1, flexDirection: 'col' }}>
              <TouchableOpacity onPress={() => {
                //Action to perform on press of Social Icon
                takePhoto();
                toggleBottomNavigationView();

              }} style={{
                marginTop: 20,
                backgroundColor: '#1138B7',
                height: 50,
                width: 300,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Text style={{
                  color: 'white',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>Take a Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                //Action to perform on press of Social Icon
                pickImage();
                toggleBottomNavigationView();

              }} style={{
                marginTop: 20,
                backgroundColor: '#1138B7',
                height: 50,
                width: 300,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Text style={{
                  color: 'white',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>Choose from Library</Text>
              </TouchableOpacity>


            </View>
          </View>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default Edit;


