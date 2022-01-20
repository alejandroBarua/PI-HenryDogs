import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';



const Card = ({id, name, weight, temps, img}) => {

	return (
		<Link to={`/dogs/${id}`}>
			<CardStyled>
				<img src={img} alt={name} />
				<h3>{name.length > 24 ? name.slice(0, 24) + '...' : name}</h3>
				<p>{weight.includes('NaN') ? 'No description': weight}</p>
			</CardStyled>
		</Link>
	)
}


const CardGroup = () => {

	const dogs = useSelector(state => state.dogs);


	return (
		<Flex>
		{
			dogs.map(({id, name, weight, temps, imgUrl}) => (
			
				<Card 
					key={id}
					id={id}
					name={name}
					weight={weight}
					temps={temps}
					img={imgUrl} />
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
		width: 237px;
		height: 237px;
		object-fit: cover;
		border: solid 1px #eeeeee;
	}
`
