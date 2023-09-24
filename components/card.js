import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function Card(props) {
    return (
        <View className ="rounded-xl bg-blue-100  mx-5 my-2 w-500 h-44 " style ={{elevation :10}}>
            <View className ="p-4 top-5">
                { props.children }
            </View>
        </View>
    )
}



