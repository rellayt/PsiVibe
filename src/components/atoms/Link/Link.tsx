import React, { ForwardedRef, MouseEvent, MouseEventHandler, ReactElement } from 'react';
import { ChildrenProps } from '../../../core/base/types/children.props';
import { LinkStyledProps, Wrapper } from './Link.styles';
import { isNotUndefined } from '../../../core/base/utility/isNotUndefined';
import { useRouter } from '../../../hooks/useRouter';
import { asNonUndefined } from '../../../core/base/utility/asNonUndefined';

interface LinkProps extends ChildrenProps, LinkStyledProps {
	navigateTo: string;
	onClick?: MouseEventHandler;
}
const Link = (
	{ color, size, navigateTo, onClick, withAnimatedUnderline, children }: LinkProps,
	ref: ForwardedRef<HTMLAnchorElement>
): ReactElement => {
	const router = useRouter();

	const handleButtonClick = (event: MouseEvent) => {
		setTimeout(() => {
			router.push(navigateTo);
			if (isNotUndefined(onClick)) {
				asNonUndefined(onClick)(event);
			}
		}, 1);
	};

	return (
		<Wrapper ref={ref} tabIndex={1} color={color} size={size} withAnimatedUnderline={withAnimatedUnderline} onClick={handleButtonClick}>
			{children}
		</Wrapper>
	);
};

export default React.forwardRef(Link);
