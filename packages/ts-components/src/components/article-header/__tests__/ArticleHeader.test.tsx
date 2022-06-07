import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockDate from 'mockdate';

import ArticleHeader from '../ArticleHeader';

describe('ArticleHeader', () => {
  describe('Same calendar day during GMT', () => {
    afterEach(() => MockDate.reset());

    const updated = '2021-12-31T06:30:00+00:00';

    it('Within a minute of updating', () => {
      MockDate.set('2021-12-31T06:30:10+00:00');

      const { getByText, queryByTestId } = render(
        <ArticleHeader updated={updated} />
      );

      expect(getByText('6.30am GMT')).toBeVisible();
      expect(queryByTestId('TimeSincePublishing')).toBeFalsy();
    });

    it('Within an hour of updating', () => {
      MockDate.set('2021-12-31T07:00:00+00:00');

      const { getByText } = render(<ArticleHeader updated={updated} />);

      expect(getByText('6.30am GMT')).toBeVisible();
      expect(getByText('30 minutes ago')).toBeVisible();
    });

    it('Between 1 and 12 hours after updating', () => {
      MockDate.set('2021-12-31T08:30:00+00:00');

      const { getByText } = render(<ArticleHeader updated={updated} />);

      expect(getByText('6.30am GMT')).toBeVisible();
      expect(getByText('2 hours ago')).toBeVisible();
    });

    it('After 12 hours but same calendar day', () => {
      MockDate.set('2021-12-20T20:30:00+00:00');

      const { getByText, queryByTestId } = render(
        <ArticleHeader updated={updated} />
      );

      expect(getByText('6.30am GMT')).toBeVisible();
      expect(queryByTestId('TimeSincePublishing')).toBeFalsy();
    });

    it('With breaking flag and headline', () => {
      MockDate.set('2021-12-31T07:00:00+00:00');

      const { getByText } = render(
        <ArticleHeader
          updated={updated}
          breaking="true"
          headline="This%20is%20the%20headline"
        />
      );

      expect(getByText('6.30am GMT')).toBeVisible();
      expect(getByText('30 minutes ago')).toBeVisible();
      expect(getByText('BREAKING')).toBeVisible();
      expect(getByText('This is the headline')).toBeVisible();

      // expect(baseElement).toMatchSnapshot();
    });

    it('With breaking flag expired', () => {
      MockDate.set('2021-12-31T08:30:00+00:00');

      const { getByText, queryByText } = render(
        <ArticleHeader updated={updated} breaking="true" />
      );

      expect(getByText('6.30am GMT')).toBeVisible();
      expect(getByText('2 hours ago')).toBeVisible();
      expect(queryByText('BREAKING')).toBeFalsy();
    });
  });

  describe('Same calendar day during BST', () => {
    afterEach(() => MockDate.reset());

    const updated = '2022-04-20T06:30:00+01:00';

    it('Within a minute of updating', () => {
      MockDate.set('2022-04-20T06:30:10+01:00');

      const { getByText, queryByTestId } = render(
        <ArticleHeader updated={updated} />
      );

      expect(getByText('6.30am GMT+1')).toBeVisible();
      expect(queryByTestId('TimeSincePublishing')).toBeFalsy();
    });

    it('Within an hour of updating', () => {
      MockDate.set('2022-04-20T07:00:00+01:00');

      const { getByText } = render(<ArticleHeader updated={updated} />);

      expect(getByText('6.30am GMT+1')).toBeVisible();
      expect(getByText('30 minutes ago')).toBeVisible();
    });

    it('Between 1 and 12 hours after updating', () => {
      MockDate.set('2022-04-20T08:30:00+01:00');

      const { getByText } = render(<ArticleHeader updated={updated} />);

      expect(getByText('6.30am GMT+1')).toBeVisible();
      expect(getByText('2 hours ago')).toBeVisible();
    });

    it('After 12 hours but same calendar day', () => {
      MockDate.set('2022-04-20T20:30:00+01:00');

      const { getByText, queryByTestId } = render(
        <ArticleHeader updated={updated} />
      );

      expect(getByText('6.30am GMT+1')).toBeVisible();
      expect(queryByTestId('TimeSincePublishing')).toBeFalsy();
    });
  });

  describe('Different calendar days', () => {
    afterEach(() => MockDate.reset());

    const updated = '2021-12-31T22:30:00+00:00';

    it('Between 1 and 12 hours after updating', () => {
      MockDate.set('2022-01-01T02:30:00+00:00');

      const { getByText } = render(<ArticleHeader updated={updated} />);

      expect(getByText('10.30pm GMT')).toBeVisible();
      expect(getByText('4 hours ago')).toBeVisible();
      expect(getByText('December 31')).toBeVisible();
    });
  });
});
