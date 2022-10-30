import { ApiService } from './api.service';
import { BaseResponseData } from '../../base/models/baseResponseData';
import { Message } from '../../../models/Message.model';

export interface MessageResponseData extends BaseResponseData<Message[]> {}

export class ChatService {
	private apiService: ApiService;

	constructor() {
		this.apiService = new ApiService();
	}

	getMessages(): Promise<MessageResponseData> {
		return this.apiService.get<MessageResponseData>('chat/all');
	}

	sendMessage(message: string): Promise<MessageResponseData> {
		return this.apiService.post<MessageResponseData>('chat/sent', { params: { msg: message } });
	}
}

export const chatService = new ChatService();
