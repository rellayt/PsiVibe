import { MouseEvent, ReactElement, useState } from 'react';
import { ChildrenProps } from '../../../core/base/types/children.props';
import { BaseText, InnerText, StyledBox, Wrapper } from './Menu.styles';
import { Avatar as DefaultAvatar, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import { Logout, Settings } from '@mui/icons-material';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { useRouter } from '../../../hooks/useRouter';
import { RoutePath } from '../../../configuration/routing/static-routes';
import { Avatar as AvatarModel } from '../../../models/User.model';
import Avatar from '../Avatar/Avatar';

export interface MenuProps extends ChildrenProps {
	onLogout: Function;
	avatar?: AvatarModel;
}

const StyledMenu = ({ onLogout, avatar, children }: MenuProps): ReactElement => {
	const [anchorEl, setAnchorEl] = useState(null);

	const router = useRouter();

	const navigateByPath = (path: RoutePath) => {
		router.push(path);
	};

	const handleClick = (event: MouseEvent) => {
		// @ts-ignore
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<Wrapper>
			<StyledBox sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
				<Tooltip title="Menu">
					<IconButton onClick={handleClick} size={'large'} sx={{ ml: 2 }}>
						<DefaultAvatar sx={{ width: 44, height: 44 }}>{children}</DefaultAvatar>
					</IconButton>
				</Tooltip>
			</StyledBox>
			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleClose}
				onClick={handleClose}
				PaperProps={{
					elevation: 0,
					sx: {
						overflow: 'visible',
						filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
						mt: 1.5,
						'& .MuiAvatar-root': {
							width: 44,
							height: 44,
							ml: -0.5,
							mr: 1,
						},
						'&:before': {
							content: '""',
							display: 'block',
							position: 'absolute',
							top: 0,
							right: 28,
							width: 10,
							height: 10,
							bgcolor: 'background.paper',
							transform: 'translateY(-50%) rotate(45deg)',
							zIndex: 0,
						},
					},
				}}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
				<MenuItem onClick={() => navigateByPath(RoutePath.PRICE_LIST)}>
					{avatar?.imagePath ? <Avatar path={avatar.imagePath} height={48} width={48} /> : <DefaultAvatar />}
					<InnerText>Profil</InnerText>
				</MenuItem>
				<MenuItem onClick={() => navigateByPath(RoutePath.PROFILE_EDIT)}>
					<ListItemIcon>
						<Settings fontSize="small" />
					</ListItemIcon>
					<BaseText>Edycja profilu</BaseText>
				</MenuItem>
				<MenuItem onClick={() => navigateByPath(RoutePath.PERSONAL_PROJECTS)}>
					<ListItemIcon>
						<WorkOutlineIcon fontSize="small" />
					</ListItemIcon>
					<BaseText>Moje projekty</BaseText>
				</MenuItem>
				<MenuItem onClick={() => onLogout()}>
					<ListItemIcon>
						<Logout fontSize="small" />
					</ListItemIcon>
					<BaseText>Wyloguj</BaseText>
				</MenuItem>
			</Menu>
		</Wrapper>
	);
};

export default StyledMenu;
