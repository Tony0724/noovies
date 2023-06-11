import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Movies from '../screens/Movies';
import Tv from '../screens/Tv';
import Search from '../screens/Search';
import {View, Text} from 'react-native';
import {useColorScheme} from 'react-native';
import { YELLO_COLOR, BLACK_COLOR, DARK_GREY, LIGHT_GREY} from '../colors';
import {Ionicons} from '@expo/vector-icons'

const Tab = createBottomTabNavigator();

const Tabs = () => {
	const isDark = useColorScheme() === 'dark';
	return (
		<Tab.Navigator 
		sceneContainerStyle={{
			backgroundColor: isDark ? BLACK_COLOR : "white"
		}}
		screenOptions={{
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
			},
			tabBarLabelStyle: {
				marginTop: -5,
				fontSize: 12,
				fontWeight: "600"
			}
		}}>
			<Tab.Screen name="Movies" component={Movies} options={{
				tabBarIcon: ({focused, color, size}) => {
					return <Ionicons name={focused ? "film" : 'film-outline'} color={color} size={size}/>
				}
			}}></Tab.Screen>
			<Tab.Screen name="TV" component={Tv} options={{
				tabBarIcon: ({focused, color, size}) => {
					return <Ionicons name={focused ? "tv" : 'tv-outline'} color={color} size={size}/>
				}
			}}></Tab.Screen>
			<Tab.Screen name="Search" component={Search} options={{
				tabBarIcon: ({focused, color, size}) => {
					return <Ionicons name={focused ? "search" : "search-outline" } color={color} size={size}/>
				}
			}}></Tab.Screen>
		</Tab.Navigator>
	)
}

export default Tabs;