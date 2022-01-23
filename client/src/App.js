import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { getTemps } from './store/actions';

import styled, { ThemeProvider } from 'styled-components';
import GlobalStyles from "./styles/Global";
import { Container } from './styles';

import { Header, Footer } from './components';

import { 
  Home,
  Dogs,
  OneDog,
  CreateDog,
  About,
  NotFound

} from './pages';

const theme = {
  colorPrimary: '#FFAD62',
  colorMedium: '#FFC499',
  colorLight: '#FFEFD8'
}

/* 930px breakpoint: header, landing */

const App = () => {

	const dispatch = useDispatch();

	const { pathname } = useLocation();

  	useEffect(() => {
		
      dispatch(getTemps());
      
    }, [])

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
              <Route path="/create" element={<CreateDog />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            
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

	min-height: calc(100vh - 7rem);

`