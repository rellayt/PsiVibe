import styled from 'styled-components';
import { selectiveBasicColors } from 'assets/styles/theme';
import { Key } from 'core/base/types/key.type';
import { EASE_OUT_BACK, flexJustifyCenter, selectBackground, selectColor, selectFontSize } from '../../../assets/styles/utility';
import { isFalseValue } from '../../../core/base/utility/isFalseValue';

export interface ButtonStyledProps {
	fullWidth?: boolean;
	rounded?: boolean;
	processing?: boolean;
	color?: Key<typeof selectiveBasicColors>;
}

export const Wrapper = styled.div<ButtonStyledProps>`
	width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};

	.MuiButton-root {
		background: ${({ color = 'blue' }) => selectiveBasicColors[color].normal};
		text-transform: none;
		${selectFontSize('m')};
		padding: 4px 18px;
		font-weight: 700;
		color: ${({ color = 'blue' }) => selectiveBasicColors[color].inverted};
		transition: 270ms all ${EASE_OUT_BACK};
		box-shadow: 0 5px 20px -10px ${({ theme: { colors } }) => colors.gray}, inset 0 0px 10px -5px ${({ theme: { colors } }) => colors.gray};
		border-radius: ${({ rounded }) => (rounded ? '25px' : '8px')};
		width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};

		&:hover {
			background: ${({ color }) => selectiveBasicColors[color || 'blue'].dark};
		}

		&:focus {
			background: ${({ color }) => selectiveBasicColors[color || 'blue'].light};
		}

		&:disabled div {
			${flexJustifyCenter};
		}

		&:disabled {
			background: ${({ processing, color, theme: { colors } }) =>
				isFalseValue(processing) ? colors.error : selectiveBasicColors[color || 'blue'].normal};
			${selectColor('white')};
		}

		.MuiButton-root:hover.Mui-disabled {
			${selectBackground('error')};
		}
	}
`;
