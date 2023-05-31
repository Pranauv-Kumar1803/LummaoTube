import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import axios from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";


const Container = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #000000a7;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Wrapper = styled.div`
    width: 600px;
    height: 640px;
    background-color: ${({ theme }) => theme.bgLighter};
    color: ${({ theme }) => theme.text};
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: relative;
`

const Close = styled.div`
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 15px;
    font-weight: 600;
`

const Title = styled.h1`
    text-align: center;
`

const Input = styled.input`
    width: 95%;
    border: 1px solid ${({ theme }) => theme.soft};
    color: ${({ theme }) => theme.text};
    border-radius: 3px;
    padding: 10px;
    margin-right: 10px;
    background-color: transparent;
`

const Desc = styled.textarea`
    width: 95%;
    border: 1px solid ${({ theme }) => theme.soft};
    color: ${({ theme }) => theme.text};
    border-radius: 3px;
    padding: 10px;
    margin-right: 10px;
    background-color: transparent;
`

const Button = styled.button`
    border-radius: 3px;
    border: none;
    padding: 10px 20px;
    font-weight: 500;
    cursor: pointer;
    background-color: ${({ theme }) => theme.soft};
    color: ${({ theme }) => theme.text}
`

const Label = styled.label`
    font-size: 14px;
`

const Upload = ({ setOpen }) => {
    const [img, setImg] = useState(undefined);
    const [video, setVideo] = useState(undefined);
    const [imgPercent, setImgPercent] = useState(0);
    const [videoPercent, setVideoPercent] = useState(0);
    const [input, setInput] = useState({});
    const [tags, setTags] = useState([]);

    const navigate = useNavigate()

    const uploadFile = (file, URLtype) => {
        const storage = getStorage();
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);

        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                URLtype == "image" ? setImgPercent(Math.round(progress)) : setVideoPercent(Math.round(progress));
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                        break;
                }
            },
            (error) => {
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;
                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setInput(prev => {
                        return { ...prev, [URLtype]: downloadURL }
                    })
                });
            }
        );
    }

    useEffect(() => {
        video && uploadFile(video, "videoUrl");
    }, [video])

    useEffect(() => {
        img && uploadFile(img, "imgUrl");
    }, [img])

    const handleUpload = async(e)=>{
        e.preventDefault();
        console.log(input);
        const res = await axios.post(`/videos/`,{...input,tags});

        setOpen(false);
        if(res.status == 201) {
            navigate(`/video/${res.data._id}`);
        }
    }

    const handleChange = async (e) => {
        setInput(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    return (
        <Container>
            <Wrapper>
                <Close onClick={() => setOpen(false)}>X</Close>
                <Title>Upload Any Video</Title>
                <Label>Video: </Label>
                {videoPercent > 0 ? ("Uploading: " + videoPercent + "%") :(<Input type='file' accept='video/*' onChange={(e) => setVideo(e.target.files[0])} />)}
                <Input type='text' placeholder='Title' name='title' onChange={handleChange} />
                <Desc placeholder='Description' rows={10} cols={8} name='description' onChange={handleChange} />
                <Input type='text' placeholder='Separate tags with commas' onChange={(e) => { const t = e.target.value.split(','); setTags(t) }} />
                <Label>Main Image: </Label>
                {imgPercent > 0 ? ("Uploading: " + imgPercent + "%") : (<Input type='file' accept='image/*' onChange={(e) => setImg(e.target.files[0])}></Input>)}
                <Button onClick={handleUpload}>Post!</Button>
            </Wrapper>
        </Container>
    )
}

export default Upload