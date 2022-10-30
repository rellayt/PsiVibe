import React, { ReactElement } from 'react';
import { Wrapper } from '../Logo/Logo.styles';
import { ReactComponent as SvgLogo } from '../../../assets/icons/title.svg';

const Title = ({ onClick, color, width }: any): ReactElement => (
	<Wrapper width={width} color={color}>
		<SvgLogo fill={color} onClick={onClick} />
	</Wrapper>
);

export default Title;
