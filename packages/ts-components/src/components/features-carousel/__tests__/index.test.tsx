import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { FeaturesCarousel } from '../FeaturesCarousel';
import { featuresCarouselData } from '../fixtureData.json';

describe('Render FeaturesCarousel', () => {
  const renderFeaturesCarousel = (hideHeading: boolean = true) =>
    render(
      <FeaturesCarousel {...featuresCarouselData} hideHeading={hideHeading} />
    );

  it('should render a snapshot', () => {
    const { asFragment } = renderFeaturesCarousel();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the component', () => {
    const { getByText } = renderFeaturesCarousel();
    const getFirstTitle = getByText('Title 1');
    const getHeading = getByText('Your benefits');
    expect(getFirstTitle).toBeInTheDocument();
    expect(getHeading).toBeInTheDocument();
  });

  it('should render the component without heading', () => {
    const { getByText, queryByText } = renderFeaturesCarousel(false);
    const getFirstTitle = getByText('Title 1');
    const getHeading = queryByText('Your benefits');

    expect(getFirstTitle).toBeInTheDocument();
    expect(getHeading).toBeNull();
  });

  it('items should have link with href', () => {
    const { getAllByRole } = renderFeaturesCarousel();
    const title = getAllByRole('link')[1];
    expect(title).toHaveAttribute('href', '#link2');
  });

  it('items should have correct colour styling', () => {
    const { getByText, getAllByRole } = renderFeaturesCarousel();
    const thirdItemContent = getAllByRole('link')[2].querySelector('div');
    const title = getByText('Title 3');
    expect(title).toHaveStyle('color: #111110');
    expect(thirdItemContent).toHaveStyle('background-color: #E4E4E4');
  });
});
