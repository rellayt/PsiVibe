import React from 'react';
import ReactDOM from 'react-dom';
import Root from 'views/Root';
import AppProviders from 'core/providers/AppProviders';

ReactDOM.render(
	<React.StrictMode>
		<AppProviders>
			<Root />
		</AppProviders>
	</React.StrictMode>,
	document.getElementById('root')
);
