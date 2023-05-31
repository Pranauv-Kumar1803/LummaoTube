import React, { useState } from 'react'
import styled from 'styled-components'
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userSlice'
import Upload from './Upload';

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bg};
  height: 56px;
  z-index: 1;
`
  
const Wrapper = styled.div`
display: flex;
align-items: center;
justify-content: flex-end;
height: 100%;
padding: 0px 20px;
position: relative;
`

const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: ${({ theme }) => theme.text};
`

const Input = styled.input`
  width: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  color: ${({ theme }) => theme.text};
`

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px; 
  text-decoration: none;
`

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text}
`

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const {currentUser} = useSelector(state=>state.user);
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logout());
    alert('Logout successful');
  }

  return (
    <>
      <Container>
        <Wrapper>
          <Search> <Input placeholder='Search ' onChange={(e)=>setInput(e.target.value)}/> <SearchOutlinedIcon onClick={() => navigate(`/search?title=${input}`)} style={{color: ({ theme }) => theme.bgLighter, cursor: 'pointer'}}/> </Search>

          {currentUser ?
          <User>
            <VideoCallOutlinedIcon onClick={()=>setOpen(true)} style={{cursor: 'pointer'}} />
            <Avatar src={currentUser.img} />
            {currentUser.name.split(' ')[0]}
            <Button onClick={handleLogout}>Logout</Button>
          </User> 
          : <Link to={'/login'} style={{textDecoration: 'none'}}>
            <Button>
              <AccountCircleOutlinedIcon />
              SIGN IN
            </Button>
          </Link>}

        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} />}
    </>
  )
}

export default Navbar