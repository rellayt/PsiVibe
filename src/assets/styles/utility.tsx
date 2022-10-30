import { css } from 'styled-components';
import { ColorKey, FontSizeKey } from './style.types';

export const MEDIA_WIDTH_XLG = '1368px';

export const MEDIA_WIDTH_LG = '1024px';

export const MEDIA_WIDTH_MD = '768px';

export const MEDIA_WIDTH_SM = '480px';

export const EASE_OUT_BACK = 'cubic-bezier(0.175, 0.885, 0.320, 1.275)';

export const flexAlignCenter = css`
	display: flex;
	align-items: center;
`;

export const flexAlignAndJustifyCenter = css`
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const flexSpaceBetween = css`
	display: flex;
	justify-content: space-between;
`;

export const flexSpaceAround = css`
	display: flex;
	justify-content: space-around;
`;

export const flexColAlignAndJustifyCenter = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

export const flexColAlignStartAndJustifyCenter = css`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
`;

export const flexJustifyCenter = css`
	display: flex;
	justify-content: center;
`;

export const flexJustifyEnd = css`
	display: flex;
	justify-content: flex-end;
`;

export const selectFontSize = (fontSizeKey: FontSizeKey) => css`
	font-size: ${({ theme: { fontSizes } }) => fontSizes[fontSizeKey]};
`;

export const selectBackground = (colorKey: ColorKey) => css`
	background: ${({ theme: { colors } }) => colors[colorKey]};
`;

export const selectColor = (colorKey: ColorKey) => css`
	color: ${({ theme: { colors } }) => colors[colorKey]};
`;

export const initialAnimation = css`
	animation-duration: 400ms;
	animation-name: init;
	animation-fill-mode: forwards;
	@keyframes init {
		from {
			transform: translateY(-5px);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}
`;
