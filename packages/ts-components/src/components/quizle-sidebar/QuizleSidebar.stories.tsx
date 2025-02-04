import React from 'react';
import { storiesOf } from '@storybook/react';
import { QuizleSidebar } from './QuizleSidebar';
import { TrackingContextProvider } from '../../helpers/tracking/TrackingContextProvider';
import analyticsStream from '../../fixtures/analytics-actions/analytics-actions';

const getAttributes = () => {
  const sectionTitle = "Today's Quizle";
  const pageLink = 'https://www.thetimes.com/quizle';

  return { sectionTitle, pageLink };
};

storiesOf('Typescript Component/Quizle Sidebar', module).add(
  'Quizle Sidebar',
  () => {
    const props = getAttributes();

    return (
      <TrackingContextProvider
        context={{
          component: 'ArticleSkeleton',
          object: 'QuizleSidebar',
          attrs: {
            article_name: 'articleHeadline',
            section_details: 'section'
          }
        }}
        analyticsStream={analyticsStream}
      >
        <div style={{ maxWidth: '204px' }}>
          <QuizleSidebar {...props} />
        </div>
      </TrackingContextProvider>
    );
  }
);
