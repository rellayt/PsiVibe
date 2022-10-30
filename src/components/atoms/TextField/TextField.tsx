import { ReactElement } from 'react';
import { Wrapper } from './TextField.styles';
import { DictionaryReactNodeProps } from '../../../core/base/types/dictionary-react-node.props';

export const TextField = ({ ...props }: DictionaryReactNodeProps): ReactElement => (
	<Wrapper autoComplete="off" variant="filled" {...props} />
);
