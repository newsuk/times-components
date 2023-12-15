import React from 'react';
import '@testing-library/jest-dom';
import { render } from '../../../../../utils/test-utils';
import NavButtonSection from '../NavButtons';

const setSelected = jest.fn();
const mockClickHandler = jest.fn();

describe('NavButtons Logged In', () => {
  it('should render the component', () => {
    const { asFragment } = render(
      <NavButtonSection
        setSelected={setSelected}
        selected="selected"
        clickHandler={mockClickHandler}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should render the sections and account buttons', () => {
    const { getAllByRole } = render(
      <NavButtonSection
        setSelected={setSelected}
        selected="selected"
        clickHandler={mockClickHandler}
      />
    );
    expect(getAllByRole('button')[0]).toHaveTextContent('Sections');
    expect(getAllByRole('button')[1]).toHaveTextContent('My account');
  });
});
