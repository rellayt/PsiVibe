import React, { useLayoutEffect, createRef, useState, useEffect, memo } from 'react';
import UnauthenticatedApp from 'views/UnauthenticatedApp';
import { gsap } from 'gsap';
import InitialView from '../components/templates/InitialView/InitialView';

const InitialViewMemo = memo(() => <InitialView />);

const Root = () => {
	const appRef = createRef<HTMLDivElement>();
	const [isAppActivated, setIsAppActivated] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setIsAppActivated(true);
		}, 1300);
	}, []);

	useLayoutEffect(() => {
		gsap.fromTo(
			appRef.current,
			{
				opacity: 0,
				// x: window.innerWidth,
			},
			{
				opacity: 1,
				// x: 0,
				// ease: 'power4.out',
				// ease: 'bounce',
				// delay: 2.6,
				// delay: 0,
				duration: 0.7,
			}
		);
	});

	return (
		<>
			{!isAppActivated && <InitialViewMemo />}
			<UnauthenticatedApp isActivated={isAppActivated} ref={appRef} />
		</>
	);
};

export default Root;
