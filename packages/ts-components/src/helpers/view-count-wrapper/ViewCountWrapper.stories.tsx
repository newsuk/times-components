import React from 'react';
import { showcaseConverter } from '@times-components/storybook';

import { ViewCountWrapper } from './ViewCountWrapper';

const setCookieConsent = (value: boolean) => {
  window.document.cookie = `nuk-consent-personalisation=${
    value ? 1 : ';max-age=0'
  }`;
};

const showcase = {
  children: [
    {
      component: ({
        boolean: bool,
        select
      }: {
        boolean: (name: string, def: boolean) => boolean;
        select: (
          name: string,
          values: { [name: string]: string },
          def: string
        ) => string;
      }) => {
        const trackingName = 'counter';
        const show = bool('show', true);
        const consent = bool('Set Consent Cookie', true);

        setCookieConsent(consent);

        const height = select(
          'Content size above component',
          {
            'Half Viewport': '50vh',
            'Full Viewport': '100vh'
          },
          '50vh'
        );
        const contentStyle = {
          background: 'linear-gradient(#f4f4f4, #f4f4f4 50%, #eee 50%, #eee)',
          backgroundSize: '100% 20px',
          border: '30px solid #f4f4f4',
          height
        };
        return (
          <>
            Current Count = {window.sessionStorage.getItem('view-count')}
            <div style={contentStyle} />
            {show && (
              <ViewCountWrapper
                trackingName={trackingName}
                displayFunction={count => (count || 0) % 2 === 1}
              >
                <div
                  style={{
                    alignItems: 'center',
                    background: '#aaa',
                    border: 'solid 5px #555',
                    display: 'flex',
                    height: 200,
                    justifyContent: 'center',
                    width: 200
                  }}
                >
                  The Puff
                </div>
              </ViewCountWrapper>
            )}
            <div style={contentStyle} />
          </>
        );
      },
      name: 'View Count Wrapper in a scroller',
      platform: 'web',
      type: 'story'
    }
  ],
  name: 'Typescript Component/View Count Wrapper'
};

// @ts-ignore
showcaseConverter(module, showcase);
