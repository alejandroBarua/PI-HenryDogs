import React from 'react';
import styled from 'styled-components';


const TempItem = ({name, btnRemove = true, handlerOnPress = () => {}}) => {

	return (
		<Item 
			cursor={`${btnRemove}`} 
			onClick={() => handlerOnPress(name)} >
			<Name>{name}</Name>
			{
				btnRemove ? <span className='btnx'>x</span> : ''
			}
			
		</Item>
	)
}


const TempGroup = ({ temps, btnRemove, handlerOnPressItem }) => {

	return (
		<Flex>
			{
				temps.map((el, index) => (
					
					<TempItem 
						key={index} 
						name={el}
						btnRemove={btnRemove}
						handlerOnPress={handlerOnPressItem}
						className="tempItem" />)
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
	padding: 0.15rem 0rem 0rem 0.7rem;
	margin-right: 0.5rem;
	margin-bottom: 0.5rem;
	cursor: ${({cursor}) => cursor === 'true' ? 'pointer' : 'auto'};
	
	.btnx{
		font-weight: bold;
		padding-right: 0.7rem;
	}
	
	.btnx:hover{
		color: #e66700;
	}
`

const Name = styled.span`

	padding-right: 0.7rem;

` 