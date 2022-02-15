import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { ArticleHeader } from '../ArticleHeader';
import MockDate from 'mockdate'


describe('ArticleHeader', () => {
  afterEach(() => MockDate.reset())
  it('Breaking', () => {
    MockDate.set("2021-12-31T23:30:00Z")
    const { baseElement, getByText, queryByTestId } = render(
      <ArticleHeader
        updated="2021-12-31T23:30:00Z"
        breaking={true}
        headline="This%20is%20the%20headline"
      />
    );
    expect(baseElement).toMatchSnapshot();
    expect(getByText('BREAKING')).toBeVisible();
    expect(queryByTestId('UpdatedDate')).toBeFalsy();
  });
  it('Within an hour of updating', () => {
    MockDate.set("2021-12-31T23:30:00Z")
    console.log(new Date())
    const { baseElement, getByText, queryByTestId } = render(
      <ArticleHeader
        updated="2021-12-31T23:20:00Z"
        breaking={true}
        headline="This%20is%20the%20headline"
      />
    );
    expect(baseElement).toMatchSnapshot();
    expect(getByText('11.20pm')).toBeVisible();
    expect(getByText('10 minutes ago')).toBeVisible();
    expect(queryByTestId('UpdatedDate')).toBeFalsy();
  });
  it('Between 1 and 12 hours ago', () => {
    MockDate.set("2021-12-31T23:30:00Z")
    console.log(new Date())
    const { baseElement, getByText, queryByText, queryByTestId } = render(
      <ArticleHeader
        updated="2021-12-31T22:20:00Z"
        breaking={true}
        headline="This%20is%20the%20headline"
      />
    );
    expect(baseElement).toMatchSnapshot();
    expect(getByText('10.20pm')).toBeVisible();
    expect(getByText('1 hour ago')).toBeVisible();
    expect(queryByText('BREAKING')).toBeFalsy();
    expect(queryByTestId('UpdatedDate')).toBeFalsy();
  });
  it('After 12 hours but on the same calendar day', () => {
    MockDate.set("2021-12-31T22:30:00Z")
    console.log(new Date())
    const { baseElement, getByText, queryByText, queryByTestId } = render(
      <ArticleHeader
        updated="2021-12-31T06:20:00Z"
        breaking={true}
        headline="This%20is%20the%20headline"
      />
    );
    expect(baseElement).toMatchSnapshot();
    expect(getByText('6.20am')).toBeVisible();
    expect(queryByText('BREAKING')).toBeFalsy();
    expect(queryByTestId('UpdatedDate')).toBeFalsy();
  });
  it('After 12 hours but on a different calendar day', () => {
    MockDate.set("2022-01-01T06:30:00Z")
    console.log(new Date())
    const { baseElement, getByTestId, queryByText, queryByTestId, getByText } = render(
      <ArticleHeader
        updated="2021-12-31T06:20:00Z"
        breaking={true}
        headline="This%20is%20the%20headline"
      />
    );
    expect(baseElement).toMatchSnapshot();
    expect(queryByText('BREAKING')).toBeFalsy();
    expect(queryByTestId('TimeSincePublishing')).toBeFalsy();
    expect(getByTestId('UpdatedTime')).toBeVisible();
    expect(getByText('6.20am')).toBeVisible();
    expect(getByTestId('UpdatedDate')).toBeVisible();
  });
});
