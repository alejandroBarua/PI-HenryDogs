import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { MsgNotFound, Loading } from './index';
import Card from './Card';


const CardGroup = () => {
	
	const {dogs, dogsIsEmpty, loading, serverError} = useSelector(state => state);
	
	return (
		<CardGroupStyled>
			{
				loading && <Loading />
			}
			{
				!loading && dogs.map(({id, name, weight, temps, imgUrl}) => (
				
					<Card 
						key={id}
						id={id}
						name={name}
						weight={weight}
						temps={temps}
						img={imgUrl} />
				))
			}
			{
				(!loading && dogsIsEmpty) && 
					<NotFoundContainer>
						<MsgNotFound 
							msg={serverError ? serverError.message : 'No matches found for a dog.'}
							code={serverError && serverError.code}
							reload={serverError ? true : false}/>
					</NotFoundContainer>
			}
		</CardGroupStyled>
	)
}

export default CardGroup;


const CardGroupStyled = styled.div`

	min-height: calc(100vh - 18rem);
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 1.55rem;
	margin-top: 2rem;

	@media(max-width: 919px){
		display: grid;
		grid-template-columns: 1fr 1fr;
	}	

	@media(max-width: 720px){
		display: grid;
		grid-template-columns: 1fr;
	}	
`

const NotFoundContainer = styled.div`
	position: absolute;
	width: 100%;
`