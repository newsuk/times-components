import React from 'react';
import { ThemeProvider, DateTime, LinkInline } from 'newskit'
import { MainHeader, Masthead, MastheadTitle } from './style'

import { TimesMasthead, SundayTimesMasthead } from '../../assets';
import { TimesWebLightTheme } from '../../theme';

const todaysDate = (new Date()).toISOString();

function showMasthead(props) {
	const isSunday = props.isSunday;
	if (isSunday) {
		return <SundayTimesMasthead />;
	}
	return <TimesMasthead />;
};

export const EditionMasthead = () => {
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
						<showMasthead isSunday={false} />
					</LinkInline>
				</Masthead>
			</MainHeader>
		</ThemeProvider>
	);
};
