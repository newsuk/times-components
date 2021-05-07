import React from 'react';

import { showcaseConverter } from '@times-components/storybook';
import { InArticlePuff } from './InArticlePuff';
import { FetchProvider } from '../fetch/FetchProvider';

/*
          label="INTERACTIVE"
            imageUri="https://nuk-tnl-deck-prod-static.s3-eu-west-1.amazonaws.com/uploads/b309b4cc1fe7a2d9a940f93e29701615.jpg"
            headline="Where can I get a Covid vaccine in England?"
            copy="Enter your postcode in our tool to find your nearest vacination centre"
            link="https://www.thetimes.co.uk/"
            linkText="Read more"

            label="INTERACTIVE"
          headline="Tracking coronavirus in the UK: where latest cases have spread"
          copy="See how the virus has escalated in areas scross the country as the number of identified cases in Britain continues to grow"
          link="https://www.thetimes.co.uk/"
          linkText="Read more"

*/

const showcase = {
  children: [
    {
      component: () => (
        <FetchProvider
          url={'https://gobble.timesdev.tools/deck/api/deck-post-action/41143'}
        >
          <InArticlePuff />
        </FetchProvider>
      ),
      name: 'In Article Puff',
      type: 'story'
    },
    {
      component: () => <InArticlePuff />,
      name: 'In Article Puff - No Image',
      type: 'story'
    }
  ],
  name: 'Typescript Component/In Article Puff'
};

// @ts-ignore
showcaseConverter(module, showcase);
