import React from 'react';
import { ThemeProvider, DateTime, LinkInline } from 'newskit';
import { MainHeader, Masthead, MastheadTitle } from './style';

import { NewsKitTimesMasthead } from '../../assets';
import { TimesWebLightTheme } from '../../theme';

const todaysDate = (new Date()).toISOString();

export const MainMasthead: React.FC<{}> = () => {
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
                        <NewsKitTimesMasthead />
                    </LinkInline>
                </Masthead>
            </MainHeader>
        </ThemeProvider>
	);
};