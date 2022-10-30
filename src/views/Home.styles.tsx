import styled, { css } from 'styled-components';
import {
	flexColAlignAndJustifyCenter,
	flexJustifyCenter,
	MEDIA_WIDTH_LG,
	MEDIA_WIDTH_MD,
	MEDIA_WIDTH_XLG,
	selectBackground,
	selectColor,
	selectFontSize,
} from 'assets/styles/utility';
import { FontSizeKey } from '../assets/styles/style.types';

export const Wrapper = styled.div`
	height: 100%;
	grid-row: 2/3;
	position: relative;
	${flexJustifyCenter};
	padding: 0 16px;

	@media (max-width: ${MEDIA_WIDTH_MD}) {
		padding: 0;
	}
`;

export const BigTitle = styled.div`
	font-size: 290px;
	position: absolute;
	//transform: translateY(25%);
	cursor: none;
	font-weight: bold;
	${selectColor('white')};
`;

export const InnerWrapper = styled.div`
	${flexColAlignAndJustifyCenter};
	${selectBackground('white')}
	box-shadow: ${({ theme: { boxShadows } }) => `${boxShadows.projectDetails}, inset 0 1px 35px -15px rgb(0 0 0 / 4%)`};
	border-radius: 80px;
	margin: 0 15%;
	padding: 48px;
	animation-fill-mode: forwards;
	animation-duration: 800ms;
	animation-name: radius;

	@media (max-width: ${MEDIA_WIDTH_XLG}) {
		margin: 0 9%;
	}

	@media (max-width: ${MEDIA_WIDTH_LG}) {
		margin: 0 6%;
		padding: 24px;
	}

	@media (max-width: ${MEDIA_WIDTH_MD}) {
		width: 100%;
		margin: 0;
	}

	@keyframes radius {
		from {
			border-radius: 20px;
			opacity: 0;
		}
		to {
			border-radius: 60px;
			opacity: 1;
		}
	}
`;

export const initialAnimation = css`
	animation-fill-mode: forwards;
	animation-duration: 1000ms;
	animation-name: init;
	opacity: 0;
	@keyframes init {
		from {
			transform: translateY(-20px);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}
`;

export const Title = styled.span`
	${selectFontSize('xxl')};
	font-weight: 600;
	margin-right: 4px;
	text-align: left;
`;

export const Line = styled.div<{ delay: number; fontSize?: FontSizeKey }>`
	${({ fontSize = 'l' }) => selectFontSize(fontSize)}
	${initialAnimation};
	animation-delay: ${({ delay }) => `${delay}ms`};
	margin: 8px;
	grid-column: 1/3;
	text-align: center;
`;

export const Content = styled.div`
	margin: 48px 0;
	${selectColor('black')}
	${initialAnimation};
	animation-delay: 3000ms;
	${selectFontSize('l')}
	text-align: center;
`;

export const Actions = styled.div`
	display: grid;
	margin-top: 8px;
	grid-template-columns: 50% 50%;
	grid-template-rows: 60px 1fr;
	margin-bottom: 24px;
	animation-delay: 3200ms;
	animation-fill-mode: forwards;
	animation-duration: 1000ms;
	animation-name: opacity;
	opacity: 0;

	@media (max-width: ${MEDIA_WIDTH_MD}) {
		${flexColAlignAndJustifyCenter};
		width: 100%;
		gap: 16px;
	}
	@keyframes opacity {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	& > * {
		margin: 8px 16px;
		justify-self: center;
	}
`;
