import React from 'react';
import {
  LinkInline,
  ScreenReaderOnly,
  Headline,
  Visible,
  Block
} from 'newskit';
import { Masthead, MastheadDate } from './styles';
import { NewsKitTimesMasthead, NewsKitSundayTimesMasthead } from '../../assets';

interface EditionMastheadProps {
  isSunday?: boolean;
  todaysDate?: string;
};

const dateNow = new Date().toISOString();

export const EditionMasthead = ({ isSunday = false, todaysDate = dateNow }: EditionMastheadProps) => {
  return (
    <Block as="header">
      <Visible md lg xl>
        <Masthead>
          <ScreenReaderOnly id="sr-times-logo">
            <Headline headingAs="h1">
              The Times &amp; The Sunday Times Homepage
            </Headline>
          </ScreenReaderOnly>
          <MastheadDate
            date={todaysDate}
            dateFormat="EEEE MMMM d yyyy"
            overrides={{
              marginBlockEnd: 'space020',
              typographyPreset: 'mastheadTime'
            }}
            data-testid="date-time"
          />
          <LinkInline href="/" overrides={{ stylePreset: 'mastheadLogo' }} aria-labelledby="sr-times-logo" >
            {isSunday ? (
              <NewsKitSundayTimesMasthead />
            ) : (
              <NewsKitTimesMasthead />
            )}
          </LinkInline>
        </Masthead>
      </Visible>
    </Block>
  );
};
