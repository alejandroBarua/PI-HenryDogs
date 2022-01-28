import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';


const sortAZ = (a, b) => a.toLowerCase().localeCompare(b.toLowerCase());


const InputText = ({ icon, text, width = 200, results = [], handlePress }) => {

	const resultsContainer = useRef();
	const inputT = useRef();

	const [inputFocus, setInputFocus] = useState(false);
	const [textInput, setTextInput] = useState('');
	const [resultsFilter, setResultsFilter] = useState(results.sort(sortAZ));
	
	const [resultActive, setResultActive] = useState(-1);
	const [position, setPosition] = useState(-1);
  const [posScroll, setPosScroll] = useState(0);

	const resetPositions = () => {
    setResultActive(-1);
    setPosition(-1);
    setPosScroll(0);
  }

	const handleOnSearch = (value, inputValue = true) => {
		
		handlePress(value, inputValue);
		setTextInput('');
	}

	const handleChangeInput = e => {
		setTextInput(e.target.value);
		resetPositions();
	}

	const handleSumPos = () => {
		
		if(resultsFilter.length > resultActive + 1){
			setResultActive(resultActive + 1);
			if(position < 4) setPosition(position+1); 
			if(position === 4) setPosScroll(posScroll+28.5)
		}
	}
	
	const handleSubPos = () => {

		if(resultActive > 0){
			setResultActive(resultActive - 1);
			if(position > 0) setPosition(position-1); 
			if(position === 0) setPosScroll(posScroll-28.5);
		}
		else resetPositions();
	}

	const handleKeyPress = (e) => {
    
    if(e.key === 'Enter'){
			if(resultActive === -1) return handleOnSearch(textInput, false);
			handleOnSearch(resultsFilter[resultActive]);
    }
    
    if(e.key === "ArrowDown") {
      handleSumPos();
    }

		if(e.key === "Escape") {
      setInputFocus(false);
			inputT.current.blur();
    }

    if(e.key === "ArrowUp"){
      handleSubPos();
    }
  }


	useEffect(() => {
	 	if(!!resultsContainer.current) resultsContainer.current.scroll({top: posScroll})

	}, [posScroll])

	useEffect(() => {

		const filterDogs = results.filter(el => el.toLowerCase().includes(textInput.toLowerCase()))
		setResultsFilter(filterDogs);

	}, [textInput, results])

	const handleOnBlurInput = () => {
		setTimeout(() => {
			setInputFocus(false);
		}, 300);
	}


	return (
		<InputStyled>     
			<Input 
				placeholder={text} 
				width={width}
      	onChange={handleChangeInput}
				value={textInput}
				onKeyDown={handleKeyPress}
				onFocus={() => setInputFocus(true)}
				onBlur={handleOnBlurInput}
				ref={inputT} />

			<Icon src={icon} onClick={() => handleOnSearch(textInput, false)} />

			{
				inputFocus ? 
				<ResultsContainer ref={resultsContainer} width={width} >
					{
						resultsFilter.map((el, index) => (
							<Result 
								key={index}
								className={index === resultActive ? 'resultActive': ''}
								onClick={() => handleOnSearch(el)} >
								
								<p >{el}</p> 
							</Result>
						))
					}
				</ResultsContainer> : ''
			}
			
		</InputStyled>
	)
}

export default InputText;


const InputStyled = styled.div`
	position: relative;
	display: flex;
	align-items: center;

	@media(max-width: 860px){
		width: 100%;
	}	
	
`

const Input = styled.input.attrs({ type: 'text' })`

	font-size: 0.9rem;
	height: 33px;
	width: ${(props => `${props.width}px`)};
	padding: 0.5rem 1rem;
	border-width: 1px 0px 1px 1px;
	border-style: solid;
	border-color: #BBBBBB;
	border-radius: 5px 0 0 5px;

	&::placeholder{
		color: #afafaf;
	}

	@media(max-width: 860px){
		width: 100%;
	  padding: 1.3rem 1.5rem;
	}	
	
`

const Icon = styled.img`

	width: 32px;
	background-color: ${({theme}) => theme.colorPrimary};
	padding: 0.5rem;
	border-radius: 0 5px 5px 0;
	border-style: solid;
	border-width: 1px 1px 1px 0px;
	border-color: #BBBBBB;
	
	&:hover{
		cursor: pointer;
		background-color: #f39e00;
	}

	@media(max-width: 860px){
		height: 43px;
		width: 44px;
		padding: 0.8rem;
	}	

`

const ResultsContainer = styled.div`

	position: absolute;
	top: 33px;
	z-index: 1000;
	background-color: white;
	opacity: 0.9;
	width: ${(props => `calc(${props.width}px + 32px)`)};
	max-height: 145px;
	overflow: hidden;	
	overflow-y: auto;
	border-radius: 0px 0px 0px 2px;
	border: solid 1px rgb(223, 223, 223);

	&::-webkit-scrollbar {
		width: 7px;
		background-color: rgba(212, 212, 212, 0.5);
		border-radius: 0px 0px 2px 0px;
	}

	&::-webkit-scrollbar-thumb {
		background-color: rgb(168, 168, 168);
		border-radius: 10px;
	}

	p{
		color: rgb(129, 129, 129);
		font-size: 0.8rem;
		padding: 0.3rem 1rem;
	}

	@media(max-width: 860px){
		width: 100%;
		top: 42px;

		p{
			padding: 0.3rem 1rem;
		}
	}	

`

const Result = styled.div`

	height: 28.5px;

	&:hover{
		cursor: pointer;
		background-color: ${({theme}) => theme.colorLight};
	}

	&.resultActive{
		background-color: ${({theme}) => theme.colorLight};
	}

`