import React from 'react';
import styled from 'styled-components';

import photoDog from '../assets/images/dW5UucTIW.jpg';


const Card = ({id, name, weight, img}) => {

	return (

		<CardStyled>
			<img src={img} alt={name} />
			<h3>{name}</h3>
			<p>{weight}</p>
		</CardStyled>
	)
}



const CardGroup = () => {

	const dogs = [
		{
			id: 1,
			name: "Alapaha Blue Blood Bulldog",
			weight: "23 - 27 kg",
			image: photoDog
		},
		{
			id: 2,
			name: "alejandro",
			weight: "23 - 27 kg",
			image: photoDog
		},
		{
			id: 1,
			name: "Alapaha Blue Blood Bulldog",
			weight: "23 - 27 kg",
			image: photoDog
		},
		{
			id: 2,
			name: "alejandro",
			weight: "23 - 27 kg",
			image: photoDog
		},
		{
			id: 1,
			name: "Alapaha Blue Blood Bulldog",
			weight: "23 - 27 kg",
			image: photoDog
		},
		{
			id: 2,
			name: "alejandro",
			weight: "23 - 27 kg",
			image: photoDog
		},
		{
			id: 1,
			name: "Alapaha Blue Blood Bulldog",
			weight: "23 - 27 kg",
			image: photoDog
		},
		{
			id: 2,
			name: "alejandro",
			weight: "23 - 27 kg",
			image: photoDog
		}
	]


	return (
		<Flex>
		{
			dogs.map(({id, name, weight, image}) => (
			
				<Card 
					key={id}
					name={name}
					weight={weight}
					img={image} />
			))
		}
		</Flex>
	)
}

export default CardGroup;


const Flex = styled.div`

	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 1.55rem;
	margin-top: 2rem;
`

const CardStyled = styled.div`

	min-width: 260px;
	padding: 0.7rem;
	background-color: white;
	border-radius: 5px;
	box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.05);

	h3{
		font-family: 'Montserrat', sans-serif;
		font-size: 1rem;
		font-weight: 600;
	}

	p{
		font-size: 0.75rem;
		color: ${({theme}) => theme.colorPrimary};
	}

	img{
		max-width: 237px;
		min-height: 237px;
		object-fit: cover;
	}
`
