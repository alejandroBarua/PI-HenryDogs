import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { 
	NavBar,
	InputText,

} from './index';

import logo from '../assets/logo-dark.png';
import iconLupa from '../assets/icons/icon-lupa.png';

import { dogsList } from '../data';



const Header = () => {

	const handlePressDogName = (value, isResult) => {
		console.log(value, isResult);
	}


	return (
		<HeaderStyled>
				<Flex>
					<Link to='/'>
						<Logo src={logo} alt="puppy" />
					</Link>
					<NavBar />
				</Flex>
				<InputText 
					icon={iconLupa}
					text={'Search dog by breed'}
					results={dogsList.map(el => el.name)}
					handlePress={handlePressDogName} />
		</HeaderStyled>
	)
}

export default Header;

const HeaderStyled = styled.div`

	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 7rem;

`

const Flex = styled.div`

	display: flex;
	align-items: flex-end;

`

const Logo = styled.img`
	opacity: 0.8;
	width: 110px;
`
