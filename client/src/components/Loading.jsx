import React from 'react';
import styled from 'styled-components';

import loadingImg from '../assets/loading.gif';


const Loading = () => {
	return <LoadingStyled src={loadingImg} alt="" />
}

export default Loading;


const LoadingStyled = styled.img`

	position: relative;
	top: -100px;
	align-self: center;
	width: 50px;
	height: 50px;

	@media(max-width: 950px){
		position: absolute;
		left: 50%;
		top: 300px;
	}	
`