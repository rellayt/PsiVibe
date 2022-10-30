import React from 'react';
import { ChildrenProps } from 'core/base/types/children.props';
import { Header, InnerWrapper, Wrapper } from './FeatureBaseTemplate.styles';

interface FeatureBaseTemplateProps extends ChildrenProps {
	headerContent: string;
	padding?: string;
}

const FeatureBaseTemplate = ({ headerContent, padding = '0 8%', children }: FeatureBaseTemplateProps) => {
	return (
		<Wrapper>
			<Header>{headerContent}</Header>
			<InnerWrapper padding={padding}>{children}</InnerWrapper>
		</Wrapper>
	);
};

export default FeatureBaseTemplate;
