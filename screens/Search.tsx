import React, {useState} from "react";
import styled from "styled-components/native";
import {useQuery} from "react-query";
import {moviesAPI, tvAPI} from "../api";
import Loader from "../components/Loader";
import HList from "../components/HList";
import { useColorScheme } from "react-native";

const Container = styled.ScrollView``;

const Search = () => {
    const [query, setQuery] = useState("");
    const {isLoading: moviesLoading, data: moviesData, refetch: searchMovies} = useQuery(
        ["searchMovies", query],
        moviesAPI.search
    );
    const {isLoading: tvLoading, data: tvData, refetch: searchTV} = useQuery(
        ["searchTV", query],
        tvAPI.search
    );
    let Text = "";	
    const onSubmit = () => {
        setQuery(Text);
		if(query === "") {
			return;
		}
		searchMovies();
		searchTV();
    };
    const isDark = useColorScheme() === 'dark';
    const SearchBar = styled.TextInput`
        background-color: ${isDark ? "white" : "black"};
        padding: 10px 15px;
        border-radius: 15px;
        width: 90%;
        margin: 10px auto;
        margin-bottom: 40px;
    `;
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
            {query.length !== 0 && (moviesLoading || tvLoading) ? <Loader /> : null}
            {moviesData?.results.length === 0 ? null : <HList title="Movie Results" data={moviesData?.results} />}
            {tvData?.results.length === 0 ? null : <HList title="TV Results" data={tvData?.results} />}
        </Container>
    );
};

export default Search;