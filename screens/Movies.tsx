import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import Swiper from 'react-native-swiper'
import styled from 'styled-components/native';
import {Dimensions, ActivityIndicator} from 'react-native';
import Slide from "../components/Slide"

const API_KEY = '8001745014d67322d3711a9e484dbd40'

const Container = styled.ScrollView``


const Loader = styled.View`
	flex: 1;
	justify-content: center;
`

const {height: SCREEN_HEIGHT} = Dimensions.get("window")

const Movies: React.FC<NativeStackScreenProps<any, "Movies">>= () => {
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
	return loading ? 
	<Loader>
		<ActivityIndicator  />
	</Loader>
	 :(
		<Container>
			<Swiper horizontal loop autoplay autoplayTimeout={3.5} showsButtons={false} showsPagination={false} containerStyle={{width: '100%', height: SCREEN_HEIGHT / 4}}>
				{nowPlaying.map(movie => <Slide 
					key={movie.id} 
					backdrop_path={movie.backdrop_path }
					poster_path={movie.poster_path } 
					original_title={movie.original_title } 
					vote_average={movie.vote_average } 
					overview={movie.overview}
				/>)}
			</Swiper>
			
		</Container>
	)
}

export default Movies;