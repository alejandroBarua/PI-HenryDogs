import React, { useEffect } from 'react';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { getDogs, removeFilterTemp, setLoading } from '../store/actions';

import { 
	Filters, 
	TempGroup, 
	CardGroup,
	Pagination 
} from '../components';


const Dogs = () => {

	const dispatch = useDispatch();
	const { connect, filterTemps, searchName, optOrder, page } = useSelector(state => state);

	const handlerOnRemove = (value) => {
		dispatch(removeFilterTemp(value));
	}

	useEffect(() => {

		dispatch(setLoading(true));
		dispatch(getDogs());

	}, [connect, filterTemps, searchName, optOrder, page, dispatch]);
	
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