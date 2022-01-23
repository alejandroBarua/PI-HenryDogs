import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, removeFilterTemp } from '../store/actions';

import styled from 'styled-components';

import { 
	Filters, 
	TempGroup, 
	CardGroup,
	Pagination 
} from '../components';



const Dogs = () => {

	const dispatch = useDispatch();
	const { connect, filterTemps, searchName, optOrder, page } = useSelector(state => state);

	
	useEffect(() => {
		
		dispatch(getDogs());
		
	}, [connect, filterTemps, searchName, optOrder, page, dispatch]);

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
			<Pagination />
		</DogStyled>
	)
}

export default Dogs;


const DogStyled = styled.div`

	position: relative;
	margin-bottom: 8rem;
`