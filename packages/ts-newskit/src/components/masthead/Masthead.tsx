import React from 'react';
import { ThemeProvider, DateTime, LinkInline } from 'newskit'
import { MainHeader, Masthead, MastheadTitle } from './style'

import { TimesMasthead } from '../../assets';
import { TimesWebLightTheme } from '../../theme';

const todaysDate = (new Date()).toISOString();
// const isSunday = ;

export const EditionMasthead: React.FC<{}> = () => {
	return (
		<ThemeProvider theme={TimesWebLightTheme}>
			<MainHeader>
				<Masthead>
					<MastheadTitle>The Times & The Sunday Times Homepage</MastheadTitle>
					<DateTime
						date={todaysDate}
						dateFormat='EEEE MMMM d yyyy'
						prefix=''
						suffix=''
						overrides={{
							stylePreset: 'mastheadTime'
						}}
						/>
					<LinkInline href='/' overrides={{stylePreset: 'mastheadLogo' }}>
						<TimesMasthead />
					</LinkInline>
				</Masthead>
			</MainHeader>
		</ThemeProvider>
	);
};