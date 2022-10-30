import { StoreManagement } from './store-management.abstract';
import { ChatService, chatService } from '../services/chat.service';
import { ChatQuery, chatQuery, ChatStore, chatStore } from '../state/chat.store';
import { ChatEntityState, ChatState } from '../models/Chat.model';
import { Message } from '../../../models/Message.model';
import { authStore, AuthStore } from '../state/auth.store';
import { parseMessages } from 'helpers/messages-parser';

export class ChatFacade extends StoreManagement<ChatStore, ChatService, ChatQuery, ChatState, ChatEntityState> {
	readonly messages$ = this.baseQuery.messages$;

	readonly isProcessing$ = this.baseQuery.isProcessing$;

	constructor(
		protected chatService: ChatService,
		protected chatStore: ChatStore,
		protected chatQuery: ChatQuery,
		private authStore: AuthStore
	) {
		super(chatService, chatStore, chatQuery);
	}

	async sendMessage(message: string) {
		await this.baseAsyncHandler(async () => {
			const { data } = await this.baseService.sendMessage(message);
			this.updateStateEntity('messages', this.parseMessages(data));
		});
	}

	async getMessages() {
		await this.baseAsyncHandler(async () => {
			const { data } = await this.baseService.getMessages();
			this.updateStateEntity('messages', this.parseMessages(data));
		});
	}

	resetMessages(): void {
		this.updateStateEntity('messages', []);
	}

	private parseMessages(messages: Message[]): Message[] {
		const {
			user: { id: currentUserId },
		} = this.authStore.getValue();

		return parseMessages(messages, currentUserId);
	}
}

// // @todo - this should be part of a formal DI system
export const chatFacade = new ChatFacade(chatService, chatStore, chatQuery, authStore);
