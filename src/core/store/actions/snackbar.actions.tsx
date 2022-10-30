import { SnackbarState, SnackbarType } from '../../../models/Snackbar.model';
import { DispatchWithType } from '../../base/types/dispatch-with-type.type';
import { SnackbarAction } from '../reducer/snackbarReducer';

export interface SnackbarPayload {
	type: SnackbarType;
	content: string;
	duration?: number;
	delay?: number;
}

export const openSnackbar = (dispatch: DispatchWithType<{ payload: SnackbarState }>, prePayload: SnackbarPayload) => {
	const payload = { open: true, ...prePayload };
	dispatch({ type: SnackbarAction.Open, payload });
};

export const closeSnackbar = (dispatch: DispatchWithType) => {
	dispatch({ type: SnackbarAction.Close });
};
