import { ReactElement } from 'react';
import { SpinnerStyledProps, Wrapper } from './Spinner.styles';
import { CircularProgress as MaterialSpinner } from '@mui/material';

const Spinner = ({ color }: SpinnerStyledProps): ReactElement => (
	<Wrapper color={color}>
		<MaterialSpinner />
	</Wrapper>
);

export default Spinner;
