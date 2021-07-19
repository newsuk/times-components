import React from 'react';
import { Helmet } from 'react-helmet-async';
export const OlympicsMedalTable = () => (
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
      data-auth-token="6i3DuEwbVhr2Fht6"
      data-games-code="OG2020"
      data-font-size="1.25rem"
    />
  </>
);
