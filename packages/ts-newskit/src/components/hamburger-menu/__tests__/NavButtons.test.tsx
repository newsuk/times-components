import React from 'react';
import '@testing-library/jest-dom';
import { render } from '../../utils/test-utils';
import NavButtonSection from '../NavButtons';

const handleClick = jest.fn();

describe('NavButtons Logged In', () => {
  it('should render the component', () => {
    const { asFragment } = render(
      <NavButtonSection
        loggedIn={true}
        handleClick={handleClick}
        selected="selected"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should render the sections and account buttons', () => {
    const { getAllByRole } = render(
      <NavButtonSection
        loggedIn={true}
        handleClick={handleClick}
        selected="selected"
      />
    );
    expect(getAllByRole('button')[0]).toHaveTextContent('Sections');
    expect(getAllByRole('button')[1]).toHaveTextContent('My account');
  });
});

describe('NavButtons Logged Out', () => {
  it('should render the component', () => {
    const { asFragment } = render(
      <NavButtonSection
        loggedIn={false}
        handleClick={handleClick}
        selected="selected"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should render the log in and subscribe buttons', () => {
    const { getAllByRole } = render(
      <NavButtonSection
        loggedIn={false}
        handleClick={handleClick}
        selected="selected"
      />
    );
    expect(getAllByRole('button')[0]).toHaveTextContent('Log in');
    expect(getAllByRole('button')[1]).toHaveTextContent('Subscribe');
  });
});
