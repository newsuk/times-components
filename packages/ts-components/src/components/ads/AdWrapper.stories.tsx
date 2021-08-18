import React from 'react';
import { storiesOf } from '@storybook/react';

import { ArticleHarness } from '../../fixtures/article-harness/ArticleHarness';
import { InlineAd } from './InlineAd';
import { AdWrapper } from './AdWrapper';

storiesOf('Typescript Component/Ads/Ad Wrapper', module)
  .addDecorator((storyFn: () => React.ReactNode) => (
    <AdWrapper slotName="inline-ad">
      <ArticleHarness>{storyFn()}</ArticleHarness>
    </AdWrapper>
  ))

  .add('Inline Ad', () => (
      <InlineAd slotName="inline-ad" />
  ));
