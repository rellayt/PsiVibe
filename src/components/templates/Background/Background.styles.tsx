import styled, { keyframes } from 'styled-components';

const AnimateHomeBackground = keyframes`
    0%   {background-position: 0 0;}
    25% {background-position: 50% 0;}
    50% {background-position: 90% 0;}
    60% {background-position: 60%;}
    75% {background-position: 40%;}
    100%  {background-position: 0 0;}
`;

export const Wrapper = styled.div`
	background-image: linear-gradient(to right, #5195fc, #033b6c, #094ab4, #4477ce, #054f7d);
	background-size: 600%;
	background-position: 0 0;
	box-shadow: inset 0 0 5em rgba(0, 0, 0, 0.2);
	display: flex;
	font-family: 'Lato', Arial, sans-serif;
	justify-content: center;
	animation-duration: 25s;
	animation-iteration-count: infinite;
	animation-name: ${AnimateHomeBackground};
	width: 100%;
	height: 100vh;

	h1 {
		color: white;
		font-size: 2.4em;
		text-align: center;
		text-transform: uppercase;
	}

	@media (max-width: 830px) {
		h1 {
			font-size: 2em;
		}
	}
`;
