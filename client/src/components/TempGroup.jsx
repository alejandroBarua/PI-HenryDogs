import React from 'react';
import styled from 'styled-components';



const TempItem = ({name}) => {
	return (
		<Item>
			<span>{name}</span>
			<span className='btnx'>x</span>
		</Item>
	)
}


const TempGroup = () => {

	const temps = ['Active', 'Active', 'Active'];

	return (
		<Flex>
			{
				temps.map((el, index) => <TempItem key={index} name={el} />)
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
	
	.btnx{
		font-weight: bold;
		padding: 0.7rem;
	}
	
	.btnx:hover{
		cursor: pointer;
		color: #e66700;
	}
`