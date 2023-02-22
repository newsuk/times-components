import React from 'react';
import { ThemeProvider } from 'newskit'
import { TimesWebLightTheme } from '../../theme';
import { MainMasthead } from './Masthead';

export const EditionMasthead: React.FC<{ isSunday: boolean }> = ( {isSunday} ) => {
	return (
		<ThemeProvider theme={TimesWebLightTheme}>
			<MainMasthead isSunday={isSunday} />
		</ThemeProvider>
	);
};
