import styled from 'styled-components';
import { Key } from '../../../core/base/types/key.type';
import { colors } from '../../../assets/styles/theme';

export interface LogoStyledProps {
	width?: number;
	color?: Key<typeof colors>;
}

export const Wrapper = styled.div<LogoStyledProps>`
	svg {
		path {
			fill: ${({ color }) => color};
		}
		width: ${({ width }) => `${width}px`};
		height: 100%;
		cursor: pointer;
	}
`;

export const LogoSvgWrapper = styled.div`
	position: absolute;
	svg {
		scale: 0.85;
	}
`;
