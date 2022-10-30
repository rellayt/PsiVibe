import styled, { css } from 'styled-components';
import { EASE_OUT_BACK, selectBackground, selectColor, selectFontSize } from '../../../assets/styles/utility';
import { ColorKey, FontSizeKey } from '../../../assets/styles/style.types';

export interface LinkStyledProps {
	color?: ColorKey;
	size?: FontSizeKey;
	withAnimatedUnderline?: boolean;
}
const duration = '.2s';
const distance = '8px';

export const Wrapper = styled.a<LinkStyledProps>`
	cursor: pointer;
	z-index: 10;
	opacity: 0;
	${({ color = 'blue' }) => selectColor(color)};
	${({ size = 'm' }) => selectFontSize(size)};
	position: relative;
	text-decoration: none;
	padding-bottom: 8px;
	transition: transform ${duration} ${EASE_OUT_BACK}, opacity ${duration}, color ${duration} ${EASE_OUT_BACK};

	${({ withAnimatedUnderline = true }) => (withAnimatedUnderline ? animatedLine : standardTransition)}
`;

const standardTransition = css`
	transition: opacity ${EASE_OUT_BACK} 200ms;
	opacity: 1;
	&:hover {
		opacity: 0.8;
	}
`;

const animatedLine = css<LinkStyledProps>`
	&:focus:active {
		${({ color = 'darkGray' }) => selectColor(color)};
		transform: scale(0.95);
	}

	&:hover {
		${({ color = 'black' }) => selectColor(color)};
		transform: scale(0.985);
	}

	&:before,
	&:after {
		content: '';
		position: absolute;
		bottom: 2px;
		left: 0;
		right: 0;
		height: 2px;
		${({ color = 'black' }) => selectBackground(color)};
	}
	&:before {
		opacity: 0;
		transform: translateY(-${distance});
		transition: transform 0s ${EASE_OUT_BACK}, opacity 0s;
	}
	&:after {
		opacity: 0;
		transform: translateY(${distance} / 2);
		transition: transform ${duration} ${EASE_OUT_BACK}, opacity ${duration};
	}
	&:hover {
		&:before,
		&:after {
			opacity: 1;
			transform: translateY(0) scale(0.95);
		}
		&:before {
			transition: transform ${duration} ${EASE_OUT_BACK}, opacity ${duration};
		}
		&:after {
			transition: transform 0s ${duration} ${EASE_OUT_BACK}, opacity 0s ${duration};
		}
	}
`;
