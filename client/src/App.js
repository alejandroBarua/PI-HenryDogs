import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { getTemps } from './store/actions';

import styled, { ThemeProvider } from 'styled-components';
import GlobalStyles from "./styles/Global";
import { Container } from './styles';

import { Header, Footer, NotFound } from './components';

import { 
  Home,
  Dogs,
  OneDog,
  CreateDog,
  About,

} from './pages';

const theme = {
  colorPrimary: '#FFAD62',
  colorMedium: '#FFC499',
  colorLight: '#FFEFD8'
}

/* 919px breakpoint: cards agrandar de a dos */
/* 860px breakpoint: header, filtros */

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
              <Route path="*" element={
                  <NotFound 
                    msg = 'Page not Found'
                    code='404'
                    redirect='/'
                    textBtn='Back home' />
              } />
            
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

`