import React, { createRef, useLayoutEffect } from 'react';
import { Wrapper } from './Navigation.styles';
import NavigationMenu from '../../molecules/NavigationMenu/NavigationMenu';
import LogoMorph from '../../molecules/LogoMorph/LogoMorph';
import { gsap } from 'gsap';

const Navigation = () => {
	const logoMorphRef = createRef<HTMLDivElement>();

	useLayoutEffect(() => {
		gsap.fromTo(
			logoMorphRef.current,
			{
				opacity: 0,
				y: -5,
			},
			{
				opacity: 1,
				y: 0,
				ease: 'power2.out',
				delay: 0.4,
				duration: 2.3,
			}
		);
	});

	return (
		<Wrapper>
			<LogoMorph ref={logoMorphRef} />
			<NavigationMenu />
		</Wrapper>
	);
};

export default Navigation;
