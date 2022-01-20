import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFilterTemp, addDogs } from '../store/actions';

import styled from 'styled-components';

import { dogsList } from '../data';

const TempItem = ({name}) => {

	const dispatch = useDispatch();
	const handlerOnRemove = (value) => {
		dispatch(removeFilterTemp(value));
		dispatch(addDogs(dogsList));
	};

	return (
		<Item onClick={() => handlerOnRemove(name)}>
			<span>{name}</span>
			<span className='btnx'>x</span>
		</Item>
	)
}


const TempGroup = () => {

	const filterTemps = useSelector(state => state.filterTemps);

	return (
		<Flex>
			{
				filterTemps.map((el, index) => (
					
					<TempItem 
						key={index} 
						name={el} />)
				)
			}
		</Flex>
	)
}

export default TempGroup;


const Flex = styled.div`

	display: flex;
	flex-wrap: wrap;
	margin-top: 1rem;
`


const Item = styled.div`

	font-size: 0.9rem;
	background-color: ${({theme}) => theme.colorLight};
	color: ${({theme}) => theme.colorPrimary};
	border: solid 1px ${({theme}) => theme.colorPrimary};
	border-radius: 1.5rem;
	padding: 0.1rem 0rem 0.1rem 1rem;
	margin-right: 0.5rem;
	margin-bottom: 0.5rem;
	cursor: pointer;
	
	.btnx{
		font-weight: bold;
		padding: 0.7rem;
	}
	
	.btnx:hover{
		color: #e66700;
	}
`