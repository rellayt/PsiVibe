import styled from 'styled-components';
import { selectColor, selectFontSize } from '../../../assets/styles/utility';

export const Wrapper = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
`;

export const Title = styled.div`
	${selectFontSize('xxl')};
	${selectColor('white')}
	font-weight: 500;
	position: absolute;
	width: 200px;
`;
