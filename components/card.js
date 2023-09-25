import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';

const width = Dimensions.get("window").width
export default function Card(props) {
    return (
        <View className ="rounded-xl bg-blue-100  mx-5 my-2 " style ={{elevation :10, width : width - (20 * 2)}}>
            <View className ="pt-4 mt-5 w-full ">
                { props.children }
            </View>
        </View>
    )
}



