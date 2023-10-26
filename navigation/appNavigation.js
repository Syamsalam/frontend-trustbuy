import { Image } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import{ createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FirstScreen from '../screens/Users/FirstScreen';
import HomeScreen from '../screens/Users/HomeScreen';
import WelcomeScreen from '../screens/Users/WelcomeScreen';
import LoginScreen from '../screens/Users/Login_Screen';
import SignUpScreen from '../screens/Users/Signup_Screen';
import TitipanScreen from '../screens/Users/Titipan_Screen';
import Profil from '../screens/Users/Profil';
import Edit from '../screens/Users/EditProfil';
import EditProfilJastip from '../screens/Jastip/EditProfilJastip';
import Riwayat from '../screens/Users/Riwayat';
import CekTitipan from '../screens/Users/CekTitipan';
import Pembayaran from '../screens/Users/Pembayaran';
import Proses from '../screens/Users/Proses';
import Pengantaran from '../screens/Users/Pengantaran';
import MessageScreen from '../screens/Users/MessageScreen';
import Chat from '../screens/Users/Chat';
import HomeJastip from '../screens/Jastip/HomeJastip';
import MulaiJastip from '../screens/Jastip/MulaiJastip';
import JastipPost from '../screens/Jastip/JastipPost';
import UbahPost from '../screens/Jastip/UbahPost';
import TitipanJastip from '../screens/Jastip/TitipanJastip';
import MessagesJastip from '../screens/Jastip/MessagesJastip';
import ChatJastip from '../screens/Jastip/ChatJastip';
import ProfilJastip from '../screens/Jastip/ProfilJastip';
import FormTitipan from '../screens/Jastip/FormTitipan';
import RiwayatJastip from '../screens/Jastip/RiwayatJastip';
import WelcomeJastip from '../screens/Jastip/WelcomeJastip';
import LoginJastip from '../screens/Jastip/LoginJastip';
import SignupJastip from '../screens/Jastip/SignupJastip';
import PembayaranJastip from '../screens/Jastip/PembayaranJastip';
import ProsesJastip from '../screens/Jastip/ProsesJastip';
import PengantaranJastip from '../screens/Jastip/PengantaranJastip';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FirstScreen" screenOptions={{}}>
        <Stack.Screen name="FirstScreen" options={{ headerShown: false }} component={FirstScreen} />
        <Stack.Screen name="Home" options={{ headerShown: false }} component={BottomTabNavigator} />
        <Stack.Screen name="Welcome" options={{ headerShown: false }} component={WelcomeScreen} />
        <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
        <Stack.Screen name="SignUp" options={{ headerShown: false }} component={SignUpScreen} />
        <Stack.Screen name="TitipanScreen" options={{ headerShown: false }} component={TitipanScreen} />
        <Stack.Screen name="Profil" options={{ headerShown: false }} component={Profil} />
        <Stack.Screen name="Edit" options={{ headerShown: false }} component={Edit} />
        <Stack.Screen name="EditJastip" options={{ headerShown: false }} component={EditProfilJastip} />
        <Stack.Screen name="Riwayat" options={{ headerShown: true }} component={Riwayat} />
        <Stack.Screen name="CekTitipan" options={{ headerShown: true }} component={CekTitipan} />
        <Stack.Screen name="Pembayaran" options={{ headerShown: true }} component={Pembayaran} />
        <Stack.Screen name="Proses" options={{ headerShown: true }} component={Proses} />
        <Stack.Screen name="Pengantaran" options={{ headerShown: true }} component={Pengantaran} />
        <Stack.Screen name="HomeJastip" options={{ headerShown: false }} component={BottomTabNavigatorJastip} />
        <Stack.Screen name="MulaiJastip" options={{ headerShown: false }} component={MulaiJastip} />
        <Stack.Screen name="JastipPost" options={{ headerShown: false }} component={JastipPost} />
        <Stack.Screen name="UbahPost" options={{ headerShown: false }} component={UbahPost} />
        <Stack.Screen name="FormTitipan" options={{ headerShown: true }} component={FormTitipan} />
        <Stack.Screen name="RiwayatJastip" options={{ headerShown: true }} component={RiwayatJastip} />
        <Stack.Screen name="WelcomeJastip" options={{ headerShown: false }} component={WelcomeJastip} />
        <Stack.Screen name="LoginJastip" options={{ headerShown: false }} component={LoginJastip} />
        <Stack.Screen name="SignupJastip" options={{ headerShown: false }} component={SignupJastip} />
        <Stack.Screen name="TitipanJastip" options={{ headerShown: false }} component={TitipanJastip} />
        <Stack.Screen name="PembayaranJastip" options={{ headerShown: true }} component={PembayaranJastip} />
        <Stack.Screen name="ProsesJastip" options={{ headerShown: true }} component={ProsesJastip} />
        <Stack.Screen name="PengantaranJastip" options={{ headerShown: true }} component={PengantaranJastip} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const MessageStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Pesan"
      component={MessageScreen}
      options={{
        headerTitleAlign: 'center',
      }}
    />
    <Stack.Screen
      name="Chat"
      component={Chat}
      options={({ route }) => ({
        title: route.params.userName,
      })}
    />
  </Stack.Navigator>
);

const MessageStackJastip = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Pesan"
      component={MessagesJastip}
      options={{
        headerTitleAlign: 'center',
      }}
    />
    <Stack.Screen
      name="ChatJastip"
      component={ChatJastip}
      options={({ route }) => ({
        title: route.params.userName,
      })}
    />
  </Stack.Navigator>
);


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        style: {
          height: 80,
          backgroundColor: '#1138B7',
          paddingVertical: 10,
          elevation: 2,
        },
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
        tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../assets/home1.png')}
              style={{
                width: 20,
                height: 20,
                tintColor: color,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="TitipanScreen"
        component={TitipanScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Titipan',
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../assets/titipan.png')}
              style={{
                width: 20,
                height: 20,
                tintColor: color,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessageStack}
        options={{
        tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../assets/chat.png')}
              style={{
                width: 20,
                height: 20,
                tintColor: color,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profil"
        component={Profil}
        options={{
          headerShown: false,
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../assets/profil.png')}
              style={{
                width: 20,
                height: 20,
                tintColor: color,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};


const BottomTabNavigatorJastip = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        style: {
          height: 80,
          backgroundColor: '#1138B7',
          paddingVertical: 10,
          elevation: 2,
        },
      }}
    >
      <Tab.Screen
        name="Home_Jastip"
        component={HomeJastip}
        options={{
        tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../assets/home1.png')}
              style={{
                width: 20,
                height: 20,
                tintColor: color,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="TitipanJastip"
        component={TitipanJastip}
        options={{
          headerShown: false,
          tabBarLabel: 'Titipan',
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../assets/titipan.png')}
              style={{
                width: 20,
                height: 20,
                tintColor: color,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessageStackJastip}
        options={{
        tabBarHideOnKeyboard: true,
          headerShown: false,
          headerTitleAlign: 'center',
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../assets/chat.png')}
              style={{
                width: 20,
                height: 20,
                tintColor: color,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfilJastip"
        component={ProfilJastip}
        options={{
          headerShown: false,
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../assets/profil.png')}
              style={{
                width: 20,
                height: 20,
                tintColor: color,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};