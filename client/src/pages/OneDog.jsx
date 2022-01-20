import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

import styled from 'styled-components';

import dogsList from '../data';



const OneDog = () => {

  const { idDog } = useParams();
	const [dogs, setDogs] = useState(dogsList);

	useEffect(() => {

		setDogs(dogs.filter(el => el.id == idDog));

	}, []);

	const { name, imgUrl } = dogs[0];

	return (
		<Flex>
			<CardStyled>
				<img src={imgUrl} alt={name} />
				<h3>{name}</h3>
			</CardStyled>
			<CardStyled>
				<img src={imgUrl} alt={name} />
				<h3>{name}</h3>
			</CardStyled>
		</Flex>
	)
}

export default OneDog;

const Flex = styled.div`

	display: flex;
	align-items: center;
	justify-content: center;
	gap: 2rem;
	min-height: calc(100vh - 7rem);
	margin-bottom: 3rem;

`


const CardStyled = styled.div`

	min-width: 260px;
	padding: 1rem;
	background-color: white;
	border-radius: 5px;
	box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.05);
	
	img{
		width: 400px;
		height: 400px;
		object-fit: cover;
		border: solid 1px #eeeeee;
	}

	h3{
		padding-top: 0.5rem;
		font-family: 'Montserrat', sans-serif;
		font-size: 1.5rem;
		font-weight: 600;
	}

`