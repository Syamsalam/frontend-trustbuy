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
import Riwayat from '../screens/Users/Riwayat';
import CekTitipan from '../screens/Users/CekTitipan';
import Pembayaran from '../screens/Users/Pembayaran';
import Proses from '../screens/Users/Proses';
import Pengantaran from '../screens/Users/Pengantaran';
import MessageScreen from '../screens/Users/MessageScreen';
import Chat from '../screens/Users/Chat';
import FormTitipan from '../screens/Jastip/FormTitipan';
import RiwayatJastip from '../screens/Jastip/RiwayatJastip';


const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{}}>
        <Stack.Screen name="FirstScreen" options={{ headerShown: false }} component={FirstScreen} />
        <Stack.Screen name="Home" options={{ headerShown: false }} component={BottomTabNavigator} />
        <Stack.Screen name="Welcome" options={{ headerShown: false }} component={WelcomeScreen} />
        <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
        <Stack.Screen name="SignUp" options={{ headerShown: false }} component={SignUpScreen} />
        <Stack.Screen name="TitipanScreen" options={{ headerShown: false }} component={TitipanScreen} />
        <Stack.Screen name="Profil" options={{ headerShown: false }} component={Profil} />
        <Stack.Screen name="Edit" options={{ headerShown: false }} component={Edit} />
        <Stack.Screen name="Riwayat" options={{ headerShown: true }} component={Riwayat} />
        <Stack.Screen name="CekTitipan" options={{ headerShown: true }} component={CekTitipan} />
        <Stack.Screen name="Pembayaran" options={{ headerShown: true }} component={Pembayaran} />
        <Stack.Screen name="Proses" options={{ headerShown: true }} component={Proses} />
        <Stack.Screen name="Pengantaran" options={{ headerShown: true }} component={Pengantaran} />
        <Stack.Screen name="FormTitipan" options={{ headerShown: true }} component={FormTitipan} />
        <Stack.Screen name="RiwayatJastip" options={{ headerShown: true }} component={RiwayatJastip} />
        <Stack.Screen
      name="Chat"
      component={Chat}
      options={({ route }) => ({
        title: "Akram",
      })}
    />
    
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
        name="HomeJastip"
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
        component={MessagesJastip}
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