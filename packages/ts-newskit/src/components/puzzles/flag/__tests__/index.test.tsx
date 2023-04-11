import React from 'react';
import '@testing-library/jest-dom';
import { render } from '../../../utils/test-utils';
import { PuzzlesFlag } from '../index';

describe('Flag test', () => {
  it('should render a snapshot', () => {
    const { asFragment } = render(<PuzzlesFlag status="COMPLETE" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render a snapshot with label in progress', () => {
    const { asFragment } = render(<PuzzlesFlag status="IN PROGRESS" />);
    expect(asFragment()).toMatchSnapshot();
  });

  /* it('should render the component', () => {
    const { getByText } = render(<Breadcrumb data={breadcrumbItems} />);
    const getBreadcrumb = getByText('Tennis');
    expect(getBreadcrumb).toBeInTheDocument();
  }); */
});
