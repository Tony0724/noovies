import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Detail from '../screens/Detail';
import { BLACK_COLOR } from '../colors';
import { useColorScheme } from 'react-native';

const NativeStack = createNativeStackNavigator();

const Stack = () => {
  const isDark = useColorScheme() === 'dark';
  return (
    <NativeStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: isDark ? BLACK_COLOR : "white"
      },
      headerTintColor: isDark ? 'white' : "black",
      }}>
      <NativeStack.Screen name="Detail" component={Detail}></NativeStack.Screen>
    </NativeStack.Navigator>
  )
}

export default Stack;