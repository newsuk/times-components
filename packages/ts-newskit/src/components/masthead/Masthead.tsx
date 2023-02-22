import React from 'react';
import { DateTime, LinkInline } from 'newskit';
import { MainHeader, Masthead, MastheadTitle } from './style';

import { SundayTimesMasthead, TimesMasthead } from './assets';

const todaysDate = (new Date()).toISOString();

export const MainMasthead: React.FC<{ isSunday: boolean }> = ( {isSunday} ) => {
	return (
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
                    {isSunday ? <SundayTimesMasthead /> : <TimesMasthead />}
                </LinkInline>
            </Masthead>
        </MainHeader>
	);
};