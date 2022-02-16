import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { ArticleHeader } from '../ArticleHeader';
import MockDate from 'mockdate';

describe('ArticleHeader', () => {
  afterEach(() => MockDate.reset());
  it('Breaking - Within the first minute of update', () => {
    MockDate.set('2021-12-31T23:30:00Z');
    const { baseElement, getByText, queryByTestId } = render(
      <ArticleHeader
        updated="2021-12-31T23:30:00Z"
        breaking={true}
        headline="This%20is%20the%20headline"
      />
    );
    expect(baseElement).toMatchSnapshot();
    expect(getByText('BREAKING')).toBeVisible();
    expect(queryByTestId('UpdatedTime')).toBeTruthy();
    expect(getByText('11.30pm')).toBeVisible();
    expect(queryByTestId('TimeSincePublishing')).toBeFalsy();
    expect(queryByTestId('UpdatedDate')).toBeFalsy();
  });
  it('Not breaking - Within the first minute of update', () => {
    MockDate.set('2021-12-31T23:30:00Z');
    const { baseElement, getByText, queryByTestId, queryByText } = render(
      <ArticleHeader
        updated="2021-12-31T23:30:00Z"
        breaking={false}
        headline="This%20is%20the%20headline"
      />
    );
    expect(baseElement).toMatchSnapshot();
    expect(queryByText('BREAKING')).toBeFalsy();
    expect(queryByTestId('UpdatedTime')).toBeTruthy();
    expect(getByText('11.30pm')).toBeVisible();
    expect(queryByTestId('TimeSincePublishing')).toBeFalsy();
    expect(queryByTestId('UpdatedDate')).toBeFalsy();
  });
  it('shows Breaking flag, Updated Time and Time since publishing within an hour of updating', () => {
    MockDate.set('2021-12-31T23:30:00Z');
    const { getByText, queryByTestId } = render(
      <ArticleHeader
        updated="2021-12-31T23:20:00Z"
        breaking={true}
        headline="This%20is%20the%20headline"
      />
    );
    expect(getByText('BREAKING')).toBeVisible();
    expect(queryByTestId('UpdatedTime')).toBeTruthy();
    expect(getByText('11.20pm')).toBeVisible();
    expect(queryByTestId('TimeSincePublishing')).toBeTruthy();
    expect(getByText('10 minutes ago')).toBeVisible();
    expect(queryByTestId('UpdatedDate')).toBeFalsy();
  });
  it('shows Updated Time and time since publishing (rounded down to the hour) between 1 and 12 hours after update time', () => {
    MockDate.set('2021-12-31T23:30:00Z');
    const { getByText, queryByTestId, queryByText } = render(
      <ArticleHeader
        updated="2021-12-31T22:20:00Z"
        breaking={true}
        headline="This%20is%20the%20headline"
      />
    );
    expect(queryByText('BREAKING')).toBeFalsy();
    expect(queryByTestId('UpdatedTime')).toBeTruthy();
    expect(getByText('10.20pm')).toBeVisible();
    expect(queryByTestId('TimeSincePublishing')).toBeTruthy();
    expect(getByText('1 hour ago')).toBeVisible();
    expect(queryByTestId('UpdatedDate')).toBeFalsy();
  });
  it('shows Updated Time after 12 hours but on the same calendar day', () => {
    MockDate.set('2021-12-31T22:30:00Z');
    const { getByText, queryByTestId, queryByText } = render(
      <ArticleHeader
        updated="2021-12-31T06:20:00Z"
        breaking={true}
        headline="This%20is%20the%20headline"
      />
    );
    expect(queryByText('BREAKING')).toBeFalsy();
    expect(queryByTestId('UpdatedTime')).toBeTruthy();
    expect(getByText('6.20am')).toBeVisible();
    expect(queryByTestId('TimeSincePublishing')).toBeFalsy();
    expect(queryByTestId('UpdatedDate')).toBeFalsy();
  });
  it('shows Updated time, and Updated Date after 12 hours but on a different calendar day', () => {
    MockDate.set('2022-01-01T06:30:00Z');
    const { getByTestId, queryByText, queryByTestId, getByText } = render(
      <ArticleHeader
        updated="2021-12-31T06:20:00Z"
        breaking={true}
        headline="This%20is%20the%20headline"
      />
    );
    expect(queryByText('BREAKING')).toBeFalsy();
    expect(queryByTestId('UpdatedTime')).toBeTruthy();
    expect(getByText('6.20am')).toBeVisible();
    expect(queryByTestId('TimeSincePublishing')).toBeFalsy();
    expect(getByTestId('UpdatedDate')).toBeVisible();
    expect(getByText('December 31 2021')).toBeVisible();
  });
});
