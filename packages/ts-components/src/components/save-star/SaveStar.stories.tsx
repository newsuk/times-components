import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';

import { SaveStar } from './SaveStar';
import { TrackingContextProvider } from '../../helpers/tracking/TrackingContextProvider';

import analyticsStream from '../../fixtures/analytics-actions/analytics-actions';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
`;

storiesOf('Typescript Component/SaveStar', module)
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
      <Wrapper>{storyFn()}</Wrapper>
    </TrackingContextProvider>
  ))
  .add('SaveStar', () => <SaveStar articleId="12345" isPreviewMode />);
