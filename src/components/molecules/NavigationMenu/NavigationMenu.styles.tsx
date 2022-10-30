import styled from 'styled-components';
import { flexAlignAndJustifyCenter, MEDIA_WIDTH_LG, selectColor } from '../../../assets/styles/utility';
import { IconButton as MaterialIconButton } from '@mui/material';
import { Menu as MaterialMenu } from '@mui/material';

export const Wrapper = styled.div`
	${flexAlignAndJustifyCenter};
	gap: 60px;
	margin-bottom: -4px;
	position: relative;
	a {
		font-weight: 500;
	}
	div:last-child {
		margin-left: 16px;
		margin-top: -2px;
	}

	@media (max-width: ${MEDIA_WIDTH_LG}) {
		gap: 12px;
	}
`;

export const IconButton = styled(MaterialIconButton)`
	svg {
		width: 50px;
		height: auto;
		${selectColor('white')};
	}
`;

export const Menu = styled(MaterialMenu)`
	ul {
		width: 150px;
		display: flex;
		li {
			justify-content: center;
		}
	}
`;
