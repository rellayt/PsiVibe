export enum SnackbarType {
	SUCCESS = 'success',
	ERROR = 'error',
}

export type SnackbarState = {
	content: string;
	duration?: number;
	open: boolean;
	type?: SnackbarType;
};
