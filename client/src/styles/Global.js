import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

	html {
		background-color: #F0F0F0;
		color: #7E7E7E;
		box-sizing: border-box;
		font-size: ${({fontSize = 16}) => `${fontSize}px`};
		font-family: "Roboto", sans-serif;
		line-height: 1.5;
		letter-spacing: 0.2px;
		scroll-behavior: smooth;
	}

	*,
	*:before,
	*:after {
		box-sizing: inherit;
	}

	* {
		margin: 0;
		padding: 0;
	}

	a {
		cursor: pointer;
		text-decoration: none;
		color: #222;
	}

	li {
		list-style: none;
	}

	input,
	textarea,
	button,
	select {
		outline: none;
		border: none;
	}
	
/* 	img,
	video {
		max-width: 100%;
		height: auto;
	} */

	body::-webkit-scrollbar {
		width: 8px;
		background-color: rgba(212, 212, 212, 0.5);
		border-radius: 0px 0px 2px 0px;
	}

	body::-webkit-scrollbar-thumb {
		background-color: #222;
	}


`

export default GlobalStyles;