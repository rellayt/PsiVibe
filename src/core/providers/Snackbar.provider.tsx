import React, { createContext, Dispatch, useReducer } from 'react';
import { ChildrenProps } from '../base/types/children.props';
import { snackbarInitialState, snackbarReducer } from '../store/reducer/snackbarReducer';
import { SnackbarState } from '../../models/Snackbar.model';
import Snackbar from '../../components/molecules/Snackbar/Snackbar';
import { asNonUndefined } from '../base/utility/asNonUndefined';

export const snackbarContext = createContext<{ snackbarState: SnackbarState; snackbarDispatch: Dispatch<any> }>({
	snackbarState: snackbarInitialState,
	snackbarDispatch: () => null,
});

export const SnackbarProvider = ({ children }: ChildrenProps) => {
	const [snackbarState, snackbarDispatch] = useReducer(snackbarReducer, snackbarInitialState);
	return (
		<snackbarContext.Provider value={{ snackbarState, snackbarDispatch }}>
			{children}
			<Snackbar
				content={snackbarState.content}
				type={snackbarState.type}
				open={snackbarState.open}
				duration={asNonUndefined(snackbarState.duration)}
			/>
		</snackbarContext.Provider>
	);
};
