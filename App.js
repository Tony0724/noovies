import AppLoading from 'expo-app-loading'
import React, {useState} from 'react'
import * as Font from 'expo-font'
import {Ionicons} from '@expo/vector-icons'
import {Text} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import Root from './navigation/Root';


export default function App() {
	const [loaded] = Font.useFonts(Ionicons.font)
	if(!loaded) {
		return <AppLoading />
	}
	return (
		<NavigationContainer>
			<Root />
		</NavigationContainer>
	);
}