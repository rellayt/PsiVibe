import styled from 'styled-components';
import { selectBackground, selectColor, selectFontSize } from '../../../assets/styles/utility';
import { initialAnimation } from '../../../views/Home.styles';

export interface ChannelMessageStyledProps {
	isMyMessage: boolean;
}

export const Wrapper = styled.div``;

export const MessageWrapper = styled.div<ChannelMessageStyledProps>`
	width: 100%;
	//margin: 5px 0;
	display: flex;
	justify-content: ${({ isMyMessage }) => (isMyMessage ? 'flex-end' : 'flex-start')};
	animation-fill-mode: forwards;
	animation-duration: 200ms;
	animation-name: init;
	opacity: 0;
	@keyframes init {
		from {
			transform: translateY(-5px);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}
`;

export const MessageInner = styled.div<ChannelMessageStyledProps>`
	display: grid;
	grid-template-rows: 30px 1fr 25px;
	justify-content: ${({ isMyMessage }) => (isMyMessage ? 'flex-end' : 'flex-start')};
	div:first-child,
	div:nth-child(2),
	div:nth-child(4) {
		justify-self: ${({ isMyMessage }) => (isMyMessage ? 'flex-end' : 'flex-start')};
	}
	div:nth-child(2) {
		${({ isMyMessage }) => selectBackground(isMyMessage ? 'blue' : 'gray')}
		${({ isMyMessage }) => selectColor(isMyMessage ? 'white' : 'black')}
		border-radius: ${({ isMyMessage }) => (isMyMessage ? '15px 15px 4px 15px' : '15px 15px 15px 4px')};
	}
	div:nth-child(3) {
		justify-self: ${({ isMyMessage }) => (isMyMessage ? 'flex-end' : 'flex-start')};
	}
`;

export const Content = styled.div`
	min-width: min-content;
	max-width: 33vw;
	text-overflow: ellipsis;
	overflow: hidden;
	position: relative;
	padding: 8px 10px;
	box-shadow: inset 0 0 5px -4px rgba(0, 0, 0, 5);
`;

export const Name = styled.div`
	justify-self: flex-start;
	align-self: center;
	margin: 0 7px;
`;

export const DateField = styled.div`
	grid-row: 3/4;
	justify-self: flex-start;
	align-self: center;
	${selectFontSize('xm')}
	${selectColor('darkGray')}
`;
