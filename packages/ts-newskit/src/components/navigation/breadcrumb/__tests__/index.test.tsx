import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import { render } from '../../../../utils/test-utils';
import { Breadcrumb } from '../index';
import { breadcrumbItems } from '../fixtures/breadcrumbs.json';
import { TrackingContextProvider } from '../../../../utils/TrackingContextProvider';

describe('Render Breadcrumbs', () => {
  const renderBreadcrumb = (analyticsStream?: (event: any) => void) =>
    render(
      <TrackingContextProvider
        context={{
          component: 'breadcrumb',
          attrs: {}
        }}
        analyticsStream={analyticsStream}
      >
        <Breadcrumb data={breadcrumbItems} />
      </TrackingContextProvider>
    );
  it('should render a snapshot', () => {
    const { asFragment } = renderBreadcrumb();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the component', () => {
    const { getByText } = renderBreadcrumb();
    const getBreadcrumb = getByText('Tennis');
    expect(getBreadcrumb).toBeInTheDocument();
  });

  it('items should have link with href', () => {
    const { getAllByTestId } = renderBreadcrumb();
    const title = getAllByTestId('buttonLink')[0];
    expect(title).toHaveAttribute('href', '/sport');
  });

  it('last breadcrumb should be selected', () => {
    const { getAllByTestId } = renderBreadcrumb();
    const title = getAllByTestId('button')[0];
    expect(title).toHaveAttribute('aria-current', 'page');
  });

  it('calls clickHandler when you click', () => {
    const analyticsStream = jest.fn();
    const { getByText } = renderBreadcrumb(analyticsStream);
    const breadcrumb = getByText('Tennis');
    fireEvent.click(breadcrumb);
    expect(analyticsStream).toHaveBeenCalledTimes(1);
  });
});
