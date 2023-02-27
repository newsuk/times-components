import React from 'react';
import { EditionMasthead } from '../index';
import { render } from '../../utils/test-utils';
import '@testing-library/jest-dom';

describe('EditionMasthead', () => {
  it('should render The Times masthead', () => {
    const { asFragment } = render(
      <EditionMasthead
        isSunday={false}
        todaysDate="Wed Feb 22 2023 00:01:00 GMT+0000 (Greenwich Mean Time)"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render The Sunday Times masthead', () => {
    const { asFragment } = render(
      <EditionMasthead
        isSunday={true}
        todaysDate="Sun Feb 26 2023 00:01:00 GMT+0000 (Greenwich Mean Time)"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render date correctly', () => {
    const { getByText } = render(
      <EditionMasthead
        isSunday={false}
        todaysDate="Wed Feb 22 2023 00:01:00 GMT+0000 (Greenwich Mean Time)"
      />
    );
    const date = getByText('Wednesday February 22 2023');
    expect(date).toBeInTheDocument();
  });

  it('should render todays date if no date passed', () => {
    const dateNow = new Date();
    const year = dateNow.getFullYear();
    const month = dateNow.toLocaleString('default', { month: 'long' });
    const dayNumber = dateNow.getDate();
    const day = dateNow.toLocaleString('default', { weekday: 'long' });
    const today = `${day} ${month} ${dayNumber} ${year}`;

    const { getByText } = render(<EditionMasthead isSunday={false} />);
    expect(getByText(today)).toBeInTheDocument();
  });
});
