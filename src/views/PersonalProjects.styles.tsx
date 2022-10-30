import styled from 'styled-components';

export const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 50% 50%;
	grid-template-rows: 150px;
	& > * {
		align-self: center;
		justify-self: center;
	}
`;
