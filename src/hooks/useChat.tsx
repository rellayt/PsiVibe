import { useObservable } from '@mindspace-io/react';
import { Optional } from '../core/base/types/optional.type';
import { ChatFacade, chatFacade as facade } from '../core/store/facades/chat.facade';
import { Nullable } from '../core/base/types/nullable.type';
import { Message } from '../models/Message.model';

export type ChatHook = {
	messages: Optional<Nullable<Message[]>>;
	isProcessing: Optional<boolean>;
	facade: ChatFacade;
};

export const useChat = (): ChatHook => {
	const [messages] = useObservable<Nullable<Message[]>>(facade.messages$);

	const [isProcessing] = useObservable<boolean>(facade.isProcessing$);

	return { messages, isProcessing, facade };
};
