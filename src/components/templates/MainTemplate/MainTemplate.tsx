import React from 'react';
import { InnerWrapper, MainTemplateStyledProps, Wrapper } from './MainTemplate.styles';
import Navigation from 'components/organisms/Navigation/Navigation';
import { ChildrenProps } from 'core/base/types/children.props';

export interface MainTemplateProps extends MainTemplateStyledProps, ChildrenProps {}

const MainTemplate = ({ children, isActivated }: MainTemplateProps, ref: any) => (
	<>
		{isActivated && (
			<Wrapper isActivated={isActivated} ref={ref}>
				<Navigation />
				<InnerWrapper>{children}</InnerWrapper>
			</Wrapper>
		)}
	</>
);

export default React.forwardRef(MainTemplate);
