// IMPORTANT: This component is in the process of being moved to the main repository.
// Please avoid making any changes to this file for the time being.
// For updates or modifications, refer to the main repository once the move is complete.
// In case of emergencies, please reach out to reader-experience team for further assistance.

import React from 'react';
import {
  ScreenReaderOnly,
  Headline,
  Visible,
  Block,
  LinkInline
} from 'newskit';
import { Masthead, MastheadDate } from './styles';
import {
  NewsKitTimesMasthead,
  NewsKitSundayTimesMasthead
} from '../../../assets';

interface EditionMastheadProps {
  isSunday?: boolean;
  todaysDate?: string;
}

const dateNow = new Date().toISOString();

export const EditionMasthead = ({
  isSunday = false,
  todaysDate = dateNow
}: EditionMastheadProps) => {
  return (
    <Block as="header">
      <Visible md lg xl>
        <Masthead paddingBlockEnd="space040">
          <ScreenReaderOnly id="sr-times-logo">
            <Headline headingAs="h1">
              The Times &amp; The Sunday Times Homepage
            </Headline>
          </ScreenReaderOnly>
          <MastheadDate
            date={todaysDate}
            dateFormat="EEEE MMMM d yyyy"
            overrides={{
              typographyPreset: 'mastheadTime'
            }}
            data-testid="date-time"
          />
          <Block>
            <LinkInline
              href="/"
              overrides={{ stylePreset: 'mastheadLogo' }}
              aria-labelledby="sr-times-logo"
            >
              {isSunday ? (
                <NewsKitSundayTimesMasthead />
              ) : (
                <NewsKitTimesMasthead />
              )}
            </LinkInline>
          </Block>
        </Masthead>
      </Visible>
    </Block>
  );
};
