import React, { ForwardedRef, ReactElement } from 'react';
import { Wrapper } from '../Logo/Logo.styles';
import { ReactComponent as SvgLogo } from '../../../assets/icons/logo-with-title.svg';

const LogoWithTitle = ({ onClick, color, width }: any, ref: ForwardedRef<HTMLDivElement>): ReactElement => (
	<Wrapper width={width} color={color} ref={ref}>
		<SvgLogo fill={color} onClick={onClick} />
	</Wrapper>
);

export default React.forwardRef(LogoWithTitle);
