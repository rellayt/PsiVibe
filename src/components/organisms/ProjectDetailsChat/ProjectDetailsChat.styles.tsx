import styled from 'styled-components';
import { ProjectDetailsWrapperStyle } from '../../../views/ProjectDetails.styles';
import { selectFontSize } from '../../../assets/styles/utility';

export const Wrapper = styled.div`
	${ProjectDetailsWrapperStyle};
	width: 100%;
	position: relative;
	height: 600px;
	z-index: 5;
	justify-self: center;
	display: grid;
	grid-template-rows: 70px 1fr 90px;
`;

export const Information = styled.div`
	position: absolute;
	width: 100%;
	top: 43%;
	text-align: center;
	${selectFontSize('xl')};
	font-weight: 600;
`;
