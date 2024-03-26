import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import SaveAndShareBar from '..';
import { TrackingContextProvider } from '@times-components/ts-components';
import { mockGetTokenisedArticleUrl } from './mocks/mock-get-tokenised-article-url';
// @ts-ignore
import MockedProvider from '@times-components/provider-test-tools';
// @ts-ignore
import { mockUserState } from '@times-components/user-state';

export const UserState = mockUserState();

const renderSaveAndShareBar = (analyticsStream?: (event: any) => void) => {
  const onCopyLink = jest.fn();
  const onShareEmail = jest.fn();
  const articleId = '96508c84-6611-11e9-adc2-05e1b87efaea';
  const articleUrl = 'https://www.thetimes.co.uk/';
  const articleHeadline = 'test-headline';
  const props = {
    articleId,
    articleUrl,
    articleHeadline,
    onCopyLink,
    onShareEmail,
    getTokenisedShareUrl: mockGetTokenisedArticleUrl,
    sharingEnabled: true,
    savingEnabled: true,
    isPreviewMode: false
  };

  return render(
    <TrackingContextProvider
      context={{
        component: 'save-and-share-bar',
        attrs: {}
      }}
      analyticsStream={analyticsStream}
    >
      <MockedProvider>
        <SaveAndShareBar {...props} />
      </MockedProvider>
    </TrackingContextProvider>
  );
};

describe('SaveAndShareBar', () => {
  it('should render correctly when user is logged in', () => {
    const { asFragment } = renderSaveAndShareBar();
    expect(asFragment).toMatchSnapshot();
  });
});
