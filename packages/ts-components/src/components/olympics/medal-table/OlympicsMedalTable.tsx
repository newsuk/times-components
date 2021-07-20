import React, { FC } from 'react';
import { Helmet } from 'react-helmet-async';

type Props = { authToken: string; gamesCode: string; endpoint: string };
export const OlympicsMedalTable: FC<Props> = ({
  endpoint,
  authToken,
  gamesCode
}) => (
  <>
    <Helmet>
      <script async src={endpoint} charSet="UTF-8" defer />
    </Helmet>
    <div
      className="pa-medaltable"
      data-auth-token={authToken}
      data-games-code={gamesCode}
      data-font-size="1.25rem"
    />
  </>
);
