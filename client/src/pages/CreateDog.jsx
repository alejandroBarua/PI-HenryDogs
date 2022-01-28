import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import axios from 'axios';
import { useSelector } from 'react-redux';

import { TempGroup, InputText, Button } from '../components/index';
import { validateInput, validateFile } from '../helpers/validate';

import defaultPhoto from '../assets/images/defaultImage.png';
import iconAdd from '../assets/icons/icon-add.png';


const CreateDog = () => {

	const imagePreview = useRef();
	const inputFile = useRef();
	const cardImage = useRef();

	const { temps } = useSelector(state => state);

	const initialSendStatus = {
		loading: false,
		success: false,
		error: false
	}

	const initialInput = {
		name: '',
		minWeight: '',
		maxWeight: '',
		minHeight: '',
		maxHeight: '',
		minYear: '',
		maxYear: '',
		temps: []
	}

	const initialErrors = {
		name: true,
		minWeight: true,
		maxWeight: true,
		minHeight: true,
		maxHeight: true,
		minYear: true,
		maxYear: true,
		file: false
	}

	const initialIsEmpty = {
		name: false,
		minWeight: false,
		maxWeight: false,
		minHeight: false,
		maxHeight: false,
		minYear: false,
		maxYear: false,
		temps: false
	}

	const [sendStatus, setSendStatus] = useState(initialSendStatus);
	const [input, setInput] = useState(initialInput);
	const [errors, setErrors] = useState(initialErrors);
	const [isEmpty, setIsEmpty] = useState(initialIsEmpty);
	const [msgError, setMsgError] = useState('');

	const validateEmpty = () => {

		setIsEmpty({
			name: !input.name,
			minWeight: !input.minWeight,
			maxWeight: !input.maxWeight,
			minHeight: !input.minHeight,
			maxHeight: !input.maxHeight,
			minYear: !input.minYear,
			maxYear: !input.maxYear,
			temps: !input.temps.length
		})
	}

	const handleOnChangeInput = (e) => {

		setInput({
			...input,
			[e.target.name]: e.target.value,
		})

		setIsEmpty({
			...isEmpty,
			[e.target.name]: false,
		})
	}
	
	const handlePressTemp = (value, isResult) => {

		if(isResult && !input.temps.includes(value)){

			setInput({
				...input,
				temps: [value, ...input.temps]
			})
			setIsEmpty({
				...isEmpty,
				temps: false,
			})
		} 
	}

	const handlerOnRemove = (value) => {
		setInput({
			...input,
			temps: input.temps.filter(temp => temp !== value)
		})
	}

	const handleOnDragOver = (e) => {
		e.preventDefault();
		cardImage.current.classList.add('dragActive');
	}

	const handleOnDragLeave = (e) => {
		e.preventDefault();
		cardImage.current.classList.remove('dragActive');
	}

	const uploadImage = file => {

		cardImage.current.classList.remove('dragActive');

		if(!validateFile(file)) {

			setErrors({...errors, file: true});
			imagePreview.current.src = defaultPhoto;
			inputFile.current.value = '';
			return;
		}

		const fileReader = new FileReader();
		fileReader.readAsDataURL(file);

		fileReader.addEventListener('load', e => {
			imagePreview.current.src = e.target.result;
		})

		setErrors({...errors, file: false});
	}
	
	const handleUpdateImage = (e) => uploadImage(e.target.files[0]);

	const handleOnDrop = (e) => {
		e.preventDefault();

		inputFile.current.files = e.dataTransfer.files;

		const file = inputFile.current.files[0];
		uploadImage(file);
	}

	const resetForm = (e) => {

		e.target.reset();

		setInput(initialInput);
		setErrors(initialErrors);
		setIsEmpty(initialIsEmpty);

		imagePreview.current.src = defaultPhoto;
		inputFile.current.value = '';
	}


	const handleOnSubmitForm = e => {
		e.preventDefault();

		validateEmpty();

		const file = inputFile.current.files[0];
		const { file : fileError, ...objErrors } = errors;
		
		if(Object.values(objErrors).includes(true)) return;
		if(!input.temps.length) return;

		setSendStatus({
			loading: true,
			success: false,
			error: false
		})

		axios.defaults.headers.post['Content-Type'] = 'application/json';

		axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/dog`, input)
		.then(({data}) => {

			setSendStatus({
				loading: false,
				success: true,
				error: false
			})
			
			if(imagePreview.current.src.includes(defaultPhoto)) return resetForm(e);
			
			const InstFormData = new FormData();
			InstFormData.append('image' , file);
			
			axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/img/${data.id}`, 
			InstFormData , 
			{headers : {'content-type': 'multipart/form-data'}})

			resetForm(e);
		})
		.catch(err => {

			console.log(err);
			setMsgError(err.response.data.error)

			setSendStatus({
				loading: false,
				success: false,
				error: true
			})
		})
		.finally(res => {
			
			setTimeout(() => {

				setSendStatus(initialSendStatus);
				setMsgError('');
			}, 6000);
		})
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
				{
					errors.file && <MsgErrorFile	MsgErrorFile><b>Warning:</b> File extension invalid. The default image will be uploaded.</MsgErrorFile>
				}
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
				{
					isEmpty.name && <MsgError>Name field is required.</MsgError>
				}
				{
				 !input.name ? '' 
				 :	errors.name && <MsgError>Please enter only alphabetical letters.</MsgError>
				}

				<Info>
					<p>Weight (kg)</p>
					<RangeContainer>
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
					</RangeContainer>
				</Info>
				
				{
					(isEmpty.minWeight || isEmpty.maxWeight) && <MsgError>Weight field is required.</MsgError>
				}
				{
					input.minWeight && input.maxWeight ? 
					errors.minWeight || errors.maxWeight ? <MsgError>Please enter a valid number.</MsgError> : '' : ''
				}
				
				<Info>
					<p>Height (cm)</p>
					<RangeContainer>
						<InputStyled 
							className={!input.minHeight ? '' : errors.minHeight ? 'error' : 'valid'}
							placeholder='min' 
							name="minHeight"
							onChange={handleOnChangeInput} />
						<InputStyled 
							className={!input.maxHeight ? '' : errors.maxHeight ? 'error' : 'valid'}
							placeholder='max' 
							name="maxHeight"
							onChange={handleOnChangeInput} />
					</RangeContainer>
				</Info>
				
				{
					(isEmpty.minHeight || isEmpty.maxHeight) &&	<MsgError>Height field is required.</MsgError>
				}
				{
					input.minHeight && input.maxHeight ? 
					errors.minHeight || errors.maxHeight ? <MsgError>Please enter a valid number.</MsgError> : '' : ''
				}

				<Info>
					<p>Life span (year)</p>
					<RangeContainer>
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
					</RangeContainer>
				</Info>

				{
					(isEmpty.minYear || isEmpty.maxYear) && <MsgError>Life span field is required.</MsgError>
				}
				{
					input.minYear && input.maxYear ? 
					errors.minYear || errors.maxYear ? <MsgError>Please enter a valid number.</MsgError> : '' : ''
				}

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

				{
				 	isEmpty.temps &&	<MsgErrorTemps>Please enter at least one temperament.</MsgErrorTemps>
				}

				<Button solid
					text='Create dog'
					width={150} />

					{
					 sendStatus.error && <MsgErrorContainer>
						 <span>Please try again to create.</span>
						 <span className='errorDescription'>{ msgError }</span>
					 </MsgErrorContainer>	
					}

					{
						sendStatus.loading &&	<MsgLoading>...Loading</MsgLoading>
					}

					{
						sendStatus.success && <MsgSuccess>The dog was created.</MsgSuccess>
					}
					
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

	@media(max-width: 950px){
		margin-top: 3rem;
		flex-direction: column;
	}	
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

	@media(max-width: 950px){ 
		width: 100%;
		height: 385px;

		img{
			width: 100%;
			height: 300px;
		}
	}	

	@media(max-width: 700px){ 
		height: 300px;

		img{
			height: 215px;
		}
	}

	@media(max-width: 450px){ 
		height: 200px;

		img{
			height: 120px;
		}
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
		left: -18px;
		right: -18px;
		top: 0;
		bottom: 0;
	}

	@media(max-width: 450px){ 
		bottom: 100px;
	}
