import React from 'react';
import { ThemeProvider, DateTime, LinkInline } from 'newskit'
import { MainHeader, Masthead, MastheadTitle, MastheadLogoImg } from './style'
import { TimesWebLightTheme } from '../../theme';

const todaysDate = (new Date()).toISOString();

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
					<LinkInline href='/' className='js-tracking' overrides={{stylePreset: 'mastheadLogo' }}>
						<MastheadLogoImg src='https://www.thetimes.co.uk/d/img/logos/times-black-ee1e0ce4ed.png' alt='The Times' />
					</LinkInline>
				</Masthead>
			</MainHeader>
		</ThemeProvider>
  );
};