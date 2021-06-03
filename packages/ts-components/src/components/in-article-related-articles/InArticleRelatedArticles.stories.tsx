import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select } from '@storybook/addon-knobs';
import { colours } from '@times-components/styleguide';

import { InArticleRelatedArticles } from './InArticleRelatedArticles';

import { TrackingContextProvider } from '../../helpers/tracking/TrackingContextProvider';
import { ArticleHarness } from '../../fixtures/article-harness/ArticleHarness';
import analyticsStream from '../../fixtures/analytics-actions/analytics-actions';

const article1 = {
  label: 'VIDEO',
  headline: 'Who is Juan Guaido, the man who declared president?',
  link:
    'https://www.thetimes.co.uk/article/china-yunnan-mobilises-as-herd-of-15-marauding-elephants-approaches-capital-qvgttzz2w',
  image:
    'https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fe7a2f8f2-c3ec-11eb-8601-6a2ece3e4634.jpg?crop=3888%2C2187%2C0%2C202&resize=480'
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
    'https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2Ff1a0847a-c3ea-11eb-a26e-4c086490cfe1.jpg?crop=4418%2C2945%2C0%2C0&resize=685'
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

  .add('Related Articles', () => {
    const numberOfArticles = select(
      'Number of Articles',
      { Three: 3, Two: 2, One: 1 },
      3
    );
    const sectionColor = select('Section', colours.section, '#636C17');
    return (
      <InArticleRelatedArticles
        sectionColour={sectionColor}
        heading="Related Articles"
        relatedArticles={[article1, article2, article3].filter(
          ({}, index) => index < numberOfArticles
        )}
        showImages={boolean('Show Images', true)}
      />
    );
  });
