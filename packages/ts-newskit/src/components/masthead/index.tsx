import React from 'react';
import { NewsKitProvider } from 'newskit'
import { TimesWebLightTheme } from '../../theme';
import { MainMasthead } from './Masthead';

export const EditionMasthead: React.FC<{}> = () => {
	return (
		<NewsKitProvider theme={TimesWebLightTheme}>
			<MainMasthead />
		</NewsKitProvider>
	);
};
