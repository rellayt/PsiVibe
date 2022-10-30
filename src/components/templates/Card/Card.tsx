import { ReactElement } from 'react';
import { ChildrenProps } from 'core/base/types/children.props';
import { Wrapper } from './Card.styles';

const Card = ({ children }: ChildrenProps): ReactElement => <Wrapper>{children}</Wrapper>;

export default Card;
