import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getDogs } from '../store/actions';

import styled from 'styled-components';




import { Filters, TempGroup, CardGroup } from '../components';

const Dogs = () => {

/* 	const dispatch = useDispatch();
	
	useEffect(() => {
		
		dispatch(getDogs());
		
	}, []); */

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