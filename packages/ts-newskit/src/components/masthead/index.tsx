import React from 'react';
import { ThemeProvider, DateTime, LinkInline } from 'newskit'
import { MainHeader, Masthead, MastheadTitle } from './style'

import { TimesMasthead, SundayTimesMasthead } from '../../assets';
import { TimesWebLightTheme } from '../../theme';

const todaysDate = (new Date()).toISOString();

export const EditionMasthead: React.FC<{ isSunday: boolean }> = ({ isSunday }) => {
	const ShowMasthead = isSunday ? <SundayTimesMasthead />:<TimesMasthead />;
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
						{ShowMasthead(isSunday)}
					</LinkInline>
				</Masthead>
			</MainHeader>
		</ThemeProvider>
	);
};
