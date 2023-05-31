import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Comment from './Comment'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { commentError, commentStart, commentSuccess } from '../redux/commentSlice'
const Container = styled.div`

`

const NewComment = styled.div`
    display: flex;
    align-itemms: center;
    gap: 10px;
`
const Avatar = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`
const Input1 = styled.input`
    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.text};
    background-color: transparent;
    outline: none;
    padding: 2px;
    width: 100%;
    color: ${({ theme }) => theme.text}
`

const H1 = styled.h1`
    font-size: 18px;
    text-align: center;
    color: ${({ theme }) => theme.text};
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

const Comments = ({ videoId }) => {
    const { currentUser } = useSelector(state => state.user);
    const [comment, setComment] = useState('');

    const {currentComments} = useSelector(state => state.comment);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchComments = async () => {
            try {
                dispatch(commentStart());
                const res = await axios.get(`/comments/${videoId}`);
                dispatch(commentSuccess(res.data));
            } catch (err) {
                dispatch(commentError());
                console.log(err);
            }
        };
        fetchComments();
    }, [currentComments])

    const handleComment = async(e)=>{
        e.preventDefault();
        try {
            dispatch(commentStart());
            const res = await axios.post('/comments',{description: comment, videoID: videoId});
            console.log(res.data);
            const p = res.data;
            const newData = [...currentComments, p];
            console.log(newData);
            dispatch(commentSuccess(newData));
            setComment('');
        } catch (err) {
            console.log(err);
            dispatch(commentError());
        }
    }

    return (
        <Container>
            <NewComment>
                {currentUser ? <>
                    <Avatar src={currentUser?.img} />
                    <Input1 placeholder='Add a Comment' value={comment} onChange={(e) => setComment(e.target.value)} />
                    <Subscribe onClick={handleComment}>
                        Comment!
                    </Subscribe>
                </>
                    : <>
                        <H1>Please Login to comment!</H1>
                    </>}
            </NewComment>

            {currentComments?.length > 0 && currentComments?.map(comment => (
                <Comment key={comment._id} comment={comment} />
            ))}
        </Container>
    )
}

export default Comments