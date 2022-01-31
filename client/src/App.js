import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { getTemps, getDogNames } from './store/actions';

import { ThemeProvider } from 'styled-components';
import GlobalStyles from "./styles/Global";
import { Container } from './styles';

import { Header, Footer } from './components';

import { 
  Home,
  Dogs,
  OneDog,
  CreateDog,
  About,
  NotFound,

} from './pages';


const theme = {
  colorPrimary: '#FFAD62',
  colorMedium: '#FFC499',
  colorLight: '#FFEFD8'
}


const App = () => {

	const dispatch = useDispatch();

	let { pathname } = useLocation();

  	useEffect(() => {
		
      dispatch(getTemps());
      dispatch(getDogNames());
      
    }, [])

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
        <Container>
          <Header />
          <div>
            <Routes>

              <Route path="/" element={<Home />} />
              <Route path="/dogs" element={<Dogs />} />
              <Route path="/dogs/:idDog" element={<OneDog />} />
              <Route path="/create" element={<CreateDog />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound/>} />
            
          </Routes>
          </div>
        </Container>
        {
          pathname === '/' || <Footer />
        }
    </ThemeProvider>
     
  );
}

export default App;