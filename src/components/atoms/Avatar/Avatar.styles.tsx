import styled from 'styled-components';
import { flexAlignAndJustifyCenter, selectBackground } from '../../../assets/styles/utility';

export const Img = styled.img<{ width?: number; height?: number }>`
	width: ${({ width = 75 }) => `${width}px`};
	height: ${({ height = 75 }) => `${height}px`};
	border-radius: 50%;
	border: solid 1px rgb(0 0 0 / 16%);
	object-fit: cover;
`;

export const Wrapper = styled.div`
	${flexAlignAndJustifyCenter};
`;
