import React, { useState } from 'react';
import styled from 'styled-components/native';
import { useColorScheme } from 'react-native';
import { moviesApi, tvApi } from '../api';
import { useQuery } from 'react-query';
import Loader from '../components/Loader';
import HList from '../components/HList';

const Container = styled.ScrollView``;

const Search = () => {
	const isDark = useColorScheme() === 'dark';
	const [query, setQuery] = useState("");
	const {isLoading: moviesLoading, data: moviesData, refetch: searchMovies} = useQuery(["searchMovies", query], moviesApi.search);
	const {isLoading: tvLoading, data: tvData, refetch: searchTv} = useQuery(["searchTv", query], tvApi.search)
	const SearchBar = styled.TextInput`
		background-color: ${isDark ? "white" : "black"};
		padding: 10px 15px;
		border-radius: 15px;
		width: 90%;
		margin: 10px auto;
		margin-bottom: 40px;
	`;
	let Text = "";	
	const onSubmit = () => {
		setQuery(Text);
		if(query === "") {
			return;
		}
		searchMovies();
		searchTv();
	}
	// console.log(moviesData?.results.length)
	return (
		<Container>
			<SearchBar
				placeholder='Search for Movie or Tv Show' 
				color={isDark ? "black" : "white"}
				placeholderTextColor={isDark ? "grey" : "#FFFFFFcc"} 
				returnKeyType='search'
				autoCapitalize='none'
				onSubmitEditing={onSubmit}
				onChangeText={(text:string) => {
					Text = text;
				}}	
			/>
			{moviesLoading || tvLoading ? <Loader /> : null}
			{moviesData?.results.length === 0 ? null : <HList title='Movies Results' data={moviesData?.results} />}
			{tvData?.results.length === 0 ? null : <HList title='TV Results' data={tvData?.results} />}
		</Container>
	)
}

export default Search;