import React, { FormEvent, ReactElement, useState } from 'react';
import { Wrapper, Channel, Header, Actions } from './Chat.styles';
import FeatureBaseTemplate from '../components/templates/FeatureBaseTemplate/FeatureBaseTemplate';
import { useChat } from '../hooks/useChat';
import useAsyncEffectOnce from '../helpers/use-async-effect-once';
import ChannelMessages from '../components/organisms/ChannelMessages/ChannelMessages';
import { TextField } from '../components/atoms/TextField/TextField';
import Button from '../components/atoms/Button/Button';
import SendIcon from '@mui/icons-material/Send';
import { useWindowSize } from '../hooks/useWindowSize';
import useEffectOnce from '../helpers/use-effect-once';

const Chat = (): ReactElement => {
	const [message, setMessage] = useState<string>('');

	const { messages, isProcessing, facade } = useChat();

	const { width } = useWindowSize();

	useAsyncEffectOnce(async () => await facade.getMessages());

	useEffectOnce(() => {
		return () => facade.resetMessages();
	});

	const sendMessage = async () => {
		setMessage('');
		await facade.sendMessage(message);
	};

	const handleChange = (event: FormEvent<HTMLInputElement>) => {
		const {
			currentTarget: { value },
		} = event;
		setMessage(value);
	};

	const handleKeyPress = async (event: KeyboardEvent) => {
		if (event.key === 'Enter') await sendMessage();
	};

	return (
		<FeatureBaseTemplate headerContent={'Czat'}>
			<Wrapper>
				<Channel>
					<Header>Kanał Publiczny</Header>
					{messages && <ChannelMessages messages={messages} />}
					<Actions>
						<TextField
							label="Treść wiadomości"
							name="message"
							value={message}
							onKeyPress={handleKeyPress}
							onChange={handleChange}
							disabled={isProcessing}
						/>
						{messages && messages.length > 0 && (
							<Button
								disabled={isProcessing || message.length === 0}
								onClick={sendMessage}
								processing={isProcessing}
								fullWidth
								type={'submit'}
								color={'blue'}
								endIcon={isProcessing || (width && width < 768) ? null : <SendIcon />}>
								Wyślij
							</Button>
						)}
					</Actions>
				</Channel>
			</Wrapper>
		</FeatureBaseTemplate>
	);
};

export default Chat;
