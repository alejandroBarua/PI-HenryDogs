import React from 'react';
import styled from 'styled-components';


const InputText = ({ icon, text, width = 200 }) => {
	return (
		<InputContainer >
			<Input placeholder={text} width={width} />
			<Icon src={icon} />
		</InputContainer>
	)
}

export default InputText;


const InputContainer = styled.div`

	display: flex;
	align-items: center;
	
`

const Input = styled.input.attrs({ type: 'text' })`

	font-size: 0.9rem;
	height: 33px;
	width: ${(props => `${props.width}px`)};
	padding: 0.5rem 1rem;
	border-width: 1px 0px 1px 1px;
	border-style: solid;
	border-color: #BBBBBB;
	border-radius: 5px 0 0 5px;

	&::placeholder{
		color: #afafaf;
	}
	
`

const Icon = styled.img`

	width: 32px;
	background-color: ${({theme}) => theme.colorPrimary};
	padding: 0.5rem;
	border-radius: 0 5px 5px 0;
	border-style: solid;
	border-width: 1px 1px 1px 0px;
	border-color: #BBBBBB;
	
	&:hover{
		cursor: pointer;
		background-color: #f39e00;
	}

`