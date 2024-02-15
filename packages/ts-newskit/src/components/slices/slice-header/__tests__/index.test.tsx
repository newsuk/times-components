import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '../../../../utils/test-utils';
import { SliceHeader } from '../index';

const mockSliceHeaderClickHandler = jest.fn();

describe('Render Header', () => {
  it('should render a snapshot', () => {
    const { asFragment } = render(
      <SliceHeader
        title="Rugby Union"
        href="https://www.thetimes.co.uk/"
        sliceHeaderClickHandler={mockSliceHeaderClickHandler}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should render a snapshot with tagline', () => {
    const { asFragment } = render(
      <SliceHeader
        title="Rugby Union"
        href="https://www.thetimes.co.uk/"
        tagline="this is the test tagline"
        sliceHeaderClickHandler={mockSliceHeaderClickHandler}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correct title', () => {
    const { getByText } = render(
      <SliceHeader
        title="Rugby Union"
        href="https://www.thetimes.co.uk/"
        sliceHeaderClickHandler={mockSliceHeaderClickHandler}
      />
    );
    const text = getByText('Rugby Union');
    expect(text).toBeInTheDocument();
  });

  it('should render correct tagline', () => {
    const { getAllByText } = render(
      <SliceHeader
        title="Rugby Union"
        href="https://www.thetimes.co.uk/"
        tagline="this is the test tagline"
        sliceHeaderClickHandler={mockSliceHeaderClickHandler}
      />
    );
    const text = getAllByText('this is the test tagline');
    expect(text[0]).not.toBeVisible();
    expect(text[1]).toBeVisible();
  });

  it('should render correct color', () => {
    const { getByText } = render(
      <SliceHeader
        title="Rugby Union"
        href="https://www.thetimes.co.uk/"
        sliceHeaderClickHandler={mockSliceHeaderClickHandler}
      />
    );
    const text = getByText('Rugby Union');
    expect(text).toHaveStyle('color: #01000d');
  });
  it('should call the tracking function when clicked', () => {
    const { getByRole } = render(
      <SliceHeader
        title="Rugby Union"
        href="https://www.thetimes.co.uk/"
        sliceHeaderClickHandler={mockSliceHeaderClickHandler}
      />
    );
    fireEvent.click(getByRole('link'));
    expect(mockSliceHeaderClickHandler).toHaveBeenCalledWith('Rugby Union');
  });
  it('does not render the icon button if no href is supplied', () => {
    const { queryByRole } = render(
      <SliceHeader
        title="Rugby Union"
        sliceHeaderClickHandler={mockSliceHeaderClickHandler}
      />
    );
    expect(queryByRole('link')).toBeFalsy();
  });
  it('does not render the divider if showDivider is false', () => {
    const { baseElement } = render(
      <SliceHeader
        title="Rugby Union"
        sliceHeaderClickHandler={mockSliceHeaderClickHandler}
        showDivider={false}
      />
    );
    expect(baseElement).toHaveStyle({ border: 'none' });
  });
});
