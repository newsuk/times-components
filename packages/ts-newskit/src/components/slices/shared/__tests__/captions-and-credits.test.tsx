import React from 'react';
import { render } from '../../../../utils/test-utils';
import { CaptionsAndCredits } from '../captions-and-credits';
import '@testing-library/jest-dom';

describe('CaptionsAndCredits', () => {
  it('should render a snapshot', () => {
    const images = {
      alt: '',
      credits: 'Gareth Fuller/Press Association',
      caption: 'Saracens an inclusive club? They didnt look out for me',
      crops: [
        {
          url: 'https://www.example.com/image1.jpg',
          ratio: '3:2'
        }
      ]
    };
    const { asFragment } = render(
      <CaptionsAndCredits images={images} hasCaption={true} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('renders correctly when images are provided but caption is missing', () => {
    const images = {
      alt: '',
      credits: 'Gareth Fuller/Press Association',
      crops: [
        {
          url: 'https://www.example.com/image1.jpg',
          ratio: '3:2'
        }
      ]
    };

    const { getByText, queryByText } = render(
      <CaptionsAndCredits images={images} hasCaption={true} />
    );
    const captionElement = queryByText(
      /Saracens an inclusive club? They didnt look out for me/i
    );
    const creditsElement = getByText(/Gareth Fuller\/Press Association/i);

    expect(captionElement).toBeNull();
    expect(creditsElement).toBeInTheDocument();
  });

  it('renders correctly when images are provided but hasCaption is false', () => {
    const images = {
      alt: '',
      credits: 'Gareth Fuller/Press Association',
      caption: 'Saracens an inclusive club? They didnt look out for me',
      crops: [
        {
          url: 'https://www.example.com/image1.jpg',
          ratio: '3:2'
        }
      ]
    };

    const { getByText, queryByText } = render(
      <CaptionsAndCredits images={images} hasCaption={false} />
    );

    const captionElement = queryByText(
      /Saracens an inclusive club? They didnt look out for me/i
    );
    const creditsElement = getByText(/Gareth Fuller\/Press Association/i);
    expect(captionElement).toBeNull();
    expect(creditsElement).toBeInTheDocument();
  });

  it('renders nothing when images are not provided', () => {
    const { container } = render(<CaptionsAndCredits />);
    expect(container.firstChild).toBeNull();
  });
});
