import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { View, Text, TouchableOpacity } from 'react-native';
import { YELLO_COLOR } from '../colors';

const ScreenOne = ({navigation: {navigate}}) => <TouchableOpacity onPress={() => navigate("Two")}><Text>go to Two</Text></TouchableOpacity>
const ScreenTwo = ({navigation: {navigate}}) => <TouchableOpacity onPress={() => navigate("Three")}><Text>go to Three</Text></TouchableOpacity>
const ScreenThree = ({ navigation: { navigate } }) => (
    <TouchableOpacity onPress={() => navigate("Tabs", { screen: "Search" })}>
      <Text>Go to search</Text>
    </TouchableOpacity>
)
const NativeStack = createNativeStackNavigator();

const Stack = () => <NativeStack.Navigator screenOptions={{headerTintColor: YELLO_COLOR, animation: 'fade_from_bottom'}}>
    <NativeStack.Screen name="One" component={ScreenOne}></NativeStack.Screen>
    <NativeStack.Screen name="Two" component={ScreenTwo}></NativeStack.Screen>
    <NativeStack.Screen name="Three" component={ScreenThree}></NativeStack.Screen>
</NativeStack.Navigator>

export default Stack;