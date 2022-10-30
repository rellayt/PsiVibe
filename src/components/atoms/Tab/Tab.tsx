import { Tab as MuiTab } from '@mui/material';
import { selectBackground, selectColor, selectFontSize } from '../../../assets/styles/utility';
import styled from 'styled-components';

export const Tab = styled(MuiTab)`
	${selectFontSize('m')};
	${selectBackground('white')};
	${selectColor('black')};
	font-weight: 600;
	text-transform: none;
`;
