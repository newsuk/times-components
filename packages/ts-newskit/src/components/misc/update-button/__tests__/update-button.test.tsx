import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor } from '../../../../utils/test-utils';

import { UpdateButton } from '../update-button';

const handleClick = jest.fn();

const renderComponent = ( loading: boolean, delay: number, display: boolean, label: string, handleClick: any) => render(<UpdateButton loading={loading} delay={delay} display={display} label={label} handleClick={handleClick} />)

describe('Render UpdateButton', () => {
  it('should render the component', () => {
    const { asFragment } = renderComponent(false, 8000, true, 'New Updates', handleClick);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should render the loading spinner if loading is true', () => {
    const { asFragment } = renderComponent(true, 8000, true, 'New Update', handleClick);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should render the label text you pass through', () => {
    const { getByText } = renderComponent(false, 8000, true, 'Test New Updates', handleClick);
    expect(getByText('Test New Updates')).toBeVisible();
  });
  it('should trigger an event on click', () => {
    const { getByRole } = renderComponent(true, 8000, true, 'New Update', handleClick);
    const Button = getByRole('button');
    fireEvent.click(Button)
    expect(handleClick).toHaveBeenCalled();
  });
  it('should unmount after the delay passed to them', async () => {
    const { queryByTestId, getByTestId } = renderComponent(false, 800, true, 'New Updates', handleClick);
    expect(getByTestId('button')).toBeVisible();
    await waitFor(() => {
      expect(queryByTestId('button')).toBeFalsy();
    });
  });
});