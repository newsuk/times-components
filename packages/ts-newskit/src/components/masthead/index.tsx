import React from 'react';
import { ThemeProvider, DateTime, LinkInline, ScreenReaderOnly } from 'newskit'
import { TimesWebLightTheme } from '../../theme';
import { MainHeader, Masthead } from './style';
import { NewsKitTimesMasthead, NewsKitSundayTimesMasthead } from '../../assets';

export const EditionMasthead: React.FC<{}> = () => {
	return (
		<ThemeProvider theme={TimesWebLightTheme}>
			<MainHeader>
				<Masthead>
					<ScreenReaderOnly id="sr-only"><h1>The Times &amp; The Sunday Times Homepage</h1></ScreenReaderOnly>
					<DateTime
						date={todaysDate}
						dateFormat='EEEE MMMM d yyyy'
						prefix=''
						suffix=''
						overrides={{
							stylePreset: 'mastheadTime',
							typographyPreset: 'mastheadTime'
						}}
					/>
					<LinkInline href='/' overrides={{stylePreset: 'mastheadLogo' }}>
						{isSunday ? <NewsKitSundayTimesMasthead /> : <NewsKitTimesMasthead />}
					</LinkInline>
				</Masthead>
        	</MainHeader>
		</ThemeProvider>
	);
};

export default EditionMasthead;
