import React, { FC } from 'react';
import { Helmet } from 'react-helmet-async';

type Props = { authToken: string; gamesCode: string };
export const OlympicsMedalTable: FC<Props> = ({ authToken, gamesCode }) => (
  <>
    <Helmet>
      <script
        async
        src="https://olympics-embed.pamedia.io/static/medal-table.js"
        charSet="UTF-8"
        defer
      />
    </Helmet>
    <div
      className="pa-medaltable"
      data-auth-token={authToken}
      data-games-code={gamesCode}
      data-font-size="1.25rem"
    />
  </>
);
