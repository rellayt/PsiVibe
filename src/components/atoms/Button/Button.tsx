import React from 'react';
import { ReactElement } from 'react';
import { useRouter } from 'hooks/useRouter';
import { ChildrenProps } from 'core/base/types/children.props';
import { isNotUndefined } from 'core/base/utility/isNotUndefined';
import { asNonUndefined } from 'core/base/utility/asNonUndefined';
import { ButtonStyledProps, Wrapper } from './Button.styles';
import { Button as MaterialButton } from '@mui/material';
import { isTrueValue } from '../../../core/base/utility/isTrueValue';
import Spinner from '../Spinner/Spinner';
import { OnClick } from '../../../core/base/types/on-click.type';
import { DictionaryReactNodeProps } from '../../../core/base/types/dictionary-react-node.props';

interface ButtonProps extends ChildrenProps, ButtonStyledProps, DictionaryReactNodeProps {
	disabled?: boolean;
	navigateTo?: string;
	type?: 'button' | 'submit';
	onClick?: OnClick;
}

const Button = ({
	fullWidth,
	rounded,
	processing,
	color,
	disabled,
	navigateTo,
	onClick,
	children,
	type = 'button',
	...props
}: ButtonProps): ReactElement => {
	const router = useRouter();

	const handleButtonClick = (event: never) => {
		if (isNotUndefined(onClick)) {
			asNonUndefined(onClick)(event);
		}
		if (isNotUndefined(navigateTo)) {
			router.push(asNonUndefined(navigateTo));
		}
	};

	return (
		<Wrapper fullWidth={fullWidth} rounded={rounded} color={color} processing={processing}>
			<MaterialButton type={type} onClick={handleButtonClick} disabled={disabled || processing} {...props}>
				{isTrueValue(processing) ? <Spinner color={color} /> : children}
			</MaterialButton>
		</Wrapper>
	);
};

export default Button;
