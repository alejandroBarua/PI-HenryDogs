import React from 'react';
import styled from 'styled-components';


import { Filters, TempGroup, CardGroup } from '../components';

const Dogs = () => {


	return (
		<DogStyled>
			<Filters />
			<TempGroup />
			<CardGroup />
		</DogStyled>
	)
}

export default Dogs;


const DogStyled = styled.div`

	margin-bottom: 4rem;
`