import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";



import bannerImg from '../assets/images/banner.png';

import { Contact, Button } from '../components';

const Home = () => {
	return (
		<Grid>
			<Banner src={bannerImg} alt="" />
				<Flex>
					<Message>
						<h1>The best web application to learn everything about your best friend</h1>
						<Link to='/dogs'>
							<Button text='Start discovering' />
						</Link>
					</Message>
					<ContactContainer>
						<Contact />
					</ContactContainer>
				</Flex>
		</Grid>
	)
}

export default Home;

const Grid = styled.div`

	display: grid;
	grid-template-columns: 450px 1fr;
	grid-template-rows: calc(100vh - 7rem);
	align-items: end;

	@media(max-width: 970px){
		display: block;
	}
`

const Banner = styled.img`
	
	width: 440px;

	@media(max-width: 970px){
		position: absolute;
		bottom: 0;
		width: 300px;
	}

	@media(max-width: 860px){
		position: absolute;
		bottom: 0;
		width: 250px;
	}
`

const Flex = styled.div`
	
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 100%;

	@media(max-width: 970px){
		margin-top: 4rem;
	}

`

const Message = styled.div`

	align-self: center;
	display: flex;
	align-items: center;
	flex-direction: column;
	width: 450px;

	h1{
		font-family: 'Montserrat', sans-serif;
		color: #616161;
		margin-bottom: 1rem;
	}

	@media(max-width: 550px){
		z-index: 100;
		width: 100%;
		h1{
			text-align: center;
			font-size: 3vh;
		}
	}

`

const ContactContainer = styled.div`

	align-self: flex-end;
	position: absolute;
	bottom: 2rem;

	@media(max-width: 550px){
		width: 50px;

		img{
			margin-top: 1rem;
		}

	}
`