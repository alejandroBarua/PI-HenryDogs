import React, { useState } from 'react';
import styled from 'styled-components';

import { InputText } from './index';

import iconAdd from '../assets/icons/icon-add.png';

const Filters = () => {

	const [radioSelected, setRadioSelected] = useState('radio1');

	const handleRadioChange = (e) => setRadioSelected(e.target.value);
	

	return (
		<FilterStyled>
			<OptLeft>
				<InputText
					icon={iconAdd}
					text='Filter by temperament' />

				<Flex>
					<span>Sort by:</span>
					<SelectStyled>
						<select>
							<option value="1" selected>Name A-Z</option>
							<option value="2">Name Z-A</option>
							<option value="3">Weight low to high</option>
							<option value="4">Weight low to low</option>
						</select>
					</SelectStyled>
				</Flex>
			</OptLeft>

			<OptRight onSubmit={e => e.preventDefault()}>

					<label>All
						<input 
							type="radio" 
							name="filterRadio" 
							value='radio1'
							checked={radioSelected === 'radio1'} 
							onChange={handleRadioChange} />
					</label>
					<label>Exist
						<input 
							type="radio" 
							name="filterRadio" 
							value='radio2'
							checked={radioSelected === 'radio2'} 
							onChange={handleRadioChange} />
					</label>
					<label>Created
						<input 
							type="radio" 
							name="filterRadio" 
							value='radio3'
							checked={radioSelected === 'radio3'} 
							onChange={handleRadioChange} />
					</label>
			</OptRight>
		</FilterStyled>
	)
}

export default Filters;


const Flex = styled.div`

	display: flex;
	align-items: center;

`

const FilterStyled = styled(Flex)`

	justify-content: space-between;
`

const OptLeft = styled(Flex)`

	span{
		margin-left: 2rem;
	}
`

const SelectStyled = styled.div`
	margin-left: 1rem;
	background-color: #fff;
	border: 1px solid #BBBBBB;
	border-radius: 5px;
	position: relative;
  
	&:before {
		content: '';
			position: absolute;
			right: 1rem;
			top: 13px;
			width: 0;
			height: 0;
			border-style: solid;
			border-width: 7px 5px 0 5px;
			border-color: #7E7E7E transparent transparent transparent;
			z-index: 5;
			pointer-events: none;
	}
	
	select{
		color: #7E7E7E;
		font-size: 0.9rem;
		width: 190px;
	  padding: 0.5rem 1rem;
    background-color: transparent;
    appearance: none;
	}

`

const OptRight = styled.form`

	label{
		margin-left: 1.2rem;
	}

	input{
		position: relative;
		top: 1px;
		margin-left: 0.5rem;
	}

`