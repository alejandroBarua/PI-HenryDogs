import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import defaultPhoto from '../assets/images/defaultImage.png';


const Card = ({id, name, weight, temps, img}) => {

	const [showTemps, setShowTemps] = useState(false);

	
	const handleEnter = () => setShowTemps(true);
	const handleLeave = () => setShowTemps(false);
	
	return (
		<Link to={`/dogs/${id}`}>
			<CardStyled>
				<ImageContainer 
					onMouseEnter={handleEnter}
					onMouseLeave={handleLeave} >
					<img src={img || defaultPhoto} alt={name}/>

					<CardTemps show={showTemps}>
						{
							temps.map((el, index) => <span key={index}>{el}</span>)
						}
					</CardTemps>
				</ImageContainer>
				<h3>{name.length > 24 ? name.slice(0, 24) + '...' : name}</h3>
				<p>{weight.includes('NaN') ? 
							weight.includes('-') ? 
								weight.split('NaN').join('').split('-').join('').trim()
								: 'No value'
							: weight}</p>
			</CardStyled>
		</Link>
	)
}

export default Card;


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

	@media(max-width: 919px){

		img{
			width: 100%;
			object-position: top;
		}
	}	
`

const ImageContainer = styled.div`
	position: relative;
`

const CardTemps = styled.div`

	background-color: white;
	color: #5d5d5d;
	padding: 1rem;
	display: flex;
	flex-direction: column;
	flex-flow: column wrap;
	max-height: 180px;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;

	opacity: ${props => props.show ? '0.8' : '0'};
	transition: opacity 0.300s;
	
	@media(max-width: 919px){
		padding: 2rem;
	}	
`