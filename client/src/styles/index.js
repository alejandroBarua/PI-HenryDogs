import styled from 'styled-components';

export const Container = styled.div`

 	max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 40px;
  padding-right: 40px;

	@media(max-width: 860px){

		padding-left: 20px;
  	paing-right: 20px;
	}	

`
export const Flex = styled.div`

  display: flex;
  align-items: center;
  justify-content: space-between;
`


export const Title = styled.h2`

	font-size: 3rem;
	font-weight: 300;
	line-height: 1;
  margin-bottom: 0.5rem;
`


export const Input = styled.input.attrs({ type: 'text' })`

	font-size: 1rem;
	width: ${(props => `${props.width}px`)};
	padding: 0.5rem 1rem;
	border-width: 1px 0px 1px 1px;
	border-style: solid;
	border-color: #BBBBBB;
	border-radius: 5px 0 0 5px;

	&::placeholder{
		color: #afafaf;
	}
	

`