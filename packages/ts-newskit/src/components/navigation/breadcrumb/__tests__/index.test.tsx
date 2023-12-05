import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import { render } from '../../../../utils/test-utils';
import { Breadcrumb } from '../index';
import { breadcrumbItems } from '../fixtures/breadcrumbs.json';

describe('Render Breadcrumbs', () => {
  const mockClickHandler = jest.fn();

  it('should render a snapshot', () => {
    const { asFragment } = render(
      <Breadcrumb data={breadcrumbItems} clickHandler={mockClickHandler} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the component', () => {
    const { getByText } = render(
      <Breadcrumb data={breadcrumbItems} clickHandler={mockClickHandler} />
    );
    const getBreadcrumb = getByText('Tennis');
    expect(getBreadcrumb).toBeInTheDocument();
  });

  it('items should have link with href', () => {
    const { getAllByTestId } = render(
      <Breadcrumb data={breadcrumbItems} clickHandler={mockClickHandler} />
    );
    const title = getAllByTestId('buttonLink')[0];
    expect(title).toHaveAttribute('href', '/sport');
  });

  it('last breadcrumb should be selected', () => {
    const { getAllByTestId } = render(
      <Breadcrumb data={breadcrumbItems} clickHandler={mockClickHandler} />
    );
    const title = getAllByTestId('button')[0];
    expect(title).toHaveAttribute('aria-current', 'page');
  });

  it('calls clickHandler when you click', () => {
    const { getByText } = render(
      <Breadcrumb data={breadcrumbItems} clickHandler={mockClickHandler} />
    );
    const breadcrumb = getByText('Tennis');
    fireEvent.click(breadcrumb);
    expect(mockClickHandler).toHaveBeenCalledWith('Tennis');
  });
});
