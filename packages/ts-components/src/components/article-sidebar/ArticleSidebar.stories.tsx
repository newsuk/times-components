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
      url: 'https://www.thetimes.com/puzzles/crossword',
      imgUrl:
        'https://www.thetimes.com/d/img/puzzles/new-svg-icons/crosswordclub-bab367331b.svg'
    },
    {
      title: 'Polygon',
      url: 'https://www.thetimes.com/puzzles/word-puzzles',
      imgUrl:
        'https://www.thetimes.com/d/img/puzzles/new-svg-icons/polygon-20e7fe15fe.svg'
    },
    {
      title: 'Sudoku',
      url: 'https://www.thetimes.com/puzzles/sudoku',
      imgUrl:
        'https://www.thetimes.com/d/img/puzzles/new-svg-icons/sudoku-82ab496537.svg'
    }
  ];
  const pageLink = 'https://www.thetimes.com/puzzles';

  return { sectionTitle, data, pageLink };
};

storiesOf('Typescript Component/Article Sidebar', module).add(
  'Article Sidebar',
  () => {
    const props = getAttributes();

    return (
      <TrackingContextProvider
        context={{
          component: 'ArticleSkeleton',
          object: 'ArticleSidebar',
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
