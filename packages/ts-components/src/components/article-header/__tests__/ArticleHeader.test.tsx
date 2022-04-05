import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import ArticleHeader from '../ArticleHeader';
import MockDate from 'mockdate';

describe('ArticleHeader', () => {
  describe('In one calendar day', () => {
    const updated = '2021-12-31T06:30:00Z';
    afterEach(() => MockDate.reset());
    it('Within the first minute of update - Breaking', () => {
      MockDate.set('2021-12-31T06:30:00Z');
      const { baseElement, getByText, queryByTestId } = render(
        <ArticleHeader
          updated={updated}
          breaking="true"
          headline="This%20is%20the%20headline"
        />
      );
      expect(baseElement).toMatchSnapshot();
      expect(getByText('BREAKING')).toBeVisible();
      expect(queryByTestId('UpdatedTime')).toBeTruthy();
      expect(getByText('6.30am')).toBeVisible();
      expect(queryByTestId('TimeSincePublishing')).toBeFalsy();
      expect(queryByTestId('UpdatedDate')).toBeFalsy();
      expect(getByText('This is the headline')).toBeVisible();
    });
    it('Within the first minute of update - Not Breaking', () => {
      MockDate.set('2021-12-31T06:30:00Z');
      const { baseElement, getByText, queryByTestId, queryByText } = render(
        <ArticleHeader
          updated={updated}
          breaking="false"
          headline="This%20is%20the%20headline"
        />
      );
      expect(baseElement).toMatchSnapshot();
      expect(queryByText('BREAKING')).toBeFalsy();
      expect(queryByTestId('UpdatedTime')).toBeTruthy();
      expect(getByText('6.30am')).toBeVisible();
      expect(queryByTestId('TimeSincePublishing')).toBeFalsy();
      expect(queryByTestId('UpdatedDate')).toBeFalsy();
      expect(getByText('This is the headline')).toBeVisible();
    });
    it('Within the first minute of update - No headline not breaking', () => {
      MockDate.set('2021-12-31T06:30:00Z');
      const { baseElement, getByText, queryByTestId, queryByText } = render(
        <ArticleHeader updated={updated} />
      );
      expect(baseElement).toMatchSnapshot();
      expect(queryByText('This is the headline')).toBeFalsy();
      expect(queryByText('BREAKING')).toBeFalsy();
      expect(queryByTestId('UpdatedTime')).toBeTruthy();
      expect(getByText('6.30am')).toBeVisible();
      expect(queryByTestId('TimeSincePublishing')).toBeFalsy();
      expect(queryByTestId('UpdatedDate')).toBeFalsy();
    });
    it('within an hour of updating', () => {
      MockDate.set('2021-12-31T07:00:00Z');
      const { getByText, queryByTestId } = render(
        <ArticleHeader
          updated={updated}
          breaking="true"
          headline="This%20is%20the%20headline"
        />
      );
      expect(getByText('BREAKING')).toBeVisible();
      expect(queryByTestId('UpdatedTime')).toBeTruthy();
      expect(getByText('6.30am')).toBeVisible();
      expect(queryByTestId('TimeSincePublishing')).toBeTruthy();
      expect(getByText('30 minutes ago')).toBeVisible();
      expect(queryByTestId('UpdatedDate')).toBeFalsy();
      expect(getByText('This is the headline')).toBeVisible();
    });
    it('between 1 and 12 hours after update time', () => {
      MockDate.set('2021-12-31T08:30:00Z');
      const { getByText, queryByTestId, queryByText } = render(
        <ArticleHeader
          updated={updated}
          breaking="true"
          headline="This%20is%20the%20headline"
        />
      );
      expect(queryByText('BREAKING')).toBeFalsy();
      expect(queryByTestId('UpdatedTime')).toBeTruthy();
      expect(getByText('6.30am')).toBeVisible();
      expect(queryByTestId('TimeSincePublishing')).toBeTruthy();
      expect(getByText('2 hours ago')).toBeVisible();
      expect(queryByTestId('UpdatedDate')).toBeFalsy();
      expect(getByText('This is the headline')).toBeVisible();
    });
    it('after 12 hours but on the same calendar day', () => {
      MockDate.set('2021-12-31T19:30:00Z');
      const { getByText, queryByTestId, queryByText } = render(
        <ArticleHeader
          updated={updated}
          breaking="true"
          headline="This%20is%20the%20headline"
        />
      );
      expect(queryByText('BREAKING')).toBeFalsy();
      expect(queryByTestId('UpdatedTime')).toBeTruthy();
      expect(getByText('6.30am')).toBeVisible();
      expect(queryByTestId('TimeSincePublishing')).toBeFalsy();
      expect(queryByTestId('UpdatedDate')).toBeFalsy();
      expect(getByText('This is the headline')).toBeVisible();
    });
  });
  describe('Across calendar days', () => {
    const updated = '2021-12-31T23:30:00Z';
    afterEach(() => MockDate.reset());
    it('within an hour of updating but on a different calendar day', () => {
      MockDate.set('2022-01-01T00:29:00Z');
      const { getByTestId, queryByTestId, getByText } = render(
        <ArticleHeader
          updated={updated}
          breaking="true"
          headline="This%20is%20the%20headline"
        />
      );
      expect(getByText('BREAKING')).toBeVisible();
      expect(queryByTestId('UpdatedTime')).toBeTruthy();
      expect(getByText('11.30pm')).toBeVisible();
      expect(getByTestId('TimeSincePublishing')).toBeTruthy();
      expect(getByTestId('UpdatedDate')).toBeVisible();
      expect(getByText('December 31 2021')).toBeVisible();
      expect(getByText('This is the headline')).toBeVisible();
    });
    it('between 1-12 hours of updating but on a different calendar day', () => {
      MockDate.set('2022-01-01T02:00:00Z');
      const { getByTestId, queryByText, queryByTestId, getByText } = render(
        <ArticleHeader
          updated={updated}
          breaking="true"
          headline="This%20is%20the%20headline"
        />
      );
      expect(queryByText('BREAKING')).toBeFalsy();
      expect(queryByTestId('UpdatedTime')).toBeTruthy();
      expect(getByText('11.30pm')).toBeVisible();
      expect(getByTestId('TimeSincePublishing')).toBeTruthy();
      expect(getByText('2 hours ago')).toBeVisible();
      expect(getByTestId('UpdatedDate')).toBeVisible();
      expect(getByText('December 31 2021')).toBeVisible();
      expect(getByText('This is the headline')).toBeVisible();
    });
    it('after 12 hours but on a different calendar day', () => {
      MockDate.set('2022-01-01T14:30:00Z');
      const { getByTestId, queryByText, queryByTestId, getByText } = render(
        <ArticleHeader
          updated={updated}
          breaking="true"
          headline="This%20is%20the%20headline"
        />
      );
      expect(queryByText('BREAKING')).toBeFalsy();
      expect(queryByTestId('UpdatedTime')).toBeTruthy();
      expect(getByText('11.30pm')).toBeVisible();
      expect(queryByTestId('TimeSincePublishing')).toBeFalsy();
      expect(getByTestId('UpdatedDate')).toBeVisible();
      expect(getByText('December 31 2021')).toBeVisible();
      expect(getByText('This is the headline')).toBeVisible();
    });
    it('after multiple calendar days', () => {
      MockDate.set('2022-01-03T14:30:00Z');
      const { getByTestId, queryByText, queryByTestId, getByText } = render(
        <ArticleHeader
          updated={updated}
          breaking="true"
          headline="This%20is%20the%20headline"
        />
      );
      expect(queryByText('BREAKING')).toBeFalsy();
      expect(queryByTestId('UpdatedTime')).toBeTruthy();
      expect(getByText('11.30pm')).toBeVisible();
      expect(queryByTestId('TimeSincePublishing')).toBeFalsy();
      expect(getByTestId('UpdatedDate')).toBeVisible();
      expect(getByText('December 31 2021')).toBeVisible();
      expect(getByText('This is the headline')).toBeVisible();
    });
  });
});
