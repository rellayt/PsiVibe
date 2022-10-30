import { Message } from '../models/Message.model';
import { asNonUndefined } from '../core/base/utility/asNonUndefined';

export const parseMessages = (messages: Message[], currentUserId: number): Message[] =>
	messages
		.map(({ userUsername, date, message, userId }) => ({
			username: asNonUndefined(userUsername),
			date: new Date(date),
			message,
			isMyMessage: asNonUndefined(userId) === currentUserId,
			userId: userId,
		}))
		.sort(({ date: firstDate }, { date: secondDate }) => secondDate.getTime() - firstDate.getTime());
