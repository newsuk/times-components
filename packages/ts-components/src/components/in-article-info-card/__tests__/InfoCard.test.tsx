import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { InfoCard } from '../InfoCard';
import { useFetch } from '../../../helpers/fetch/FetchProvider';
import FakeIntersectionObserver from '../../../test-utils/FakeIntersectionObserver';
import mockDate from 'mockdate';

jest.mock('@times-components/image', () => ({
  Placeholder: () => <div>Placeholder</div>
}));

jest.mock('../../../helpers/fetch/FetchProvider', () => ({
  useFetch: jest.fn()
}));

const deckApiPayloadWrapper = () => ({
  data: testDataWide
});

const deckApiPayloadWrapperStandard = () => ({
  data: testDataStandard
});

const testDataWide = {
  deck_id: 43614,
  deck_name: 'Test Info card carousel standard - Copy and Subtitles',
  deck_type: 'Info Card Carousel',
  version: 1,
  updated_at: {
    date: '2021-07-22 08:28:05.000000',
    timezone_type: 3,
    timezone: 'UTC'
  },
  fields: {
    label: 'Best places to stay',
    headline: 'The Sunday Times best British hotels',
    size: '4042',
    subtitles: 'True'
  },
  body: {
    data: [
      {
        type: 'card',
        data: {
          image:
            'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F46cebe30-c82d-11eb-b6f5-fed739e7c1ca.jpg?crop=6676%2C3755%2C65%2C707&resize=1180',
          subtitle: 'Birch',
          copy:
            'Hotel of the year. Offering everything from pottery workshops to sourdough masterclasses, this trendy newcomer is doing things differently'
        }
      },

      {
        type: 'card',
        data: {
          image: '',
          subtitle: 'Mitre',
          copy:
            'Regional winner: London. Right on the Thames, this swish new inn delivers sweeping river views and royal history'
        }
      },
      {
        type: 'card',
        data: {
          image: '',
          subtitle: 'Subtitle 1',
          copy: 'Copy text 1'
        }
      },
      {
        type: 'card',
        data: {
          image: '',
          subtitle: 'Subtitle 2',
          copy: 'Copy text 2'
        }
      },
      {
        type: 'card',
        data: {
          image: '',
          subtitle: 'Subtitle 3',
          copy: 'Copy text 3'
        }
      },
      {
        type: 'card',
        data: {
          image: '',
          subtitle: 'Subtitle 4',
          copy: 'Copy text 4'
        }
      }
    ]
  },
  html:
    '<!DOCTYPE html> <html> <head> <title>The Times - Info Card</title></head> <body> </body> </html>'
};

const testDataStandard = {
  deck_id: 43614,
  deck_name: 'Test Info card carousel standard - Copy and Subtitles',
  deck_type: 'Info Card Carousel',
  version: 1,
  updated_at: {
    date: '2021-07-22 08:28:05.000000',
    timezone_type: 3,
    timezone: 'UTC'
  },
  fields: {
    label: 'Best places to stay',
    headline: 'The Sunday Times best British hotels',
    size: '4043',
    subtitles: 'True'
  },
  body: {
    data: [
      {
        type: 'card',
        data: {
          image:
            'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F46cebe30-c82d-11eb-b6f5-fed739e7c1ca.jpg?crop=6676%2C3755%2C65%2C707&resize=1180',
          subtitle: 'Birch',
          copy:
            'Hotel of the year. Offering everything from pottery workshops to sourdough masterclasses, this trendy newcomer is doing things differently'
        }
      },

      {
        type: 'card',
        data: {
          image: '',
          subtitle: 'Mitre',
          copy:
            'Regional winner: London. Right on the Thames, this swish new inn delivers sweeping river views and royal history'
        }
      },
      {
        type: 'card',
        data: {
          image: '',
          subtitle: 'Subtitle 1',
          copy: 'Copy text 1'
        }
      },
      {
        type: 'card',
        data: {
          image: '',
          subtitle: 'Subtitle 2',
          copy: 'Copy text 2'
        }
      },
      {
        type: 'card',
        data: {
          image: '',
          subtitle: 'Subtitle 3',
          copy: 'Copy text 3'
        }
      },
      {
        type: 'card',
        data: {
          image: '',
          subtitle: 'Subtitle 4',
          copy: 'Copy text 4'
        }
      }
    ]
  },
  html:
    '<!DOCTYPE html> <html> <head> <title>The Times - Info Card</title></head> <body> </body> </html>'
};

