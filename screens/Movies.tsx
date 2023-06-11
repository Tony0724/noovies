import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import Swiper from 'react-native-swiper'
import styled from 'styled-components/native';
import {Dimensions, ActivityIndicator, StyleSheet} from 'react-native';
import { makeImgPath } from '../utils';
import {BlurView} from "@react-native-community/blur"

const API_KEY = '8001745014d67322d3711a9e484dbd40'

const Container = styled.ScrollView``

const View = styled.View`
	flex: 1;
`

const Loader = styled.View`
	flex: 1;
	justify-content: center;
`

const BgImg = styled.Image``

const Title = styled.Text`
	
`

const {height: SCREEN_HEIGHT} = Dimensions.get("window")

const Movies: React.FC<NativeStackScreenProps<any, "Movies">>= () => {
	const [loading, setLoading] = useState(true)
	const [nowPlaying, setNowPlaying] = useState([])
	const getNowPlaying = async() => {
			const {results} = await (
				await fetch(
					`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
				)	
				).json();
			setNowPlaying(results);
			setLoading(false);
		}
	useEffect(() => {
		getNowPlaying()
	}, [])
	return loading ? 
	<Loader>
		<ActivityIndicator  />
	</Loader>
	 :(
		<Container>
			<Swiper loop timeout={3.5} controlsEnabled={false} containerStyle={{width: '100%', height: SCREEN_HEIGHT / 4}}>
				{nowPlaying.map(movie => <View key={movie.id}>
					<BgImg style={StyleSheet.absoluteFill} source={{uri: makeImgPath(movie.backdrop_path)}} />
					<BlurView intensity={80} style={StyleSheet.absoluteFill}>
						<Title>{movie.original_title}</Title>
					</BlurView>
				</View>)}
			</Swiper>
		</Container>
	)
}

export default Movies;