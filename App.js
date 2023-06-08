import AppLoading from 'expo-app-loading'
import React, {useState} from 'react'
import * as Font from 'expo-font'
import {Ionicons} from '@expo/vector-icons'
import {useColorScheme} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import Root from './navigation/Root';
import { darkTheme, lightTheme } from './styled';
import { ThemeProvider } from 'styled-components/native'


export default function App() {
	const [loaded] = Font.useFonts(Ionicons.font);
	const isDark = useColorScheme() === 'dark';

	if(!loaded) {
		return <AppLoading />
	}
	return (
		<ThemeProvider theme={isDark ? darkTheme : lightTheme}>
			<NavigationContainer>
				<Root />
			</NavigationContainer>
		</ThemeProvider>
	);
}