const renderInfoCard = () => render(<InfoCard sectionColour="#636C17" />);

describe('InfoCard', () => {
  beforeEach(() => {
    mockDate.set(1620000000000);
  });

  afterEach(() => {
    mockDate.reset();
    jest.clearAllMocks();
    cleanup();
  });

  it('should render the initial loading state correctly', () => {
    (useFetch as jest.Mock).mockReturnValue({ loading: true });
    const { asFragment } = render(<InfoCard sectionColour="#636C17" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the initial error state correctly', () => {
    (useFetch as jest.Mock).mockReturnValue({ error: true });
    const { asFragment } = render(<InfoCard sectionColour="#636C17" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the wide component', () => {
    (useFetch as jest.Mock).mockReturnValue(deckApiPayloadWrapper());
    const { asFragment } = renderInfoCard();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the standard component', () => {
    (useFetch as jest.Mock).mockReturnValue(deckApiPayloadWrapperStandard());
    const { asFragment } = renderInfoCard();
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders', () => {
    const { baseElement } = render(<InfoCard sectionColour="#636C17" />);
    expect(baseElement).toMatchSnapshot();
  });

  it('renders no image', () => {
    const { baseElement } = render(<InfoCard sectionColour="#636C17" />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should render the first slide on load', () => {
    const { queryAllByText, getAllByRole } = renderInfoCard();
    expect(queryAllByText('The Sunday Times best British hotels')).toBeTruthy();
    expect(
      queryAllByText(
        'Hotel of the year. Offering everything from pottery workshops to sourdough masterclasses, this trendy newcomer is doing things differently'
      )
    ).toBeTruthy();
    expect(getAllByRole('img')[0]).toHaveAttribute(
      'src',
      'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F46cebe30-c82d-11eb-b6f5-fed739e7c1ca.jpg?crop=6676%2C3755%2C65%2C707&resize=1180'
    );
  });

  describe('tracking', () => {
    (useFetch as jest.Mock).mockReturnValue(deckApiPayloadWrapper());
    let oldIntersectionObserver: typeof IntersectionObserver;
    beforeEach(() => {
      oldIntersectionObserver = window.IntersectionObserver;
      // @ts-ignore
      window.IntersectionObserver = FakeIntersectionObserver;
    });

    afterEach(() => {
      window.IntersectionObserver = oldIntersectionObserver;
      jest.resetAllMocks();
    });

    it('click previous button', async () => {
      const { getAllByTestId } = renderInfoCard();
      const previousButton = getAllByTestId('Previous button')[0];
      const nextButton = getAllByTestId('Next Button')[0];
      fireEvent.click(nextButton);
      fireEvent.click(previousButton);
      expect(previousButton).toHaveAttribute('disabled');
      expect(nextButton).not.toHaveAttribute('disabled');
    });
    it('click next button', async () => {
      (useFetch as jest.Mock).mockReturnValue(deckApiPayloadWrapper());
      const { getAllByTestId } = renderInfoCard();
      const previousButton = getAllByTestId('Previous button')[0];
      const nextButton = getAllByTestId('Next Button')[0];
      expect(previousButton).toHaveAttribute('disabled');
      expect(nextButton).not.toHaveAttribute('disabled');
      fireEvent.click(nextButton);
      expect(previousButton).not.toHaveAttribute('disabled');
      expect(nextButton).not.toHaveAttribute('disabled');
    });

    it('page indicator button', async () => {
      (useFetch as jest.Mock).mockReturnValue(deckApiPayloadWrapper());
      const { getAllByTestId } = renderInfoCard();
      const previousButton = getAllByTestId('Previous button')[0];
      const nextButton = getAllByTestId('Next Button')[0];
      expect(previousButton).toHaveAttribute('disabled');
      expect(nextButton).not.toHaveAttribute('disabled');
      const pageIndicatorButton = getAllByTestId('Page Indicator')[1];
      fireEvent.click(pageIndicatorButton);
      expect(previousButton).not.toHaveAttribute('disabled');
      expect(nextButton).not.toHaveAttribute('disabled');
    });
  });
});
