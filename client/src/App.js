import React from 'react';
import { Routes, Route, useLocation } from "react-router-dom";

import styled, { ThemeProvider } from 'styled-components';
import GlobalStyles from "./styles/Global";
import { Container } from './styles';

import { Header, Footer } from './components';

import { 
  Home,
  Dogs,
  OneDog

} from './pages';

const theme = {
  colorPrimary: '#FFAD62',
  colorMedium: '#FFC499',
  colorLight: '#FFEFD8'
}

/* 930px breakpoint: header, landing */

const App = () => {

	const { pathname } = useLocation();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
        <Container>
          <Header />
          <Main>
            <Routes>

              <Route path="/" element={<Home />} />
              <Route path="/dogs" element={<Dogs />} />
              <Route path="/dogs/:idDog" element={<OneDog />} />
            
          </Routes>
          </Main>
        </Container>
        {
          pathname === '/' || <Footer />
        }
    </ThemeProvider>
     
  );
}

export default App;


const Main = styled.div`

	min-height: calc(100vh - 9rem);

`