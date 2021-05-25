import React from 'react';

import { cleanup, render } from '@testing-library/react';

import { AutoNewsletterPuff } from '../AutoNewsletterPuff';
import FakeIntersectionObserver from '../../../test-utils/FakeIntersectionObserver';
import { MockedProvider } from '@times-components/provider-test-tools';
import {
  getNewsletter,
  subscribeNewsletter
} from '@times-components/provider-queries';

const defaultProps = {
  code: '123',
  copy: 'abc',
  headline: 'headline',
  imageUri: 'http://jpeg.jpg',
  label: 'news'
};

const mocks = [
  {
    request: {
      query: getNewsletter,
      variables: {
        code: 'TNL-101'
      }
    },
    result: {
      data: {
        newsletter: {
          id: 'a2l6E000000CdHzQAK',
          isSubscribed: false,
          title: 'Best of Times',
          __typename: 'Newsletter'
        }
      }
    }
  },
  {
    delay: 1000,
    request: {
      query: subscribeNewsletter,
      variables: {
        code: 'TNL-101'
      }
    },
    result: {
      data: {
        subscribeNewsletter: {
          id: 'a2l6E000000CdHzQAK',
          isSubscribed: true,
          __typename: 'Newsletter'
        }
      }
    }
  }
];

const renderPuff = () =>
  render(
    <MockedProvider mocks={mocks}>
      <AutoNewsletterPuff {...defaultProps} />
    </MockedProvider>
  );

describe('<AutoNewsletterPuff>', () => {
  beforeEach(() => {
    if (typeof window !== 'undefined') {
      window.document.cookie = 'nuk-consent-personalisation=1';
    }
  });

  afterEach(() => {
    if (typeof window !== 'undefined') {
      window.document.cookie = 'nuk-consent-personalisation=;max-age=0';
    }
    cleanup();
  });

  describe('display function', () => {
    it('always renders', () => {
      const { baseElement } = renderPuff();
      const viewCountElement = baseElement.querySelector(
        '.view-count'
      ) as HTMLDivElement;

      expect(viewCountElement.style.display).toEqual('block');

      expect(viewCountElement).toMatchSnapshot();
    });

    it('doesnt render without consent', () => {
      window.document.cookie = 'nuk-consent-personalisation=;max-age=0';

      const { baseElement } = renderPuff();
      const viewCountElement = baseElement.querySelector(
        '.view-count'
      ) as HTMLDivElement;
      expect(viewCountElement.style.display).toEqual('none');

      expect(viewCountElement).toMatchSnapshot();
    });
  });

  describe('intersectionObserverTests', () => {
    let oldIntersectionObserver: typeof IntersectionObserver;
    beforeEach(() => {
      oldIntersectionObserver = window.IntersectionObserver;
      // @ts-ignore
      window.IntersectionObserver = FakeIntersectionObserver;
    });

    afterEach(() => {
      window.IntersectionObserver = oldIntersectionObserver;
    });

    it('intersects', async () => {
      renderPuff();
      expect(window.sessionStorage.getItem('view-count')).toEqual(
        JSON.stringify({ 'auto-puff-123': 1 })
      );
      FakeIntersectionObserver.intersect();

      expect(window.sessionStorage.getItem('view-count')).toEqual(
        JSON.stringify({ 'auto-puff-123': 2 })
      );
      // @ts-ignore
      expect(FakeIntersectionObserver.disconnect).toHaveBeenCalledWith();
    });
  });

  describe('using a display function [1, 3]', () => {
    const trackingName = 'auto-puff-123';

    const renderComponent = () => {
      const { baseElement } = renderPuff();
      return baseElement.querySelector('.view-count') as HTMLDivElement;
    };

    const setCount = (count: number) => {
      window.sessionStorage.setItem(
        'view-count',
        JSON.stringify({ [trackingName]: count })
      );
    };

    it('count = 1', async () => {
      setCount(1);
      expect(renderComponent()).toMatchSnapshot();
      expect(renderComponent().style.display).toEqual('block');
    });

    it('count = 2', async () => {
      setCount(2);
      expect(renderComponent()).toMatchSnapshot();
      expect(renderComponent().style.display).toEqual('none');
    });

    it('count = 3', async () => {
      setCount(3);
      expect(renderComponent().style.display).toEqual('block');
    });

    it('count = 4', async () => {
      setCount(4);
      expect(renderComponent().style.display).toEqual('none');
    });
  });
});
