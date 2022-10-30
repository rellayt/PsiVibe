import { EntityStore, StoreConfig } from '@datorama/akita';
import { QueryEntity } from '@datorama/akita';
import { ChatEntityState, ChatState } from '../models/Chat.model';

export const CHAT_INITIAL_STATE: ChatState = { messages: [] };

@StoreConfig({ name: 'Chat' })
export class ChatStore extends EntityStore<ChatEntityState, ChatState> {
	constructor() {
		super(CHAT_INITIAL_STATE);
	}
}

export class ChatQuery extends QueryEntity<ChatEntityState, ChatState> {
	messages$ = this.select(({ messages }) => messages);

	isProcessing$ = this.selectLoading();

	constructor(protected store: ChatStore) {
		super(store);
		store.setLoading(false);
	}
}

export const chatStore = new ChatStore();

export const chatQuery = new ChatQuery(chatStore);
