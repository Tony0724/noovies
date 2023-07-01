import React from 'react';
import styled from 'styled-components/native';
import Poster from './Poster';
import Votes from './Votes';
import { useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

const HMovie = styled.View`
  padding: 0px 30px;
  flex-direction: row;
`;

const HColumn = styled.View`
  margin-left: 15px;
  width: 80%;
`;


interface HMediaProps {
  posterPath: string;
  originalTitle: string;
  overview: string;
  releaseDate?: string;
  voteAverage?: number;
}

const HMedia: React.FC<HMediaProps> = ({
  posterPath,
  originalTitle,
  overview,
  releaseDate,
  voteAverage,
}) => {
  const isDark = useColorScheme() === 'dark';
  const Title = styled.Text`
    color: ${isDark ? "white" : "black"};
    font-weight: 600;
    margin-top: 7px;
  `;
  const Release = styled.Text`
    color: ${isDark ? "white" : "black"};
    font-size: 12px;
    margin-vertical: 10px;
    font-weight: 500;
    opacity: 0.6;
  `;
  const Overview = styled.Text`
    color: ${isDark ? "white" : "black"};
    opacity: 0.8;
    width: 80%;
  `;
  const navigation = useNavigation();
  const goToDetail = () => {
    //@ts-ignore
    navigation.navigate("Stack", {
      screen: "Detail", params: {
        originalTitle,
      }
    })
  }
  return (
    <TouchableOpacity onPress={goToDetail}>
      <HMovie>
      <Poster path={posterPath} />
      <HColumn>
        <Title>
          {originalTitle.length > 30
            ? `${originalTitle.slice(0, 30)}...`
            : originalTitle}
        </Title>
        {releaseDate ? (
          <Release>
            {new Date(releaseDate).toLocaleDateString("ko", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </Release>
        ) : null}
        {voteAverage ? <Votes votes={voteAverage} /> : null}
        <Overview>
          {overview !== "" && overview.length > 140
            ? `${overview.slice(0, 140)}...`
            : overview}
        </Overview>
      </HColumn>
     </HMovie>
    </TouchableOpacity>
  );
};

export default HMedia;