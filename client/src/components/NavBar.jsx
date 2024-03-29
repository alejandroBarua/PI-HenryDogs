import React from 'react';
import styled from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';


const NavBar = () => {

	const { pathname } = useLocation();

	return (
		<NavBarStyled>
			<Item>
				<NavLink to='/'>Home</NavLink>
				<Cicle className={pathname === '/' ? 'active' : ''} />
			</Item>
			<Item>
				<NavLink to='/dogs'>Dogs</NavLink>
				<Cicle className={pathname.includes('/dogs') ? 'active' : ''} />
			</Item>
			<Item>
				<NavLink to='/create'>Create dog</NavLink>
				<Cicle className={pathname === '/create' ? 'active' : ''} />
			</Item>
			<Item>
				<NavLink to='/about'>About</NavLink>
				<Cicle className={pathname === '/about' ? 'active' : ''} />
			</Item>
		</NavBarStyled>
	)
}

export default NavBar;

const NavBarStyled = styled.nav`
	display: flex;
	margin-left: 1.5rem;

	@media(max-width: 860px){

		margin-left: 0.5rem;
	}	
`

const Item = styled.div`

	position: relative;
	top: -0.8rem;
	margin-left: 2.2rem;
	display: flex;
	align-items: center;
	flex-direction: column;

	a{
		color: #7E7E7E;
	}

	a:hover{
		color: ${({theme}) => theme.colorPrimary};
	}

	@media(max-width: 860px){
		margin-left: 1rem;
	}
	@media(max-width: 420px){
		a{
			font-size: 13px;
		}
	}	
	@media(max-width: 377px){
		a{
			font-size: 10.6px;
		}
	}
`

const Cicle = styled.div`

&.active{
	background-color: ${({theme}) => theme.colorMedium};
	border-radius: 50%;
	height: 0.5rem;
	width: 0.5rem;
	position: absolute;
	top: 1.8rem;
}
`