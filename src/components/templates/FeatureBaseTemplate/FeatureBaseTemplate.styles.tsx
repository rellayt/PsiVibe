import styled from 'styled-components';
import { MEDIA_WIDTH_LG, MEDIA_WIDTH_MD, MEDIA_WIDTH_XLG, selectFontSize } from '../../../assets/styles/utility';

export const Wrapper = styled.div`
	display: grid;
	height: 100%;
	width: 100%;
	grid-template-rows: 110px calc(100% - 110px);
	padding: 0 7%;

	@media (max-width: ${MEDIA_WIDTH_LG}) {
		padding: 0 6%;
	}
	@media (max-width: ${MEDIA_WIDTH_MD}) {
		padding: 0;
	}
`;

export const Header = styled.header`
	grid-row: 1/2;
	font-weight: 600;
	display: flex;
	position: relative;
	align-items: flex-start;
	${selectFontSize('xxl')};

	@media (max-width: ${MEDIA_WIDTH_LG}) {
		justify-content: center;
	}

	&::after {
		content: '';
		position: absolute;
		transform: translateY(-50%);
		top: 70%;
		height: 2px;
		border-radius: 32px;
		background: linear-gradient(90deg, transparent, #d6d6d6, #d6d6d6, transparent);
		width: 100%;
	}
`;

export const InnerWrapper = styled.div<{ padding: string }>`
	grid-row: 2/3;
	padding: ${({ padding }) => padding};

	@media (max-width: ${MEDIA_WIDTH_XLG}) {
		padding: 0 2%;
	}

	@media (max-width: ${MEDIA_WIDTH_LG}) {
		padding: 0 12px;
	}
	@media (max-width: ${MEDIA_WIDTH_MD}) {
		padding: 0 6px;
	}
`;
