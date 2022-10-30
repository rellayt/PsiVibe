import React, { FormEvent, ReactElement, useState } from 'react';
import { Information, Wrapper } from './ProjectDetailsChat.styles';
import { Message } from '../../../models/Message.model';
import { Actions, Header } from '../../../views/Chat.styles';
import ChannelMessages from '../ChannelMessages/ChannelMessages';
import { TextField } from '../../atoms/TextField/TextField';
import Button from '../../atoms/Button/Button';
import SendIcon from '@mui/icons-material/Send';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { Nullable } from '../../../core/base/types/nullable.type';
import { asNonUndefined } from '../../../core/base/utility/asNonUndefined';

interface ProjectDetailsChatProps {
	messages?: Nullable<Message[]>;
	sendMessage?: Function;
	isProcessing?: boolean;
}

const ProjectDetailsChat = ({ messages, sendMessage, isProcessing }: ProjectDetailsChatProps): ReactElement => {
	const [message, setMessage] = useState<string>('');

	const handleKeyPress = async (event: KeyboardEvent) => {
		if (event.key === 'Enter') {
			await handleAction();
		}
	};

	const handleChange = (event: FormEvent<HTMLInputElement>) => {
		const {
			currentTarget: { value },
		} = event;
		setMessage(value);
	};

	const { width } = useWindowSize();

	const handleAction = () => {
		asNonUndefined(sendMessage)(message);
		setMessage('');
	};

	return (
		<>
			{messages && (
				<Wrapper>
					{messages.length === 0 && <Information>Zadaj pytanie odnośnie zlecenia</Information>}
					<Header>Czat zlecenia</Header>
					<ChannelMessages messages={messages} />
					<Actions>
						<TextField
							label="Treść wiadomości"
							name="message"
							value={message}
							onKeyPress={handleKeyPress}
							onChange={handleChange}
							disabled={isProcessing}
						/>
						<Button
							disabled={isProcessing || message.length === 0}
							onClick={handleAction}
							processing={isProcessing}
							fullWidth
							type={'submit'}
							color={'blue'}
							endIcon={isProcessing || (width && width < 768) ? null : <SendIcon />}>
							Wyślij
						</Button>
					</Actions>
				</Wrapper>
			)}
		</>
	);
};

export default ProjectDetailsChat;
