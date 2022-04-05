import { render } from '@testing-library/react';
import React from 'react';
import { useUpdatedTime, UpdatedTimeProvider } from '../UpdatedTimeProvider';
import 'regenerator-runtime';

const TestComponent = () => {
  const updatedTime = useUpdatedTime();
  return <>{updatedTime}</>;
};

describe('UpdatedTimeProvider', () => {
  it('should pass the updated time to the context value', () => {
    const updatedTime = '2022-03-01T09:00:00.000Z';

    const { findByText } = render(
      <UpdatedTimeProvider updatedTime={updatedTime}>
        <TestComponent />
      </UpdatedTimeProvider>
    );

    findByText(updatedTime);
  });
});
