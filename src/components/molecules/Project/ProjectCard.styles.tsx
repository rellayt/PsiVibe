import styled from 'styled-components';
import { EASE_OUT_BACK, MEDIA_WIDTH_MD, selectBackground, selectColor, selectFontSize } from '../../../assets/styles/utility';

export const Wrapper = styled.div<{ isDisabled: boolean }>`
	display: grid;
	grid-template-rows: 40% 30% minmax(30%);
	grid-template-columns: 100%;
	${({ isDisabled }) => selectBackground(isDisabled ? 'darkGray' : 'white')};
	${({ isDisabled }) => selectColor(isDisabled ? 'background' : 'black')};
	padding: 16px 24px;
	width: 480px;
	max-height: 160px;
	border-radius: 8px;
	box-shadow: ${({ theme: { boxShadows }, isDisabled }) =>
		isDisabled
			? `${boxShadows.project}, inset 0 0 15px -5px rgb(0 0 0 / 20%)`
			: `${boxShadows.project}, inset 0 0 10px -6px rgb(0 0 0 / 10%)`};
	transition: all 350ms ${EASE_OUT_BACK};
	cursor: ${({ isDisabled }) => (isDisabled ? 'default' : 'pointer')};
	animation-duration: 500ms;
	animation-name: init;
	gap: 12px;
	margin: 12px 0;

	@media (max-width: ${MEDIA_WIDTH_MD}) {
		width: 100%;
	}

	@keyframes init {
		from {
			transform: translateY(1px);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	&:hover {
		box-shadow: ${({ isDisabled }) => (isDisabled ? 'default' : '0 0 0 transparent')};

		div:first-child {
			${({ isDisabled }) => selectColor(isDisabled ? 'background' : 'blue')};
		}
	}
`;
export const Title = styled.div`
	font-weight: 600;
	${selectFontSize('xl')}
`;

export const AuthorName = styled.div`
	${selectFontSize('m')};
	font-weight: 600;
	text-align: end;
	position: relative;
	align-self: center;
	width: 100%;
	&::before {
		content: 'Zlecono przez';
		display: block;
		font-weight: normal;
		position: absolute;
		left: 0;
	}
`;

export const Date = styled.div`
	${selectFontSize('m')}
	text-align: end;
	position: relative;
	align-self: center;
	width: 100%;
	&::before {
		content: 'Dodano';
		display: block;
		position: absolute;
		left: 0;
	}
`;
