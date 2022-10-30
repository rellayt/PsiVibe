import styled from 'styled-components';
import {
	flexAlignAndJustifyCenter,
	MEDIA_WIDTH_LG,
	MEDIA_WIDTH_MD,
	MEDIA_WIDTH_XLG,
	selectBackground,
	selectColor,
	selectFontSize,
} from '../assets/styles/utility';

export const Wrapper = styled.div``;

export const Channel = styled.div`
	display: grid;
	grid-template-rows: 70px 1fr 90px;
	width: 100%;
	height: 615px;
	margin: 24px auto 24px auto;
	${selectBackground('white')};
	border-radius: 15px;
	box-shadow: rgb(255 255 255 / 10%) 0 1px 1px 0 inset, rgb(50 50 93 / 8%) 0 30px 100px -20px, rgb(0 0 0 / 8%) 0px 10px 30px -30px;
`;

export const Header = styled.div`
	${flexAlignAndJustifyCenter};
	${selectFontSize('xl')};
	${selectBackground('white')};
	${selectColor('black')};
	border-radius: 15px 15px 0 0;
	font-weight: 600;
	border-bottom: ${({ theme: { colors } }) => colors.lightGray} 2px solid;
	box-shadow: 0 5px 35px -15px rgb(0 0 0 / 10%);
`;

export const Actions = styled.div`
	display: grid;
	grid-template-columns: 50% 35% 15%;
	border-top: ${({ theme: { colors } }) => colors.lightGray} 2px solid;
	padding: 0 48px;

	.MuiTextField-root {
		transform: translateY(6px);
	}
	div:last-child {
		justify-self: flex-end;
		grid-column: 3/4;
	}

	& > * {
		align-self: center;
	}

	@media (max-width: ${MEDIA_WIDTH_XLG}) {
		grid-template-columns: 50% 25% 25%;
	}

	@media (max-width: ${MEDIA_WIDTH_MD}) {
		grid-template-columns: 70% 2% 29%;
		padding: 0 8px;
	}
`;
