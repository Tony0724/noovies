import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Movies from '../screens/Movies';
import Tv from '../screens/Tv';
import Search from '../screens/Search';
import {View, Text} from 'react-native';
import {useColorScheme} from 'react-native';
import { YELLO_COLOR, BLACK_COLOR, DARK_GREY, LIGHT_GREY} from '../colors';

const Tab = createBottomTabNavigator();

const Tabs = () => {
	const isDark = useColorScheme() === 'dark';
	return (
		<Tab.Navigator screenOptions={{
			headerTitleAlign: 'center', tabBarStyle: {
				backgroundColor: isDark ? BLACK_COLOR : "white"
			},
			tabBarActiveTintColor: isDark ? YELLO_COLOR : BLACK_COLOR,
			tabBarInactiveTintColor: isDark ? DARK_GREY : LIGHT_GREY,
			headerStyle: {
				backgroundColor: isDark ? BLACK_COLOR : "white",
			},
			headerTitleStyle: {
				color:  isDark ? 'white' : BLACK_COLOR
			}
		}}>
			<Tab.Screen name="Movies" component={Movies}></Tab.Screen>
			<Tab.Screen name="Tv" component={Tv}></Tab.Screen>
			<Tab.Screen name="Search" component={Search}></Tab.Screen>
		</Tab.Navigator>
	)
}

export default Tabs;