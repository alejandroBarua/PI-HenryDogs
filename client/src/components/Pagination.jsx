import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPage } from '../store/actions';

import styled from 'styled-components';

const Item = ({num, page}) => {

	const dispatch = useDispatch();

	const handleOnPressPage = (value) => {
		dispatch(setPage(value));
	}

	return (
		<ItemPage 
			className={page === num ? 'pageActive' : ''}
			onClick={() => handleOnPressPage(num)}>
			{
				num
			}
		</ItemPage>
	)
}


const Pagination = () => {

	const { total, page } = useSelector(state => state);

	return (
		<Flex>
			{
				[...Array(total)].slice(0, Math.ceil(total / 8)).map((el, index) => (
					<Item 
						key={index} 
						num={index+1}
						page={page} />
				))
			}
		</Flex>
	)
}

export default Pagination;


const Flex = styled.div`

	display: flex;
	justify-content: center;
	margin-top: 3rem;
`

const ItemPage = styled.div`

	display: flex;
	align-items: center;
	justify-content: center;
	width: 30px;
	height: 30px;
	border-radius: 50%;
	cursor: pointer;

	&:hover{
		color: ${({theme}) => theme.colorPrimary};
	}

	&.pageActive{
		background-color: ${({theme}) => theme.colorMedium};
		color: white;
		font-weight: 700;
	}
`