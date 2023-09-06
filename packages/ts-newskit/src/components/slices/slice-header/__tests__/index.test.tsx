import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '../../../../utils/test-utils';
import { SliceHeader } from '../index';
import { TrackingContextProvider } from '../../../../utils/TrackingContextProvider';
import mockDate from 'mockdate';

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
  it('should trigger tracking', () => {
    mockDate.set(1620000000000);
    const analyticsStream = jest.fn();
    const { getByRole } = render(
      <TrackingContextProvider analyticsStream={analyticsStream}>
        <SliceHeader title="Rugby Union" href="https://www.thetimes.co.uk/" />
      </TrackingContextProvider>
    );
    fireEvent.click(getByRole('link'));
    expect(analyticsStream).toHaveBeenCalledWith({
      action: 'Clicked',
      object: 'SliceHeader',
      component: 'SliceHeader',
      attrs: {
        article_parent_name: 'Rugby Union',
        eventTime: '2021-05-03T00:00:00.000Z',
        event_navigation_action: 'navigation',
        event_navigation_browsing_method: 'click',
        event_navigation_name: 'title block link'
      }
    });
  });
  it('does not render the icon button if no href is supplied', () => {
    const { queryByRole } = render(<SliceHeader title="Rugby Union" />);
    expect(queryByRole('link')).toBeFalsy();
  });
});
