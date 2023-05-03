import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { loginError, loginStart, loginSuccess } from '../redux/userSlice'
import { auth, provider } from '../firebase'
import { signInWithPopup } from 'firebase/auth'


const Container = styled.div`
    height: calc(100% - 56px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.text};
`

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: ${({ theme }) => theme.bgLighter};
    border: 1px solid ${({ theme }) => theme.soft};
    padding: 20px 50px;
    gap: 20px;
`

const Title = styled.h1`
    font-size: 24px;
`
const SubTitle = styled.h2`
    font-size: 16px;
    font-weight: 400;
`

const Input = styled.input`
    border: 1px solid ${({ theme }) => theme.soft};
    background-color: transparent;
    border-radius: 5px;
    padding: 10px;
    width: 100%;
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

const More = styled.h1`
    font-size: 12px;
    font-weight: 400;
    display: flex;
`

const Links = styled.div`
    margin-left: 50px;
`

const Link = styled.span`
    margin-left: 20px;
`


const Login = () => {
    const [data, setData] = useState({ name: '', email: '', password: '' });
    const [login, setLogin] = useState({ name: '', password: '' });
    const dispatch = useDispatch();

    function handleChange1(e) {
        const name = e.target.name;
        const value = e.target.value;

        setLogin(prev => {
            return { ...prev, [name]: value };
        })
    }

    function handleChange2(e) {
        const name = e.target.name;
        const value = e.target.value;

        setData(prev => {
            return { ...prev, [name]: value };
        })
    }

    async function handleLogin(e) {
        console.log(login);
        dispatch(loginStart())
        try {
            const res = await axios.post('/auth/signin', login);
            // console.log(res.data);
            dispatch(loginSuccess(res.data));
        } catch (err) {
            console.log(err.message);
            dispatch(loginError());
        }
    }

    async function handleRegister(e) {
        e.preventDefault();

        console.log(data);

        try {
            const res = await axios.post('/auth/signup', data);
            console.log(res.data);
        } catch (err) {
            console.log(err.message);
        }
    }

    function signInWithGoogle() {
        dispatch(loginStart());
        signInWithPopup(auth, provider).then(async(res) => {
            await axios.post('/auth/google',{
                name: res.user.displayName,
                email: res.user.email,
                img: res.user.photoURL,
            }).then((res)=>{
                dispatch(loginSuccess(res.data))
                window.location.href = '/';
            })
        }).catch(err => {console.log(err.message);dispatch(loginError())});
    }

    return (
        <Container>
            <Wrapper>
                <Title>Login</Title>
                <SubTitle>to continue to LummaoTube</SubTitle>
                <Input type='text' placeholder='username' name='name' value={login.name} onChange={handleChange1} />
                <Input type='password' placeholder='password' name='password' value={login.password} onChange={handleChange1} />
                <Button onClick={handleLogin}>Log In</Button>

                <Title>Or</Title>
                <Button onClick={signInWithGoogle}>Sign in with Google</Button>

                <Title>or Sign Up</Title>

                <Input type='text' placeholder='username' name='name' value={data.name} onChange={handleChange2} />
                <Input type='email' placeholder='email' name='email' value={data.email} onChange={handleChange2} />
                <Input type='password' placeholder='password' name='password' value={data.password} onChange={handleChange2} />
                <Button onClick={() => handleRegister}>Sign up</Button>
            </Wrapper>

            <More>
                English(India)
                <Links>
                    <Link>Help</Link>
                    <Link>Privacy</Link>
                    <Link>Terms</Link>
                </Links>
            </More>
        </Container>
    )
}

export default Login