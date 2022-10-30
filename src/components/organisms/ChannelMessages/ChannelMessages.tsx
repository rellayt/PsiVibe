import { MutableRefObject, ReactElement, useEffect, useRef, useState } from 'react';
import { Wrapper } from './ChannelMessages.styles';
import { Message } from '../../../models/Message.model';
import ChannelMessage from '../../molecules/Message/ChannelMessage';

interface ChannelMessagesProps {
	messages: Message[];
}

const ChannelMessages = ({ messages }: ChannelMessagesProps): ReactElement => {
	const ref: MutableRefObject<HTMLDivElement | undefined> = useRef();

	const [isInitiallyScrolledBottom, setIsInitiallyScrolledBottom] = useState(false);

	const scrollToBottom = (behavior: 'auto' | 'smooth', delay: number) => {
		setTimeout(() => ref.current && ref.current.scrollTo({ top: document.body.scrollHeight, behavior }), delay);
	};

	useEffect(() => {
		if (messages.length === 0) return;

		if (isInitiallyScrolledBottom) {
			scrollToBottom('smooth', 30);
			return;
		}
		scrollToBottom('auto', 10);
		setIsInitiallyScrolledBottom(true);
	}, [messages]);

	return (
		<Wrapper ref={ref as MutableRefObject<HTMLDivElement>}>
			{messages.length > 0 && messages.map((message, index) => <ChannelMessage key={index} message={message} />)}
		</Wrapper>
	);
};

export default ChannelMessages;
