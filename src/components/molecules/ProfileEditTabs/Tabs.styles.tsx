import styled from 'styled-components';
import { MEDIA_WIDTH_MD, selectBackground, selectColor } from '../../../assets/styles/utility';

export const Wrapper = styled.div`
	${selectBackground('white')}
	border-radius: 10px 10px 0 0;
	border-bottom: ${({ theme: { colors } }) => colors.lightGray} 2px solid;
	box-shadow: 0 10px 35px -15px rgb(0 0 0 / 10%);

	button:first-child {
		border-radius: 10px 0 0 0;
	}

	button:last-child {
		border-radius: 0 10px 0 0;
	}

	button {
		${selectBackground('white')}
		width: 25%;
		padding: 12px;

		@media (max-width: ${MEDIA_WIDTH_MD}) {
			width: 100%;
			margin: 0 auto;
			&:first-child,
			&:last-child {
				border-radius: 0;
			}
		}
	}

	.MuiButtonBase-root-MuiTab-root.Mui-selected {
		${selectColor('blue')};
	}

	.MuiTabs-flexContainer {
		justify-content: center;
	}

	.MuiTabs-indicator {
		height: 3px;
		${selectBackground('blue')};
	}
`;
