import React, { ReactElement } from 'react';
import { ChildrenProps } from '../../../core/base/types/children.props';
import Card from '../Card/Card';

import { InnerWrapper, Wrapper } from './AuthCard.styles';

const AuthCard = ({ children }: ChildrenProps): ReactElement => (
	<Wrapper>
		<Card>
			<InnerWrapper>{children}</InnerWrapper>
		</Card>
	</Wrapper>
);
export default AuthCard;
