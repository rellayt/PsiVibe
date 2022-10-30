import styled from 'styled-components';
import { flexAlignAndJustifyCenter } from '../../../assets/styles/utility';

export const Wrapper = styled.div`
	position: fixed;
	z-index: -5;
	width: 100%;
	height: 100%;
	${flexAlignAndJustifyCenter};
	background: linear-gradient(39deg, #e8e8e6, transparent, transparent, transparent, #eaeaea);
`;
