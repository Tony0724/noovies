import React from 'react';
import styled from 'styled-components/native';
import { useColorScheme } from 'react-native';

interface VotesProps {
    votes: number;
}

const Text = styled.Text`
    color: {isDark ? rgba(255, 255, 255, 0.8) : "black"}
	font-size:10px;
`;


const Votes:React.FC<VotesProps> = ({votes}) => {
    const isDark = useColorScheme() === 'dark';
    return (
        <Text>{votes > 0 ? `⭐️ ${votes}/10`: "Coming soon"}</Text>
    )
}

export default Votes;