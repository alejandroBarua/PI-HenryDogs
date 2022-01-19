import React from 'react';
import styled from 'styled-components';


import bannerImg from '../assets/images/banner.png';

import { Contact, Button } from '../components';

const Home = () => {
	return (
		<Grid>
			<Banner src={bannerImg} alt="" />
				<Flex>
					<Message>
						<h1>The best web application to learn everything about your best friend</h1>
						<Button text='Start discovering' />
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
`

const Banner = styled.img`
	
	width: 440px;
`

const Flex = styled.div`

	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-end;
`

const Message = styled.div`

	align-self: center;
	display: flex;
	align-items: center;
	flex-direction: column;
	position: relative;
	top: 150px;
	width: 450px;

	h1{
		font-family: 'Montserrat', sans-serif;
		color: #616161;
		margin-bottom: 1rem;
	}

`

const ContactContainer = styled.div`

	position: relative;
	bottom: 2rem;
`