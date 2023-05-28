import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Movies from '../screens/Movies';
import Tv from '../screens/Tv';
import Search from '../screens/Search';
import {View, Text} from 'react-native'

const Tab = createBottomTabNavigator();

const Tabs = () => (
	<Tab.Navigator initialRouteName='Movies' screenOptions={{headerTitleAlign: 'center', tabBarActiveTintColor: 'red', tabBarInactiveTintColor: 'purple'}}>
		<Tab.Screen name="Movies" component={Movies} options={{headerRight: () => <View><Text>Hello</Text></View>}}></Tab.Screen>
		<Tab.Screen name="Tv" component={Tv} options={{tabBarBadge: 5}}></Tab.Screen>
		<Tab.Screen name="Search" component={Search} options={{headerTitleStyle: {color: 'blue'}}}></Tab.Screen>
	</Tab.Navigator>
)

export default Tabs;