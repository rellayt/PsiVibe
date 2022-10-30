import { ReactElement, useEffect, useRef, useState } from 'react';
import { MenuItem, Wrapper } from './SortButton.styles';
import SortIcon from '@mui/icons-material/Sort';
import { Button, ClickAwayListener, Grow, MenuList, Paper, Popper } from '@mui/material';
import { isFalseValue } from '../../../core/base/utility/isFalseValue';
import { ProjectVisibilityFilter } from '../../../core/store/models/Projects.model';
import { isNotUndefined } from '../../../core/base/utility/isNotUndefined';
import { asNonUndefined } from '../../../core/base/utility/asNonUndefined';

interface SortButtonProps {
	content: string;
	onFilterChange: (filter: ProjectVisibilityFilter) => void;
	filter: ProjectVisibilityFilter;
}

const SortButton = ({ content, filter, onFilterChange }: SortButtonProps): ReactElement => {
	const [open, setOpen] = useState(false);

	const anchorRef = useRef(null);

	const prevOpen = useRef(open);

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event: any, filter?: ProjectVisibilityFilter) => {
		// @ts-ignore
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}
		if (isNotUndefined(filter)) {
			onFilterChange(asNonUndefined(filter));
		}
		setTimeout(() => {
			setOpen(false);
		}, 140);
	};

	useEffect(() => {
		if (prevOpen.current && isFalseValue(open) && anchorRef.current) {
			// @ts-ignore
			anchorRef.current.focus();
		}
		prevOpen.current = open;
	}, [open]);
	return (
		<Wrapper>
			<Button ref={anchorRef} startIcon={<SortIcon />} onClick={handleToggle}>
				{content}
			</Button>
			<Popper open={open} anchorEl={anchorRef.current} role={undefined} placement={'bottom-start'} transition disablePortal>
				{({ TransitionProps, placement }) => (
					<Grow
						{...TransitionProps}
						style={{
							transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
						}}>
						<Paper>
							<ClickAwayListener onClickAway={handleClose}>
								<MenuList autoFocusItem={open} aria-labelledby="composition-button">
									<MenuItem
										isActive={filter === ProjectVisibilityFilter.SHOW_ALL}
										onClick={(event) => handleClose(event, ProjectVisibilityFilter.SHOW_ALL)}>
										Wszystkie
									</MenuItem>
									<MenuItem
										isActive={filter === ProjectVisibilityFilter.SHOW_ACTIVE}
										onClick={(event) => handleClose(event, ProjectVisibilityFilter.SHOW_ACTIVE)}>
										Wolne
									</MenuItem>
									<MenuItem
										isActive={filter === ProjectVisibilityFilter.SHOW_INACTIVE}
										onClick={(event) => handleClose(event, ProjectVisibilityFilter.SHOW_INACTIVE)}>
										Zajęte
									</MenuItem>
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
		</Wrapper>
	);
};

export default SortButton;
