import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import Swiper from 'react-native-swiper'
import styled from 'styled-components/native';
import {Dimensions, ActivityIndicator, RefreshControl, FlatList, View} from 'react-native';
import Slide from "../components/Slide"
import VMedia from '../components/VMedia';
import HMedia from '../components/HMedia';
import {useQuery, useQueryClient} from 'react-query'
import { MovieResponse, moviesApi } from '../api';
import Loader from '../components/Loader';

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
	const queryClient = useQueryClient()
	const {isLoading: nowPlayingLoading, data: nowPlayingData, isRefetching: isRefetchingNowPlaying} = useQuery<MovieResponse>(["movies", "nowPlaying"], moviesApi.nowPlaying)
	const {isLoading: upcomingLoading, data: upcomingData, isRefetching: isRefetchingUpcoming} = useQuery<MovieResponse>(["movies", "upcoming"], moviesApi.upcoming)
	const {isLoading: trendingLoading, data: trendingData, isRefetching: isRefetchingTrending} = useQuery<MovieResponse>(["movies", "trending"], moviesApi.trending)
	const onRefresh = async() => {
		queryClient.refetchQueries(["movies"])
	}
	const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
	const refreshing = isRefetchingNowPlaying || isRefetchingUpcoming || isRefetchingTrending
	return loading ? 
		<Loader />
	 : ( upcomingData ? <FlatList
				onRefresh={onRefresh}
				refreshing={refreshing} 
				ListHeaderComponent={
					<>
					<Swiper horizontal loop autoplay autoplayTimeout={3.5} showsButtons={false} showsPagination={false} containerStyle={{width: '100%', height: SCREEN_HEIGHT / 3}} style={{marginBottom: 30}}>
					{nowPlayingData?.results.map(movie => <Slide 
						key={movie.id} 
						backdrop_path={movie.backdrop_path || "" }
						poster_path={movie.poster_path || "" } 
						original_title={movie.original_title } 
						vote_average={movie.vote_average } 
						overview={movie.overview}
					/>)}
				</Swiper>
				<ListContainer>
					<ListTitle>Trending Movies</ListTitle>
					{trendingData ? <TrendingScroll
						data={trendingData.results}
						contentContainerStyle={{paddingHorizontal: 20}}
						horizontal 
						showsHorizontalScrollIndicator={false}
						ItemSeparatorComponent={VSeperator}
						keyExtractor={(item) => item.id + ""}
						renderItem={({item}) => (
							<VMedia
						  posterPath={item.poster_path}
						  originalTitle={item.original_title}
						  voteAverage={item.vote_average}
						/>
						)}
					/>: null}
					</ListContainer>
					<ComingSoonTitle>Coming soon</ComingSoonTitle>
				</>}
				data={upcomingData?.results}
				keyExtractor={(item) => item.id + ""}
				ItemSeparatorComponent={HSeperator}
				renderItem={({item}) => (
					<HMedia
				  posterPath={item.poster_path}
				  originalTitle={item.original_title}
				  overview={item.overview}
				  releaseDate={item.release_date}
				/>
				)}
			/> : null
	 	)
}

export default Movies;