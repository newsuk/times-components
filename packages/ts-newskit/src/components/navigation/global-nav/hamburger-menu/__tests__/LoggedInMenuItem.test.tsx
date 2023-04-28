import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import { render } from '../../../../../utils/test-utils';

const setSelected = jest.fn();

import LoggedInMenuItem from '../LoggedInMenuItem';

describe('Logged in Menu Item', () => {
  it('should render the component', () => {
    const { asFragment } = render(
      <LoggedInMenuItem
        title="title"
        setSelected={setSelected}
        selected="not title"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should have default style when not selected', () => {
    const { getByRole } = render(
      <LoggedInMenuItem
        title="title"
        setSelected={setSelected}
        selected="not title"
      />
    );
    expect(getByRole('button')).toHaveStyle(
      'border-bottom: 2px solid rgba(51,51,51,1)'
    );
  });
  it('should change to different style when selected', () => {
    const { getByRole } = render(
      <LoggedInMenuItem
        title="title"
        setSelected={setSelected}
        selected="title"
      />
    );
    expect(getByRole('button')).toHaveStyle(
      'border-bottom: 2px solid rgba(255,255,255,1)'
    );
  });
  it('should call setSelected when clicked', () => {
    const { getByRole } = render(
      <LoggedInMenuItem
        title="title"
        setSelected={setSelected}
        selected="title"
      />
    );
    const Button = getByRole('button');
    fireEvent.click(Button);
    expect(setSelected).toHaveBeenCalled();
  });
});
