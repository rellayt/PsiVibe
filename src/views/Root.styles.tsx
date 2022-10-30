import styled from 'styled-components';
import { EASE_OUT_BACK } from '../assets/styles/utility';

export const GlobalLogoWrapper = styled.div`
	svg {
		opacity: 0;
		width: 400px;
		height: 100%;
		animation: opacityAnimation 1.6s ${EASE_OUT_BACK} 0.1s;
		animation-fill-mode: forwards;
		filter: drop-shadow(0 0 25px rgba(0, 0, 0, 0.3));
		transition: opacity 500ms ease;

		g path {
			fill: #212121 !important;
		}
	}

	@keyframes opacityAnimation {
		from {
			transform: translateY(-15px);
			opacity: 0;
		}
		to {
			transform: translateY(0px);
			opacity: 1;
		}
	}
`;
