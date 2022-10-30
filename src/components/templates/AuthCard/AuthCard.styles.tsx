import styled from 'styled-components';
import ReCAPTCHA from 'react-google-recaptcha';

import {
	flexAlignAndJustifyCenter,
	flexColAlignAndJustifyCenter,
	flexSpaceBetween,
	MEDIA_WIDTH_LG,
	MEDIA_WIDTH_MD,
	MEDIA_WIDTH_SM,
} from 'assets/styles/utility';

export const Captcha = styled(ReCAPTCHA)`
	animation-duration: 400ms;
	animation-name: show;
	animation-delay: 100ms;
	@keyframes show {
		from {
			transform: translateY(-10px);
			display: none;
			opacity: 0;
		}
		to {
			transform: translateY(0);
			display: flex;
			opacity: 1;
		}
	}
	div div {
		margin: 0 auto;
	}
`;

export const Wrapper = styled.div`
	height: 100%;
	grid-row: 2/3;
	${flexAlignAndJustifyCenter};

	@media (max-width: ${MEDIA_WIDTH_LG}) {
		margin: 5rem 16px 1rem 16px;
	}
	@media (max-width: ${MEDIA_WIDTH_MD}) {
		margin: 3rem 8px 1rem 8px;
	}
`;

export const LoginWrapper = styled.div`
	margin: 15vh 24px 2rem 24px;
	@media (max-width: ${MEDIA_WIDTH_MD}) {
		margin: 10vh 8px 2rem 8px;
	}
`;

export const RegisterWrapper = styled.div`
	margin: 1vh 24px 2rem 24px;
	@media (max-width: ${MEDIA_WIDTH_MD}) {
		margin: 1vh 8px 2rem 8px;
	}
`;

export const InnerWrapper = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: 100%;
	grid-template-rows: 90px 1fr 90px;
	@media (max-width: ${MEDIA_WIDTH_SM}) {
		grid-template-rows: 90px 1fr 50px;
	}

	div:last-child {
		align-self: center;
		width: 100%;
	}
`;

export const HeaderWrapper = styled.div`
	${flexSpaceBetween};
	align-items: start;

	& > * {
		margin: 8px 0;
	}

	@media (max-width: ${MEDIA_WIDTH_SM}) {
		${flexColAlignAndJustifyCenter};
	}
`;

export const TextFieldsWrapper = styled.div`
	grid-row: 2/3;
	${flexColAlignAndJustifyCenter};

	& > * {
		margin: 12px 0;
		width: 100%;
	}
`;

export const Header = styled.header`
	font-weight: 600;
	font-size: ${({ theme: { fontSizes } }) => fontSizes.xxl};
	margin: 0;
`;
