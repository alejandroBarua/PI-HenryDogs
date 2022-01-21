import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, removeFilterTemp } from '../store/actions';

import styled from 'styled-components';

import { Filters, TempGroup, CardGroup } from '../components';



const Dogs = () => {

	const dispatch = useDispatch();
	const { connect, filterTemps } = useSelector(state => state);
	
	useEffect(() => {
		
		dispatch(getDogs());
		
	}, [connect, filterTemps, dispatch]);

	const handlerOnRemove = (value) => {
		dispatch(removeFilterTemp(value));
	}


	return (
		<DogStyled>
			<Filters />
			<TempGroup 
				temps={filterTemps} 
				handlerOnPressItem={handlerOnRemove} />
			<CardGroup />
		</DogStyled>
	)
}

export default Dogs;


const DogStyled = styled.div`

	margin-bottom: 4rem;
`