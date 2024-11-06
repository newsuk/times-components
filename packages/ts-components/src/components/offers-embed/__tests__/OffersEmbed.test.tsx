import React from 'react';
import { render } from '@testing-library/react';
import { OffersEmbed } from '../OffersEmbed';
import '@testing-library/jest-dom';

describe('OffersEmbed Component', () => {
  beforeEach(() => {
    // Clear the document head and body before each test
    document.head.innerHTML = '';
    document.body.innerHTML = '<div id="interactiveWrapper"></div>';
  });

  it('should render the travel offers component when `isBestSellingHolidays` is true', () => {
    const mockElement = {
      attributes: {
        src:
          'https://www.thetimes.co.uk/travel/offers-component/best-selling-holidays/'
      }
    };
    const url = 'https://www.thetimes.co.uk';
    const id = 'test-id';

    render(
      <OffersEmbed element={mockElement} url={url} id={id} vendorName={''} />
    );

    const travelOffersLink = document.querySelector(
      'link[href="https://components.timesdev.tools/lib2/times-travel-offers-new-1.0.0/times-travel-offers-new.html"]'
    );
    const travelOffersComponent = document.querySelector(
      'times-travel-offers-new'
    );

    expect(travelOffersLink).toBeInTheDocument();
    expect(travelOffersLink).toHaveAttribute('rel', 'import');

    expect(travelOffersComponent).toBeInTheDocument();
    expect(travelOffersComponent).toHaveAttribute(
      'src',
      'https://components.timesdev.tools/lib2/times-travel-offers-new-1.0.0/times-travel-offers-new.html'
    );
    expect(travelOffersComponent).toHaveAttribute('offers', 'bsh');
    expect(travelOffersComponent).toHaveAttribute(
      'title',
      'Bestselling holidays'
    );
    expect(travelOffersComponent).toHaveAttribute(
      'description',
      'Brought to you by Times Travel.'
    );
  });

  it('should not render the travel offers component when `isBestSellingHolidays` is false', () => {
    const mockElement = {
      attributes: {
        src:
          'https://www.thetimes.co.uk/travel/offers-component/other-holidays/'
      }
    };
    const url = 'https://www.thetimes.co.uk';
    const id = 'test-id';

    render(
      <OffersEmbed element={mockElement} url={url} id={id} vendorName={''} />
    );

    const travelOffersLink = document.querySelector(
      'link[href="https://components.timesdev.tools/lib2/times-travel-offers-new-1.0.0/times-travel-offers-new.html"]'
    );
    const travelOffersComponent = document.querySelector(
      'times-travel-offers-new'
    );

    expect(travelOffersLink).not.toBeInTheDocument();
    expect(travelOffersComponent).not.toBeInTheDocument();
  });
});
