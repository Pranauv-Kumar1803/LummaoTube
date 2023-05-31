import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Card from './Card';
import axios from '../api/axiosConfig';


const Container = styled.div`
  flex: 2;
`


const Recommendation = ({ tags }) => {

    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const vid = await axios.get(`/videos/tags/?tags=${tags}`);
                setVideos(vid.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchDetails();
        console.log(videos);
    }, [tags])

    return (
        <Container>
            {videos.map((video)=>(
                <Card type="sm" key={video._id} video={video} />
            ))}
        </Container>
    )
}

export default Recommendation