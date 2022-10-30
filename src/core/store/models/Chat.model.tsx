import { EntityState } from '@datorama/akita';
import { Nullable } from '../../base/types/nullable.type';
import { Message } from '../../../models/Message.model';

export interface ChatState {
	messages: Nullable<Message[]>;
}

export interface ChatEntityState extends EntityState<ChatState> {}
