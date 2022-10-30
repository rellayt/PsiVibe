import styled from 'styled-components';
import { selectBackground, flexJustifyCenter, MEDIA_WIDTH_MD } from 'assets/styles/utility';

export const Wrapper = styled.div`
	width: 500px;
	border-radius: 20px;
	padding: 42px 42px 36px 42px;
	${flexJustifyCenter};
	${selectBackground('white')};
	box-shadow: ${({
		theme: {
			boxShadows: { card },
		},
	}) => card};
	@media (max-width: ${MEDIA_WIDTH_MD}) {
		padding: 24px;
	}
`;
