import React, { useState } from 'react';
import styled from 'styled-components/native';
import { useColorScheme } from 'react-native';

const Container = styled.ScrollView``;

const Search = () => {
	const isDark = useColorScheme() === 'dark';
	const SearchBar = styled.TextInput`
		background-color: ${isDark ? "white" : "black"};
		padding: 10px 15px;
		border-radius: 15px;
		width: 90%;
		margin: 10px auto;
	`;
	const [query, setQuery] = useState("");
	const onChangeText = (text:string) => setQuery(text);
	return (
		<Container>
			<SearchBar
				placeholder='Search for Movie or Tv Show' 
				placeholderTextColor={isDark ? "grey" : "#FFFFFFcc"} 
				returnKeyType='search'
				onChangeText={onChangeText}	
			/>
		</Container>
	)
}

export default Search;