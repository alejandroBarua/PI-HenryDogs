import React, { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { getTemps, getDogNames } from './store/actions';

import { ThemeProvider } from 'styled-components';
import GlobalStyles from "./styles/Global";
import { Container } from './styles';

import { Header, Footer } from './components';

import { MyRoutes } from './routes';

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
      
    }, [dispatch])

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
        <Container>
          <Header />
          <div>
            <MyRoutes />
          </div>
        </Container>
        {
          pathname === '/' || <Footer />
        }
    </ThemeProvider>
     
  );
}

export default App;