import React from 'react';
import {
  DateTime,
  LinkInline,
  ScreenReaderOnly,
  Headline,
  Visible
} from 'newskit';
import { MainHeader, Masthead } from './styles';
import { NewsKitTimesMasthead, NewsKitSundayTimesMasthead, NewsKitMasthead } from '../../assets';

const dateNow = new Date().toISOString();

export const EditionMasthead: React.FC<{
  isSunday: boolean;
  todaysDate?: string;
}> = ({ isSunday, todaysDate = dateNow }) => {
  return (
    <MainHeader>
      <Visible md lg xl>
        <Masthead>
          <ScreenReaderOnly id="sr-only">
            <Headline headingAs="h1">
              The Times &amp; The Sunday Times Homepage
            </Headline>
          </ScreenReaderOnly>
          <DateTime
            date={todaysDate}
            dateFormat="EEEE MMMM d yyyy"
            overrides={{
              stylePreset: 'mastheadTime',
              typographyPreset: 'mastheadTime'
            }}
            data-testid="date-time"
          />
          <LinkInline href="/" color="black" overrides={{ stylePreset: 'mastheadLogo' }}>
            {isSunday ? (
              <NewsKitSundayTimesMasthead />
            ) : (
              <NewsKitMasthead width={434} height={53} />
            )}
          </LinkInline>
        </Masthead>
      </Visible>
    </MainHeader>
  );
};
