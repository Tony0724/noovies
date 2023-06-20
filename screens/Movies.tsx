import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import Swiper from 'react-native-swiper'
import styled from 'styled-components/native';
import {Dimensions, ActivityIndicator, RefreshControl, FlatList, View} from 'react-native';
import Slide from "../components/Slide"
import VMedia from '../components/VMedia';
import HMedia from '../components/HMedia';
import {useQuery} from 'react-query'
import { moviesApi } from '../api';

const Loader = styled.View`
	flex: 1;
	justify-content: center;
`

const {height: SCREEN_HEIGHT} = Dimensions.get("window")

const ListTitle = styled.Text`
	color:white;
	font-size: 18px;
	font-weight: 600;
	margin-left:30px;
`

const TrendingScroll = styled.FlatList`
	margin-top: 20px;
`

const ListContainer = styled.View`
	margin-bottom: 40px;
`

const ComingSoonTitle = styled(ListTitle)`
	margin-bottom: 20px;
`

const VSeperator = styled.View`
	width: 20px;
`

const HSeperator = styled.View`
	height: 20px;
`

const Movies: React.FC<NativeStackScreenProps<any, "Movies">>= () => {
	const [refreshing, setRefreshing] = useState(false);
	const {isLoading: nowPlayingLoading, data: nowPlayingData} = useQuery("nowPlaying", moviesApi.nowPlaying)
	const {isLoading: upcomingLoading, data: upcomingData} = useQuery("upcoming", moviesApi.UpComing)
	const {isLoading: trendingLoading, data: trendingData} = useQuery("trending", moviesApi.Trending)
	const onRefresh = async() => {}
	const renderVMedia = ({item}) => (
		<VMedia
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      voteAverage={item.vote_average}
    />
	)
	const renderHMedia = ({item}) => (
		<HMedia
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      overview={item.overview}
      releaseDate={item.release_date}
    />
	)
	const movieKeyExtractor = (item) => item.id + "";
	const loading = nowPlayingLoading || upcomingLoading || trendingLoading
	return loading ? 
	<Loader>
		<ActivityIndicator  />
	</Loader>
	 : (
			<FlatList
				onRefresh={onRefresh}
				refreshing={refreshing} 
				ListHeaderComponent={
					<>
					<Swiper horizontal loop autoplay autoplayTimeout={3.5} showsButtons={false} showsPagination={false} containerStyle={{width: '100%', height: SCREEN_HEIGHT / 3}} style={{marginBottom: 30}}>
					{nowPlayingData.results.map(movie => <Slide 
						key={movie.id} 
						backdrop_path={movie.backdrop_path }
						poster_path={movie.poster_path } 
						original_title={movie.original_title } 
						vote_average={movie.vote_average } 
						overview={movie.overview}
					/>)}
				</Swiper>
				<ListContainer>
					<ListTitle>Trending Movies</ListTitle>
					<TrendingScroll
						data={trendingData.results}
						contentContainerStyle={{paddingHorizontal: 20}}
						horizontal 
						showsHorizontalScrollIndicator={false}
						ItemSeparatorComponent={VSeperator}
						keyExtractor={movieKeyExtractor}
						renderItem={renderVMedia}
					/>
					</ListContainer>
					<ComingSoonTitle>Coming soon</ComingSoonTitle>
				</>}
				data={upcomingData.results}
				keyExtractor={movieKeyExtractor}
				ItemSeparatorComponent={HSeperator}
				renderItem={renderHMedia}
			/>
	 	)
}

export default Movies;