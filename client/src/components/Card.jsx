import axios from '../api/axiosConfig';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {format} from 'timeago.js';

const Container = styled.div`
    width: ${(props) => props.type !== "sm" && "360px"};
    margin-bottom: ${(props) => props.type === "sm" ? "10px" : "45px"};
    cursor: pointer;
    display: ${(props) => props.type === "sm" && "flex"};
    gap: 20px;
`

const Image = styled.img`
    width: 100%;
    height: ${(props) => props.type === "sm" ? "120px": "202px"};
    background-color: #999;
    flex: 1;
`

const Details = styled.div`
    display: flex;
    margin-top : ${(props) => props.type !== "sm" && "16px"};
    gap: 12px;
    flex: 1;
`

const UserDetails = styled.div`
    
`

const Title = styled.h1`
    font-size: 16px;
    font-weight: 600;
    color: ${({ theme }) => theme.text};
    margin: 0;
`

const ChannelName = styled.h2`
    font-size: 14px;
    color: ${({ theme }) => theme.textSoft};
    margin: 0;
`

const Info = styled.div`
    font-size: 14px;
    color: ${({ theme }) => theme.textSoft};
    margin: 0;
`

const OneImage = styled.img`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #999; 
    display: ${(props) => props.type === "sm" && "none"};
`

const Card = ({type, video}) => {

    const [channel,setChannel] = useState({});

    useEffect(()=>{
        const fetchChannel = async()=>{
            try {
                const res = await axios.get(`/users/find/${video.userID}`);
                console.log(res.data);
                setChannel(res.data);
            } catch (err) {
                console.log(err.message);
                alert('some error occured');
            }
        }
        fetchChannel();
        // console.log(channel);
    },[video.userID])


    return (
        <Link to={`/video/${video._id}`} style={{textDecoration: 'none'}}>
        <Container type={type}>
            <Image type={type} src={video.imgUrl} />
            <Details type={type}>
                <OneImage type={type} src={channel.img} />
                <UserDetails>
                    <Title> {video.title} </Title>
                    <ChannelName>{channel.name}</ChannelName>
                    <Info>{video.views} views · {format(video.createdAt)}</Info>
                </UserDetails>
            </Details>
        </Container>
        </Link>
    )
}

export default Card