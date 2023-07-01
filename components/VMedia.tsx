import React from 'react';
import styled from "styled-components/native";
import Poster from "./Poster";
import Votes from "./Votes";
import { useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

const Movie = styled.View`
  align-items: center;
`;


interface VMediaProps {
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
}

const VMedia: React.FC<VMediaProps> = ({
  posterPath,
  originalTitle,
  voteAverage,
}) => {
  const isDark = useColorScheme() === 'dark';
  const Title = styled.Text`
    color: ${isDark ? "white" : "black"};
    font-weight: 600;
    margin-top: 7px;
    margin-bottom: 5px;
  `;
  const navigation = useNavigation();
  const goToDetail = () => {
    //@ts-ignore
    navigation.navigate("Stack", {
      screen: "Detail", 
      params: {
        originalTitle,
      }
    })
  }
  return (
    <TouchableOpacity onPress={goToDetail}>
      <Movie>
        <Poster path={posterPath} />
        <Title>
          {originalTitle.slice(0, 12)}
          {originalTitle.length > 12 ? "..." : null}
        </Title>
        <Votes votes={voteAverage} />
      </Movie>
    </TouchableOpacity>
  )
};

export default VMedia;