import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getDogs } from '../store/actions';

import styled from 'styled-components';

import { 
	NavBar,
	InputText,

} from './index';

import logo from '../assets/logo-dark.png';
import iconLupa from '../assets/icons/icon-lupa.png';



const Header = () => {

	const dispatch = useDispatch();
	const dogs = useSelector(state => state.dogs);

	const handlePressDogName = (dogName) => {
		dispatch(getDogs(dogName));
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
					results={dogs.map(el => el.name)}
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
