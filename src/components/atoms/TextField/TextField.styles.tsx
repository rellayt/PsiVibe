import styled, { css } from 'styled-components';
import { TextField } from '@mui/material';
import { selectBackground, selectColor, selectFontSize } from '../../../assets/styles/utility';

const borderRadius = css`
	border-radius: 6px 6px 0 0;
`;

export const Wrapper = styled(TextField)`
	height: 75px;

	.MuiFilledInput-root {
		${borderRadius};
		${selectFontSize('m')}

		.MuiSvgIcon-root:first-child:not(:last-child) {
			position: relative !important;
			top: 9px !important;
			margin-right: 12px !important;
			opacity: 0.7 !important;
		}
	}

	.MuiFilledInput-root:after {
		border-bottom: 2px solid ${({ theme: { colors } }) => colors.blue};
	}

	.MuiFilledInput-root.Mui-error:after {
		border-bottom: 2px solid ${({ theme: { colors } }) => colors.error};
	}

	.MuiInputLabel-root.Mui-focused {
		${selectColor('blue')}
	}

	.MuiInputLabel-root {
		${selectFontSize('xm')};
	}

	.MuiInputLabel-root.Mui-error {
		${selectColor('error')}
	}

	.MuiFilledInput-root {
		${selectFontSize('xm')};
		box-shadow: inset 0 0 4px 0 rgb(181 191 199 / 55%);
		${borderRadius};
	}

	.MuiFormHelperText-root.Mui-error {
		${selectColor('error')}
		${selectFontSize('s')};
		margin-left: 4px;
	}
`;
