import React from 'react';
import { customRender } from './utils/test-utils';
import '@testing-library/jest-dom';
import data from '../fixtures/menu-items.json';
import { SecondaryNavDesktop } from '../desktop';
import { cleanup } from '@testing-library/react';

describe('Secondary Menu Mobile', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should render the menu', () => {
    const { asFragment } = customRender(<SecondaryNavDesktop data={data} />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should render the menu item Football', () => {
    const { queryByText } = customRender(<SecondaryNavDesktop data={data} />);
    const title = queryByText(data[0].title);
    expect(title).toHaveTextContent('Football');
  });
  it('items should have ancher with href', () => {
    const { getAllByTestId } = customRender(
      <SecondaryNavDesktop data={data} />
    );
    const title = getAllByTestId('buttonLink')[0];
    expect(title).toHaveAttribute('href', '/football');
  });
});
