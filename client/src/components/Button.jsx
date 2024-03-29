import React from 'react';
import styled from 'styled-components';


const Button = ({text = 'I am a Button', solid, width, onClick}) => {
	return (
		<ButtonStyled 
			solid={solid} 
			width={width}
			onClick={onClick}>{text}</ButtonStyled>
	)
}

export default Button;


const ButtonStyled = styled.button`

  background: ${({solid, theme}) => solid ? theme.colorPrimary : "#F0F0F0"};
  color: ${({solid, theme}) => solid ? "#F0F0F0" : theme.colorPrimary};
	box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.05);

	width: ${(props => `${props.width}px` || 'none')};
  font-size: 1em;
	font-weight: 700;
  padding: 0.5em 1em;
  border: 2px solid ${({theme}) => theme.colorPrimary};
  border-radius: 5px;

	&:hover{
		cursor: pointer;
		background: ${({solid, theme}) => solid ? "#F0F0F0" : theme.colorPrimary};
  	color: ${({solid, theme}) => solid ? theme.colorPrimary : "#F0F0F0"};
	}
`;
