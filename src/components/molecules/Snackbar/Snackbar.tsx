import { ReactElement, useContext, useEffect } from 'react';
import { StyledSnackbar } from './Snackbar.styles';
import MuiAlert, { AlertColor } from '@mui/material/Alert';
import { closeSnackbar } from '../../../core/store/actions/snackbar.actions';
import { snackbarContext } from '../../../core/providers/Snackbar.provider';
import { isTrueValue } from '../../../core/base/utility/isTrueValue';

interface SnackbarProps {
	content?: string;
	type?: AlertColor;
	open: boolean;
	duration?: number;
}

const Snackbar = ({ content, type, open, duration }: SnackbarProps): ReactElement => {
	const { snackbarDispatch } = useContext(snackbarContext);

	useEffect(() => {
		if (isTrueValue(open)) {
			setTimeout(() => {
				closeSnackbar(snackbarDispatch);
			}, duration);
		}
	}, [content, type, open]);

	return (
		<>
			<StyledSnackbar open={open} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
				<MuiAlert elevation={6} severity={type} sx={{ width: '100%' }} variant="filled">
					{content}
				</MuiAlert>
			</StyledSnackbar>
		</>
	);
};

export default Snackbar;
