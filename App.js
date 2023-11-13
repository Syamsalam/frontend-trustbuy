import AppNavigation from "./navigation/appNavigation";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import UserContext from "./tools/userContext";
import { auth } from "./api";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "./theme";

export default function App() {

const [loading, setLoading] = useState(false)
const [user, setUser] = useState(null)
useEffect(() => {
  const auths = async () => {
    setLoading(true)
    try{
      const user = await auth()
      
      if(user.status == 200) {
        await AsyncStorage.setItem("user",JSON.stringify(user.data.data.user))
        setUser(user.data.data.user)
      } else {
        await AsyncStorage.removeItem("user")
      }

    } catch(err) {
      setUser(null)
      if(err.response) {
        // console.error(err.response.status)
      }
      // console.error(err)
    } finally {
      setLoading(false)
    }
  }

  auths()
}, [])

if(loading) return (<SafeAreaView style={{
  flex  :1,
  justifyContent :"center",
  alignItems: "center",
  backgroundColor : themeColors.bg
}}>
  <ActivityIndicator size={50} color={"white"} />
</SafeAreaView>)

  return (
    <UserContext.Provider value={{user,setUser}}>
     <AppNavigation />
    </UserContext.Provider>
);
} 