import React from 'react';
import styled from 'styled-components/native';
import { useColorScheme } from 'react-native';

interface VotesProps {
    votes: number;
}



const Votes:React.FC<VotesProps> = ({votes}) => {
    const isDark = useColorScheme() === 'dark';
    const Text = styled.Text`
        color: ${isDark ? "#ffffffcc" : "black"};
        font-size: 10px;
    `;
    return (
        <Text>{votes > 0 ? `⭐️ ${votes}/10`: "Coming soon"}</Text>
    )
}

export default Votes;