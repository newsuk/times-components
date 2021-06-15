import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import GalleryCarousel from '../GalleryCarousel';

const data = [
  {
    paneldata: {
      label: 'Label 1',
      headline: 'Headline 1',
      copy: 'Copy 1',
      credit: 'Credit 1'
    },
    carouseldata: {
      image:
        'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F46cebe30-c82d-11eb-b6f5-fed739e7c1ca.jpg?crop=6676%2C3755%2C65%2C707&resize=1180'
    }
  },
  {
    paneldata: {
      label: 'Label 2',
      headline: 'Headline 2',
      copy: 'Copy 2',
      credit: 'Credit 2'
    },
    carouseldata: {
      image:
        'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F24f0ce12-c444-11eb-8601-6a2ece3e4634.png?crop=778%2C438%2C84%2C7&resize=1180'
    }
  }
];

describe('GalleryCarousel', () => {
  afterEach(() => {
    cleanup();
  });
  it('should render the component', () => {
    const { asFragment } = render(
      <GalleryCarousel
        data={data}
        isLarge={false}
        isSmall={false}
        sectionColour={'#000'}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should render the first slide on load', () => {
    const { queryAllByText, getAllByRole } = render(
      <GalleryCarousel
        data={data}
        isLarge={false}
        isSmall={false}
        sectionColour={'#000'}
      />
    );
    expect(queryAllByText('Label 1')).toBeTruthy();
    expect(queryAllByText('Headline 1')).toBeTruthy();
    expect(queryAllByText('Copy 1')).toBeTruthy();
    expect(getAllByRole('img')[0]).toHaveAttribute(
      'src',
      'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F46cebe30-c82d-11eb-b6f5-fed739e7c1ca.jpg?crop=6676%2C3755%2C65%2C707&resize=1180'
    );
  });
});
