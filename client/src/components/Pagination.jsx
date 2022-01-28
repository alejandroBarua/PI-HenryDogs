import React from 'react';
import styled from 'styled-components';

import { useSelector, useDispatch } from 'react-redux';
import { setPage } from '../store/actions';


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

	const dispatch = useDispatch();
	const totalPages = Math.ceil(total / 8);

	const handleOnNext = () => {
	 if(page !== totalPages) dispatch(setPage(page+1));
	}

	const handleOnPrevious = () => {
		if(page !== 1) dispatch(setPage(page-1));
	}

	return (
		<PaginationStyled>
			<Flex>
				{
					(totalPages && totalPages !== 1) ? <p className={page !== 1 ? 'previous': 'previous-inactive'}
											 onClick={handleOnPrevious}>Previous</p> : ''
				}
				{
					totalPages <= 6 ? (
						<>
							{
								[...Array(total)].slice(0, totalPages).map((el, index) => (
									<Item 
										key={index} 
										num={index+1}
										page={page} />
								))
							}
						</>
					)
					: (
						totalPages - page <=5 ?
							(
								<>
									<Item num={1} page={page} />
									<span>...</span>
									{

										[...Array(total)].slice(totalPages-6, totalPages).map((el, index) => (
											<Item 
												key={index} 
												num={totalPages+index-5}
												page={page} />
										))
									}
								</>
							)
						: (
							<>
								<Item num={page} page={page} />
								<Item num={page+1} page={page}/>
								<Item num={page+2} page={page}/>
								<span>...</span>
								<Item num={totalPages-2} page={page} />
								<Item num={totalPages-1} page={page} />
								<Item num={totalPages} page={page} />
							</>
						)
					)
				}
				{
					(totalPages && totalPages !== 1) ? <p className={page !== totalPages ? 'next': 'next-inactive'}
											onClick={handleOnNext}>Next</p> : ''
				}
			</Flex>
		</PaginationStyled>
	)
}

export default Pagination;


const PaginationStyled = styled.div`
	position: absolute;
	bottom: -70px;
	left: 0;
	right: 0;
	margin-top: 3rem;
`

const Flex = styled.div`

	display: flex;
	justify-content: center;
	align-items: center;

	span{
		padding: 0rem 0.2rem;
	}

	.next{
		margin-left: 0.9rem;
	}

	.previous{
		margin-right: 0.9rem;
	}
	
	.next-inactive{
		color: #c8c8c8;
		margin-left: 0.9rem;
	}

	.previous-inactive{
		color: #c8c8c8;
		margin-right: 0.9rem;
	}

	.next:hover,
	.previous:hover{
		cursor: pointer;
		color: ${({theme}) => theme.colorPrimary};
	}

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
