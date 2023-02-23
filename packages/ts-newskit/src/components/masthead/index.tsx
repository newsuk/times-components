import React from 'react';
import {
  ThemeProvider,
  DateTime,
  LinkInline,
  ScreenReaderOnly,
  Headline,
  Visible
} from 'newskit';
import { TimesWebLightTheme } from '../../theme';
import { MainHeader, Masthead } from './styles';
import { NewsKitTimesMasthead, NewsKitSundayTimesMasthead } from '../../assets';

const dateNow = new Date().toISOString();

export const EditionMasthead: React.FC<{
  isSunday: boolean;
  todaysDate?: string;
}> = ({ isSunday, todaysDate = dateNow }) => {
  return (
    <ThemeProvider theme={TimesWebLightTheme}>
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
            />
            <LinkInline href="/" overrides={{ stylePreset: 'mastheadLogo' }}>
              {isSunday ? (
                <NewsKitSundayTimesMasthead />
              ) : (
                <NewsKitTimesMasthead />
              )}
            </LinkInline>
          </Masthead>
        </Visible>
      </MainHeader>
    </ThemeProvider>
  );
};

export default EditionMasthead;
