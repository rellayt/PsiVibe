export interface Message {
	message: string;
	date: Date;
	userId?: number;
	username: string;
	userUsername?: string;
	isMyMessage?: boolean;
}
