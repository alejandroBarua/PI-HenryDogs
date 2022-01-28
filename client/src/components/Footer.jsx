import React from 'react';
import styled from 'styled-components';
import { Container } from '../styles';

import { Contact } from './index';

import logoHenry from '../assets/logo-henry.png';
import logoPuppy from '../assets/logo-puppy-light.png';


const Footer = () => {
	return (
		<FooterStyled>
			<Flex>
				<LogoGroup>
					<LogoHenry src={logoHenry} alt="henry" />
					<LogoPuppy src={logoPuppy} alt="puppy" />
				</LogoGroup>
				<ContactContainer>
					<h3>Contact</h3>
					<Contact color='light'/>
				</ContactContainer>
			</Flex>
			<Copy>© Copyright 2022 | Designed & coded by Alejandro Barua</Copy>
		</FooterStyled>
	)
}

export default Footer;


const FooterStyled = styled.footer`

	display: flex;
	flex-direction: column;
	align-items: center;
	color: white;
	background-color: #363636;
	padding-top: 2.5rem;
	padding-bottom: 0.5rem;




`

const LogoGroup = styled.div`

	display: flex;
	flex-direction: column;
`

const Flex = styled(Container)`

	display: flex;
	justify-content: space-between;
	width: 100%;
`

const LogoPuppy = styled.img`

	margin-top: 1rem;
	width: 80px;

	@media(max-width: 860px){
		width: 60px;
	}
`

const LogoHenry = styled.img`

	width: 170px;

	@media(max-width: 860px){
		width: 130px;
	}	
`

const  ContactContainer = styled.div`
	h3{
		font-family: 'Montserrat', sans-serif;
		font-weight: 600;
		position: relative;
		left: 1rem;
		bottom: 10px;
	}
`

const Copy = styled.span`

	font-weight: 300;
	color: #e6e6e6;
	margin-top: 0.5rem;
	font-size: 0.85rem;

	@media(max-width: 860px){
		font-size: 0.6rem;
	}

`