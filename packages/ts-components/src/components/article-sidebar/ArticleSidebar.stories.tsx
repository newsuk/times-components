import React from 'react';
import { storiesOf } from '@storybook/react';
import { ArticleSidebar } from './ArticleSidebar';
import { TrackingContextProvider } from '../../helpers/tracking/TrackingContextProvider';
import analyticsStream from '../../fixtures/analytics-actions/analytics-actions';

const getAttributes = () => {
  const sectionTitle = 'Puzzles';
  const data = [
    {
      title: 'Crossword',
      url: 'https://www.thetimes.co.uk/puzzles/crossword',
      imgUrl:
        'https://www.thetimes.co.uk/d/img/puzzles/new-illustrations/crossword-c7ae8934ef.png'
    },
    {
      title: 'Polygon',
      url: 'https://www.thetimes.co.uk/puzzles/word-puzzles',
      imgUrl:
        'https://www.thetimes.co.uk/d/img/puzzles/new-illustrations/polygon-875ea55487.png'
    },
    {
      title: 'Sudoku',
      url: 'https://www.thetimes.co.uk/puzzles/sudoku',
      imgUrl:
        'https://www.thetimes.co.uk/d/img/puzzles/new-illustrations/sudoku-ee2aea0209.png'
    }
  ];
  const pageLink = 'https://www.thetimes.co.uk/puzzles';

  return { sectionTitle, data, pageLink };
};

storiesOf('Typescript Component/Article Sidebar', module).add(
  'Article Sidebar',
  () => {
    const props = getAttributes();

    return (
      <TrackingContextProvider
        context={{
          component: 'ArticleSidebar',
          attrs: {
            article_name: 'articleHeadline',
            section_details: 'section'
          }
        }}
        analyticsStream={analyticsStream}
      >
        <div style={{ maxWidth: '204px' }}>
          <ArticleSidebar {...props} />
        </div>
      </TrackingContextProvider>
    );
  }
);
