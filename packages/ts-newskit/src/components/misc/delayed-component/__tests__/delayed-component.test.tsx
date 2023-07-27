import React from 'react';
import '@testing-library/jest-dom';
import { render, waitFor } from '../../../../utils/test-utils';

import { DelayedComponent } from '../delayed-component';

describe('DelayedComponent', () => {
  it('should remove the component after the specified delay when initial state is true', async () => {
    const { queryByText, getByText } = render(
      <DelayedComponent initialState={true} delay={800}>
        <div>Children</div>
      </DelayedComponent>
    );
    expect(getByText('Children')).toBeVisible();
    await waitFor(() => {
      expect(queryByText('Children')).toBeFalsy();
    });
  });
  it('should render the component after the specified delay when initial state is false', async () => {
    const { queryByText, getByText } = render(
      <DelayedComponent initialState={false} delay={800}>
        <div>Children</div>
      </DelayedComponent>
    );
    expect(queryByText('Children')).toBeFalsy();
    await waitFor(() => {
      expect(getByText('Children')).toBeVisible();
    });
  });
});
