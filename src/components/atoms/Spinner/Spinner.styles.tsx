import styled from 'styled-components';
import { flexAlignCenter } from '../../../assets/styles/utility';
import { Key } from '../../../core/base/types/key.type';
import { selectiveBasicColors } from '../../../assets/styles/theme';

export interface SpinnerStyledProps {
	color?: Key<typeof selectiveBasicColors>;
}
export const Wrapper = styled.div<SpinnerStyledProps>`
	${flexAlignCenter};
	.MuiCircularProgress-root {
		color: ${({ color = 'blue' }) => selectiveBasicColors[color].inverted};
		padding: 5px;
		margin: 0;
		width: 38px !important;
		height: 38px !important;
	}
`;
