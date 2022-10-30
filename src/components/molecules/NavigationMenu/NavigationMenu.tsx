import React, { ReactElement, useEffect, useLayoutEffect, useRef } from 'react';
import { IconButton, Wrapper, Menu } from './NavigationMenu.styles';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { gsap } from 'gsap';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { navBeginDelay, navBeginDuration } from '../LogoMorph/LogoMorph';

const NavigationMenu = (): ReactElement => {
	const navigationItems = [
		{ id: 'AboutUs', viewValue: 'O nas' },
		{ id: 'Gallery', viewValue: 'Galeria' },
		{ id: 'PriceList', viewValue: 'Cennik' },
	];

	const itemsRef = useRef<HTMLAnchorElement[]>([]);
	const menuRef = useRef<any>(null);

	useEffect(() => {
		gsap.fromTo(
			menuRef.current,
			{
				y: -30,
				opacity: 0,
				stagger: 30,
			},
			{
				delay: navBeginDelay,
				y: 0,
				opacity: 1,
				duration: navBeginDuration,
			}
		);
		// itemsRef.current = itemsRef.current.slice(0, navigationItems.length);
		// let delay = 0.5;
		// itemsRef.current.forEach((element) => {
		// 	gsap.fromTo(
		// 		element,
		// 		{
		// 			opacity: 0,
		// 			y: -20,
		// 		},
		// 		{
		// 			opacity: 1,
		// 			y: 0,
		// 			delay,
		// 			ease: 'power2.out',
		// 			duration: 1.2,
		// 		}
		// 	);
		// 	delay += 0.3;
		// });
	}, []);

	useLayoutEffect(() => {});

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const { width } = useWindowSize();

	return (
		<Wrapper>
			<IconButton
				ref={menuRef}
				id="basic-button"
				aria-label="delete"
				aria-controls={open ? 'basic-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}>
				<MenuIcon />
			</IconButton>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}>
				<MenuItem onClick={handleClose}>O mnie</MenuItem>
				<MenuItem onClick={handleClose}>Cennik</MenuItem>
				<MenuItem onClick={handleClose}>Blog</MenuItem>
				<MenuItem onClick={handleClose}>Galeria</MenuItem>
			</Menu>
		</Wrapper>
	);
};

export default NavigationMenu;
