import React from 'react';
import { ThemeProvider, DateTime, LinkInline, ScreenReaderOnly } from 'newskit'
import { TimesWebLightTheme } from '../../theme';
import { MainHeader, Masthead } from './style';
import { NewsKitTimesMasthead, NewsKitSundayTimesMasthead } from '../../assets';

const todaysDate = (new Date()).toISOString();

export const EditionMasthead: React.FC<{ isSunday: boolean }> = ({ isSunday }) => {
	const ShowMasthead = isSunday ? <SundayTimesMasthead />:<TimesMasthead />;
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
