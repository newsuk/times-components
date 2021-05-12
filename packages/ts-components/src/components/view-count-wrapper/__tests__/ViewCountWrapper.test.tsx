import React from 'react';
import { create } from 'react-test-renderer';

import { delay } from '@times-components/test-utils';

import { ViewCountWrapper } from '../ViewCountWrapper';

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
  });
  describe('display function', () => {
    it('always renders', () => {
      const component = create(
        <ViewCountWrapper trackingName="hello1">
          <span>Hello</span>
        </ViewCountWrapper>
      );
      expect(
        component.root.findByProps({ className: 'view-count' }).props.style
          .display
      ).toEqual('block');
      expect(component).toMatchSnapshot();
    });

    it('doesnt render without consent', () => {
      window.document.cookie = 'nuk-consent-personalisation=;max-age=0';

      const component = create(
        <ViewCountWrapper trackingName="hello1">
          <span>Hello</span>
        </ViewCountWrapper>
      );
      expect(
        component.root.findByProps({ className: 'view-count' }).props.style
          .display
      ).toEqual('none');
      expect(component).toMatchSnapshot();
    });
    it('never renders', () => {
      const component = create(
        <ViewCountWrapper trackingName="hello1" displayFunction={() => false}>
          <span>Hello</span>
        </ViewCountWrapper>
      );
      expect(
        component.root.findByProps({ className: 'view-count' }).props.style
          .display
      ).toEqual('none');
      expect(component).toMatchSnapshot();
    });
  });
  describe('intersectionObserverTests', () => {
    let oldIntersectionObserver:
      | IntersectionObserver
      | typeof window.IntersectionObserver;
    beforeEach(() => {
      oldIntersectionObserver = window.IntersectionObserver;

      type MockCallbackType = (props: Array<{ isIntersecting: boolean }>) => {};

      class FakeIntersectionObserver {
        static callback: MockCallbackType;
        static observe = jest.fn();
        static disconnect = jest.fn();

        static intersect(): void {
          FakeIntersectionObserver.callback([{ isIntersecting: true }]);
        }

        observe = FakeIntersectionObserver.observe;
        disconnect = FakeIntersectionObserver.disconnect;

        constructor(callback: MockCallbackType) {
          FakeIntersectionObserver.callback = callback;
        }
      }
      // @ts-ignore
      window.IntersectionObserver = FakeIntersectionObserver;
    });

    afterEach(() => {
      // @ts-ignore
      window.IntersectionObserver = oldIntersectionObserver;
    });

    it('intersects', async () => {
      create(
        <ViewCountWrapper trackingName="hello1" displayFunction={() => false}>
          <span>Hello</span>
        </ViewCountWrapper>
      );
      await delay(0);
      expect(window.sessionStorage.getItem('view-count')).toEqual(
        JSON.stringify({ hello1: 1 })
      );

      // @ts-ignore
      window.IntersectionObserver.intersect();

      expect(window.sessionStorage.getItem('view-count')).toEqual(
        JSON.stringify({ hello1: 2 })
      );
      // @ts-ignore
      expect(window.IntersectionObserver.disconnect).toHaveBeenCalledWith();
    });
  });
  describe('using a display function', () => {
    it('[1,3]', async () => {
      const trackingName = 'hello1';
      const setCount = (count: number) =>
        window.sessionStorage.setItem(
          'view-count',
          JSON.stringify({ [trackingName]: count })
        );

      const render = () =>
        create(
          <ViewCountWrapper
            trackingName={trackingName}
            displayFunction={value =>
              value !== undefined ? [1, 3].includes(value) : false
            }
          >
            <span>Hello</span>
          </ViewCountWrapper>
        );
      setCount(1);
      let component = render();
      await delay(0);
      expect(
        component.root.findByProps({ className: 'view-count' }).props.style
          .display
      ).toEqual('block');

      setCount(2);
      component = render();
      await delay(0);
      expect(
        component.root.findByProps({ className: 'view-count' }).props.style
          .display
      ).toEqual('none');

      setCount(3);
      component = render();
      await delay(0);
      expect(
        component.root.findByProps({ className: 'view-count' }).props.style
          .display
      ).toEqual('block');

      setCount(4);
      component = render();
      await delay(0);
      expect(
        component.root.findByProps({ className: 'view-count' }).props.style
          .display
      ).toEqual('none');

      setCount(5);
      component = render();
      await delay(0);
      expect(
        component.root.findByProps({ className: 'view-count' }).props.style
          .display
      ).toEqual('none');
    });
  });
});
