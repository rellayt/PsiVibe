import styled from 'styled-components';
import { Snackbar } from '@mui/material';
import { selectBackground, selectFontSize } from '../../../assets/styles/utility';

export const StyledSnackbar = styled(Snackbar)`
	.MuiAlert-icon {
		margin: auto;
		${selectFontSize('xl')}
	}

	.MuiAlert-root {
		${selectFontSize('l')}
	}

	.MuiAlert-filledSuccess {
		${selectBackground('blue')};
		padding: 4px 20px;
		border-radius: 12px;
	}

	.MuiAlert-filledError {
		${selectBackground('error')};
		border-radius: 12px;
	}

	.MuiAlert-message {
		padding: 8px 7px 8px 20px;
	}
`;
