import styled from 'styled-components';
import { flexColAlignAndJustifyCenter } from '../../../assets/styles/utility';

export const Wrapper = styled.div`
	${flexColAlignAndJustifyCenter};
	height: 535px;
	& > * {
		margin: 8px 0;
	}
`;
