import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import styled from 'styled-components';
import { Input } from '../styles';


import defaultPhoto from '../assets/images/defaultImage.png';
import iconAdd from '../assets/icons/icon-add.png';

import { TempGroup, InputText, Button } from '../components/index';


const CreateDog = () => {

	const { temps } = useSelector(state => state);
	const [tempsList, setTempsList] = useState([]);
	const [name, setName] = useState('');

	const [dog, setDog] = useState({
		name: '',
		weight: '',
		height: '',
		life_span: '',
		imgUrl: '',
		temps: []
	})

	const handlePressTemp = (value, isResult) => {

		if(isResult && !tempsList.includes(value)){
			setTempsList([value, ...tempsList]);
		} 
	}

	const handlerOnRemove = (value) => {
		setTempsList(tempsList.filter(temp => temp !== value))
	}


/* 	useEffect(() => {

		axios.get(`http://localhost:8081/api/dogs/${idDog}`)
			.then(({data}) => setDog(data))
			.catch(err => console.log(err))

	}, []); */

	return (
		<Flex>
			<CardStyled>
				<img src={dog.imgUrl || defaultPhoto} alt={dog.name} />
				<h3>{name}</h3>
			</CardStyled>
			<Characteristics>
				<h2>Dog characteristics</h2>
				<Info>
					<p>Name:</p>
					<InputName
						placeholder='new breed' name="name"
						onChange={e => setName(e.target.value)} />
				</Info>
				<Info>
					<p>Weight (kg)</p>
					<div>
						<InputStyled 
							placeholder='min' name="weightMin" />
						<InputStyled 
							placeholder='max' name="weightMax" />
					</div>
				</Info>
				<Info>
					<p>Height (cm)</p>
					<div>
						<InputStyled 
							placeholder='min' name="heightMin" />
						<InputStyled 
							placeholder='max' name="heighMax" />
					</div>
				</Info>
				<Info>
					<p>Life span (year)</p>
					<div>
						<InputStyled 
							placeholder='min' name="life_spanMin" />
						<InputStyled 
							placeholder='max' name="life_spanMax" />
					</div>
				</Info>
				<TempContainer>
					<InputText
						icon={iconAdd}
						text='Add temperament'
						width={170}
						results={temps}
						handlePress={handlePressTemp} />
					<TempGroup 
						temps={tempsList}
						handlerOnPressItem={handlerOnRemove} />
				</TempContainer>
				<Button solid
					text='Create dog'
					width={150}
					onClick={() => console.log(name)} />
			</Characteristics>
		</Flex>
	)
}

export default CreateDog;


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
	
	height: 484px;
	width: 400px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

`

const Info = styled.div`

	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 320px;

`

const TempContainer = styled.div`

	margin-top: 1rem;
`

const InputName = styled(Input)`

	width: 220px;
	border-width: 1px;
	border-radius: 5px;
	border-width: 1px;
	margin-left: 1rem;

`

const InputStyled = styled(InputName)`

	width: 70px;
`
