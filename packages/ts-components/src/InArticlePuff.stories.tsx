import React from 'react';

import { showcaseConverter } from '@times-components/storybook';

import { action } from '@storybook/addon-actions';

const analyticsStream = (event: any) => {
  console.log(event);
  action('analytics-event')(event);
};

import InArticlePuff from './InArticlePuff';

const showcase = {
  children: [
    {
      component: () => (
        <InArticlePuff
          analyticsStream={analyticsStream}
          label="INTERACTIVE"
          imageUri="https://nuk-tnl-deck-prod-static.s3-eu-west-1.amazonaws.com/uploads/b309b4cc1fe7a2d9a940f93e29701615.jpg"
          headline="Where can I get a Covid vaccine in England?"
          copy="Enter your postcode in our tool to find your nearest vacination centre"
          link="#"
          linkText="Read more"
        />
      ),
      name: 'In Article Puff',
      type: 'story'
    },
    {
      component: () => (
        <InArticlePuff
          analyticsStream={analyticsStream}
          label="INTERACTIVE"
          headline="Tracking coronavirus in the UK: where latest cases have spread"
          copy="See how the virus has escalated in areas scross the country as the number of identified cases in Britain continues to grow"
          link="https://www.thetimes.co.uk/"
          linkText="Read more"
        />
      ),
      name: 'In Article Puff - No Image',
      type: 'story'
    }
  ],
  name: 'Typescript Component/In Article Puff'
};

// @ts-ignore
showcaseConverter(module, showcase);
