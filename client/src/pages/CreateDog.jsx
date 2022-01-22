import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import styled from 'styled-components';
import { Input } from '../styles';


import defaultPhoto from '../assets/images/defaultImage.png';
import iconAdd from '../assets/icons/icon-add.png';
import { validateInput } from '../helpers/validate';
import { TempGroup, InputText, Button } from '../components/index';


const CreateDog = () => {

	const imagePreview = useRef();
	const inputFile = useRef();
	const cardImage = useRef();

	const { temps } = useSelector(state => state);

	const [input, setInput] = useState({
		name: '',
		minWeight: '',
		maxWeight: '',
		minHeight: '',
		maxHeight: '',
		minYear: '',
		maxYear: '',
		temps: []
	})

	const [errors, setErrors] = useState({
		name: true,
		minWeight: true,
		maxWeight: true,
		minHeight: true,
		maxHeigt: true,
		minYear: true,
		maxYear: true,
	})
	
	const handleOnChangeInput = (e) => {
		setInput({
			...input,
			[e.target.name]: e.target.value,
		})
	}
	
	const handlePressTemp = (value, isResult) => {

		if(isResult && !input.temps.includes(value)){
			setInput({
				...input,
				temps: [value, ...input.temps]
			})
		} 
	}

	const handlerOnRemove = (value) => {
		setInput({
			...input,
			temps: input.temps.filter(temp => temp !== value)
		})
	}

	const handleOnSubmitForm = e => {
		e.preventDefault();

		const objErrors = validateInput(input);
		setErrors(objErrors);

		if(Object.values(objErrors).includes(true)) return;

		axios.defaults.headers.post['Content-Type'] = 'application/json';

		axios.post(`http://localhost:8081/api/dog`, input)
		.then(({data}) => {

			const InstFormData = new FormData();
			const file = inputFile.current.files[0];
			InstFormData.append('image' , file);
			
			axios.post(`http://localhost:8081/api/img/${data.id}`, 
				InstFormData , 
				{headers : {'content-type': 'multipart/form-data'}});

		})
		.catch(err => console.log(err))

	}

	const uploadImage = file => {
		const fileReader = new FileReader();
		fileReader.readAsDataURL(file);

		fileReader.addEventListener('load', e => {
			imagePreview.current.src = e.target.result;
		})

		cardImage.current.classList.remove('dragActive');
	}
	
	const handleUpdateImage = (e) => {

		uploadImage(e.target.files[0]);
	}


	const handleOnDragOver = (e) => {
		e.preventDefault();
		cardImage.current.classList.add('dragActive');
	}

	const handleOnDragLeave = (e) => {
		e.preventDefault();
		cardImage.current.classList.remove('dragActive');
	}

	const handleOnDrop = (e) => {
		e.preventDefault();

		inputFile.current.files = e.dataTransfer.files;

		const file = inputFile.current.files[0];
		uploadImage(file);
	}


	useEffect(() => {
		setErrors(validateInput(input));

	}, [input]);
	

	return (
		<Flex>
			<CardStyled ref={cardImage} onClick={() => inputFile.current.click()}>
				<img 
					ref={imagePreview} 
					src={defaultPhoto} 
					alt={input.name}
					onDragOver={handleOnDragOver}
					onDragLeave={handleOnDragLeave}
					onDrop={handleOnDrop} />
				<h3>{input.name}</h3>

				<InputFile 
					onDragOver={handleOnDragOver}
					onDragLeave={handleOnDragLeave}
					onDrop={handleOnDrop} >
					<input 
					type="file"
					ref={inputFile}  
					onChange={handleUpdateImage} />
				</InputFile>
			</CardStyled>
			<Characteristics onSubmit={handleOnSubmitForm}>
				<h2>Dog characteristics</h2>
				<Info>
					<p>Name:</p>
					<InputName
						className={!input.name ? '' : errors.name ? 'error' : 'valid'}
						placeholder='new breed' 
						name="name"
						onChange={handleOnChangeInput} />
				</Info>
				<Info>
					<p>Weight (kg)</p>
					<div>
						<InputStyled 
							className={!input.minWeight ? '' : errors.minWeight ? 'error' : 'valid'}
							placeholder='min' 
							name="minWeight"
							onChange={handleOnChangeInput} />
						<InputStyled 
							className={!input.maxWeight ? '' : errors.maxWeight ? 'error' : 'valid'}
							placeholder='max' 
							name="maxWeight"
							onChange={handleOnChangeInput} />
					</div>
				</Info>
				<Info>
					<p>Height (cm)</p>
					<div>
						<InputStyled 
							className={!input.minHeight ? '' : errors.minHeight ? 'error' : 'valid'}
							placeholder='min' 
							name="minHeight"
							onChange={handleOnChangeInput} />
						<InputStyled 
							className={!input.maxHeight ? '' : errors.maxHeigt ? 'error' : 'valid'}
							placeholder='max' 
							name="maxHeight"
							onChange={handleOnChangeInput} />
					</div>
				</Info>
				<Info>
					<p>Life span (year)</p>
					<div>
						<InputStyled 
							className={!input.minYear ? '' : errors.minYear ? 'error' : 'valid'}
							placeholder='min' 
							name="minYear"
							onChange={handleOnChangeInput} />
						<InputStyled 
							className={!input.maxYear ? '' : errors.maxYear ? 'error' : 'valid'}
							placeholder='max' 
							name="maxYear"
							onChange={handleOnChangeInput} />
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
						temps={input.temps}
						handlerOnPressItem={handlerOnRemove} />
				</TempContainer>
				<Button solid
					text='Create dog'
					width={150} />
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

	position: relative;
	min-width: 260px;
	height: 484px;
	padding: 1rem;
	background-color: white;
	border-radius: 5px;
	box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.05);
	cursor: pointer;

	&.dragActive{
		background-color: #FFEFD8;
	}
	
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

const InputFile = styled.div`

	position: absolute;
	bottom: 110px;
  left: 50%;
  transform: translate(-50%);

	&::before {
		content: 'Choose a image or drag it here.';
		background-color: white;
		color: ${({theme}) => theme.colorPrimary};
		border: 1px solid ${({theme}) => theme.colorPrimary};
		border-radius: 5px;
		padding: 1.2rem;
		font-weight: 700;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		left: -8px;
		right: -8px;
		top: 0;
		bottom: 0;
	}
	

`

const Characteristics = styled.form`

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

	.error{
		border-color: red;
	}

	.valid{
		border-color: green;
	}

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