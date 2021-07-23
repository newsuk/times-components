import React, { FC, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { colours } from '@times-components/styleguide';
import { Container, Button } from './styles';
import { OlympicsKeys } from '../types';

export const OlympicsMedalTable: FC<{
  highlighted?: string;
  keys: OlympicsKeys;
  sectionColor?: string;
  wrapHelmetProvider?: boolean;
}> = ({
  keys: { endpoint, authToken, gamesCode },
  highlighted = 'GBR',
  sectionColor = colours.section.sport,
  wrapHelmetProvider = false
}) => {
  const [showAll, setShowAll] = useState(false);
  const handleShowAll = () => {
    setShowAll(!showAll);
  };
  const HelmetProviderWrapper: FC<{ wrap: boolean }> = ({ wrap, children }) =>
    wrap ? (
      <HelmetProvider context={{}}>{children}</HelmetProvider>
    ) : (
      <>{children}</>
    );
  return (
    <Container sectionColour={sectionColor} showAll={showAll}>
      <HelmetProviderWrapper wrap={wrapHelmetProvider}>
        <Helmet>
          <script
            src={`${endpoint}/static/medal-table.js`}
            charSet="UTF-8"
            defer
          />
        </Helmet>
      </HelmetProviderWrapper>
      <div
        className="pa-medaltable"
        data-auth-token={authToken}
        data-games-code={gamesCode}
        data-org-code={highlighted}
        data-medal-icon-type="round"
      />
      <div className="buttonContainer">
        <Button onClick={handleShowAll}>
          {showAll ? 'Collapse' : 'Show All'}
        </Button>
      </div>
    </Container>
  );
};
