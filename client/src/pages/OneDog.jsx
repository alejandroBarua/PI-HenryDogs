import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';

import styled from 'styled-components';

import defaultPhoto from '../assets/images/defaultImage.png';
import { TempGroup } from '../components/index';


const OneDog = () => {

  const { idDog } = useParams();
	const [dog, setDog] = useState({
		name: '',
		weight: '',
		height: '',
		life_span: '',
		imgUrl: '',
		temps: []
	})

	useEffect(() => {

		axios.get(`http://localhost:8081/api/dogs/${idDog}`)
			.then(({data}) => setDog(data))
			.catch(err => console.log(err))

	}, []);

	return (
		<Flex>
			<CardStyled>
				<img src={dog.imgUrl || defaultPhoto} alt={dog.name} />
				<h3>{dog.name}</h3>
			</CardStyled>
			<Characteristics>
				<h2>Dog characteristics</h2>
				<Info>
					<p>Weight:</p>
					<div>
						<span>{dog.weight}</span>
					</div>
				</Info>
				<Info>
					<p>Height:</p>
					<div>
						<span>{dog.height}</span>
					</div>
				</Info>
				<Info>
					<p>Life span:</p>
					<div>
						<span>{dog.life_span}</span>
					</div>
				</Info>
				<TempContainer>
					<p>Temperament:</p>
					<TempGroup 
						temps={dog.temps}
						btnRemove={false} />
				</TempContainer>
			</Characteristics>
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
	height: 484px;
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
		color: #616161;
		padding-top: 0.5rem;
		font-family: 'Montserrat', sans-serif;
		font-size: 1.5rem;
		font-weight: bold;
	}

`

const Characteristics = styled.div`

	font-size: 18px;

	h2{
		color: #BBBBBB;
		font-size: 2rem;
		font-weight: 400;
		margin-bottom: 1rem;
	}
	
	height: 420px;
	width: 400px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

`

const Info = styled.div`

	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 250px;

	& > div{
		background-color: #E5E5E5;
		border-radius: 5px;
		padding: 0.5rem 1rem;
		margin-left: 1rem;
		width: 150px;
	}
`

const TempContainer = styled.div`

	margin-top: 1rem;
`