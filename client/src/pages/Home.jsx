import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Card from '../components/Card'
import axios from "../api/axiosConfig";

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap
`

const Home = ({type}) => {

    const [videos,setVideos] = useState([]);

    useEffect(()=>{

        const fetchVids = async()=>{
            try {
                const res = await axios.get(`/videos/${type}`);
                setVideos(res.data);
            } catch (err) {
                console.log(err.message);
                alert('some error occured');   
            }
        }
        fetchVids();
    },[type])

    return (
        <Container>
            {videos.map(vid=>{
                console.log(vid);
                return <Card key={vid._id} video={vid} />
            })}
        </Container>
    )
}

export default Home