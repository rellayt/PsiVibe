import { Box } from '@mui/material';
import { selectBackground, selectFontSize } from '../../../assets/styles/utility';
import styled from 'styled-components';

export const StyledBox = styled(Box)`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: grid;
	grid-template-rows: 1fr 1fr 1fr;
	width: 600px;
	height: 300px;
	border: none;
	border-radius: 12px;
	padding: 36px;
	text-align: center;
	box-shadow: ${({ theme: { boxShadows } }) => boxShadows.card};
	${selectBackground('white')}
	font-family: 'Source Sans Pro';
	&:focus {
		outline: none;
	}
	& > * {
		align-self: center;
	}
`;

export const BoxHeader = styled.div`
	font-weight: 600;
	${selectFontSize('xl')};
`;
export const BoxContent = styled.div`
	${selectFontSize('l')}
`;
