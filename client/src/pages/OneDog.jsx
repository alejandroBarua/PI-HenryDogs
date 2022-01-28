import React from 'react';
import styled from 'styled-components';
import { useParams } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux';
import { getOneDog } from '../store/actions';

import { TempGroup, MsgNotFound, Loading  } from '../components';
import defaultPhoto from '../assets/images/defaultImage.png';


const OneDog = () => {

	const { oneDog: dog, serverError: error, loading } = useSelector(state => state);

	const dispatch = useDispatch();
  const { idDog } = useParams();
	
	React.useEffect(() => {
		
		dispatch(getOneDog(idDog));
	}, []);


	return (
		<Flex>

			{
				loading && <Loading />
			}

			{
				error && <MsgNotFound 
										msg = 'The id was not found'
										code='400'
										redirect='/'
										textBtn='Back home' />
			}
			{
				(error || !Object.values(dog).length) ? '' : <>
						<CardStyled>
							<img src={dog.imgUrl || defaultPhoto} alt={dog.name} />
							<h3>{dog.name}</h3>
						</CardStyled>
						<Characteristics>
							<h2>Dog characteristics</h2>
							<Info>
								<p>Weight:</p>
								<div>
									<span className='weight'>{dog.weight.includes('NaN') ? 
										dog.weight.includes('-') ? 
											dog.weight.split('NaN').join('').split('-').join('').trim()
											: 'No value'
										: dog.weight}</span>
								</div>
							</Info>
							<Info>
								<p>Height:</p>
								<div>
									<span className='height'>{dog.height}</span>
								</div>
							</Info>
							<Info>
								<p>Life span:</p>
								<div>
									<span className='life_span'>{dog.life_span}</span>
								</div>
							</Info>
							<TempContainer>
								<p>Temperament:</p>
								<TempGroup 
									temps={dog.temps}
									btnRemove={false} />
							</TempContainer>
						</Characteristics>
				</>
			}

		</Flex>
	)
}

export default OneDog;


const Flex = styled.div`

	display: flex;
	align-items: center;
	justify-content: center;
	gap: 3rem;
	min-height: calc(100vh - 9rem);
	margin-bottom: 3rem;

	@media(max-width: 970px){
		margin-top: 3rem;
		flex-direction: column;
	}	
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

	@media(max-width: 970px){ 
		width: 100%;
		height: 485px;

		img{
			width: 100%;
			object-position: top;
			height: 400px;
		}
	}	

	@media(max-width: 680px){ 
		height: 385px;
		
		img{
			height: 300px;
		}
	}	
`

const Characteristics = styled.div`

	font-size: 18px;
	height: 420px;
	width: 400px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	h2{
		color: #BBBBBB;
		font-size: 2rem;
		font-weight: 400;
		margin-bottom: 1rem;
	}

	@media(max-width: 970px){ 
		width: 100%;
		height: auto;

		h2{
			text-align: center;
		}
	}	
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

	@media(max-width: 970px){ 
		width: 100%;
		background-color: #e9e9e9;
		padding: 0.5rem 0.5rem;
		margin: 0.2rem 0rem;
		border-radius: 5px;

		& > div {
			background-color: white;
			border: solid 1px #dbdbdb;
		}
	}	
`

const TempContainer = styled.div`
	margin-top: 1rem;
`