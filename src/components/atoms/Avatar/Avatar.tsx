import { ReactElement } from 'react';
import { Img, Wrapper } from './Avatar.styles';

interface AvatarProps {
	path: string;
	width?: number;
	height?: number;
}

const Avatar = ({ path, width, height }: AvatarProps): ReactElement => {
	return (
		<Wrapper>
			<Img src={path} width={width} height={height} />
		</Wrapper>
	);
};

export default Avatar;
