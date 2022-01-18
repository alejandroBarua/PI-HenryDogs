import React from 'react';
import styled from 'styled-components';
import { Container } from '../styles';

import NavBar from './NavBar';
import logo from '../assets/logo.png';


const Header = () => {
	return (
		<HeaderStyled>
			<Flex>
				<Logo>
					<img src={logo} alt="logo" />
					<h2>Hello World</h2>
				</Logo>
				<NavBar />
			</Flex>
		</HeaderStyled>
	)
}

export default Header

const HeaderStyled = styled.header`

	background-color: ${({theme}) => theme.primary};
	color: white;
	justify-content: space-between;
`

const Flex = styled(Container)`

	align-items: center;
	display: flex;
	justify-content: space-between;
	height: 4rem;
`

const Logo = styled.div`

	display: flex;
	align-items: center;
	
	img{
		width: 40px;
	}

	h2{
		margin-left: 1rem;
	}
`