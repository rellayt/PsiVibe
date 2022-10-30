import styled, { css } from 'styled-components';
import {
	flexColAlignAndJustifyCenter,
	initialAnimation,
	MEDIA_WIDTH_LG,
	MEDIA_WIDTH_MD,
	MEDIA_WIDTH_XLG,
	selectBackground,
	selectFontSize,
} from '../assets/styles/utility';
export const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 45% 55%;

	& > * {
		margin: 24px 48px;
	}
	@media (max-width: ${MEDIA_WIDTH_XLG}) {
		margin: 0 -88px;
	}
	@media (max-width: ${MEDIA_WIDTH_LG}) {
		grid-template-columns: 100%;
		margin: 0;
	}
`;
export const ProjectDetailsWrapperStyle = css`
	box-shadow: ${({ theme: { boxShadows } }) => boxShadows.projectDetails};
	${selectBackground('white')}
	border-radius: 16px;
	border: solid 1px rgb(0 0 0 / 8%);
`;

const justify = css`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const ProjectDetailsWrapper = styled.div`
	${initialAnimation};
	animation-delay: 50ms;
	display: grid;
	opacity: 0;
	grid-template-rows: 80px 0.7fr repeat(3, 40px) auto;
	gap: 8px;
	grid-template-columns: 100%;
	padding: 48px;
	${ProjectDetailsWrapperStyle};
	z-index: 2;

	@media (max-width: ${MEDIA_WIDTH_LG}) {
		padding: 36px;
	}
	@media (max-width: ${MEDIA_WIDTH_MD}) {
		padding: 24px;
	}
	& > * {
		align-self: center;
	}
`;

export const Title = styled.div`
	${selectFontSize('xxl')};
	font-weight: 600;
	justify-self: center;
	text-align: center;
	margin: 0 -12px;
`;

export const Description = styled.div`
	${selectFontSize('m')};
	${flexColAlignAndJustifyCenter};
	margin: 16px 0;
	width: 100%;
`;

export const AccordionTitle = styled.div`
	${selectFontSize('xl')};
	font-weight: 600;
	justify-self: center;
	align-self: flex-start;
	margin: 0 -12px;
`;

export const BaseTitle = styled.div`
	${selectFontSize('xl')};
	display: flex;
	font-style: normal;
	margin-bottom: 16px;
	font-weight: normal;
`;

export const Author = styled.div`
	${selectFontSize('xl')};
	${justify};
`;

export const Status = styled.div`
	${justify};
`;

export const Date = styled.div`
	${justify};
`;

export const Action = styled.div`
	@media (max-width: ${MEDIA_WIDTH_MD}) {
		margin: 0 5%;
	}
`;
