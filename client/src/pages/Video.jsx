import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import Comments from '../components/Comments';
import Comment from '../components/Comment';
import Card from '../components/Card';
import Recommendation from '../components/Recommendation';
import {format} from 'timeago.js';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { dislike, fetchError, fetchStart, fetchSuccess, like } from '../redux/videoSlice';
import { subscribe } from '../redux/userSlice';
import { commentErase } from '../redux/commentSlice';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    display: flex;
    gap: 24px;
`

const Content = styled.div`
  flex: 5;
`

const VideoWrapper = styled.div`
    
`

const Title = styled.h1`
    font-size: 18px;
    folnt-weight: 400;
    margin-top: 20px;
    margin-bottom: 10px;
    color: ${({ theme }) => theme.text}
`

const Details = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between
`

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft}
`

const Buttons = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.text}
`

const Button = styled.div`
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`

const Hr = styled.hr `
  border: 0.5px solid ${({ theme }) => theme.soft};
  margin-top: 15px;
  margin-bottom: 15px;
`

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text}
`

const ChannelName = styled.span`
  font-weight: 600;
`

const ChannelCounter = styled.span`
  font-size: 13px;
  margin-top: 5px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.textSoft}
`

const ChannelDesc = styled.p`
  font-size: 14px;

`
const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  height: max-content;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
`

const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`

const Video = () => {
  const nav = useNavigate();
  const {currentUser} = useSelector(state => state.user);
  const {currentVideo} = useSelector(state=>state.video);
  const dispatch = useDispatch();

  const path = useLocation().pathname.split('/')[2];

  const [channel,setChannel] = useState({});

  useEffect(()=>{
    const fetchDetails = async()=>{
      try {
        dispatch(fetchStart());
        const vid1 = await axios.put(`/videos/view/${path}`);
        const vid = await axios.get(`/videos/find/${path}`);
        const c = await axios.get(`/users/find/${vid.data.userID}`);
        
        setChannel(c.data);
        
        dispatch(fetchSuccess(vid.data));
        dispatch(commentErase());
      } catch (err) {
        dispatch(fetchError());
      }
    } 
    fetchDetails();
  },[path,dispatch])

  const handleLike = async()=>{
    if(!currentUser) {
      alert('Login to Like/Dislike');
      nav('/login');
    }
    await axios.put(`/users/like/${currentVideo._id}`);
    dispatch(like(currentUser._id));
  }
  
  const handleDisLike = async()=>{
    if(!currentUser) {
      alert('Login to Like/Dislike');
      nav('/login');
    }
    await axios.put(`/users/dislike/${currentVideo._id}`);
    dispatch(dislike(currentUser._id));
  }

  const handleSubscribe = async()=>{
    if(!currentUser) {
      alert('Login to Like/Dislike');
      nav('/login');
    }
    if(currentUser.subscribedUsers?.includes(channel._id)) {
      await axios.put(`/users/unsub/${channel._id}`);
    }
    else {
      await axios.put(`/users/sub/${channel._id}`);
    }
    dispatch(subscribe(channel._id));
    alert('success!');
    window.location.reload();
  }

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src={currentVideo?.videoUrl} controls />
        </VideoWrapper>

        <Title> {currentVideo?.title} </Title>
        <Details>
          <Info>
            {currentVideo?.views} views · {format(currentVideo?.createdAt)}
          </Info>

          <Buttons>
            <Button onClick={handleLike}>
              {currentVideo?.likes?.includes(currentUser?._id)? <ThumbUpIcon /> :<ThumbUpOutlinedIcon />}
              {currentVideo?.likes?.length}
            </Button>
            <Button onClick={handleDisLike}>
              {currentVideo?.dislikes?.includes(currentUser?._id)? <ThumbDownIcon /> :<ThumbDownOffAltOutlinedIcon />}{" "}Dislike
            </Button>
            <Button>
              <ReplyOutlinedIcon />
              Share
            </Button>
            <Button>
              <AddTaskOutlinedIcon />
              Save
            </Button>
          </Buttons>
        </Details>

        <Hr />

        <Channel>
          <ChannelInfo>
            <Image src={channel.img} />
            <ChannelDetail>
              <ChannelName>
                {channel.name}
              </ChannelName>
              <ChannelCounter>
                {channel.subscribers} Subcribers 
              </ChannelCounter>
              <ChannelDesc>
                {currentVideo?.description} 
              </ChannelDesc>
            </ChannelDetail>
          </ChannelInfo>

          <Subscribe onClick={handleSubscribe}>
            {currentUser?.subscribedUsers?.includes(channel._id)? "SUBSCRIBED": "SUBSCRIBE"}
          </Subscribe>
        </Channel>

        <Hr />

        <Comments videoId={currentVideo?._id} />
      </Content>
      <Recommendation tags={currentVideo?.tags} />
    </Container>
  )
}

export default Video