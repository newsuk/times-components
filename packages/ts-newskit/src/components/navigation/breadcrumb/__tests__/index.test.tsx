import React from 'react';
import '@testing-library/jest-dom';
import { render } from '../../../utils/test-utils';
import { Breadcrumb } from '../index';
import { breadcrumbItems } from '../fixtures/breadcrumbs.json';

describe('Render Breadcrumbs', () => {
  it('should render a snapshot', () => {
    const { asFragment } = render(<Breadcrumb data={breadcrumbItems} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the component', () => {
    const { getByText } = render(<Breadcrumb data={breadcrumbItems} />);
    const getBreadcrumb = getByText('Tennis');
    expect(getBreadcrumb).toBeInTheDocument();
  });

  it('items should have link with href', () => {
    const { getAllByTestId } = render(<Breadcrumb data={breadcrumbItems} />);
    const title = getAllByTestId('buttonLink')[0];
    expect(title).toHaveAttribute('href', '/sport');
  });

  it('last breadcrumb should be selected', () => {
    const { getAllByTestId } = render(<Breadcrumb data={breadcrumbItems} />);
    const title = getAllByTestId('button')[0];
    expect(title).toHaveAttribute('aria-current', 'page');
  });
});
