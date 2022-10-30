import React, { ReactElement } from 'react';
import { Content, DateField, MessageInner, MessageWrapper, Name } from './ChannelMessage.styles';
import { Message } from '../../../models/Message.model';
import { asNonUndefined } from '../../../core/base/utility/asNonUndefined';
import { isToday } from '../../../helpers/is-today';
import Moment from 'react-moment';
import Link from '../../atoms/Link/Link';
import { RoutePath } from '../../../configuration/routing/static-routes';

interface MessageProps {
	message: Message;
}

const ChannelMessage = ({ message: { isMyMessage, message, date, username, userId } }: MessageProps): ReactElement => {
	const userRouteLink = (
		<Link color={'black'} navigateTo={`${RoutePath.PRICE_LIST}/${userId}`} withAnimatedUnderline={false}>
			{username}
		</Link>
	);
	return (
		<MessageWrapper isMyMessage={asNonUndefined(isMyMessage)}>
			<MessageInner isMyMessage={asNonUndefined(isMyMessage)}>
				<Name>{isMyMessage ? 'Ty' : userRouteLink}</Name>
				<Content>{message}</Content>
				<DateField>
					<Moment format={isToday(date) ? 'HH:mm' : 'DD/MM HH:mm'}>{date}</Moment>
				</DateField>
			</MessageInner>
		</MessageWrapper>
	);
};

export default ChannelMessage;
