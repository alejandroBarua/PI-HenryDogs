import React from 'react';
import styled from 'styled-components';


const About = () => {
	return (
		<AboutStyled>

			<h1>Hi! I'm Alejandro and this is my Individual Project at Henry Full-Stack Bootcamp.</h1>
			<p>
				 It is a SPA (Single-Page Application) responsive, which consumes an external API to obtain different breeds of dogs, a relational database was also created to create new breeds.
			</p>

			<h2>Frontend</h2>
			<p>React - <span>library for creating user interfaces based on UI components.</span></p>
			<p>Redux - <span>library to manage and centralize application state.</span></p>
			<p>Styled Components - <span>CSS-in-JS tool that bridges the gap between components and styling.</span></p>

			<h2>Backend</h2>
			<p>Node js - <span>platform built on Chrome's JavaScript runtime for easily building fast and scalable network applications. </span></p>
			<p>Express - <span>framework for Node.js. It is designed to create web applications and APIs.</span></p>
			<p>Sequelize - <span>powerful Javascript library that makes it easy to manage an SQL database.</span></p>
			<p>PostgreSQL - <span>open source object-relational database system.</span></p>

		</AboutStyled>
	)
}

export default About;


const AboutStyled = styled.div`

	min-height: calc(100vh - 9rem);
	max-width: 800px;
	margin-top: 2rem;
	margin-bottom: 4rem;

	h1{
		color: #616161;
		font-family: 'Montserrat', sans-serif;
		font-weight: bold;
		margin-bottom: 1rem;
	}

	h2{
		color: #afafaf;
		font-size: 2rem;
		font-weight: 400;
		margin-bottom: 0.5rem;
		margin-top: 1.2rem;
	}

	p{
		padding: 0.1rem 0;
	}

	span{
		color: ${({theme}) => theme.colorPrimary};
	}

`