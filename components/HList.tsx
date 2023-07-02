import React from 'react';
import styled from 'styled-components/native';
import VMedia from './VMedia';
import { FlatList } from 'react-native-gesture-handler';
import { useColorScheme } from 'react-native';

const ListContainer = styled.View`
	margin-bottom: 40px;
`

export const HListSeperator = styled.View`
	width: 20px;
`

interface HListProps {
    title:string;
    data: any[]
}

const HList: React.FC<HListProps> = ({ title, data }) => {
    const isDark = useColorScheme() === 'dark';
    const ListTitle = styled.Text`
        color: ${isDark ? "white" : "black"};
        font-size: 18px;
        font-weight: 600;
        margin-left: 30px;
        margin-bottom: 20px;
    ` 
    return (
        <ListContainer>
            <ListTitle>{title}</ListTitle>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal: 30}}
                ItemSeparatorComponent={HListSeperator}
                keyExtractor={(item) => item.id + ""}
                data={data}
                renderItem={({item}) => <VMedia posterPath={item.poster_path} originalTitle={item.original_title ?? item.original_name} voteAverage={item.vote_average} fullData={item}
                />}
            />
        </ListContainer>
    )
}

export default HList;