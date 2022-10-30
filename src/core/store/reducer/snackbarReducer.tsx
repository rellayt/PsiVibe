import { SnackbarState } from '../../../models/Snackbar.model';
import { Action } from '../../base/types/action.type';

export enum SnackbarAction {
	Open = 'OPEN_SNACKBAR',
	Close = 'CLOSE_SNACKBAR',
}

export const snackbarInitialState: SnackbarState = {
	content: '',
	open: false,
	duration: 1100,
	type: undefined,
};

export const snackbarReducer = (initialState: SnackbarState, action: Action<SnackbarState, SnackbarAction>) => {
	switch (action.type) {
		case SnackbarAction.Open:
			return {
				...initialState,
				...action.payload,
			};
		case SnackbarAction.Close:
			return {
				...initialState,
				open: false,
			};
		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
};
