import styled from 'styled-components';
import { AnimatedSwitch } from 'react-router-transition';

export const Switch = styled(AnimatedSwitch)`
	position: relative;
	width: 100%;
	& > div {
		position: absolute;
		width: 100%;
	}
`;
