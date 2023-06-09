import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { Movie, TV, moviesAPI, tvAPI } from '../api';
import Poster from '../components/Poster';
import {Dimensions, StyleSheet, Share, useColorScheme, TouchableOpacity, Platform} from 'react-native';
import { makeImgPath } from '../utils';
import {LinearGradient} from 'expo-linear-gradient'
import { BLACK_COLOR } from '../colors';
import { useQuery } from 'react-query';
import Loader from '../components/Loader';
import {Ionicons} from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';

const Container = styled.ScrollView`
    background-color: ${props => props.theme.mainBgColor};
`;

const {height: SCREEN_HEIGHT} = Dimensions.get("window")

const Header = styled.View`
    height: ${SCREEN_HEIGHT / 4}px;
    justify-content: flex-end;
    padding: 0px 20px;
`;

const Column = styled.View`
    flex-direction: row;
    width: 80%;
`;

const Title = styled.Text`
    color: white;
    font-size: 36px;
    align-self: flex-end;
    margin-left: 15px;
    font-weight: 500;
`;

const Data = styled.View`
    padding: 0px 20px;
`;

const Overview = styled.Text`
    color: ${props => props.theme.textColor};
    margin: 20px 0px;
    padding: 0px 20px;
`;

const Background = styled.Image``;

const VideoBtn = styled.TouchableOpacity`
    flex-direction: row;
`;

type RootStackParamList = {
    Detail: Movie | TV
}

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">;

const Detail: React.FC<DetailScreenProps> = ({navigation: {setOptions}, route:{params}}) => {
    const isMovie = 'original_title' in params;
    const isAndroid = Platform.OS === 'android'
    const {isLoading, data} = useQuery([isMovie ? "movies" : "tv", params.id], isMovie ? moviesAPI.detail : tvAPI.detail)
    const shareMedia = async() => {
        const homepage = isMovie ? `https://www.imdb.com/title/${data?.imdb_id}/` : data?.homepage;
        if(isAndroid) {
            await Share.share({
                message: `Title: ${'original_title' in params ? params.original_title : params.original_name} overview: ${params.overview}\nCheck it out: ${homepage}`,
            })
        } else {
            await Share.share({
                url: homepage,
            })
        }
    }
    const isDark = useColorScheme() === 'dark';
    const ShareButton = () => (
        <TouchableOpacity onPress={shareMedia}>
            <Ionicons name='share-outline' color={isDark ? "white" : "black"} size={24} />
        </TouchableOpacity>
    )
    const BtnText = styled.Text`
        color: ${isDark ? "white" : "black"};
        font-weight: 600;
        margin-bottom: 10px;
        line-height: 24px;
        margin-left: 10px;
    `;
    useEffect(() => {
        setOptions({
            title: 'original_title' in params ? 'Movie' : 'TV Show',
        })
    }, [])
    useEffect(() => {
        if(data) {
            setOptions({
                headerRight: () => <ShareButton />
            })
        }
    }, [data])
    const openYTLink = async(videoID: string) => {
        const BaseUrl = `http://m.youtube.com/watch?v=${videoID}`;
        // await Linking.openURL(BaseUrl)
        let browserPackage: string | undefined;
        if (isAndroid) {
        const tabsSupportingBrowsers = await WebBrowser.getCustomTabsSupportingBrowsersAsync();
            browserPackage = tabsSupportingBrowsers?.defaultBrowserPackage;
        }
        await WebBrowser.openBrowserAsync(BaseUrl, { browserPackage });
    }
    return (
        <Container>
            <Header>
                <Background
                    style={StyleSheet.absoluteFill}
                    source={{ uri: makeImgPath(params.backdrop_path || "") }}
                />
                <LinearGradient
                    colors={['transparent', BLACK_COLOR]}
                    style={StyleSheet.absoluteFill}
                />
                <Column>
                    <Poster path={params.poster_path || ""} />
                    <Title>{'original_title' in params ? params.original_title : params.original_name}</Title>
                </Column>
            </Header>
            <Data>
                <Overview>{params.overview}</Overview>
                {isLoading ? <Loader /> : null}
                {data?.videos?.results?.map(video => <VideoBtn key={video.key} onPress={() => openYTLink(video.key)}>
                    <Ionicons name='logo-youtube' color={isDark ? "white" : "black"} size={24} />
                    <BtnText>{video.name}</BtnText>
                </VideoBtn>)}
            </Data>
        </Container>
    )
}

export default Detail;