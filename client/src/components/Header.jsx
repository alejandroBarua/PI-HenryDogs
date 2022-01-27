import React from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchName } from '../store/actions';

import styled from 'styled-components';

import { 
	NavBar,
	InputText,

} from './index';

import logo from '../assets/logo-dark.png';
import iconLupa from '../assets/icons/icon-lupa.png';



const Header = () => {

  const navigate = useNavigate();

	const dispatch = useDispatch();
	const { dogNames, searchName } = useSelector(state => state);

	const handlePressDogName = (dogName) => {
		dispatch(setSearchName(dogName));
    navigate("/dogs");
	}
	
	const handleDeleteSearchValue = () =>{
		dispatch(setSearchName(''));
    navigate("/dogs");
	}


	return (
		<HeaderStyled>
				<Flex>
					<Link to='/'>
						<Logo src={logo} alt="puppy" />
					</Link>
					<NavBar />
				</Flex>
				<SearchContainer>
					<InputText 
						icon={iconLupa}
						text={'Search dog by breed'}
						results={dogNames}
						handlePress={handlePressDogName} />
						{
							searchName && <Searched onClick={handleDeleteSearchValue}>
								<p>{searchName}<span>x</span></p>
							</Searched>
						}
				</SearchContainer>
		</HeaderStyled>
	)
}

export default Header;

const HeaderStyled = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 7rem;

	@media(max-width: 860px){

		flex-direction: column;
		align-items: flex-start;
		gap: 2rem;
		height: auto;
		padding-top: 1.5rem;
	}	

`

const Flex = styled.div`
	display: flex;
	align-items: flex-end;
	
	width: 100%;
	@media(max-width: 860px){
		justify-content: space-between;
	}	

`

const Logo = styled.img`
	opacity: 0.8;
	width: 110px;

	@media(max-width: 860px){
		width: 70px;
	}
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

	@media(max-width: 860px){
		position: relative;
	}	
`

const SearchContainer = styled.div`

	@media(max-width: 860px){
		width: 100%;
	}	

`