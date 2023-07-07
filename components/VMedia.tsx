import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";
import Votes from "./Votes";
import {useNavigation} from "@react-navigation/native";
import {TouchableOpacity} from "react-native";
import {Movie, TV} from "../api";
import { useColorScheme } from "react-native";

 const Container = styled.View`
   margin-right: 20px;
   align-items: center;
 `;

 interface VMediaProps {
   posterPath: string;
   originalTitle: string;
   voteAverage: number;
   fullData: Movie | TV
 }

 const VMedia: React.FC<VMediaProps> = ({
   posterPath,
   originalTitle,
   voteAverage,
   fullData,
 }) => {
     const navigation = useNavigation();
     const goToDetail = () => {
         navigation.navigate("Stack", {
             screen: "Detail",
             params: {
                 ...fullData,
             },
         });
     };
     const isDark = useColorScheme() === 'dark';
     const Title = styled.Text`
      color: ${isDark ? "white" : "black"};
      font-weight: 600;
      margin-top: 7px;
      margin-bottom: 5px;
      `;

     return (
         <TouchableOpacity onPress={goToDetail}>
             <Container>
                 <Poster path={posterPath} />
                 <Title>
                     {originalTitle.slice(0, 12)}
                     {originalTitle.length > 12 ? "..." : null}
                 </Title>
                 <Votes votes={voteAverage} />
             </Container>
         </TouchableOpacity>
     );
 };

 export default VMedia;