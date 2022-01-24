import React from 'react';
import styled from 'styled-components';
import { MsgNotFound } from '../components';

const NotFound = () => {
	return (
		<NotFoundContainer>
			<MsgNotFound 
				msg = 'Page not Found'
				code='404'
				redirect='/'
				textBtn='Back home' />
		</NotFoundContainer>
	)
}

export default NotFound;


const NotFoundContainer = styled.div`

	min-height: calc(100vh - 7rem);
	display: flex;
	justify-content: center;

`