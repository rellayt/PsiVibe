import React, { ReactElement, useContext } from 'react';
import {
	AccordionTitle,
	Action,
	Author,
	BaseTitle,
	Date,
	Description,
	ProjectDetailsWrapper,
	Status,
	Title,
	Wrapper,
} from './ProjectDetails.styles';
import { useParams } from 'react-router-dom';
import FeatureBaseTemplate from '../components/templates/FeatureBaseTemplate/FeatureBaseTemplate';
import { useProjects } from '../hooks/useProjects';
import { parseToNumber } from '../helpers/parse-to-number';
import { ProjectStatus } from '../models/Project.model';
import { isToday } from '../helpers/is-today';
import Moment from 'react-moment';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/atoms/Button/Button';
import { isFalseValue } from '../core/base/utility/isFalseValue';
import { openSnackbar } from '../core/store/actions/snackbar.actions';
import { snackbarContext } from '../core/providers/Snackbar.provider';
import { useRouter } from '../hooks/useRouter';
import { RoutePath } from '../configuration/routing/static-routes';
import { isNotNil } from '../core/base/utility/isNotNill';
import useAsyncEffect from 'use-async-effect';
import Link from '../components/atoms/Link/Link';
import useEffectOnce from '../helpers/use-effect-once';
import { Accordion, AccordionDetails, AccordionSummary } from '../components/atoms/Accordion/Accordion';
import ProjectDetailsChat from '../components/organisms/ProjectDetailsChat/ProjectDetailsChat';
import { SnackbarMessage } from '../configuration/constans/snackbar-message';

const ProjectDetails = (): ReactElement => {
	const router = useRouter();

	const { id } = useParams<{ id: string }>();

	const { detailedProject, detailedProjectMessages, isProcessing, facade } = useProjects();

	const { isAuthor, user } = useAuth();

	const { snackbarDispatch } = useContext(snackbarContext);

	useAsyncEffect(async () => {
		if (isNotNil(detailedProject)) return;
		facade.getProjectById(parseToNumber(id), projectNotFoundHandler).then();
	}, [detailedProject]);

	const renderStatus = (status: ProjectStatus) => {
		switch (status) {
			case ProjectStatus.NEW:
				return 'Wolny';
			case ProjectStatus.IN_PROGRESS:
				return 'W trakcie';
			case ProjectStatus.FINISHED:
				return 'Zakończony';
		}
	};

	const afterSuccessTakeProjectHandler = () => {
		openSnackbar(snackbarDispatch, SnackbarMessage.TAKE_PROJECT_SUCCESS);
		router.push(RoutePath.ABOUT_ME);
	};

	const afterSuccessCloseProjectHandler = () => {
		openSnackbar(snackbarDispatch, SnackbarMessage.CLOSE_PROJECT_SUCCESS);
		router.push(RoutePath.ABOUT_ME);
	};

	const projectNotFoundHandler = () => {
		openSnackbar(snackbarDispatch, SnackbarMessage.PROJECT_NOT_FOUND_ERROR);
		router.push(RoutePath.ABOUT_ME);
	};

	const afterTakeProjectErrorHandler = () => openSnackbar(snackbarDispatch, SnackbarMessage.TAKE_PROJECT_ERROR);

	const afterCloseProjectErrorHandler = () => openSnackbar(snackbarDispatch, SnackbarMessage.CLOSE_PROJECT_ERROR);

	const handleTakeProject = async () => {
		await facade.takeProject(id, afterSuccessTakeProjectHandler, afterTakeProjectErrorHandler);
	};

	const handleCloseProject = async () => {
		await facade.closeProject(id, afterSuccessCloseProjectHandler, afterCloseProjectErrorHandler);
	};

	useEffectOnce(() => {
		return () => facade.resetDetailedProject();
	});

	const sendMessage = async (message: string) => {
		await facade.sendProjectMessage(id, message);
	};

	return (
		<FeatureBaseTemplate headerContent={'Szczegóły projektu'} padding={'0'}>
			{detailedProject && user && (
				<Wrapper>
					<ProjectDetailsWrapper>
						<Title>{detailedProject.title}</Title>
						<Description>
							<Accordion>
								<AccordionSummary>
									<AccordionTitle>Opis</AccordionTitle>
								</AccordionSummary>
								<AccordionDetails>{detailedProject.description}</AccordionDetails>
							</Accordion>
						</Description>
						<Author>
							<BaseTitle>Zleceniodawca</BaseTitle>
							<Link color={'black'} navigateTo={`${RoutePath.PRICE_LIST}/${detailedProject.authorId}`}>
								{detailedProject.authorUsername === user.username ? 'Ty' : detailedProject.authorUsername}
							</Link>
						</Author>
						<Status>
							<BaseTitle>Status</BaseTitle>
							{renderStatus(detailedProject.projectStatus)}
						</Status>
						<Date>
							<BaseTitle>Dodano</BaseTitle>
							<div>
								{isToday(detailedProject.createdAt) && 'Dzisiaj o '}
								<Moment format={isToday(detailedProject.createdAt) ? 'HH:mm' : 'DD/MM/YY HH:mm'}>{detailedProject.createdAt}</Moment>
							</div>
						</Date>
						{isFalseValue(isAuthor) && detailedProject.projectStatus === ProjectStatus.NEW && (
							<Action>
								<Button fullWidth processing={isProcessing} onClick={handleTakeProject}>
									Przejmij zlecenie
								</Button>
							</Action>
						)}
						{isAuthor && detailedProject.projectStatus === ProjectStatus.IN_PROGRESS && (
							<Action>
								<Button fullWidth processing={isProcessing} onClick={handleCloseProject}>
									Zakończ zlecenie
								</Button>
							</Action>
						)}
					</ProjectDetailsWrapper>
					<ProjectDetailsChat messages={detailedProjectMessages} isProcessing={isProcessing} sendMessage={sendMessage} />
				</Wrapper>
			)}
		</FeatureBaseTemplate>
	);
};

export default ProjectDetails;
