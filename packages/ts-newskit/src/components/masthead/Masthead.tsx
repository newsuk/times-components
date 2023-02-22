import React from 'react';
import { DateTime, LinkInline, ScreenReaderOnly } from 'newskit';
import { MainHeader, Masthead } from './style';
import { SundayTimesMasthead, TimesMasthead } from './assets';

const todaysDate = (new Date()).toISOString();

export const MainMasthead: React.FC<{ isSunday: boolean }> = ( {isSunday} ) => {
	return (
        <MainHeader>
            <Masthead>
                <ScreenReaderOnly id="sr-only"><h1>The Times &amp; The Sunday Times Homepage</h1></ScreenReaderOnly>
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