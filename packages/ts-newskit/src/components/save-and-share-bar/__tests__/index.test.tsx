import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import * as ResizeObserverModule from 'resize-observer-polyfill';

(window as any).ResizeObserver = ResizeObserverModule.default;

import SaveAndShareBar from '..';
import { TrackingContextProvider } from '@times-components/ts-components';
import { mockGetTokenisedArticleUrl } from '../__mocks__/mock-get-tokenised-article-url';
// @ts-ignore
import { MockedProvider } from '@times-components/provider-test-tools';
// @ts-ignore
import { mockUserState } from '@times-components/user-state';
import { TCThemeProvider } from '../../../utils';

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
      <TCThemeProvider>
        <MockedProvider>
          <SaveAndShareBar {...props} />
        </MockedProvider>
      </TCThemeProvider>
    </TrackingContextProvider>
  );
};

describe('SaveAndShareBar', () => {
  it('should render correctly when user is logged in', () => {
    const { asFragment } = renderSaveAndShareBar();
    expect(asFragment).toMatchSnapshot();
  });

  it('opens the popover when share button is clicked', () => {
    const { getByTestId } = renderSaveAndShareBar();
    const shareButton = getByTestId('share-button');
    fireEvent.click(shareButton);
    expect(getByTestId('email-share')).toBeInTheDocument();
  });
});
