import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import { themeColors } from "../../theme/index";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const Dimension = Dimensions.get("window");

export default function Pengajuan() {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: themeColors.bg,
        justifyContent: "space-between",
      }}
    >
      <View>
        <Text className="text-white text-start font-bold ml-4 text-4xl">
          TrustBuy
        </Text>
        <View className="flex-row justify-center">
          <Image
            source={require("../../assets/pengajuan.png")}
            style={{
              width: "70%",
              height: Dimension.height * 0.3,
              objectFit: "contain",
              marginTop: 40,
            }}
          />
        </View>
      </View>
      <Text
        className="text-white font-bold mb-10"
        style={{
          marginTop: 30,
          fontSize: Dimension.fontScale * 30,
          textAlign: "center",
        }}
      >
        Anda Telah Mengajukan Menjadi Jastiper
      </Text>
      <View
        style={{
          borderTopRightRadius: 100,
          backgroundColor: "white",
          shadowOffset: { width: 0, height: 1 },
          position: "relative",
          shadowColor: "black",
          shadowOpacity: 1,
          elevation: 10,
        }}
        className=" px-10 pt-10 pb-20"
      >
        <View className="form space-y-10">
          <Text className="text-black text-center font-semibold ml-4">
            Setelah melakukan pengajuan di apliksi
            admin akan mengecek terlebih dahulu pengajuan 
            akun Jastiper anda. Jika pengejuan akun Jastiper anda diterima kami akan memgirimkan email verifikasi akun Jastiper ke email anda
          </Text>
          <View className="form space-y-2" style={{
            marginBottom : "20%"
          }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("WelcomeJastip")}
              className="py-3 bg-blue-800 rounded-xl"
            >
              <Text className="text-xl font-bold text-center text-white">
                Kembali
              </Text>
            </TouchableOpacity>
            
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
