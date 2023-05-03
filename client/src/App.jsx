import React, { useState } from "react";
import styled, { ThemeProvider } from 'styled-components';
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Video from "./pages/Video";
import Home from './pages/Home'
import Login from "./pages/Login";
import Search from "./pages/Search";

const Container = styled.div`
  padding: 0;
  margin: 0;
  display: flex;
`

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
`

const Wrapper = styled.div`
  padding: 22px 96px;
`

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeProvider theme={darkMode? darkTheme : lightTheme}>
      <Container style={{margin: 0}}>

        <BrowserRouter>

        {/* side menu */}
        <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
        
        {/* navbar + page */}
        <Main>
          <Navbar />
          <Wrapper>
            <Routes>
              <Route path="/">
                <Route index element={<Home type="random" />}></Route>
                <Route path="search" element={<Search />}></Route>
                <Route path="explore" element={<Home type="trend" />}></Route>
                <Route path="subscriptions" element={<Home type="subscribed" />}></Route>
                <Route path="login" element={<Login />}></Route>
                <Route path="video">
                  <Route path=":id" element={<Video />}></Route>
                </Route>
              </Route>
            </Routes>
          </Wrapper>
        </Main>

        </ BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;