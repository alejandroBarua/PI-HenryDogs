import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
	addFilterTemp, 
	setOptOrder, 
	setConnect,

} from '../store/actions';

import styled from 'styled-components';
import { Input } from '../styles';

import { InputText } from './index';

import iconAdd from '../assets/icons/icon-add.png';



const Filters = () => {

	const dispatch = useDispatch();
	const { temps, optOrder, connect } = useSelector(state => state);

	const handleRadioChange = (e) => dispatch(setConnect(e.target.value));

	const handlePressTemp = (value, isResult) => {
		if(isResult) dispatch(addFilterTemp(value));
	}

	const handleChangeOpt = e => {
		const optValue = Number(e.target.value);
		dispatch(setOptOrder(optValue));
	}


	return (
		<FilterStyled>
			<OptLeft>
				<InputText
					icon={iconAdd}
					text='Filter by temperament'
					results={temps}
					handlePress={handlePressTemp} />

				<Flex>
					<span>Sort by:</span>
					<SelectStyled>
						<select 
							defaultValue={optOrder}
							onChange={handleChangeOpt}>
							<option value="1">Name A-Z</option>
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
							value='dataAll'
							checked={connect === 'dataAll'} 
							onChange={handleRadioChange} />
					</label>
					<label>Exist
						<input 
							type="radio" 
							name="filterRadio" 
							value='dataAPI'
							checked={connect === 'dataAPI'} 
							onChange={handleRadioChange} />
					</label>
					<label>Created
						<input 
							type="radio" 
							name="filterRadio" 
							value='dataDB'
							checked={connect === 'dataDB'} 
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

	margin-top: 1rem;
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