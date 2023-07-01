import React, { useState } from 'react';
import styled from 'styled-components/native';
import { useColorScheme } from 'react-native';
import { moviesApi, tvApi } from '../api';
import { useQuery } from 'react-query';

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
	return (
		<Container>
			<SearchBar
				placeholder='Search for Movie or Tv Show' 
				placeholderTextColor={isDark ? "grey" : "#FFFFFFcc"} 
				returnKeyType='search'
				autoCapitalize='none'
				onSubmitEditing={onSubmit}
				onChangeText={(text:string) => {
					Text = text;
				}}	
			/>
		</Container>
	)
}

export default Search;