import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockDate from 'mockdate';

import ArticleHeader from '../ArticleHeader';

describe('ArticleHeader', () => {
  describe('Same calendar day during GMT', () => {
    afterEach(() => MockDate.reset());

    const date = '31/12/2021';
    const time = '06:30';

    it('Within a minute of updating', () => {
      MockDate.set('2021-12-31T06:30:10Z');

      const { getByText, queryByTestId } = render(
        <ArticleHeader date={date} time={time} />
      );

      expect(getByText('6.30am')).toBeVisible();
      expect(queryByTestId('TimeSincePublishing')).toBeFalsy();
    });

    it('Within an hour of updating', () => {
      MockDate.set('2021-12-31T07:00:00Z');

      const { getByText } = render(<ArticleHeader date={date} time={time} />);

      expect(getByText('6.30am')).toBeVisible();
      expect(getByText('30 minutes ago')).toBeVisible();
    });

    it('Between 1 and 12 hours after updating', () => {
      MockDate.set('2021-12-31T08:30:00Z');

      const { getByText } = render(<ArticleHeader date={date} time={time} />);

      expect(getByText('6.30am')).toBeVisible();
      expect(getByText('2 hours ago')).toBeVisible();
    });

    it('After 12 hours but same calendar day', () => {
      MockDate.set('2021-12-20T20:30:00Z');

      const { getByText, queryByTestId } = render(
        <ArticleHeader date={date} time={time} />
      );

      expect(getByText('6.30am')).toBeVisible();
      expect(queryByTestId('TimeSincePublishing')).toBeFalsy();
    });

    it('With breaking flag and headline', () => {
      MockDate.set('2021-12-31T07:00:00Z');

      const { baseElement, getByText } = render(
        <ArticleHeader
          date={date}
          time={time}
          breaking="true"
          headline="This%20is%20the%20headline"
        />
      );

      expect(getByText('6.30am')).toBeVisible();
      expect(getByText('30 minutes ago')).toBeVisible();
      expect(getByText('BREAKING')).toBeVisible();
      expect(getByText('This is the headline')).toBeVisible();

      expect(baseElement).toMatchSnapshot();
    });

    it('With breaking flag expired', () => {
      MockDate.set('2021-12-31T08:30:00Z');

      const { getByText, queryByText } = render(
        <ArticleHeader date={date} time={time} breaking="true" />
      );

      expect(getByText('6.30am')).toBeVisible();
      expect(getByText('2 hours ago')).toBeVisible();
      expect(queryByText('BREAKING')).toBeFalsy();
    });
  });

  describe('Same calendar day during BST', () => {
    afterEach(() => MockDate.reset());

    const date = '20/04/2022';
    const time = '06:30';

    it('Within a minute of updating', () => {
      MockDate.set('2022-04-20T06:30:10+01:00');

      const { getByText, queryByTestId } = render(
        <ArticleHeader date={date} time={time} />
      );

      expect(getByText('6.30am')).toBeVisible();
      expect(queryByTestId('TimeSincePublishing')).toBeFalsy();
    });

    it('Within an hour of updating', () => {
      MockDate.set('2022-04-20T07:00:00+01:00');

      const { getByText } = render(<ArticleHeader date={date} time={time} />);

      expect(getByText('6.30am')).toBeVisible();
      expect(getByText('30 minutes ago')).toBeVisible();
    });

    it('Between 1 and 12 hours after updating', () => {
      MockDate.set('2022-04-20T08:30:00+01:00');

      const { getByText } = render(<ArticleHeader date={date} time={time} />);

      expect(getByText('6.30am')).toBeVisible();
      expect(getByText('2 hours ago')).toBeVisible();
    });

    it('After 12 hours but same calendar day', () => {
      MockDate.set('2022-04-20T20:30:00+01:00');

      const { getByText, queryByTestId } = render(
        <ArticleHeader date={date} time={time} />
      );

      expect(getByText('6.30am')).toBeVisible();
      expect(queryByTestId('TimeSincePublishing')).toBeFalsy();
    });
  });

  describe('Different calendar days', () => {
    afterEach(() => MockDate.reset());

    const date = '31/12/2021';
    const time = '22:30';

    it('Between 1 and 12 hours after updating', () => {
      MockDate.set('2022-01-01T02:30:00Z');

      const { getByText } = render(<ArticleHeader date={date} time={time} />);

      expect(getByText('10.30pm')).toBeVisible();
      expect(getByText('4 hours ago')).toBeVisible();
      expect(getByText('December 31 2021')).toBeVisible();
    });
  });
});
