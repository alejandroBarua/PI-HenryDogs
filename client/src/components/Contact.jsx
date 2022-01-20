import React from 'react';
import styled from 'styled-components';

import iconPortfolioLight from '../assets/icons/icon-portfolio-light.png';
import iconLinkedinLight from '../assets/icons/icon-linkedin-light.png';
import iconGithubLight from '../assets/icons/icon-github-light.png';

import iconPortfolioDark from '../assets/icons/icon-portfolio-dark.png';
import iconLinkedinDark from '../assets/icons/icon-linkedin-dark.png';
import iconGithubDark from '../assets/icons/icon-github-dark.png';

const links = {
	portfolio: 'https://portfolio-alejandrobarua.netlify.app/',
	linkedin: 'https://www.linkedin.com/in/alejandrobarua/',
	github: 'https://github.com/alejandroBarua'
}

const Contact = ({color = 'dark'}) => {
	return (
		<IconGroup>
			<a href={links.portfolio} target='_blank' rel="noreferrer">
				<img 
					className={color === 'dark' ? 'dark' : ''}
					src={color === 'dark' ? iconPortfolioDark : iconPortfolioLight} 
					alt="" />
			</a>
			<a href={links.linkedin} target='_blank' rel="noreferrer">
				<img 
					className={color === 'dark' ? 'dark' : ''}
					src={color === 'dark' ? iconLinkedinDark : iconLinkedinLight} 
					alt="" />
			</a>
			<a href={links.github} target='_blank' rel="noreferrer">
				<img 
					className={color === 'dark' ? 'dark' : ''}
					src={color === 'dark' ? iconGithubDark : iconGithubLight} 
					alt="" />
			</a>
		</IconGroup>
	)
}

export default Contact;


const IconGroup = styled.div`

	a{
		margin-left: 1rem;
	}

	img{
		width: 35px;
	}

	.dark{
		opacity: 0.7;
	}
`