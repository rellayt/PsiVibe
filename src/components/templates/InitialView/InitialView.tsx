import { createRef, ForwardedRef, ReactElement, RefObject, useLayoutEffect } from 'react';
import { Wrapper } from './InitialView.styles';
import LogoWithTitle from '../../atoms/LogoWithTitle/LogoWithTitle';
import { gsap } from 'gsap';

const initLogoAnimation = (logoRef: RefObject<HTMLDivElement>, delay: number, duration: number) => {
	gsap.fromTo(
		logoRef.current,
		{
			y: -20,
			opacity: 0,
			scaleY: 0.3,
			scale: 0.1,
			transformOrigin: '50% 50%',
		},
		{
			y: 0,
			opacity: 1,
			ease: 'power4.out',
			scale: 0.8,
			scaleY: 1,
			delay,
			duration,
			transformOrigin: '100% 50%',
		}
	);
};

const afterInitLogoAnimation = (logoRef: RefObject<HTMLDivElement>, delay: number, duration: number) => {
	gsap.to(logoRef.current, {
		ease: 'power4.out',
		scale: 1.2,
		delay,
		duration,
		transformOrigin: '50% 50%',
	});
};

const InitialView = (): ReactElement => {
	const logoRef = createRef<HTMLDivElement>();
	const initLogoAnimDelay = 0.2;
	const initLogoAnimDuration = 2.3;
	const afterInitLogoAnimDelay = initLogoAnimDelay;
	const afterInitLogoAnimDuration = 5;

	useLayoutEffect(() => {
		initLogoAnimation(logoRef, initLogoAnimDelay, initLogoAnimDuration);
		afterInitLogoAnimation(logoRef, afterInitLogoAnimDelay, afterInitLogoAnimDuration);
	});

	return (
		<Wrapper>
			<LogoWithTitle width={200} ref={logoRef} />
		</Wrapper>
	);
};

export default InitialView;
