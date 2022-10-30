import { ReactElement } from 'react';
import { Wrapper } from './PersonalProjects.styles';
import FeatureBaseTemplate from '../components/templates/FeatureBaseTemplate/FeatureBaseTemplate';
import { useProjects } from '../hooks/useProjects';
import ProjectCard from '../components/molecules/Project/ProjectCard';
import useEffectOnce from '../helpers/use-effect-once';

const PersonalProjects = (): ReactElement => {
	const { personalProjects } = useProjects();

	// useEffectOnce();

	return (
		<FeatureBaseTemplate headerContent={'Moje projekty'}>
			<Wrapper>
				{personalProjects &&
					personalProjects.map(({ id, title, projectStatus, createdAt, authorId }) => (
						<ProjectCard
							key={id}
							id={id}
							title={title}
							authorId={authorId}
							projectStatus={projectStatus}
							mustBeEnabled={true}
							createdAt={createdAt}
						/>
					))}
			</Wrapper>
		</FeatureBaseTemplate>
	);
};

export default PersonalProjects;
