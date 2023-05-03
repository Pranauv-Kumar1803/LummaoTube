import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {format} from 'timeago.js'

const Container = styled.div`
    display: flex;
    gap: 10px;
    margin: 30px 0px;
`

const Avatar = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`

const Details = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const Name = styled.span`
  font-weight: 600;
  font-size: 14px;
  color: ${({ theme }) => theme.text}
`

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin: 5px;
`

const Text = styled.span`
  color: ${({ theme }) => theme.text};
  font-size: 14px;
`

const Comment = ({comment}) => {
  const [channel,setChannel] = useState({});

  useEffect(()=>{
    const fetchComment = async()=>{
      try {
        const res = await axios.get(`/users/find/${comment.userID}`);
        setChannel(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchComment();
  },[comment.userID])

  return (
    <Container>
        <Avatar src={channel.img} />
        <Details>
            <Name> {channel.name} <Date> {format(comment.createdAt)} </Date> </Name>
            <Text>
                {comment.description}
            </Text>
        </Details>
    </Container>
  )
}

export default Comment