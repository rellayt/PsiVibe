import { ReactElement } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from 'assets/styles/theme';
import { GlobalStyle } from 'assets/styles/GlobalStyle';
import { StyledEngineProvider } from '@mui/material/styles';
import { ChildrenProps } from 'core/base/types/children.props';
import { SnackbarProvider } from './Snackbar.provider';

const AppProviders = ({ children }: ChildrenProps): ReactElement => {
	return (
		<Router>
			<ThemeProvider theme={theme}>
				<SnackbarProvider>
					<StyledEngineProvider injectFirst>
						<GlobalStyle />
						{children}
					</StyledEngineProvider>
				</SnackbarProvider>
			</ThemeProvider>
		</Router>
	);
};

export default AppProviders;
