import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import Swiper from 'react-native-swiper'
import styled from 'styled-components/native';
import {Dimensions, ActivityIndicator, RefreshControl, FlatList, View} from 'react-native';
import Slide from "../components/Slide"
import VMedia from '../components/VMedia';
import HMedia from '../components/HMedia';

const API_KEY = '8001745014d67322d3711a9e484dbd40'

const Container = styled.ScrollView``


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

const Movies: React.FC<NativeStackScreenProps<any, "Movies">>= () => {
	const [refreshing, setRefreshing] = useState(false)
	const [loading, setLoading] = useState(true)
	const [nowPlaying, setNowPlaying] = useState([])
	const [upcoming, setUpcoming] = useState([])
	const [trending, setTrending] = useState([]);
	const getTrending = async() => {
		const {results} = await (
			await fetch(
				`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
			)	
			).json();
		setTrending(results)
	}
	const getUpcoming = async() => {
		const {results} = await (
			await fetch(
				`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`
			)	
			).json();
		setUpcoming(results)
	} 
	const getNowPlaying = async() => {
			const {results} = await (
				await fetch(
					`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
				)	
				).json();
			setNowPlaying(results);
		}
	const getData = async() => {
		await Promise.all([getTrending(), getUpcoming(), getNowPlaying()])
		setLoading(false);
	}
	useEffect(() => {
		getData()
	}, [])
	const onRefresh = async() => {
		setRefreshing(true);
		await getData();
		setRefreshing(false);
	}
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
					{nowPlaying.map(movie => <Slide 
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
						data={trending}
						contentContainerStyle={{paddingHorizontal: 20}}
						horizontal 
						showsHorizontalScrollIndicator={false}
						ItemSeparatorComponent={() => <View style={{width: 30}} />}
						keyExtractor={(item) => item.id + ""}
						renderItem={({item}) => <VMedia
							posterPath={item.poster_path}
							originalTitle={item.original_title}
							voteAverage={item.vote_average}
					/>}
					/>
					</ListContainer>
					<ComingSoonTitle>Coming soon</ComingSoonTitle>
				</>}
				data={upcoming}
				keyExtractor={(item) => item.id + ""}
				ItemSeparatorComponent={() => <View style={{height: 20}} />}
				renderItem={({item}) => <HMedia
					posterPath={item.poster_path}
					originalTitle={item.original_title}
					overview={item.overview}
					releaseDate={item.release_date}/> 
				}
			/>
	 	)
}

export default Movies;