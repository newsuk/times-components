import React from 'react';
import { storiesOf } from '@storybook/react';

import InArticleRelatedArticles from './InArticleRelatedArticles';

import { TrackingContextProvider } from '../../helpers/tracking/TrackingContextProvider';
import { ArticleHarness } from '../../fixtures/article-harness/ArticleHarness';
import analyticsStream from '../../fixtures/analytics-actions/analytics-actions';

const article1 = {
  label: 'VIDEO',
  headline: 'Who is Juan Guaido, the man who declared president?',
  link:
    'https://www.thetimes.co.uk/article/china-yunnan-mobilises-as-herd-of-15-marauding-elephants-approaches-capital-qvgttzz2w',
  image:
    'https://nuk-tnl-deck-prod-static.s3-eu-west-1.amazonaws.com/uploads/c1b6ab118e9422965b7faa628e26e05b.jpeg'
};
const article2 = {
  label: 'COVID 19',
  headline: 'Where can I get a Covid vaccine in England?',
  link:
    'https://www.thetimes.co.uk/article/chinas-villages-trampled-in-elephant-herds-long-march-kvl8m8spx',
  image:
    'https://nuk-tnl-deck-prod-static.s3-eu-west-1.amazonaws.com/uploads/c1b6ab118e9422965b7faa628e26e05b.jpeg'
};

const article3 = {
  label: 'LEADING ARTICLE',
  headline: 'End of restriction is “hanging in the balance”',
  link:
    'https://www.thetimes.co.uk/article/the-times-view-on-elephants-suction-technique-talented-trunks-h3ck3zx6g',
  image:
    'https://nuk-tnl-deck-prod-static.s3-eu-west-1.amazonaws.com/uploads/c1b6ab118e9422965b7faa628e26e05b.jpeg'
};
storiesOf('Typescript Component/In Article/Related Articles', module)
  .addDecorator((storyFn: () => React.ReactNode) => (
    <TrackingContextProvider
      context={{
        component: 'ArticleSkeleton',
        attrs: {
          article_name: 'articleHeadline',
          section_details: 'section'
        }
      }}
      analyticsStream={analyticsStream}
    >
      <ArticleHarness>{storyFn()}</ArticleHarness>
    </TrackingContextProvider>
  ))

  .add('3 Articles', () => (
    <InArticleRelatedArticles
      sectionColour="#13354e"
      heading="Related Articles"
      relatedArticles={[article1, article2, article3]}
    />
  ))
  .add('2 Articles - no heading', () => (
    <InArticleRelatedArticles
      sectionColour="#13354e"
      relatedArticles={[article1, article2]}
    />
  ));
