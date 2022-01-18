import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

	html {
		color: #222;
		box-sizing: border-box;
		font-size: ${({fontSize = 16}) => `${fontSize}px`};
		font-family: "Roboto", sans-serif;
		line-height: 1.5;
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
	button {
		outline: none;
		border: none;
		padding: 0.7rem;

	}
	
	img,
	video {
		max-width: 100%;
		height: auto;
	}

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