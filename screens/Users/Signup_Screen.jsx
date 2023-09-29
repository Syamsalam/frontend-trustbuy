import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React from "react";
import { themeColors } from "../../theme/index";
import { useNavigation } from "@react-navigation/native";
import { registerApi } from "../../api";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState({
    email: "",
    password: "",
    username: "",
    alamat: "",
    nama: "",
    nomor_telepon: "",
  });

  const onSubmit = async () => {
    try {
      const result = await registerApi(data);
      if (result.status == 200) {
        // console.log(result.message)
        navigation.navigate("FirstScreen");
      } else {
        console.log(result.data);
      }
    } catch (err) {
      if (err.response) {
        // console.error(err.response.data)
        console.error(err.response.status);
      } else {
        console.log(err.message);
      }
    }
  };

  return (
    <View
      className="flex-1 bg-white "
      style={{ backgroundColor: themeColors.bg }}
    >
      <SafeAreaView className="flex justify-around my-10 ">
        <Text className="text-white text-center justify-center font-bold ml-4 text-7xl">
          TrustBuy
        </Text>
      </SafeAreaView>
      <View
        style={{ borderTopRightRadius: 80,paddingTop : 20 }}
        className="flex-1 bg-white"
      >
        <ScrollView className="space-y-2" contentContainerStyle={{
          paddingVertical : 20
        }}>
          <View style={{
            marginHorizontal : "10%"
          }}>
            <Text className="ml-4 text-gray-700">Email Address</Text>
            <TextInput
              onChange={(value) =>
                setData({ ...data, email: value.nativeEvent.text })
              }
              className="p-4 mb-3 text-gray-700 bg-gray-100 rounded-2xl"
              placeholder="Enter email"
            />
            <Text className="ml-4 text-gray-700">Username</Text>
            <TextInput
              onChange={(value) =>
                setData({ ...data, username: value.nativeEvent.text })
              }
              className="p-4 mb-3 text-gray-700 bg-gray-100 rounded-2xl"
              placeholder="Enter Username"
            />
            <Text className="ml-4 text-gray-700">Alamat</Text>
            <TextInput
              onChange={(value) =>
                setData({ ...data, alamat: value.nativeEvent.text })
              }
              className="p-4 mb-3 text-gray-700 bg-gray-100 rounded-2xl"
              placeholder="Enter Name"
            />
            <Text className="ml-4 text-gray-700">Full Name</Text>
            <TextInput
              onChange={(value) =>
                setData({ ...data, nama: value.nativeEvent.text })
              }
              className="p-4 mb-3 text-gray-700 bg-gray-100 rounded-2xl"
              placeholder="Enter Name"
            />
            <Text className="ml-4 text-gray-700">Phone Number</Text>
            <TextInput
              onChange={(value) =>
                setData({ ...data, nomor_telepon: value.nativeEvent.text })
              }
              className="p-4 mb-3 text-gray-700 bg-gray-100 rounded-2xl"
              placeholder="Enter phone number"
              keyboardType="numeric"
            />
            <Text className="ml-4 text-gray-700">Password</Text>
            <TextInput
              onChange={(value) =>
                setData({ ...data, password: value.nativeEvent.text })
              }
              className="p-4 mb-10 text-gray-700 bg-gray-100 rounded-2xl"
              secureTextEntry
              placeholder="Enter password"
            />
            <TouchableOpacity
              onPress={onSubmit}
              className="py-3 bg-blue-800 rounded-xl"
            >
              <Text className="text-xl font-bold text-center text-white">
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
