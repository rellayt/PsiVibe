import styled from 'styled-components';
import { MEDIA_WIDTH_MD, MEDIA_WIDTH_XLG } from '../../../assets/styles/utility';

export interface MainTemplateStyledProps {
	isActivated?: boolean;
}

export const Wrapper = styled.div<MainTemplateStyledProps>`
	z-index: 1;
	grid-template-rows: ${({ theme: { navbarHeight } }) => `${navbarHeight}`} 1fr;
	display: ${({ isActivated }) => (isActivated ? 'default' : 'none')};
	grid-template-columns: 100%;
	background: linear-gradient(15deg, rgb(185, 33, 55) 21%, rgb(85, 44, 196) 71%, rgb(185, 33, 55) -20%, rgb(85, 44, 196) -50%);
	background-size: 300% 300%;
	animation: gradient 7s ease infinite;
	//background: linear-gradient(36deg, rgba(200, 0, 40, 0.8) -10%, rgba(80, 32, 210, 0.85) 71%);
	//background: linear-gradient(36deg, rgb(185, 33, 55) -10%, rgb(85, 44, 196) 71%);
	@keyframes gradient {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}
`;

export const InnerWrapper = styled.div`
	width: 100%;
	min-height: calc(100vh - ${({ theme: { navbarHeight } }) => `${navbarHeight}`}) !important;
	height: auto;
	padding: 0 48px;

	@media (max-width: ${MEDIA_WIDTH_XLG}) {
		padding: 24px;
	}

	@media (max-width: ${MEDIA_WIDTH_MD}) {
		padding: 20px 12px 12px 12px;
	}
`;
