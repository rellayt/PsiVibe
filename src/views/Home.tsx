import React, { createRef, useLayoutEffect } from 'react';
import { BigTitle, Wrapper } from './Home.styles';
import BaseImageObject from '../components/atoms/BaseImageObject/BaseImageObject';
import { gsap } from 'gsap';

const Home = () => {
	const imageRef = createRef<HTMLDivElement>();
	const bigTitleRef = createRef<HTMLDivElement>();

	useLayoutEffect(() => {
		initImage();
		initBigTitle();
	});

	const initBigTitle = () => {
		gsap.fromTo(
			bigTitleRef.current,
			{
				y: 80,
				opacity: 0,
			},
			{
				y: 50,
				opacity: 1,
				duration: 3,
			}
		);
	};

	const initImage = () => {
		gsap.fromTo(
			imageRef.current,
			{
				y: -30,
				opacity: 0,
				scale: 0.95,
				stagger: 30,
			},
			{
				y: 0,
				opacity: 1,
				ease: 'power4.out',
				stagger: 30,
				scale: 0.95,
				delay: 0.45,
				duration: 2.8,
			}
		);
	};

	return (
		<Wrapper>
			<BigTitle ref={bigTitleRef}>PSI VIBE</BigTitle>
			<BaseImageObject ref={imageRef} />
		</Wrapper>
	);
};

export default Home;
