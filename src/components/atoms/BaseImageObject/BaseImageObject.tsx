import React, { ForwardedRef, MouseEventHandler, ReactElement } from 'react';
import BaseImage from 'assets/images/karolina_1.png';
import { BaseImageObjectStyledProps, Wrapper } from './BaseImageObject.styles';

export interface BaseImageObjectProps extends BaseImageObjectStyledProps {
	onClick?: MouseEventHandler<SVGSVGElement>;
}

const BaseImageObject = ({ onClick, width }: BaseImageObjectProps, ref: ForwardedRef<HTMLDivElement>): ReactElement => (
	<Wrapper width={width} ref={ref}>
		<img src={BaseImage} />
	</Wrapper>
);

export default React.forwardRef(BaseImageObject);
