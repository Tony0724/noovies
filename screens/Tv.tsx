import React, {useState} from 'react';
import {View, Text} from 'react-native';
import { useQuery, useQueryClient } from 'react-query';
import { tvApi } from '../api';
import Loader from '../components/Loader';
import {ScrollView} from 'react-native';
import VMedia from '../components/VMedia';
import HList from '../components/HList';
import { RefreshControl } from 'react-native-gesture-handler';

const Tv = () => {
	const queryClient = useQueryClient();
	const [refreshing, setRefreshing] = useState(false);
	const {isLoading:todayLoading, data:todayData } = useQuery(["tv", "today"], tvApi.airingToday)
	const {isLoading:topLoading, data:topData } = useQuery(["tv", "top"], tvApi.topRated)
	const {isLoading:trendingLoading, data:trendingData } = useQuery(["tv", "trending"], tvApi.trending)
	const loading = todayLoading || topLoading || trendingLoading;
	const onRefresh = async() => {
		setRefreshing(true);
		await queryClient.refetchQueries(["tv"]);
		setRefreshing(false);
	}
	if(loading) {
		return <Loader />
	}
	return (
		<ScrollView
			refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
			contentContainerStyle={{paddingVertical: 30}}
		>
			<HList title="Trending TV" data={trendingData.results} />
			<HList title="Airing Today" data={todayData.results} />
			<HList title="Top Rated TV" data={topData.results} />
		</ScrollView>
	)
}

export default Tv;