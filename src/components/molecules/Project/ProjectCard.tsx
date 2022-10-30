import { ReactElement } from 'react';
import { AuthorName, Date, Title, Wrapper } from './ProjectCard.styles';
import Moment from 'react-moment';
import { isToday } from '../../../helpers/is-today';
import { useRouter } from '../../../hooks/useRouter';
import { RoutePath } from '../../../configuration/routing/static-routes';
import { ProjectStatus } from '../../../models/Project.model';
import Link from '../../atoms/Link/Link';

interface ProjectCardProps {
	title: string;
	id: number;
	authorName?: string;
	projectStatus: ProjectStatus;
	authorId: number;
	mustBeEnabled?: boolean;
	createdAt: Date;
}

const ProjectCard = ({
	id,
	title,
	authorName,
	projectStatus,
	mustBeEnabled = false,
	authorId,
	createdAt,
}: ProjectCardProps): ReactElement => {
	const isActive = mustBeEnabled || projectStatus === ProjectStatus.NEW;

	const router = useRouter();

	const handleClick = () => {
		if (!isActive) return;

		router.push(`${RoutePath.PROJECT_DETAILS}/${id}`);
	};

	return (
		<Wrapper onClick={handleClick} isDisabled={!isActive}>
			<Title>{title}</Title>
			{authorName && (
				<AuthorName>
					<Link navigateTo={`${RoutePath.PRICE_LIST}/${authorId}`} color={'black'}>
						{authorName}
					</Link>
				</AuthorName>
			)}
			<Date>
				{isToday(createdAt) && 'dzisiaj o '}
				<Moment format={isToday(createdAt) ? 'HH:mm' : 'DD/MM/YY HH:mm'}>{createdAt}</Moment>
			</Date>
		</Wrapper>
	);
};

export default ProjectCard;
