export interface Action<T, E = string> {
	payload: T;
	type: E;
}
