import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setLoading } from '../store/actions';


import { Button } from './index';
import imgDogSleep from '../assets/notfound.png';


const NotFound = ({msg = '', code = '', redirect='/', textBtn = '', reload=false}) => {

	const dispatch = useDispatch();

	const handleOnBack = () => {
		dispatch(setLoading(true));
	}

	const handleOnReload = () => {
		window.location.reload()
	} 

	return (
		<NotFoundStyled>
			<img src={imgDogSleep} alt="" />
			<p>{`Sorry... ${code ? code : ''}`}</p>
			<span>{msg}</span>
			{
				(textBtn && !reload) && <div onClick={handleOnBack}>
					<Link to={redirect}>
									<Button text={textBtn} />
								</Link>
				</div> 
			}
			{
				reload && <div onClick={handleOnReload}>
					<Button text='Reload page' />
				</div>
			}
		</NotFoundStyled>

	)
}
export default NotFound;


const NotFoundStyled = styled.div`

	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	margin-top: 3rem;

	img{
		width: 350px;
	}

	p{
		font-family: 'Montserrat', sans-serif;
		font-size: 3rem;
	}

	span{
		font-size: 1.2rem;
		font-weight: 300;
		margin-bottom: 1.5rem;
	}

	@media(max-width: 600px){

		img{
			width: 250px;
		}
		p{
			font-size: 2rem;
		}
		span{
			font-size: 1rem;
		}
	}	

`