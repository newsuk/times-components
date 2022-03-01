import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { UpdatedTimestamp } from '../UpdatedTimestamp';
import MockDate from 'mockdate';

describe('UpdatedTimestamp', () => {
  const updated = '2022-02-28T09:00:00Z';
  afterEach(() => MockDate.reset());

  it('does not show the timestamp within the first minute after the last update', () => {
    MockDate.set('2022-02-28T09:00:00Z');
    const { baseElement, queryByTestId } = render(
      <UpdatedTimestamp updatedTime={updated} />
    );
    expect(baseElement).toMatchSnapshot();
    expect(queryByTestId('MinutesHoursSinceUpdate')).toBeFalsy();
  });
  it('appears one minute after the last update', () => {
    MockDate.set('2022-02-28T09:01:00Z');
    const { queryByTestId } = render(
      <UpdatedTimestamp updatedTime={updated} />
    );
    expect(queryByTestId('MinutesHoursSinceUpdate')).toBeTruthy();
    expect(queryByTestId('MinutesHoursSinceUpdate')!.textContent).toBe(
      'Updated 1 minute ago'
    );
  });
  it('appears between 1 and 12 hours after the last update', () => {
    MockDate.set('2022-02-28T11:30:00Z');
    const { queryByTestId } = render(
      <UpdatedTimestamp updatedTime={updated} />
    );
    expect(queryByTestId('MinutesHoursSinceUpdate')).toBeTruthy();
    expect(queryByTestId('MinutesHoursSinceUpdate')!.textContent).toBe(
      'Updated 2 hours ago'
    );
  });
  it('shows the date and time of update 13 hours or more after the last update', () => {
    MockDate.set('2022-02-28T23:30:00Z');
    const { queryByTestId } = render(
      <UpdatedTimestamp updatedTime={updated} />
    );
    expect(queryByTestId('DateTimeUpdated')).toBeTruthy();
    expect(queryByTestId('DateTimeUpdated')!.textContent).toBe(
      'Updated February 28, 9.00am'
    );
  });
});