`

const Characteristics = styled.form`

	font-size: 18px;
	position: relative;

	h2{
		color: #BBBBBB;
		font-size: 2rem;
		font-weight: 400;
		margin-bottom: 1rem;
	}
	
	min-height: 484px;
	width: 400px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	@media(max-width: 950px){ 
		margin-top: 2rem;
		width: 100%;

		h2{
			text-align: center;
		}
	}	
`

const Info = styled.div`

	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 320px;
	
	.error{
		border-color: #ff7777;
	}
	
	.valid{
		border-color: #39bb39;
	}
	
	@media(max-width: 950px){ 
		width: 100%;
		
		p{
			width: 250px;

		}
	}	
`

const TempContainer = styled.div`

	margin-top: 1rem;

	@media(max-width: 950px){ 
		width	: 100%;

		input{
			width: 100%;
		}
	}	
`

const InputName = styled.input.attrs({ type: 'text' })`

	font-size: 1rem;
	padding: 0.5rem 1rem;
	border: solid 1px #BBBBBB;
	border-radius: 5px;
	width: 220px;
	margin-left: 1rem;

	&::placeholder{
		color: #afafaf;
	}

	@media(max-width: 950px){ 
		width	: 100%;
		padding: 0.7rem;
		margin-left: 0rem;
	}	
`

const InputStyled = styled(InputName)`

	width: 70px;

	@media(max-width: 950px){ 
		margin-left: 0;
		width: auto;
	}
`

const  MsgErrorFile = styled.p`

	font-size: 0.85rem;
	color: ${({theme}) => theme.colorPrimary};
	position: absolute;
	bottom: -30px;
	left: 0;

	@media(max-width: 450px){ 
		bottom: -50px;
	}
`

const MsgError = styled.p`

	text-align: end;	
	color: #ff7777;
	font-size: 0.85rem;
	width: 320px;
	
	@media(max-width: 950px){ 
		width: 100%;
	}
`

const MsgErrorTemps = styled(MsgError)`
	text-align: start;	
	position: relative;
	top: -1rem;
`

const MsgSendStatus = styled.span`

	position: absolute;
	left: 180px;
	bottom: 0;
`

const MsgLoading = styled(MsgSendStatus)``

const MsgSuccess = styled(MsgSendStatus)`
	color: #39bb39;
`

const MsgErrorContainer = styled.div`

	position: absolute;
	left: 180px;
	bottom: 0;
	width: 70%;
	
	span{
		color: #ff7777;
		display: block;
		font-weight: 700;
	}

	span.errorDescription{
		font-size: 0.8rem;
		font-weight: 400;
	}
`

const RangeContainer = styled.div`

	@media(max-width: 950px){ 
		width: 100%;
		display: grid;
		gap: 2rem;
		grid-template-columns: minMax(70px, 1fr) minMax(70px, 1fr);
	}
`