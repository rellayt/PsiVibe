import { ReactElement } from 'react';
import { Option, Wrapper } from './Select.styles';
import { DictionaryReactNodeProps } from '../../../core/base/types/dictionary-react-node.props';
import { KeyValue } from '../../../core/base/types/key-value.type';

interface SelectProps extends DictionaryReactNodeProps {
	options: KeyValue[];
	value?: string;
}

const Select = ({ options, value, ...props }: SelectProps): ReactElement => (
	<Wrapper select value={value} variant="filled" {...props}>
		{options.map((option) => (
			<Option key={option.key} value={option.key}>
				{option.value}
			</Option>
		))}
	</Wrapper>
);

export default Select;
