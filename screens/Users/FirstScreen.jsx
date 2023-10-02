import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../../theme/index";
import { useNavigation } from "@react-navigation/native";

export default function FirstScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: themeColors.bg,
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <View className="form space-y-4 flex ">
          <Text className="text-white text-center font-bold ml-4 text-6xl">
            TrustBuy
          </Text>
          <Text className="text-white text-center font-normal ml-4 text-xl px-4 ">
            Beli dengan percaya dan biarkan kami yang mengurus sisanya
          </Text>
        </View>

        <View className="form space-y-4 px-10 " style={{}}>
          <Text className="text-white text-center font-bold ml-4 text-xl px-4 ">
            Masuk Sebagai ?
          </Text>
          <View className="form space-y-4 pb-20">
            <TouchableOpacity
              onPress={() => navigation.navigate("Welcome")}
              className="py-3 bg-blue-100 rounded-xl"
            >
              <Text className="text-xl font-bold text-center text-blue-800">
                User
              </Text>
            </TouchableOpacity>
            <Text className="text-white text-center font-bold ml-4 text-xl px-4 ">
              Or
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("WelcomeJastip")}
              className="py-3 bg-blue-100 rounded-xl"
            >
              <Text className="text-xl font-bold text-center text-blue-800">
                Jastiper
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
