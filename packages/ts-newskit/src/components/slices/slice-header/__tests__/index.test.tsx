import React from 'react';
import '@testing-library/jest-dom';
import { render } from '../../../../utils/test-utils';
import { SliceHeader } from '../index';

describe('Render Header', () => {
  it('should render a snapshot', () => {
    const { asFragment } = render(
      <SliceHeader title="Rugby Union" href="https://www.thetimes.co.uk/" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correct title', () => {
    const { getByText } = render(
      <SliceHeader title="Rugby Union" href="https://www.thetimes.co.uk/" />
    );
    const text = getByText('Rugby Union');
    expect(text).toBeInTheDocument();
  });

  it('should render correct color', () => {
    const { getByText } = render(
      <SliceHeader title="Rugby Union" href="https://www.thetimes.co.uk/" />
    );
    const text = getByText('Rugby Union');
    expect(text).toHaveStyle('color: #01000d');
  });
});
