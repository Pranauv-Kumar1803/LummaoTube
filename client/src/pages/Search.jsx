import axios from '../api/axiosConfig';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import styled from 'styled-components'
import Card from '../components/Card';

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`

const Search = () => {
    const [videos, setVideos] = useState([]);
    const query = useLocation().search;

    
    useEffect(()=>{
        console.log(query);
        const fetchs = async() => {
            const res = await axios.get(`/videos/search${query}`);
            setVideos(res.data);
        };
        fetchs()
    },[query])

    return (
        <Container>
            {videos.map(video=>(
                <Card video={video} key={video._id} />
            ))}
        </Container>
    )
}

export default Search