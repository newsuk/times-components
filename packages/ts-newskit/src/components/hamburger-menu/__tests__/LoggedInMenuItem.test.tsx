import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import { render } from '../../utils/test-utils';

const handleClick = jest.fn();

import LoggedInMenuItem from '../LoggedInMenuItem';

describe('Logged in Menu Item', () => {
  it('should render the component', () => {
    const { asFragment } = render(
      <LoggedInMenuItem
        title="title"
        handleClick={handleClick}
        selected="not title"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should have default style when not selected', () => {
    const { getByText, getByRole } = render(
      <LoggedInMenuItem
        title="title"
        handleClick={handleClick}
        selected="not title"
      />
    );
    expect(getByText('title')).toHaveStyle('color: #C2C2C2');
    expect(getByRole('button')).toHaveStyle('border-bottom: 2px solid #C2C2C2');
  });
  it('should change to different style when selected', () => {
    const { getByText, getByRole } = render(
      <LoggedInMenuItem
        title="title"
        handleClick={handleClick}
        selected="title"
      />
    );
    expect(getByText('title')).toHaveStyle('color: #FFFFFF');
    expect(getByRole('button')).toHaveStyle('border-bottom: 2px solid #FFFFFF');
  });
  it('should call handleClick when clicked', () => {
    const { getByRole } = render(
      <LoggedInMenuItem
        title="title"
        handleClick={handleClick}
        selected="title"
      />
    );
    const Button = getByRole('button');
    fireEvent.click(Button);
    expect(handleClick).toHaveBeenCalled();
  });
});
