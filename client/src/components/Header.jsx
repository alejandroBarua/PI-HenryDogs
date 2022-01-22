import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getDogs, setSearchName } from '../store/actions';

import styled from 'styled-components';

import { 
	NavBar,
	InputText,

} from './index';

import logo from '../assets/logo-dark.png';
import iconLupa from '../assets/icons/icon-lupa.png';



const Header = () => {

	const dispatch = useDispatch();
	const { dogs, searchName } = useSelector(state => state);

	const handlePressDogName = (dogName) => {
		dispatch(setSearchName(dogName));
	}
	const handleDeleteSearchValue = () => dispatch(setSearchName(''));


	return (
		<HeaderStyled>
				<Flex>
					<Link to='/'>
						<Logo src={logo} alt="puppy" />
					</Link>
					<NavBar />
				</Flex>
				<div>
					<InputText 
						icon={iconLupa}
						text={'Search dog by breed'}
						results={dogs.map(el => el.name)}
						handlePress={handlePressDogName} />
						{
							searchName && <Searched onClick={handleDeleteSearchValue}>
								<p>{searchName}<span>x</span></p>
							</Searched>
						}
				</div>
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

const Searched = styled.div`

	position: absolute;
	font-size: 0.8rem;
	cursor: pointer;

	p{

		border-radius: 5px;
		margin-top: 0.5rem;
		padding: 0.1rem 0rem 0.1rem 0.5rem;
		display: inline-block;
		color: white;
		background-color: #afafaf;
		
		
	}
	
	span{
		position: relative;
		padding: 0 0.5rem 0 1rem;
	}

	span:hover{
		color: #5c5c5c;
	}

`