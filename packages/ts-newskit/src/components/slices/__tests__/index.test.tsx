import React from 'react';
import '@testing-library/jest-dom';
import { render } from '../../utils/test-utils';
import { SliceHeader } from '../slice-header/index';
import { useBreakpointKey } from 'newskit';

jest.mock('newskit', () => ({
  ...jest.requireActual('newskit'),
  useBreakpointKey: jest.fn().mockReturnValue('xl')
}));

describe('Render Header', () => {
  it('should render a snapshot', () => {
    const { asFragment } = render(
      <SliceHeader title="Rugby Union" color="red" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correct title', () => {
    const { getByText } = render(
      <SliceHeader title="Rugby Union" color="red" />
    );
    const text = getByText('Rugby Union');
    expect(text).toBeInTheDocument();
  });

  it('should render correct color', () => {
    const { getByText } = render(
      <SliceHeader title="Rugby Union" color="red" />
    );
    const text = getByText('Rugby Union');
    expect(text).toHaveStyle('color: red');
  });
  it('should correct width and height when screen size is xl', async () => {
    (useBreakpointKey as any).mockReturnValue('xl');

    const { findByTestId } = render(
      <SliceHeader title="Rugby Union" color="red" />
    );
    const icon = await findByTestId('icon');
    expect(icon).toHaveStyle('width: 48');
    expect(icon).toHaveStyle('height: 48');
  });
  it('should correct width and height when screen size is lg', async () => {
    (useBreakpointKey as any).mockReturnValue('lg');

    const { findByTestId } = render(
      <SliceHeader title="Rugby Union" color="red" />
    );
    const icon = await findByTestId('icon');
    expect(icon).toHaveStyle('width: 48');
    expect(icon).toHaveStyle('height: 48');
  });
  it('should correct width and height when screen size is md', async () => {
    (useBreakpointKey as any).mockReturnValue('md');

    const { findByTestId } = render(
      <SliceHeader title="Rugby Union" color="red" />
    );
    const icon = await findByTestId('icon');
    expect(icon).toHaveStyle('width: 32');
    expect(icon).toHaveStyle('height: 32');
  });
  it('should correct width and height when screen size is sm', async () => {
    (useBreakpointKey as any).mockReturnValue('sm');
    const { findByTestId } = render(
      <SliceHeader title="Rugby Union" color="red" />
    );
    const icon = await findByTestId('icon');
    expect(icon).toHaveStyle('width: 40');
    expect(icon).toHaveStyle('height: 40');
  });
});
