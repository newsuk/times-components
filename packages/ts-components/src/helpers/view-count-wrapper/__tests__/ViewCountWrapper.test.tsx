import React from 'react';

import { cleanup, render } from '@testing-library/react';

import { ViewCountWrapper } from '../ViewCountWrapper';
import FakeIntersectionObserver from '../../../test-utils/FakeIntersectionObserver';

describe('<ViewCountWrapper>', () => {
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
      const { baseElement } = render(
        <ViewCountWrapper trackingName="hello1">
          <span>Hello</span>
        </ViewCountWrapper>
      );
      const viewCountElement = baseElement.querySelector(
        '.view-count'
      ) as HTMLDivElement;

      expect(viewCountElement.style.display).toEqual('block');

      expect(viewCountElement).toMatchSnapshot();
    });

    it('doesnt render without consent', () => {
      window.document.cookie = 'nuk-consent-personalisation=;max-age=0';

      const { baseElement } = render(
        <ViewCountWrapper trackingName="hello1">
          <span>Hello</span>
        </ViewCountWrapper>
      );
      const viewCountElement = baseElement.querySelector(
        '.view-count'
      ) as HTMLDivElement;
      expect(viewCountElement.style.display).toEqual('none');

      expect(viewCountElement).toMatchSnapshot();
    });

    it('never renders', () => {
      const { baseElement } = render(
        <ViewCountWrapper trackingName="hello1" displayFunction={() => false}>
          <span>Hello</span>
        </ViewCountWrapper>
      );
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
      render(
        <ViewCountWrapper trackingName="hello1" displayFunction={() => false}>
          <span>Hello</span>
        </ViewCountWrapper>
      );
      expect(window.sessionStorage.getItem('view-count')).toEqual(
        JSON.stringify({ hello1: 1 })
      );
      FakeIntersectionObserver.intersect();

      expect(window.sessionStorage.getItem('view-count')).toEqual(
        JSON.stringify({ hello1: 2 })
      );
      // @ts-ignore
      expect(FakeIntersectionObserver.disconnect).toHaveBeenCalledWith();
    });
  });

  describe('using a display function [1, 3]', () => {
    const trackingName = 'hello1';

    const renderComponent = () => {
      const { baseElement } = render(
        <ViewCountWrapper
          trackingName={trackingName}
          displayFunction={value =>
            value !== undefined ? [1, 3].includes(value) : false
          }
        >
          <span>Hello</span>
        </ViewCountWrapper>
      );
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
      expect(renderComponent().style.display).toEqual('block');
    });

    it('count = 2', async () => {
      setCount(2);
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
